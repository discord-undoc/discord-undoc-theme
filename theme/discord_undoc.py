"""
Copyright 2022 한승민

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
"""

from asyncio import Event, Lock, run, sleep
from os import getenv
from re import compile, Match
from sys import argv, stdin
from time import monotonic

from bs4 import BeautifulSoup
from httpx import AsyncClient
from mistletoe import markdown
from orjson import dumps, loads

TOKEN = getenv("TOKEN", None)

if not TOKEN:
    raise RuntimeError("No TOKEN found in environment variables.")


STATIC_ELEMENTS = {
    "undoc": (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"'
        ' width="20" height="20"><path fill-rule="evenodd" d="M8 16A8 8 0 108 0a8 8 0 000'
        " 16zM5.5 4A1.5 1.5 0 004 5.5v5c0 .828.5 1.5 1 1.5v-1a1 1 0"
        " 011-1h5v1h-1v1h1.5a.5.5 0 00.5-.5v-7a.5.5 0 00-.5-.5h-6zm.5"
        " 7.25a.25.25 0 01.25-.25H9v2.764a.25.25 0 01-.426.178l-.898-.888a.25.25"
        ' 0 00-.352 0l-.898.888A.25.25 0 016 13.764V11.25z"></path></svg>'
    ),
    "nobot": (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"'
        ' width="20" height="20"><path fill-rule="evenodd" d="M8 16A8 8 0 108 0a8 8 0 000'
        " 16zm.847-8.145a2.502 2.502 0 10-1.694 0C5.471 8.261 4 9.775 4 11c0"
        " .395.145.995 1 .995h6c.855 0 1-.6 1-.995"
        ' 0-1.224-1.47-2.74-3.153-3.145z"></path></svg>'
    ),
    "iandeploy": (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"'
        ' width="20" height="20"><path fill-rule="evenodd" d="M8 16A8 8 0 108 0a8 8 0 000'
        " 16zm3.031-12a4.38 4.38 0 00-3.097"
        " 1.283l-.23.229c-.156.157-.308.32-.452.49H5.65a.876.876 0"
        " 00-.746.417l-.856 1.388a.375.375 0 00.21.556l1.552.477 1.35 1.35.478"
        " 1.553a.375.375 0 00.555.21l1.389-.855a.876.876 0"
        " 00.416-.746V8.747c.17-.144.333-.295.49-.452l.23-.23A4.38 4.38 0"
        " 0012 4.969v-.093A.876.876 0 0011.124 4h-.093zm-5.107 7.144a.81.81 0"
        " 01-.188.263c-.394.394-1.258.563-1.62.619a.124.124 0"
        ' 01-.143-.143c.056-.362.225-1.226.62-1.62a.808.808 0 011.33.881z"></path></svg>'
    ),
}


CODE_BLOCK_RE = compile(
    r"(?<!\\)(`{3,}(?=[^`\n]*\n))([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1 *(?=\n|$))"
)

INLINE_CODE_RE = compile(r"((?<!\\)`+)([^`]|[^`][\s\S]*?[^`])(?<!\\)\1(?!`)")


URL_RE = compile(
    r"<https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)>"
)


client = AsyncClient(
    headers={
        "Authorization": f"Bot {TOKEN}",
        "User-Agent": "Discord Bot (https://discord-undoc.github.io, [object Object])",
    }
)

request_lock = Lock()
global_lock = Event()
global_lock.set()


class BasicLockHandler:
    def __init__(self, lock: Lock) -> None:
        self.lock = lock
        self.frozen = False

    def __enter__(self):
        return self

    def freeze(self) -> bool:
        if not self.frozen:
            self.frozen = True
        # Will be True nonetheless
        return True

    def __exit__(self, exc_type, exc_val, exc_tb):
        if not self.frozen:
            self.lock.release()


async def modify_some_shit(document: BeautifulSoup):
    for info_badge in document.find_all(compile(r"undoc|nobot|iandeploy")):
        badge, info_badge.name = info_badge.name, "b"
        info_badge.attrs = {"class": badge}
        info_badge.string = STATIC_ELEMENTS[badge]

    for alert_box in document.find_all(compile(r"note|info|warn")):
        typ, alert_box.name = alert_box.name, "div"
        alert_box.string = markdown(alert_box.string).strip()
        alert_box.attrs = {"class": typ}

    for spoiler in document.find_all("spoiler"):
        sid = str(monotonic()).replace(".", "")
        spoiler.insert_before(
            f'<input type="checkbox" class="spoiler" id="spoiler-{sid}">'
        )
        spoiler.name = "label"
        spoiler.attrs = {"class": "spoiler", "for": f"spoiler-{sid}"}

    for endpoint in document.find_all(
        compile(r"get|head|post|put|delete|connect|options|trace|patch")
    ):
        path = endpoint.string
        method, endpoint.name = endpoint.name, "b"
        endpoint.attrs = {"class": "endpoint"}
        endpoint.string = (
            f'<span class="endpoint-c"><span class="http-method'
            f' {method}">{method.upper()}</span> {path}</span>'
        )

    for user_badge in document.find_all("user"):
        user_id = user_badge["id"]

        user = {
            "avatar": "https://cdn.discordapp.com/embed/avatars/3.png",
            "username": "Deleted User",
            "discriminator": "0000",
        }

        # The following ratelimit code was extracted from discord.py
        # and modified to fit the needs of discord-undoc

        # IDK if this is of any use, but meh
        if not global_lock.is_set():
            await global_lock.wait()

        await request_lock.acquire()

        with BasicLockHandler(request_lock) as bucket:
            for _ in range(3):
                res = await client.get(f"https://discord.com/api/v10/users/{user_id}")
                remaining = res.headers.get("X-Ratelimit-Remaining")

                # Theres very little change that we get CF banned, so this is safe
                response_data = loads(res.content)

                if remaining == "0" and res.status_code != 429:
                    bucket.freeze()
                    await sleep(float(res.headers["X-Ratelimit-Reset"]))
                    request_lock.release()

                if 300 > res.status_code >= 200:
                    user = response_data
                    user["avatar"] = (
                        "https://cdn.discordapp.com/avatars/"
                        f'{user_id}/{user["avatar"]}.'
                        f'{"gif" if user["avatar"].startswith("a_") else "webp"}'
                        "?quality=lossless"
                    )
                    break

                if res.status_code == 429:
                    retry_after = response_data["retry_after"]
                    is_global = response_data.get("global", False)

                    if is_global:
                        global_lock.clear()

                    await sleep(retry_after)

                    if is_global:
                        global_lock.set()

                    continue

                # Do not raise exceptions for status codes, its gonna be
                # displayed as Deleted User, if it was a valid user then
                # we can re-publish :P

        user_badge.name = "a"
        user_badge.attrs = {
            "href": f"https://discord.com/users/{user_id}",
            "class": "user",
        }
        user_badge.string = (
            f'<img src="{user["avatar"]}" alt="{user["username"]}\'s avatar"'
            f' class="avatar" width="25px" height="25px">{user["username"]}'
            f'<span>#{user["discriminator"]}</span></img>'
        )


def remove(string: str) -> tuple[dict[str, str], str]:
    mappings = {}

    def replace(match: Match[str]):
        key = f"-SomeRandomPrefixToPreventConflictWithNormalContentKThanks{len(mappings)}-"
        mappings[key] = match.group(0)
        return key

    string = CODE_BLOCK_RE.subn(replace, string)[0]
    string = INLINE_CODE_RE.subn(replace, string)[0]
    # mdbook wants urls to be enclosed in <> because of the spec
    # but html parsers dont like it :/
    # so we ignore those too
    string = URL_RE.subn(replace, string)[0]

    return mappings, string


def add(string: str, mappings: dict[str, str]) -> str:
    for key, value in mappings.items():
        string = string.replace(key, value)

    return string


async def parse(book):
    for chapter in book["sections"]:
        if "PartTitle" not in chapter and chapter["Chapter"]["path"] is not None:
            mappings, string = remove(chapter["Chapter"]["content"])
            doc = BeautifulSoup(string, "html.parser")
            await modify_some_shit(doc)
            string = add(doc.encode(formatter=None).decode(), mappings)
            chapter["Chapter"]["content"] = string  # type: ignore
    await client.aclose()


if __name__ == "__main__":
    if len(argv) > 1:
        if argv[1] == "supports":
            raise SystemExit(0)
    _, book = loads(stdin.read())
    run(parse(book))
    print(dumps(book, option=1).decode())

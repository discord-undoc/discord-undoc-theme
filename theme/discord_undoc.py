from __future__ import annotations

import json
import re
import sys
from time import monotonic
from typing import Callable

from mistletoe import markdown

USER_RE = re.compile(r"(.{2,32})(#\d{4})-(\d*)-(\w*)")


def e_user(data: tuple[str, str]) -> str:
    _, usr_data = data
    match = USER_RE.match(usr_data)
    if match is None:
        return usr_data
    user_name, user_discrim, user_id, avatar_hash = match.groups()
    return (
        f'<a href="https://discord.com/users/{user_id}" class="user">'
        f'<img src="https://cdn.discordapp.com/avatars/{user_id}/'
        f'{avatar_hash}.{"gif" if avatar_hash.startswith("a_") else "webp"}'
        f'" alt="{user_name}\'s avatar" class="avatar" width="25px" '
        f'height="25px">{user_name}<span>{user_discrim}</span></img></a>'
    )


def e_http_method(data: tuple[str, str]) -> str:
    method, endpoint = data
    return (
        f'<b class="endpoint"><span class="endpoint-c"><span class="http-method {method}">'
        f"{method.upper()}</span> {endpoint}</span></b>"
    )


def e_alert_box(data: tuple[str, str]) -> str:
    name, content = data
    content = markdown(content)[0:-1]
    return f'<div class="{name}">{content}</div>'


def e_details(data: tuple[str, str], dopen=False) -> str:
    element = data[1].split("<summ>", 1)
    if len(element) == 1:
        summary, content = ("", element[0])
    else:
        summary, content = element

    summary = markdown(summary)[0:-1]
    content = markdown(content)[0:-1]

    return (
        f'<details{" open" if dopen else ""}><summary>{summary}</summary>'
        f'<div class="d_content">{content}</div></details>'
    )


def e_details_open(data: tuple[str, str]) -> str:
    return e_details(data, dopen=True)

def e_spoilers(data: tuple[str, str]) -> str:
    sid = str(monotonic()).replace(".", "")
    return f'<input type="checkbox" class="spoiler" id="spoiler-{sid}"><label for="spoiler-{sid}">{data[1]}</label>'


STATIC_ELEMENTS = {
    "undoc": '<b class="undoc"><b class="material-icons round">article</b></b>',
    "nobot": '<b class="nobot"><b class="material-icons round">smart_toy</b></b>',
    "iandeploy": '<b class="iandeploy"><b class="material-icons round">rocket_launch</b></b>',
}

DYNAMIC_ELEMENTS: dict[str, Callable[[tuple[str, str]], str]] = {
    "user": e_user,
    "get": e_http_method,
    "head": e_http_method,
    "post": e_http_method,
    "put": e_http_method,
    "delete": e_http_method,
    "connect": e_http_method,
    "options": e_http_method,
    "trace": e_http_method,
    "patch": e_http_method,
    "note": e_alert_box,
    "info": e_alert_box,
    "warn": e_alert_box,
    "details": e_details,
    "details-open": e_details_open,
    "spoiler": e_spoilers,
}


class UnclosedTagError(Exception):
    pass


class Element:
    text: str
    tlen: int

    def get_len(self, index: int) -> tuple[str, int]:
        text = ""
        while index != self.tlen:
            if self.text[index] != "`":
                break
            text += self.text[index]
            index += 1

        return text, index

    def parse_element(self, data: str) -> str:
        elem = STATIC_ELEMENTS.get(data, None)

        if " " not in data and elem is None:
            return data

        if elem is None:
            tag, p_data = data.split(" ", 1)
            elem = DYNAMIC_ELEMENTS.get(tag, str)((tag, p_data))
        return elem

    def scan_element(self, index: int) -> tuple[int, str]:
        element_data = ""
        ignore = False
        prev = ""
        open_index = None
        while index != self.tlen:
            if self.text[index : index + 3] == "{::":
                index, content = self.scan_element(index + 3)
                index += 1
                element_data += content

            if self.text[index] == "`" and self.text[index - 1] != "\\":
                tmp_prev, index = self.get_len(index)
                element_data += tmp_prev
                if prev == tmp_prev:
                    prev = ""
                    ignore = False
                    open_index = None
                elif prev == "":
                    prev = tmp_prev
                    ignore = True
                    open_index = index

            if ignore and (index + 1) == self.tlen:
                raise UnclosedTagError(f"Unclosed inline/block code: {open_index} - {self.tlen}")

            if self.text[index] == "}" and not ignore:
                break

            element_data += self.text[index]
            index += 1

        return index, self.parse_element(element_data)

    def scanner(self) -> str:
        text = ""
        index = 0
        ignore = False
        prev = ""
        open_index = None
        while index != self.tlen:
            try:
                if self.text[index] == "`" and self.text[index - 1] != "\\":
                    tmp_prev, index = self.get_len(index)
                    text += tmp_prev
                    if prev == tmp_prev:
                        prev = ""
                        ignore = False
                        open_index = None
                    elif prev == "":
                        prev = tmp_prev
                        ignore = True
                        open_index = index

                if ignore and (index + 1) == self.tlen:
                    raise UnclosedTagError(f"Unclosed inline/block code: {open_index} - {self.tlen}")

                if self.text[index : index + 3] == "{::" and not ignore:
                    index, content = self.scan_element(index + 3)
                    text += content
                else:
                    text += self.text[index]
            except IndexError:
                break

            index += 1
        return text

    def __call__(self, text: str) -> str:
        self.text = text
        self.tlen = len(text)
        return self.scanner()


class Book:
    book: dict
    config: dict

    def __init__(self, book, config) -> None:
        self.book = book
        self.config = config
        self.element = Element()

    def __call__(self) -> None:
        for chapter in self.book["sections"]:
            if "PartTitle" not in chapter and chapter["Chapter"]["path"] is not None:
                chapter["Chapter"]["content"] = self.element(
                    chapter["Chapter"]["content"]
                )


if __name__ == "__main__":
    if len(sys.argv) > 1:
        if sys.argv[1] == "supports":
            sys.exit(0)
    context, book = json.load(sys.stdin)
    Book(book, context)()
    print(json.dumps(book))

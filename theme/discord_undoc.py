from __future__ import annotations

import json
import re
import sys

USER_RE = re.compile(r'(.{2,32})(#\d{4})-(\d*)-(\w*)')


def e_user(data: tuple[str, str]) -> str:
    _, data = data
    match = USER_RE.match(data)
    if match is None:
        return data
    user_name, user_discrim, user_id, avatar_hash = match.groups()
    return (f'<a href="https://discord.com/users/{user_id}" class="user">'
            f'<img src="https://cdn.discordapp.com/avatars/{user_id}/'
            f'{avatar_hash}.{"gif" if avatar_hash.startswith("a_") else "webp"}'
            f'" alt="{user_name}\'s avatar" class="avatar" width="25px" '
            f'height="25px">{user_name}<span>{user_discrim}</span></img></a>')


def e_http_method(data: tuple[str, str]) -> str:
    method, endpoint = data
    return (f'<b class="endpoint"><span class="endpoint-c"><span class="http-method {method}">'
            f'{method.upper()}</span> {endpoint}</span></b>')


def e_alert_box(data: tuple[str, str]) -> str:
    return f'<span class="{data[0]}">{data[1]}</span>'


STATIC_ELEMENTS = {
    "undoc": '<b class="undoc"><b class="material-icons round">article</b></b>',
    "nobot": '<b class="nobot"><b class="material-icons round">smart_toy</b></b>',
    "iandeploy": '<b class="iandeploy"><b class="material-icons round">rocket_launch</b></b>'
}

DYNAMIC_ELEMENTS = {
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
}

class UnclosedTagError(Exception):
    pass

class Element:
    text: str

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
        next_char = self.text[index : index + 1]
        while next_char != "}":
            element_data += self.text[index]
            index += 1
            next_char = self.text[index : index + 1] 
    
        return index, self.parse_element(element_data)
    
    def scanner(self) -> str:
        f_text = ""
        index = 0
        ignore = False
        while index != len(self.text):
            if self.text[index : index + 3] == "```" or self.text[index : index + 1] == "`":
                ignore = not ignore
            if index == len(self.text) - 1 and ignore and self.text[index : index + 1] != "`":
                raise UnclosedTagError("Unclosed code block")
                    
            if ignore:
                f_text += self.text[index]
            else:
                if self.text[index : index + 3] == "{::":
                    index, element_data = self.scan_element(index + 3)
                    f_text += element_data
                else:
                    f_text += self.text[index]
            index += 1
        
        return f_text
    
    def __call__(self, text: str) -> str:
        self.text = text
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
                chapter["Chapter"]["content"] = self.element(chapter["Chapter"]["content"])


if __name__ == '__main__':
    if len(sys.argv) > 1:
        if sys.argv[1] == "supports":
            sys.exit(0)
    context, book = json.load(sys.stdin)
    Book(book, context)()
    print(json.dumps(book))

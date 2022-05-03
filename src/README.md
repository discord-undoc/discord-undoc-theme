# Discord-Undoc Theme

This is a demo book, only used for the sole pupose of working on the
custom theme of the book.

## How To use

### You need

- Rust
- mdbook
- Python

### Setting up the theme

Start with installing the following python dependencies:

- mistletoe
- httpx
- orjson
- beautifulsoup4

These are required by the preprocessor.\

Next you have to set the `TOKEN` environment variable, this is supposed
to be a Bot token, it is used when fetching information for user badges.

Thats it! You can now start editing the files under `./src` and
use the `mdbook build` & `mdbook serve` commands to help you in the
process of writing the docs.

## Features

- [x] Responsive Design
- [x] Dark/Light Themes
- [x] a11y codeblock colors
- [ ] Support for devices smaller than the width of 332px (lul)

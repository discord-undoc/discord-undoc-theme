# Reference

Currently the preprocessor only works with 5 types of custom elements\
They are:

- Enpoints
- Indicators
- Alert Boxes
- User Badges
- Servers
- Spoilers

<note>

Due to html syntax, elements which do not have a body **must** be closed as
a non-void tag. For example, indicators.

</note>

## Endpoints

There are upto 9 elements which are considered as "endpoint" elements\
They are the 9 methods: `get` `head` `post` `put` `delete` `connect`
`options` `trace` `patch`

```markdown
<get>/some/endpoint</get>

<head>/some/endpoint</head>

<post>/some/endpoint</post>

<put>/some/endpoint</put>

<delete>/some/endpoint</delete>

<connect>/some/endpoint</connect>

<options>/some/endpoint</options>

<trace>/some/endpoint</trace>

<patch>/some/endpoint</patch>
```

## Indicators

These a small little badges that are called "indicators"
they all have a tooltip which say different things.\
There are 3 indicators supported: `undoc` `nobot` `iandeploy`

```markdown
<undoc></undoc>
<nobot></nobot>
<iandeploy></iandeploy>
```

## Alert Boxes

These are those highlighted boxes which are some pieces of text that the
user must read.\
There are 3 types of alert boxes: `note` `info` `warn`

```markdown
<note>This is a random note.</note>
<info>You know what this reminds me of? Blobs!</info>
<warn>┻━┻ ︵ヽ(\`Д´)ﾉ︵﻿ ┻━┻</warn>
```

## User Badges

These are cute looking badges that link to users on discord or github\
You can create one like this:

```markdown
<user id="discord:1234"></user>
<user id="github:ghost"></user>
```

The `id` attribute should be the ID of that user either prefixed with `discord:`
for a discord user or `gitub:` for a github user.

## Servers

Server invite images can be created by:

```markdown
<server id="invite"></server>
```

## Spoilers

Inspired from discord's spoilers, discord-undoc also has spoilers\
They can be defined like so:

```markdown
<spoiler>spoiler'd content</spoiler>
```

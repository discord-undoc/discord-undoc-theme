# Reference

Currently the preprocessor only works with 5 types of custom elements\
They are:

- Enpoints
- Indicators
- Alert Boxes
- User Badges
- Spoilers

## Endpoints

There are upto 9 elements which are considered as "endpoint" elements\
They are the 9 methods: `get` `head` `post` `put` `delete` `connect`
`options` `trace` `patch`

```markdown
<get>/some/endpoint</get>\
<head>/some/endpoint</head>\
<post>/some/endpoint</post>\
<put>/some/endpoint</put>\
<delete>/some/endpoint</delete>\
<connect>/some/endpoint</connect>\
<options>/some/endpoint</options>\
<trace>/some/endpoint</trace>\
<patch>/some/endpoint</patch>
```

## Indicators

These a small little badges that are called "indicators"
they all have a tooltip which say different things.\
There are 3 indicators supported: `undoc` `nobot` `iandeploy`

```markdown
<undoc/>
<nobot/>
<iandeploy/>
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

These are cute looking badges that link to users on discord\
You can create one like this:

```markdown
<user id="1234"/>
```

The `id` attribute should be the ID of that user.

## Spoilers

Inspired from discord's spoilers, discord-undoc also has spoilers\
They can be defined like so:

```markdown
<spoiler>spoiler'd content</spoiler>
```

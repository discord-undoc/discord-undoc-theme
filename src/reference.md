# Reference

## Structure

**Any custom element can be divided into 2 parts**

1. The type
2. The content

{::warn Some elements <b>do not</b> require any content.}

The format is: `{::(TYPE) (CONTENT)}`
- The `TYPE` and the `CONTENT` must be separated by a space (` `)
- Passing in content for an element that doesn't accept any may result in rendering issues!
- Element types are case sensitive.

## Formats and Examples

{::info Custom elements are manually added, hence only the elements listed here work, others will end-up w/ faluty rendering}

User Badge:
- Format: `{::user (USER_ID)}`\
- Example: `{::user 755792681313108018}`
    {::user 755792681313108018}

<br>

HTTP Stuff:
- Format: `{::(get|head|post|put|delete|connect|options|trace|patch) (ENDPOINT)}`
- Exaple: `{::post /auth}` {::post /auth}

<br>

Indicators:
- Format: `{::(undoc|nobot|iandeploy)}`
- Example: `{::iandeploy}` {::iandeploy}

<br>

Alert Boxes:
- Format: `{::(note|info|warn) (CONTENT)}`
- Exaple: `{::note Hi!}` {::note Hi!}

<br>

Accordions:
- Format: `{::(details|details-open) (SUMMARY-optional)<summ>-optional(CONTENT)}`
- Example: `{::details-open Hello}` {::details-open Hello}

Spoilers:
- Format: `{::spoiler (CONTENT)}`
- Example: `{::spoiler this is a spoiler}` {::spoiler this is a spoiler}

## Examples of faulty rendering

`{::undoc hello}` -> {::undoc hello}

`{::note}` -> {::note}

`{::user 1234}` -> *Did not add this because the preprocessor will not accept it.*

`{::trace}` -> {::trace}

Annnnnnnnnnnnnnnnnnnnnnnnnnnnd many more cases.................

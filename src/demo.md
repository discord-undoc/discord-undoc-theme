# Custom Elements

{::note Check out [./reference.md](./reference.md) for more info.}

### User Badges

User: {::user arHSM#5682-841509053422632990-06909e938b7a97344ba99498bbc5e9e6}\
User (animated avatar): {::user Rydix#1726-755792681313108018-a_90be0df51f8cf7dc36bec9cb1ad1459c}

### HTTP Stuff

{::get /some/endpoint}\
{::head /some/endpoint}\
{::post /some/endpoint}\
{::put /some/endpoint}\
{::delete /some/endpoint}\
{::connect /some/endpoint}\
{::options /some/endpoint}\
{::trace /some/endpoint}\
{::patch /some/endpoint}

### Indicators

Undocumented: {::undoc}\
Not for bots: {::nobot}\
Ian Deploy™: {::iandeploy}

### Alert boxes

a11y checked ofc.

{::note This is a random note.}
{::info You know what this reminds me of? Blobs!}
{::warn ┻━┻ ︵ヽ(\`Д´)ﾉ︵﻿ ┻━┻}

### Accordions

{::details 
The quick brown fox jumps over the lazy dog<summ>
Hello
}

{::details-open 
You can also make it be open by default
{::details-open Nesting? No problem!}
}

{::details 
**components.json**<summ>

{::details 
{::get }<summ>
```json
{
    "page": {
        "id": "srhpyqt94yxb",
        "name": "Discord",
        "url": "https://discordstatus.com",
        "time_zone": "America/Tijuana",
        "updated_at": "2022-02-15T13:37:37.407-08:00"
    },
    "components": [
        {
            "id": "rhznvxg4v7yh",
            "name": "API",
            "status": "operational",
            "created_at": "2015-07-30T18:55:43.739-07:00",
            "updated_at": "2022-02-15T13:21:55.150-08:00",
            "position": 1,
            "description": "The API is responsible for sending and receiving messages, and general operations on the platform. If this is down, chances are you'll have trouble connecting and/or sending messages.",
            "showcase": true,
            "start_date": null,
            "group_id": null,
            "page_id": "srhpyqt94yxb",
            "group": false,
            "only_show_if_degraded": false
        }
    ]
}
```
}
}

## Spoilers

Lorem ipsum dolor sit amet, consectetur adipiscing {::spoiler something} elit. Sed turpis erat, tempor a vehicula a, ullamcorper vel augue. Vivamus eget elementum ex, ullamcorper interdum neque. {::spoiler stuff}

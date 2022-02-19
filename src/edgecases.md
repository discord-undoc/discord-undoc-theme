# Testing Cases

{::info These are just tests and very rare to occur in reality}

<br>

`{::get /some/endpoint {::undoc}}` - works\
{::get /some/endpoint {::undoc}}

<br>

`{::note hello {::details-open hello}}` - works\
{::note hello {::details-open hello}}

<br>

`{::user arHSM#5682-841509053422632990-06909e938b7a97344ba99498bbc5e9e6 {::undoc}}` - indicator not displaying\
{::user arHSM#5682-841509053422632990-06909e938b7a97344ba99498bbc5e9e6 {::undoc}}

<br>

`{::note hi {::info hrm {::warn wha}}}` - works but a11y go brrrrr\
{::note hi {::info hrm {::warn wha}}}

<br>

`{::undoc {::nobot}}` - faulty rendering\
{::undoc {::nobot}}

<br>

````markdown
{::details 
**something** *and something*<summ>
```json
{
    "hello": "world"
}
```
}
````

{::details 
**something** *and something*<summ>
```json
{
    "hello": "world"
}
```
}

<br>
<br>

And I'm too lazy to think of more weird cases, so lets call it a day!

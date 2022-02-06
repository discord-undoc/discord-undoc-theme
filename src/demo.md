# Testing stuff

## Custom elements

**User Badge thingy**

User: <a class="user" id="841509053422632990 06909e938b7a97344ba99498bbc5e9e6">arHSM#5682</a>\
User (animated avatar): <a class="user" id="755792681313108018 a_90be0df51f8cf7dc36bec9cb1ad1459c">Rydix#1726</a>

**Indicators <b class="iandeploy"></b>**

Undocumented: <b class="undoc"></b>\
Not for bots: <b class="nobot"></b>\
Ian Deploy™: <b class="iandeploy"></b>

**Alert boxes**

a11y checked ofc.

<span class="note">Note</span>
<span class="info">Info</span>
<span class="warn">Warning</span>

## Code stuff

**Hl.js w/ custom a11y colors**

```js
var var1 = "This is Awesome";
var var2 = 12345;
document.innerHTML("Just to show Theme Colors...");

function Vector(x, y) {
    this.x = x || 0;
    this.y = y || 0;
}

Vector.prototype.add = function(vector) {
    this.x += vector.x;
    this.y += vector.y;
}
  
Vector.prototype.getMagnitude = function () {
    return Math.sqrt(this.x * this.x + this.y * this.y);
};

Vector.prototype.getAngle = function () {
    return Math.atan2(this.y,this.x);
};

Vector.fromAngle = function (angle, magnitude) {
    return new Vector(magnitude * Math.cos(angle), magnitude * Math.sin(angle));
};

function Emitter(point, velocity, spread) {
    this.position = point; // Vector
    this.velocity = velocity; // Vector
    this.spread = spread || Math.PI /* /16 */; // possible angles = velocity +/- spread
    this.drawColor = "#999"; // So we can tell them apart from Fields later
}
```

**Inline code**

I added preloading `<link rel="preload" href="style.css" as="style">` and gained 1% performance! Read more at [`developer.mozilla.org`](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types/preload)\
TBH I personally don't care about performance, but that sweet sweet green `100%` is
way more important than me caring or not.

## Markdown Tests

**HEADINGS**

### A heading 

Some text.

#### A smaller heading 

More text.

**LISTS**

* milk
* eggs
* butter

1. carrots
1. celery
1. radishes

**LINKS**

Use [mdBook](https://github.com/rust-lang/mdBook). 

Read about [mdBook](mdBook.md).

A bare url: <https://www.rust-lang.org>.

**IMAGES**

![Y O N E](https://media.discordapp.net/stickers/938674190427516928.webp)

**EXTENSIONS**

**Strikethrough:**\
An example of ~~strikethrough text~~.

**Blockquotes:**\
> "OH SHIT"
> > nested!!!
> > > wait more nesting????\
> 
> nah, it looks ugly

**Footnote:**\
This is an example of a footnote[^note].\
[^note]: This text is the contents of the footnote, which will be rendered
    towards the bottom.

**Table**:

| Header1 | Header2 | Header 3| Header 4|
|---------|---------|---------|---------|
| foo     | bar     | `baz`   | i forgot|
| foo     | bar     | `baz`   | i forgot|
| foo     | bar     | `baz`   | i forgot|
| foo     | bar     | `baz`   | i forgot|

**Task List:**
- [x] Complete task
- [ ] Incomplete task

**Smart Punctuation:**\
`=>` => '=>'\
`--`  => --\
`---` => ---\
`...` => ...\
`" "` => "wha"\
`' '` => 'wha'

# Markdown Demo

## Code Block

**Prism w/ custom a11y colors**
{::info Most colors in light mode do not meet `WCAG AAA` requirements but they do comply with `WCAG AA`}

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

```json
{
  "code": 50035,
  "errors": {
    "activities": {
      "0": {
        "platform": {
          "_errors": [
            {
              "code": "BASE_TYPE_CHOICES",
              "message": "Value must be one of ('desktop', 'android', 'ios')."
            }
          ]
        },
        "type": {
          "_errors": [
            {
              "code": "BASE_TYPE_CHOICES",
              "message": "Value must be one of (0, 1, 2, 3, 4, 5)."
            }
          ]
        }
      }
    }
  },
  "message": "Invalid Form Body"
}
```

```py
def foo(bar: tuple[int, str]) -> str:
  return bar[1]
```

## Inline Code

Here, have a `429 - Too many cats`\
<https://http.cat/429> or [`429`](https://http.cat/429)

## Text and Paragraphs

```md
Here is a line of text.

This is a new line.
```

Here is a line of text.

This is a new line.

## Headings

```md
### A heading 

Some text.

#### A smaller heading 

More text.
```

### A heading 

Some text.

#### A smaller heading 

More text.

## Lists

```md
Unordered
* milk
* eggs
* butter

Ordered
1. carrots
1. celery
1. radishes
```

Unordered
* milk
* eggs
* butter

Ordered
1. carrots
1. celery
2. radishes

## Links

```md
Use [mdBook](https://github.com/rust-lang/mdBook). 

Read about [mdBook](mdBook.md).

A bare url: <https://www.rust-lang.org>.
```

Use [mdBook](https://github.com/rust-lang/mdBook). 

Read about [mdBook](mdBook.md).

A bare url: <https://www.rust-lang.org>.

## Images

`![TWICE](https://upload.wikimedia.org/wikipedia/commons/f/f4/180717_열린음악회_트와이스_02.jpg)`

![TWICE](https://upload.wikimedia.org/wikipedia/commons/f/f4/180717_열린음악회_트와이스_02.jpg)

## Videos

```html
<video controls>
  <source src="https://globalv-rmcnmv.akamaized.net/c/read/v2/VOD_ALPHA/global_v_2021_11_12_370/2898752b-4374-11ec-8fb5-246e96398ca5.mp4?__gda__=1644768116_12acbd46bcf3ef3e55bb525567bacaac" type="video/mp4">
</video>
```
<video controls>
  <source src="https://globalv-rmcnmv.akamaized.net/c/read/v2/VOD_ALPHA/global_v_2021_11_12_370/2898752b-4374-11ec-8fb5-246e96398ca5.mp4?__gda__=1644768116_12acbd46bcf3ef3e55bb525567bacaac" type="video/mp4">
</video>


## Strikethrough

`An example of ~~strikethrough text~~.`

An example of ~~strikethrough text~~.

## Footnotes 

```md
This is an example of a footnote[^note].

[^note]: This text is the contents of the footnote, which will be rendered
    towards the bottom.
```

This is an example of a footnote[^note].

[^note]: This text is the contents of the footnote, which will be rendered
    towards the bottom.

## Tables

```md
| Syntax      | Description | Test Text     |
| :---        |    :----:   |          ---: |
| Header      | Title       | Here's this   |
| Paragraph   | Text        | And more      |
```

| Syntax      | Description | Test Text     |
| :---        |    :----:   |          ---: |
| Header      | Title       | Here's this   |
| Paragraph   | Text        | And more      |

## Task Lists

```md
TODO:
- [x] Complete task
- [ ] Incomplete task
```

TODO:
- [x] Complete task
- [ ] Incomplete task

## Blockquotes

```
> Hi 👋🏻
> > Blockquotes can be nested!!!!
> > > To any possible amount
>
> But, they start to look ugly
```

> Hi 👋🏻
> > Blockquotes can be nested!!!!
> > > To any possible amount
>
> But, they start to look ugly

# elioSin Abstract
**elioSin** is an unholy trinity of open sourced modules which implement, and demo, _patterns_ for rapidly building workable CSS stylesheets that target tagNames, rather than classNames.
We're creating stylesheets that only mention tagNames. That's all! Carry on.
- No divs.
- No class names.
- No rows and columns of nested tags.
- Just normal tags,
  - added directly under `body`,
  - the way **god** intended.
**elioSin** - to which this abstract relates - does little more than curate, document, and otherwise "host" its child modules **generator-sin** , **god** , **eve** and **adon** - by way of providing the folder name "elioSin" to parent them.
The modules **god** , **eve** and **adon** could easily be combined. By keeping them as separate modules it clarifies certain facts:
1. The three modules represent _patterns_ not features. You could just as easily look at the source code and implement your own version. I offer these _patterns_ as an extended "gist" you may harvest as you wish. I stole my genius from other people anyway.
2. Separated, their individual _patterns_ are clear. Metaphorically, the names **god** , **eve** and **adon** are themselves a well-known pattern which will help you organise their purpose in your mind.
3. Separate, they are optional, assuming you have the settings file in each.
**elioSin** is old school, and bemoans the thoughtless use of HTML tagNames, bypassed for the sake of classNames.
**elioSin** asks: Why do I need to nest my `h1` tag, for instance, so deeply in so many `div` tags? Why do I need to nest my `nav` tag 3 deep inside a collection of `div` tags with classes like `.mainNav` and `.mainNavLeft`. When... oh when... oh when... oh when... do we ever need to use the className `.form` especially for the tagName `form`; or the className `.table` for a `table`?
**elioSin** thinks we've lost our minds!
It is the considered opinion of **elioSin** that `body>X` in a stylesheet embodies everything you'd need to know about how to style `X`:
Simplistically, **elioSin** generated stylesheets look like this:
```scss
body>h1 { // style }
body>nav { // style }
body>menu { // style }
body>footer { // style }
body>p { // style }
```
## More
- [god Abstract](https://gitlab.com/eliosin/god/blob/master/doc/abstract.md)
- [eve Abstract](https://gitlab.com/eliosin/eve/blob/master/doc/abstract.md)
- [adon Abstract](https://gitlab.com/eliosin/adon/blob/master/doc/abstract.md)
- [elioSin Index](index.md)

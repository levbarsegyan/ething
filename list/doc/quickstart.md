# Quickstart toothpaste
## Prerequisites
- **toothpaste** understood [No!](https://elioway.gitlab.io/eliosin/toothpaste/index.html)
- [Check the Demo](demo.html)
- **elioSin** prerequisites met? [No!](https://elioway.gitlab.io/eliosin/installing.html)
- Installed **toothpaste** ? [No](https://elioway.gitlab.io/eliosin/toothpaste/installing.html)
- You completed **god** Quickstart [No!](https://elioway.gitlab.io/eliosin/god/quickstart.html)
- You created a new **elioSin** theme called `genesis`.
- You're currently running `gulp` in its root folder and can see the page.
## TLDR Checklist
- add a setting for `$tag-toothpaste` with a list of tags from heaven and hell.
- import the `tag_toothpaste` mixin from this app.
- call the tag_toothpaste mixin inside your container.
## Exercise 1: Adding toothpaste to a theme
Open your `stylesheets/settings.scss` in **genesis** and add a new setting, for instance, in the following example, `nav` with also be positioned in _hell_, `h6` will always be positioned in _heaven_, while `aside`, `blockquote`, `figure` will alternate.
```scss
// stylesheets/settings.scss
$heaven: (blockquote, h6, summary); // hangs right - gets the best views.
$hell: (nav, aside, details); // hangs left.
// Added by you
$tag_toothpaste: (aside, blockquote, details, summary);
```
- Open `stylesheets/theme.scss`
- At the top import the `tag_toothpaste` mixin.
```scss
@import './node_modules/@elioway/toothpaste/stylesheets/mixins/tag_toothpaste': ;
```
Call the mixin at the bottom of the `#{$container}` selector:
```scss
#{$container} {
  ...
  @include tag_toothpaste($tag_toothpaste);
}
```
### What we learnt
1. How to install **toothpaste**.
2. Understanding what we don't add to toothpaste is as important as what we do.
## Tidy up
- Press `CTRL` and `C` to stop the browser.
- Type `yarn format` to make your work `prettier`.
- Type `yarn test`.
## Next
You are ready to use **toothpaste**.

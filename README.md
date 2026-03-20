# slidev-theme-excali-slide

[![NPM version](https://img.shields.io/npm/v/slidev-theme-excali-slide?color=3AB9D4&label=)](https://www.npmjs.com/package/slidev-theme-excali-slide)

A [Excalidraw](https://excalidraw.com/)-like theme for [Slidev](https://github.com/slidevjs/slidev).

![Default Slide](./images/default_slide.png)
![Intro Slide](./images/intro_slide.png)

Theme works in dark mode too. In this case, the highlight color have the opacity set to 0.9.

![Default Slide Dark](./images/default_slide_dark.png)
![Intro Slide Dark](./images/intro_slide_dark.png)

Theme comes with animated heading highlights. You can customize their colors by setting up following properties:

<pre><code>---
themeConfig:
  primary-highlight: '#F3EFF5'
  secondary-highlight: '#161C2C'
  marker-animation: disabled; // optional
---</code></pre>




## Handwritten Text

The theme includes a `v-draw` directive that animates text with a handwriting effect using the Virgil font.

![Handwritten Text](./images/handdrawn.gif)

```html
<div v-draw>Hello World</div>

<!-- Font size and text alignment are inherited from the element's CSS -->
<div class="text-4xl text-center" v-draw="{ color: '#ff657a', duration: 3000 }">Custom text</div>
```

Available options:

| Option | Default | Description |
| --- | --- | --- |
| `strokeWidth` | `2` | Stroke width |
| `color` | `currentColor` | Text color |
| `duration` | `2000` | Animation duration in ms |
| `delay` | `0` | Animation delay in ms |

The directive also works with `v-click` — the animation will play when the element is revealed.

## Install

Add the following frontmatter to your `slides.md`. Start Slidev then it will prompt you to install the theme automatically.

<pre><code>---
theme: <b>excali-slide</b>
---</code></pre>


Learn more about [how to use a theme](https://sli.dev/guide/theme-addon#use-theme).

## Contributing

- `npm install`
- `npm run dev` to start theme preview of `example.md`
- Edit the `example.md` and style to see the changes
- `npm run export` to generate the preview PDF
- `npm run screenshot` to generate the preview PNG

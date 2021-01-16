# CSS Houdini Bullet

![css-houdini-bullet-sample](https://user-images.githubusercontent.com/46778114/104809195-b4f7c580-57eb-11eb-95de-8fe3ad75594c.gif)

A CSS Houdini Worklet to paint "bullet holes".

## Getting started

### 1. Load the worklet

Using CDN is the easiest way to add the library:

```js
if ("paintWorklet" in CSS) {
  CSS.paintWorklet.addModule(
    "https://unpkg.com/css-houdini-bullet/public/worklet.js"
  );
}
```

#### You can use the polyfill

To add support for all moder browsers, you can load the worklet with [css-paint-polyfill](https://github.com/GoogleChromeLabs/css-paint-polyfill) fallback.

```html
<script>
  (async function () {
    if (CSS["paintWorklet"] === undefined)
      await import("https://unpkg.com/css-paint-polyfill");

    CSS.paintWorklet.addModule(
      "https://unpkg.com/css-houdini-bullet/public/worklet.js"
    );
  })();
</script>
```

### 2. Ready to use it in your CSS!

To use the **Bullet** worklet you need to define some custom properties with values and add the value `paint(bullet)` on the `background` property.

```css
.element {
  --bullet-bg: #3112c9, #12c99b;
  --bullet-items: 3;
  --bullet-type: 5;
  --bullet-curve: 0.5;
  --bullet-size: 10, 25;
  --bullet-border: 15;
  background: paint(tesla-coil);
}
```

| Property        | Default   | Description                                                                                |
| --------------- | --------- | ------------------------------------------------------------------------------------------ |
| --bullet-bg     | `#1a2a6c` | Define the background color of the element, multiple colors can be used `#color1, #color2` |
| --bullet-items  | `10`      | Define the number of "holes"                                                               |
| --bullet-type   | `0`       | Define the type of "hole" `0 = Circles`, `1 = Hearts`, `n > 2 = Polygons of n points`      |
| --bullet-curve  | `0.5`     | Define the shorter radius of the `Polygons` (max value 1)                                  |
| --bullet-size   | `10`      | Define the size of the "hole"                                                              |
| --bullet-border | `0`       | Define the space from the border                                                           |

## Development

Run it locally!

```
yarn
yarn start
```

## License

MIT License

Copyright (c) 2021 Edalgrin

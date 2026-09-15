# Presentation integration

`presentation-integration.html` is a self-contained reference host for the two proposal-slide actions:

- **View dashboard** opens the command center in a full-window overlay.
- **Launch dashboard** opens the same deep-linked view in a separate 1920 × 1080 browser window.

The dashboard accepts these optional query parameters and works with relative `file:///` paths:

| Parameter | Supported values | Example |
| --- | --- | --- |
| `presentation` | `1` | `presentation=1` |
| `module` | Any of the 15 module IDs | `module=digital-twin` |
| `user` | Any demo identity ID | `user=noura` |
| `lang` | `en`, `ar` | `lang=ar` |
| `theme` | `dark`, `light` | `theme=dark` |
| `font` | `large`, `medium`, `small` | `font=large` |

Example:

```text
index.html?presentation=1&module=digital-twin&user=noura&lang=en&theme=dark&font=large
```

## JavaScript API

After the `acc:ready` event, the host page can use `window.ACC_PRESENTATION_API`:

```js
ACC_PRESENTATION_API.open({
  module: "digital-twin",
  user: "noura",
  lang: "en",
  theme: "dark",
  fontSize: "large",
  fullscreenMap: false
});

ACC_PRESENTATION_API.guide();
ACC_PRESENTATION_API.state();
ACC_PRESENTATION_API.reset();
```

An iframe or opener can send the same allow-listed actions with `postMessage`:

```js
dashboardFrame.contentWindow.postMessage({
  type: "ACC_PRESENTATION",
  action: "open",
  requestId: "slide-10-digital-twin",
  options: { module: "digital-twin", user: "noura" }
}, "*");
```

The dashboard announces readiness with `ACC_PRESENTATION_READY` and answers requests with `ACC_PRESENTATION_RESPONSE`. Only messages from its parent frame or opener are accepted. No operational data or credentials are transmitted.

Place the background music file here:

```
public/audio/background-music.mp3
```

The Music Player button is always rendered, but starts in a disabled
"waiting for audio" state until this file exists. Don't rename it.

Notes:
- The player is OFF by default and never autoplays before interaction.
- Your preference and volume are remembered in the browser (localStorage).
- If the file is missing, the site still builds and runs perfectly — the
  player simply hides its controls until the file is added.
- Keep the file reasonably small (a few MB) for fast loading; it is streamed
  via the browser, not downloaded eagerly.
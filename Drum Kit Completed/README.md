# Drum Kit

A small browser drum kit with seven sound pads, mouse controls, keyboard shortcuts (`W`, `A`, `S`, `D`, `J`, `K`, `L`), and pressed-button feedback.

## Run

Serve this folder with a static web server, or open `index.html` in a modern browser. No build or API key is required.

## Files

- `index.html` — drum-pad markup.
- `styles.css` — layout and pad styling.
- `index.js` — click/keyboard events and audio playback.
- `images/`, `sounds/` — pad artwork and audio clips.

## Known limitations

Keyboard handling should ignore unrelated keys and avoid errors when a matching button is unavailable. Add focus styles and responsive sizing for mobile and keyboard users.

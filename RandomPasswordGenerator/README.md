# Random Password Generator

A browser demo that generates a random password or modifies text entered in its password field.

## Run

Serve this folder as a static site or open `index.html` in a browser. No build or API key is required.

## Files

- `index.html` — password field and controls.
- `style.css` — layout.
- `script.js` — generation and clipboard behavior.
- `current.png`, `download.png` — button artwork.

## Security note

The current generator uses `Math.random()`, which is not suitable for security-sensitive credentials. Replace it with `crypto.getRandomValues()` and add length/character-set controls before presenting it as a secure password tool.

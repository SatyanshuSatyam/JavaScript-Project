# To-do List

A small task list with add, complete, delete, and browser `localStorage` persistence.

## Run

Serve this folder as a static site or open `index.html` in a browser. No build, API key, or database is required.

## Files

- `index.html` — task input and list.
- `style.css` — list and completion styles.
- `script.js` — task interactions and local persistence.
- `image/` — checked/unchecked and app icons.

## Known limitations

Task rendering currently uses `innerHTML`; use safe DOM construction and store structured task data before accepting untrusted text.

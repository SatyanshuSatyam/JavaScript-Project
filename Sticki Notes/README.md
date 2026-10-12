# Sticky Notes

A minimal notes interface for entering a title and body and removing notes.

## Run

Serve this folder as a static site or open `index.html` in a browser. No build, API key, or database is required.

## Files

- `index.html` — note entry form and list.
- `style.css` — note layout.
- `script.js` — add/delete behavior.

## Known limitations

Notes are not persisted. User input is interpolated into `innerHTML`, creating an injection risk; render with `textContent` and explicit DOM nodes before storing or sharing notes.

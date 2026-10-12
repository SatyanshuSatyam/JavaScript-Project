# Green Screen Video Processing

A browser experiment that uses webcam video and canvas pixel processing to remove a selected screen color, apply visual effects, and replace the background.

## Run

Serve this folder over `localhost` or HTTPS, open `index.html`, and grant camera permission. No package installation or API key is required. Webcam access may be blocked when the page is opened directly as a `file://` URL.

## Files

- `index.html` — video/canvas surfaces and controls.
- `style.css` — responsive layout.
- `index.js` — camera capture, chroma-key processing, and background/effect handling.

## Features

- Webcam capture and canvas-based chroma key.
- Green, blue, or red screen selection with adjustable thresholds.
- Background image/video upload, preset backgrounds, and image effects.
- Responsive control layout.

## Limitations

Camera access requires a secure context and permission. Check performance on lower-powered devices and verify preset assets before relying on them. Close media tracks and revoke object URLs when media changes. No automated tests or screenshots are included yet.

# QR Code Generator

A text/URL-to-QR interface that requests an image from the external QRServer service.

## Run

Serve this folder as a static site or open `index.html` in a browser. Network access is required; no build or API key is currently required.

## Files

- `index.html` — input, QR display, and inline request code.
- `style.css` — intended styles; link the stylesheet from the HTML to apply it.

## Privacy note

The entered value is sent to a third-party QR service. Do not submit private or sensitive text. Add input validation and request-error feedback.

# City Weather

A city-search weather interface using the OpenWeatherMap current-weather endpoint.

## Run

1. Copy `config.example.js` to `config.js`.
2. Set `window.APP_CONFIG.openWeatherApiKey` in `config.js` to a newly issued OpenWeatherMap key.
3. Serve this folder over HTTP and open `index.html`.

`config.js` is ignored by the repository root. Browser-delivered keys are visible to visitors, so use provider restrictions or a server-side proxy for public production deployment.

## Files

- `index.html` — interface and inline weather request code.
- `style.css` — card layout.
- `image/` — weather icons.
- `config.example.js` — safe local configuration template.

## Known limitations

The current weather display and error handling have defects documented in the root `QUALITY_REVIEW.md`; treat this as a learning demo until fixed.

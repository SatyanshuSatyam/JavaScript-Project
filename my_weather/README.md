# Location Weather Forecast

A browser weather forecast demo that reads the user's location and requests forecast data from OpenWeatherMap.

## Run

1. Copy `config.example.js` to `config.js`.
2. Set `window.APP_CONFIG.openWeatherApiKey` in `config.js` to a newly issued key.
3. Serve this folder on `localhost` or HTTPS, allow location permission, and open `index.html`.

`config.js` is ignored by the repository root. A key used in browser code is visible to visitors; use provider restrictions or a server-side proxy for production.

## Files

- `index.html`, `style.css`, `script.js` — application structure, styling, and behavior.
- `config.example.js` — safe local configuration template.
- Moment.js is loaded from a CDN.

## Known limitations

The API and geolocation flows need complete error handling and response validation. Provider endpoint availability and account support may vary; see the root `QUALITY_REVIEW.md`.

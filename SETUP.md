# Setup Guide

## Prerequisites

- A modern browser.
- Git, if cloning the repository.
- Python 3 or the VS Code Live Server extension for a local static server. Webcam and geolocation access require `localhost` or HTTPS.
- OpenWeatherMap account/API key only for the two weather demos.

No npm packages, Java runtime, database, or backend service are required by the current project.

## Installation Steps

1. Resolve the nested `.git` directories in `Drum Kit Completed/`, `GreenScreen Project/`, `my_weather/`, `portfolio/`, `RandomPasswordGenerator/`, `Sticki Notes/`, `To-do List/`, and `URLink To QR Code Generator/` before treating this as a single repository. Preserve their history or intentionally manage them as separate repositories/submodules; do not accidentally add them as embedded repositories.
2. Clone/download the collection.
3. (Optional, weather demos) Copy `weather app/config.example.js` to `weather app/config.js`, and `my_weather/config.example.js` to `my_weather/config.js`. Enter a newly issued OpenWeatherMap key in each local file. The actual `config.js` files are ignored by Git.
4. Review portfolio photos and the CV PDF before publishing them.

## Database Setup

No database is used. The to-do list uses browser `localStorage`; the Notes demo currently does not persist notes.

## Environment Variables / API Configuration

There is no `.env` file loader. Weather app configuration is browser-side JavaScript at `window.APP_CONFIG.openWeatherApiKey`. Never commit a real key. Browser-side keys are visible to visitors; use provider-side restrictions and a backend proxy for production.

The quote demo references API Ninjas but does not currently configure the API key required by that service. The QR demo forwards entered text to QRServer; avoid submitting private data.

## Running the Application

From the repository root:

```powershell
py -m http.server 8000
```

Visit `http://localhost:8000/` for the project gallery. To run one demo directly, open its directory path in the browser, or serve that directory as the web root.

For the GreenScreen webcam app, use `localhost` or HTTPS, allow camera permission, and ensure a camera is available. Weather-by-location requires location permission. City lookup and other external API demos require network access.

## Troubleshooting

- **A project is missing after cloning:** check whether its folder was committed as a nested Git repository/gitlink; see the installation warning above.
- **Weather says unauthorized or fails:** create the local `config.js`, use a valid key, verify the provider account/API plan, and check browser developer tools. Rotate any key previously committed or shared.
- **Weather-by-location shows no data:** allow geolocation and use `localhost`/HTTPS; the provider endpoint/account may also need adjustment.
- **Webcam is unavailable:** use a supported browser on `localhost` or HTTPS and grant camera access.
- **A demo's API content does not load:** verify network access and the third-party service's current authentication and response format.
- **Styles or images are missing:** serve the collection from its root and check case-sensitive paths; hosting platforms may treat filenames differently.
- **Port 8000 is in use:** choose another port, for example `py -m http.server 8080`.

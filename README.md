# JavaScript Project Collection

## Description

A collection of 15 small, independent browser projects built while learning web development. The examples cover interactive interfaces, DOM events, browser storage, media APIs, and third-party web APIs. Each project is a plain HTML/CSS/JavaScript app; there is no shared backend or build system.

**GitHub repository description (under 150 characters):** A collection of beginner-friendly vanilla JavaScript projects and interactive browser demos.

**Short description:** Fifteen standalone HTML, CSS, and JavaScript learning projects.

**Long description:** This repository brings together interactive browser experiments and beginner portfolio pages.  
Explore small examples such as a drum kit, calculators, a to-do list, notes, a QR generator, and weather demos.  
The projects use browser APIs and a few public third-party services; no package installation is needed for the local demos.  
Some projects are works in progress and have known limitations documented in [QUALITY_REVIEW.md](./QUALITY_REVIEW.md).

> **Before publishing:** Eight project folders already contain their own `.git` repository metadata: `Drum Kit Completed/`, `GreenScreen Project/`, `my_weather/`, `portfolio/`, `RandomPasswordGenerator/`, `Sticki Notes/`, `To-do List/`, and `URLink To QR Code Generator/`. Resolve those nested repositories before adding this collection as one GitHub repository; otherwise Git may record them as embedded repositories/gitlinks instead of including their files. Preserve their history if it matters. Also review the portfolio photo and CV PDF to confirm that you own them and want them public. Rotate the previously embedded weather API keys before use; they have been removed from the source files.

## Features

- Drum kit with mouse and keyboard controls.
- Personal portfolio and landing-page layouts.
- Two weather demos (city lookup and location-based forecast).
- To-do list with browser local storage.
- Password generator and two calculator exercises.
- Notes interface, quote viewer, QR code generator, and green-screen canvas demo.
- Spotify-inspired music player with track switching and dynamically updated art.
- Ping Pong arcade game with keyboard controls, score tracking, and reset logic.

Feature completeness varies. The weather, quote, QR, and webcam demos depend on third-party services or browser permissions.

## Tech Stack

- HTML5, CSS3, and vanilla JavaScript (ES6+).
- Browser APIs: DOM, local storage, geolocation, webcam/media devices, canvas, audio, and clipboard.
- External services/libraries used by individual demos: OpenWeatherMap, API Ninjas, QRServer, Moment.js, and Google Fonts.
- No framework, server-side runtime, database, dependency manifest, or test suite is currently present.

## Project Structure

```text
.
├── index.html                         # Project gallery for local use and GitHub Pages
├── README.md                          # Repository overview and quick start
├── SETUP.md                           # Detailed setup and troubleshooting
├── DEPLOYMENT.md                      # Static hosting instructions
├── QUALITY_REVIEW.md                  # Findings and recommended improvements
├── HISTORY_REPORT.md                  # Historical evidence and migration plan
├── scripts/                           # Safe current-dated snapshot publication scripts
├── .github/workflows/                 # CI checks and GitHub Pages deployment
├── Drum Kit Completed/                # Keyboard/click drum kit
├── GreenScreen Project/               # Webcam chroma-key canvas experiment (README.md)
├── PracticeJS/                        # Calculator exercise
├── PingPong-20260122T052916Z-1-001/   # Ping Pong game (original folder name retained)
├── QuoteForTheDay/                    # Quote API experiment
├── RandomPasswordGenerator/           # Password generator
├── Spotify-20260122T052743Z-1-001/    # Spotify-inspired music player (original folder name retained)
├── Sticki Notes/                      # Notes UI
├── To-do List/                        # Local-storage task list
├── URLink To QR Code Generator/       # QR code service client
├── calculator/                        # Calculator exercise
├── landing/                           # Landing-page design
├── my_weather/                        # Geolocation weather forecast
├── portfolio/                         # Personal portfolio
└── weather app/                       # City weather lookup
```

Each project directory contains its own `README.md` with its entry point and setup notes. Serve the repository root to use the gallery, or serve an individual project folder to open that demo directly.

The original directory names are intentionally preserved for compatibility with existing links and relative asset paths. The two imported projects are nested one level deeper than the other demos; the gallery links directly to their entry pages.

## Installation

1. Install a current browser. Use a local static server for webcam/geolocation demos.
2. Clone or download the repository after resolving the nested Git repositories noted above.
3. Follow [SETUP.md](./SETUP.md). Most demos need no package installation.
4. For the weather demos, create local `config.js` files from their tracked `config.example.js` templates and supply a newly issued OpenWeatherMap key. `config.js` is ignored by Git.

## Usage

Start a local server from the repository root, for example with Python:

```powershell
py -m http.server 8000
```

Open `http://localhost:8000/` to view the project gallery. Alternatively, serve a project folder and open its `index.html`. The GreenScreen webcam demo requires a secure context such as `localhost` and permission to use the camera.

## Screenshots

Screenshots are not currently included. Add images under a `screenshots/` directory and link them here when available.

## Gallery

Open the [project gallery](./index.html) to browse all 15 demos. The gallery is a static page and requires no build step.

## API Endpoints

| Project | Service / endpoint | Notes |
| --- | --- | --- |
| `weather app/` | `GET https://api.openweathermap.org/data/2.5/weather` | City search; requires a locally configured API key. |
| `my_weather/` | `GET https://api.openweathermap.org/data/2.5/onecall` | Uses browser geolocation and a locally configured API key; account/API-plan support may vary. |
| `QuoteForTheDay/` | `GET https://api.api-ninjas.com/v1/quotes` | Current integration has no configured API key and needs response-shape/error handling. |
| `URLink To QR Code Generator/` | `https://api.qrserver.com/v1/create-qr-code/` | Sends the entered text to a third-party service; do not submit sensitive content. |

The other demos do not expose an API endpoint.

## Environment Variables

There are no server-side environment variables or `.env` loader in this static project. The two weather demos use a local browser configuration file:

- `weather app/config.js`
- `my_weather/config.js`

Create each by copying its `config.example.js` and setting `window.APP_CONFIG.openWeatherApiKey`. Do not commit a real key. A browser-delivered API key is visible to visitors even when the config file is untracked; for public production use, use provider restrictions and a server-side proxy rather than treating a client key as secret.

## Future Improvements

- Fix the documented defects in `QUALITY_REVIEW.md` and add automated tests.
- Replace unsafe `eval()` and user-content `innerHTML` usage.
- Add robust loading, empty, permission-denied, and API-error states.
- Make every app responsive and accessible; replace placeholder links and content.
- Add screenshots, consistent naming, and a portfolio gallery with live demos.
- Add linting/formatting after choosing a project-wide tooling approach.

## Learning Outcomes

- Structuring small browser applications with HTML, CSS, and JavaScript.
- Handling DOM events, forms, and local storage.
- Working with `fetch`, media devices, canvas, geolocation, audio, and clipboard APIs.
- Practicing responsive layouts and integrating external services.

## Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](./CONTRIBUTING.md), keep changes scoped to one demo where possible, and describe how you tested the change.

## License

This collection is licensed under the [MIT License](./LICENSE). Review ownership and third-party asset licensing before redistributing the portfolio assets or external resources.

## Author

Satyanshu Satyam (the name shown in the existing portfolio page). Confirm that this attribution is correct before publishing.

## GitHub Topics

`javascript`, `vanilla-javascript`, `html`, `css`, `beginner-projects`, `web-development`, `frontend`, `learning-project`, `portfolio`, `weather-app`, `calculator`, `todo-list`, `password-generator`, `web-api`, `canvas-api`, `github-pages`

## Project Maturity

| Area | Status | Notes |
| --- | --- | --- |
| Documentation | ✅ Completed | Repository guides and per-project READMEs added. |
| Testing | ⚠️ Needs Improvement | CI checks JavaScript syntax and required project files; no behavioral tests exist. |
| Build Configuration | ⚠️ Needs Improvement | No build is required, but no package/tooling manifest is defined. |
| Security | ⚠️ Needs Improvement | Embedded keys were removed from current source; rotate them and address unsafe DOM/evaluation patterns. |
| CI/CD | ✅ Completed | GitHub Actions syntax checks and Pages deployment workflows added. |
| Deployment | ⚠️ Needs Improvement | Static deployment is configured, but external API keys and unfinished demos need attention. |
| License | ✅ Completed | MIT license added; confirm asset ownership before distribution. |

## Beginner Portfolio Improvements

- **Features:** add input validation, keyboard support, persistent notes, and meaningful empty/error states.
- **UI:** improve responsive layouts, contrast, focus indicators, and mobile navigation; replace placeholders with real project descriptions and screenshots.
- **Backend:** add a small API proxy for third-party keys, request validation, and rate limiting if these demos become public services.
- **Data:** define a persistence strategy and schema only if the projects grow beyond browser-local demos.
- **Resume-worthy work:** add accessible tests, deployment links, screenshots, CI badges, and a short case study explaining design decisions and tradeoffs.

**Current readiness estimate: 62/100. Portfolio estimate: 4/10.** The documentation and static publishing foundation are in place, but nested repositories, application defects, missing behavioral tests, API configuration, and placeholder content remain.

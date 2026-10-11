# Code Quality Review

This is a static review of the files present in the collection, not a security certification. The repository has no automated behavioral tests or common build/lint configuration.

## Findings

| Severity | Project / location | Finding | Recommendation |
| --- | --- | --- | --- |
| High | `weather app/index.html`; `my_weather/script.js` | OpenWeatherMap credentials were embedded directly in source. They are now removed from the current source, but must be revoked/rotated because they were present locally and may have been shared previously. | Use the ignored local `config.js` templates for development. For public hosting, use provider restrictions or a backend proxy; client-side keys are visible. |
| High | `calculator/script.js`; `PracticeJS/calculator.js` | `eval()` is used to evaluate calculator input. | Replace with a small arithmetic parser and validate supported operators, decimals, and division-by-zero behavior. |
| High | `Sticki Notes/script.js`; `To-do List/script.js` | User-controlled text is written/read through `innerHTML`, allowing markup/script injection; the to-do list persists rendered markup in local storage. | Render user strings with `textContent` and construct elements/listeners explicitly. Store structured task data rather than HTML. |
| High | Eight app directories (`Drum Kit Completed/`, `GreenScreen Project/`, `my_weather/`, `portfolio/`, `RandomPasswordGenerator/`, `Sticki Notes/`, `To-do List/`, `URLink To QR Code Generator/`) | Nested `.git` directories can cause a top-level upload to record embedded repositories/gitlinks rather than the app files. | Preserve or back up nested histories, then intentionally convert the contents to a single repository or manage them as submodules. Verify the cloned GitHub result. |
| Medium | `weather app/index.html` | City weather integration has incorrect unit parameter, mismatched icon variable casing, and writes humidity into the temperature element; errors are not handled consistently. | Correct request/response mapping, validate input, handle non-OK responses and network failures, and show accessible status messages. |
| Medium | `QuoteForTheDay/index.html` | The quote integration lacks authentication configuration, assumes the wrong response shape, writes quote text into the author field, and its empty `catch` parameter references an undefined error. | Configure authentication safely, validate response data, render with `textContent`, and display request failures. |
| Medium | `my_weather/script.js` | Geolocation/API failures are not handled; third-party data is interpolated into HTML; the app assumes the provider response shape and global Moment library are available. | Add permission/API states, validate data, render safely, and use HTTPS image URLs. |
| Medium | `Sticki Notes/` | Notes are not persisted despite the notes UI; titles/content are not validated separately. | Add optional local persistence with structured data, validation, and safe rendering. |
| Medium | `RandomPasswordGenerator/script.js` | Passwords use `Math.random()`, which is not suitable for security-sensitive credentials; generation mutates any text already in the field. | Use `crypto.getRandomValues()` and provide explicit character-set/length controls; label the tool as a demo until tested. |
| Medium | `landing/` and `portfolio/` | Placeholder links/content remain. The landing page references a portrait path not present in that folder, and icon-font references are not backed by a loaded Font Awesome stylesheet. | Replace placeholders with real content, use valid assets/links, and verify all external font/icon dependencies. |
| Medium | `GreenScreen Project/` | Webcam access depends on secure context and permission; uploaded media/object URLs and per-frame canvas work need robust lifecycle/performance handling. Preset background asset references should be verified. | Add permission/error states, release media/object URLs, cap processing resolution/frame rate, and verify presets offline. |
| Medium | `QuoteForTheDay/`, `URLink To QR Code Generator/`, weather demos | Third-party network calls have no unified loading, timeout, quota, or error UX. QR input is sent to a third party. | Document data sharing, avoid sensitive input, validate responses, and add clear loading/error states. |
| Low | Collection-wide | No unit/UI tests, formatter, linter, or dependency policy; project/folder naming and UI styles are inconsistent. | Add targeted tests and choose lint/format tooling after prioritizing app fixes; normalize naming incrementally. |

## Unused / Missing / Duplicate Items

- `weather app/` has no standalone JavaScript file because its application code is inline in `index.html`.
- `QuoteForTheDay/` and `URLink To QR Code Generator/` also contain inline JavaScript.
- `URLink To QR Code Generator/style.css` is present but the HTML does not link to it.
- Portfolio and landing-page scripts duplicate the same navigation/scroll behavior; extract a shared helper only if these pages are intentionally maintained together.
- `landing/developer.png` and `QuoteForTheDay/image copy.png` are not referenced by their pages.
- The landing page references `DSC_0001 copy.jpg`, which is present in `portfolio/`, not in `landing/`.
- `weather app/` contains `image/drizzls.png`, while the page requests `image/drizzle.png`.
- `.DS_Store` is present under `Drum Kit Completed/`; root ignore rules now exclude it from future additions.
- The existing folders contain no automated test suite and no shared package/build configuration.

## Recommended Order

1. Rotate the old weather keys and resolve nested Git histories before the first public push.
2. Replace `eval()` and unsafe `innerHTML` handling.
3. Fix weather/quote correctness and error states.
4. Verify privacy/ownership of the CV, photo, and third-party assets.
5. Add browser tests for the key user flows, accessibility checks, and screenshots.

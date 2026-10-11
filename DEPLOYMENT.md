# Deployment Guide

## Local Deployment

Run a static server from the repository root:

```powershell
py -m http.server 8000
```

Open `http://localhost:8000/`. For webcam/geolocation features, use `localhost` or HTTPS rather than opening files directly. See `SETUP.md` for local weather configuration.

## GitHub Pages (Production Static Hosting)

The `.github/workflows/pages.yml` workflow deploys the repository root when changes are pushed to `main`.

1. Resolve the nested `.git` repositories before creating the top-level repository; preserve nested history or explicitly convert/manage it. A GitHub Pages deployment cannot include the contents of a gitlink unless the source files are committed at the top level.
2. Push the repository to GitHub with `main` as the deployment branch.
3. In **Settings → Pages**, set the build/deployment source to **GitHub Actions**.
4. Push a change to `main` or start the workflow manually from **Actions**.
5. Open the Pages URL shown in the workflow deployment environment.

The root `index.html` is the landing page, and each demo lives in its own folder.

## Environment Configuration

There is no server-side environment configuration for this static site. Weather demo configuration is provided through local `config.js` files, which are intentionally ignored and therefore are not deployed. For a public deployment, do not paste a private key into committed files or assume a client-side key is secret. Use a server-side proxy and provider restrictions, or disable the API-dependent feature. The quote demo also needs its API authentication and response handling completed before deployment.

## Production Considerations

- Test every project at the final Pages URL; paths with spaces and case sensitivity can expose broken links.
- Verify that third-party APIs permit the intended browser origin, quota, and endpoint.
- Do not publish personal assets unless you have permission and intend them to be public.
- Add monitoring, rate limiting, and server-side validation if backend services are introduced.
- The current CI only checks JavaScript syntax and expected project files; it is not a security audit or behavioral test suite.

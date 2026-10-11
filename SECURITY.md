# Security Policy

## Supported Versions

This is a learning-project collection. Security fixes are considered for the current default branch; older copies are not maintained.

## Reporting a Vulnerability

Please do not disclose exploitable details in a public issue. Use GitHub's private vulnerability reporting feature for this repository, if enabled. If private reporting is unavailable, contact the repository owner through a private channel listed on the GitHub profile and include:

- A concise description and affected project/file.
- Reproduction steps and potential impact.
- A suggested fix, if known.

Do not include real credentials, personal data, or third-party users' information in a report.

## Credential and Privacy Notes

Previously hard-coded weather API keys have been removed from the current source and replaced with ignored local configuration files. Treat those old keys as exposed: revoke/rotate them with the provider, and consider history cleanup if they were pushed. A key used by browser JavaScript is public to site visitors; do not use it as a secret. Use provider restrictions or a server-side proxy.

The portfolio directory contains a photo and a CV PDF. Confirm their ownership and remove private information before publishing. The QR demo sends entered text to an external service. The notes and to-do demos handle user-provided content locally and should be reviewed for safe DOM rendering.

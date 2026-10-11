# Contributing

Contributions that fix bugs, improve accessibility, or clarify a demo are welcome.

## Forking

1. Fork the repository on GitHub.
2. Clone your fork and create a branch from the default branch.
3. Keep changes focused on one project when practical.

## Branch Naming

Use a short, descriptive prefix and kebab-case name, for example:

- `fix/weather-error-state`
- `feat/todo-keyboard-support`
- `docs/project-setup`

## Commit Naming

Use a concise imperative message. Conventional Commit prefixes are encouraged:

- `fix: validate weather search input`
- `feat: add keyboard support to drum kit`
- `docs: explain local API configuration`

## Pull Request Process

1. Explain the motivation, scope, and user-visible behavior.
2. Link related issues, if any.
3. Include screenshots for visible UI changes.
4. Test affected demos in a browser and run the checks described in `README.md`.
5. Do not include credentials, private personal data, generated files, or unrelated formatting changes.
6. Request review and address feedback before merging.

## Project Conventions

- Keep each demo self-contained unless shared code is clearly justified.
- Name new project folders with lowercase kebab-case, such as `pong-game/`.
- Preserve existing folder names unless all gallery, documentation, workflow, and relative asset references are updated and verified together.
- Use semantic HTML, accessible labels, and responsive styles.
- Prefer safe DOM APIs and explicit error handling.
- Do not add dependencies without explaining why they are needed.

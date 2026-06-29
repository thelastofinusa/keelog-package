# Contributing to Keelog

Welcome! 🎉 Thank you for your interest in contributing to Keelog.  
This guide will help you set up the project, make changes, and submit a pull request.

## Prerequisites

- [Bun](https://bun.com) (v1.3 or later) – we use it as the runtime, package manager, and test runner.
- Git

## Project Structure

This is a **Bun monorepo** with workspaces:

```
keelog-monorepo/
├── packages/
│   └── keelog/          # The core logger package
├── web/                 # Documentation site (Vocs)
├── package.json         # Root workspace config
└── CONTRIBUTING.md      # You are here
```

## Setting Up Locally

```bash
# Clone the repository
git clone https://github.com/thelastofinusa/keelog-package.git
cd keelog-package

# Install all dependencies (keelog + docs)
bun install
```

## Developing the Keelog Package

All source code lives in `packages/keelog/src/lib/`.

- **Run the test suite**

  ```bash
  cd packages/keelog
  bun run src/test/test-api.ts
  ```

- **Run a quick demo**

  ```bash
  cd packages/keelog
  bun run demo.ts   # create a demo file or use test-api.ts
  ```

- **Check TypeScript** (the `tsconfig.json` uses `noEmit`)
  ```bash
  bun run -- tsc --noEmit
  ```

## Developing the Documentation

The docs use [Vocs](https://vocs.dev). Start the dev server:

```bash
cd web
bun run dev
```

Pages are in `web/src/pages/`. Configuration is in `web/vocs.config.ts`.

## Coding Guidelines

- **TypeScript** – all code is typed. Use strict mode (already enabled).
- **File organisation** – each module has a clear responsibility (context, formatting, logger, log-call, types).
- **No unused dependencies** – keep the package lean.
- **Formatting** – run `bun run fmt` (if we add a script) or manually keep code clean.

## Running Tests

We have a comprehensive test file that covers all features:

```bash
cd packages/keelog
bun run src/test/test-api.ts
```

Add new test cases there when you introduce features or fix bugs.

## Submitting Changes

1. **Fork** the repository and create a new branch from `main`.
2. Make your changes in the relevant package.
3. Test locally with `bun run src/test/test-api.ts`.
4. Update **documentation** if you change the public API (the `README.md` and/or docs in `web/`).
5. Commit with clear, concise messages.
6. Open a **pull request** against the `main` branch.
   - Describe what you changed and why.
   - Reference any related issues.

## Licence

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).

Thank you for helping make Keelog even better! 🚀

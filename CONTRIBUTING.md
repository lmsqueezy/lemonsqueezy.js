# Contributing Guide

Welcome to `@heybrostudio/lemonsqueezy.js` contributing guide.

Thank you for your contribution to this project! Any contribution you make will be amazing ✨.

## Development

This repo is using [Bun](https://bun.sh/). We recommend reading the [Bun documentation](https://bun.sh/docs) to learn more about [Bun](https://bun.sh/).

### Setup

Make sure you have the latest version of [Bun](https://bun.sh/) installed in your system.

Clone this repo to your local computer and install the dependencies.

```bash
bun install
```

To run the development version, you can start it locally by:

```bash
bun run dev
```

### Unit Test

All of the test files are located inside the [test](https://github.com/heybrostudio/lemonsqueezy.js/tree/785af21a6aee8bee2745cebb0291501ffb4b9c29/test) directory. Unit testing are powered by [Bun's test](https://bun.sh/docs/cli/test).

#### Configure .env

- Copy `.env.example` to `.env` (`.env` has been added to `.gitignore`).
- Configure the three environment variables (`LEMON_SQUEEZY_API_KEY`, `LEMON_SQUEEZY_STORE_ID`, `LEMON_SQUEEZY_LICENSE_KEY`) in the `.env` file.

#### Run unit tests

To run all the test, you can start it locally by:

```bash
bun test
```

To run a specific test, you can start it locally by:

```bash
bun test test/<test-file>.ts
```

## Pull Request Guidelines

- Checkout a topic branch from a base branch (e.g. `main` branch) and merge back into that branch.
- If adding a new feature:
	- Add the corresponding test cases to the [test](https://github.com/heybrostudio/lemonsqueezy.js/tree/785af21a6aee8bee2745cebb0291501ffb4b9c29/test) folder.
	- Provide a compelling reason for adding this feature. Ideally, you should first open a suggestion issue and get approval before working on it.
- If fixing a bug:
	- If you are solving a specific issue, please add the issue number in the description of the PR.
	- Please provide a detailed description of the bug in the PR. It is preferable to include a live demo.
	- Add appropriate test coverage.

## Project Structure

### Function Folder

The functions of a category should be placed in a folder.

```
src
  checkouts/      - the functions for `checkouts`
  customers/      - the functions for `customers`
  internal/       - the some `internal` methods
  .../            - the other functions folders
```

A function folder typically contains these 2 files:

```
index.ts      - function source code itself
types.ts      - type definition
```

### Unit Test Folder

Test cases for a category of functions should be placed in a folder. There is a one-to-one correspondence with the functions folder.

```
test
  checkouts/      - Unit tests for `checkouts` functions
  customers/      - Unit tests for `customers` functions
  internal/       - Unit tests for `internal` functions
  .../            - Unit Tests for other functions
```

## Code Style

This project uses [@biomejs/biome](https://github.com/biomejs/biome) for linting and formatting, using [@heybrostudio/biome-config](https://github.com/heybrostudio/biome-config) for configuration. View the [biome.json](https://github.com/heybrostudio/lemonsqueezy.js/blob/785af21a6aee8bee2745cebb0291501ffb4b9c29/biome.json) configuration file.

Don't worry about the code style as long as you install the dev dependencies. Git hooks will format and fix them for you on committing.

## Thanks

Thanks for all your contributions and efforts towards improving this project! You are awesome ✨!
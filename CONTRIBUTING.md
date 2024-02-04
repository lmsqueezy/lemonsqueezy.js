# Contributing to lemonsqueezy.js

👋 Hey there! We're thrilled that you're interested in contributing to
**lemonsqueezy.js**. Before submitting your contribution, please take a moment to read through this guide.

This repo is managed with [Bun](https://bun.sh/). We recommend reading the [Bun documentation](https://bun.sh/docs) to learn more about it.

## Tooling and Technologies

We utilize a variety of tools to ensure code quality, consistency, and smooth development processes.

- **[Bun](https://bun.sh/)**: for managing the repo and testing.

- **[Prettier](https://prettier.io/)**: for code formatting. Our codebase adheres to the configuration specified in `prettier.config.js`.

- **[ESLint](https://eslint.org/)**: for code linting. Make sure to check and fix any linting issues before submitting your code. Our codebase linting rules are defined in `.eslintrc.cjs`.

- **[husky](https://typicode.github.io/husky/#/)**: for Git hooks. It ensures that linters, and other checks are passed before commits and pushes.

- **[tsup](https://tsup.egoist.dev/)**: for bundling the library files. We bundle both ESM and CJS versions of the library.

- **[Changesets](https://github.com/atlassian/changesets)**: for changelog generation and release management.

## Commit Convention

Our project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification for commit messages.

When preparing your commits for a Pull Request, ensure they adhere to our commit message format: `type(scope): description`.

### Types of Commits

Your commits should fall into one of the following categories:

- `feat` (or `feature`): Introduces new code or functionality to the project.

- `fix`: Addresses and resolves a bug. Linking to an issue if available is highly encouraged.

- `refactor`: Code changes that neither fix a bug nor add a feature, but improve the existing codebase.

- `docs`: Updates or additions to documentation, such as README files, usage guides, etc.

- `build`: Changes affecting the build system, including dependency updates and additions.

- `test`: Modifications involving tests, including adding new tests or refining existing ones.

- `ci`: Adjustments to our continuous integration setup, like GitHub Actions or other CI tools.

- `chore`: General maintenance and organizational tasks that don't fit other categories.

For example, a commit message might look like: `feat: add activateLicense function`.

## Setup

Make sure you have the latest version of [Bun](https://bun.sh/) installed in your system.

Clone this repo to your local computer and install the dependencies.

```bash
bun install
```

To run the development version, you can start it locally by:

```bash
bun run dev
```

### Configure .env

- Copy `.env.example` to `.env` (`.env` has been added to `.gitignore`).

- Configure the three environment variables in the `.env` file.:
  - `LEMON_SQUEEZY_API_KEY`
  - `LEMON_SQUEEZY_STORE_ID`
  - `LEMON_SQUEEZY_LICENSE_KEY`

### Run unit tests

To run all the test, you can start it locally by:

```bash
bun test
```

To run a specific test, you can start it locally by:

```bash
bun test test/<test-file>.ts
```

## Pull Request Guidelines

### Branch Workflow

- Develop in dedicated branches, not directly on the `main` branch.

- Use descriptive names for your branches. Make sure the branch name adheres to the format `[type/scope]`, like `feat/button-enhancement` or `docs/update-readme`.

### Adding New Features

- Provide tests for new features.

- Discuss new features in an issue or discussion topic before coding.

### Fixing Bugs

- Describe the bug in detail in your PR.

- Include steps to reproduce or a live demo if possible.

- Link the issue your PR fixes, using the format `fix #issue_number`.

Remember, clear and detailed PRs help us efficiently review and integrate your contributions!

## Creating a Pull Request (PR)

1. **Fork and Clone**: Begin by forking the main repository and cloning your fork.

2. **Branching**: Create a new branch off `main` using the format `[type/scope]`, like `feat/button-enhancement` or `docs/update-readme`. The `type` should align with conventional commit types.

3. **Development**: Make your changes and commit them adhering to the [commit guidelines](#commit-convention). Use `bun run typecheck` to test your changes.

4. **Document Changes**: Run `bun changeset` for a detailed change description. For minor updates (like CI changes), use `bun changeset add --empty`.

5. **Submit PR**: Push your branch and open a PR to the `main` branch of the main repository. Ensure all tests pass and the package builds correctly.

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

## Thanks

Thanks for all your contributions and efforts towards improving this project! You are awesome ✨!

# @lemonsqueezy/lemonsqueezy.js

## 2.2.0

### Minor Changes

- [#61](https://github.com/lmsqueezy/lemonsqueezy.js/pull/61) [`93381d9`](https://github.com/lmsqueezy/lemonsqueezy.js/commit/93381d9f59435497499dcf4aa2a8f47528efadc7) Thanks [@keyding](https://github.com/keyding)! - Added `invoice_immediately` and `disable_prorations` parameters to `Subscription` item update object.

- [#65](https://github.com/lmsqueezy/lemonsqueezy.js/pull/65) [`27cbaf4`](https://github.com/lmsqueezy/lemonsqueezy.js/commit/27cbaf401338c88b027729cc23a54c8aa2981922) Thanks [@keyding](https://github.com/keyding)! - Added `urls.customer_portal_update_subscription` parameter to Subscription objects.

## 2.1.0

### Minor Changes

- [#58](https://github.com/lmsqueezy/lemonsqueezy.js/pull/58) [`5bc530a`](https://github.com/lmsqueezy/lemonsqueezy.js/commit/5bc530a47c0be08f2b8b759dbce1deff4c15a874) Thanks [@keyding](https://github.com/keyding)! - Added `tax_inclusive` parameter to Order objects and Subscription invoice objects

## 2.0.0

### Major Changes

- [#48](https://github.com/lmsqueezy/lemonsqueezy.js/pull/48) [`fd20741`](https://github.com/lmsqueezy/lemonsqueezy.js/commit/fd20741b496a37d54981be5485ca9218126fc25a) Thanks [@keyding](https://github.com/keyding)! - BREAKING CHANGE: Completely rewritten the JS SDK for full type-safety and tree-shakeability.

  ## Notes:

  - **Bun**: Transitioned to Bun for repo management.
  - **Type-safe**: Written in TypeScript and documented with TSDoc.
  - **Tree-shakeable**: Use only functions that you need.
  - **Improved docs**: Added detailed Wiki pages on how to use the new SDK functions.
  - **Deprecate old SDK classes and methods**: The deprecated methods and the LemonSqueezy class will be removed with the next major release.
  - **Unit tests**: Introduces comprehensive unit tests for all functions.
  - **Improved repo management**: Transitioned to Bun, adopted Conventional Commits convention, husky, Prettier, ESLint and other tools for better repo management.

  ## Fixes:

  This release fixes the following issues.

  - #35
  - #29
  - #28
  - #25
  - #22
  - #19

  ## How to upgrade

  Use the new setup function to initialize the SDK with your API key.

  ```tsx
  lemonSqueezySetup({ apiKey });
  ```

  Import functions from the SDK and use them in your application.

  ```tsx
  const { data, error, statusCode } = await getAuthenticatedUser();
  ```

  For more information, see [API Reference](https://docs.lemonsqueezy.com/api) and [Functions Usage Wiki](https://github.com/lmsqueezy/lemonsqueezy.js/wiki).

  ## Credits

  🎉 A massive thanks to @heybrostudio for their awesome work and contributions that led to this release.

### Patch Changes

- [#50](https://github.com/lmsqueezy/lemonsqueezy.js/pull/50) [`655fe01`](https://github.com/lmsqueezy/lemonsqueezy.js/commit/655fe014597c2bc838a70ff36acd9cbdd1df9180) Thanks [@brankoconjic](https://github.com/brankoconjic)! - update dependencies

## 1.2.5

### Patch Changes

- [#41](https://github.com/lmsqueezy/lemonsqueezy.js/pull/41) [`e64425a`](https://github.com/lmsqueezy/lemonsqueezy.js/commit/e64425a3f333091ced5177e54628b78033d58ab8) Thanks [@brankoconjic](https://github.com/brankoconjic)! - Fix documentation example - use named exports.

- [#41](https://github.com/lmsqueezy/lemonsqueezy.js/pull/41) [`0ecd8d4`](https://github.com/lmsqueezy/lemonsqueezy.js/commit/0ecd8d4cf3c560c38bc0b0ec310be87415ad0716) Thanks [@brankoconjic](https://github.com/brankoconjic)! - Fix #32 TypeScript types no longer generated in 1.2.4

- [#41](https://github.com/lmsqueezy/lemonsqueezy.js/pull/41) [`0ecd8d4`](https://github.com/lmsqueezy/lemonsqueezy.js/commit/0ecd8d4cf3c560c38bc0b0ec310be87415ad0716) Thanks [@brankoconjic](https://github.com/brankoconjic)! - Add Changesets for improved library management and automated NPM releases.

- [#43](https://github.com/lmsqueezy/lemonsqueezy.js/pull/43) [`af4c3c0`](https://github.com/lmsqueezy/lemonsqueezy.js/commit/af4c3c0ca78859c6ecb5c9771ceef62f898f9f35) Thanks [@brankoconjic](https://github.com/brankoconjic)! - Exclude changeset folder from Prettier

- [#42](https://github.com/lmsqueezy/lemonsqueezy.js/pull/42) [`8f07f3e`](https://github.com/lmsqueezy/lemonsqueezy.js/commit/8f07f3e76e9946146ffde554456746ff6c3a4a99) Thanks [@brankoconjic](https://github.com/brankoconjic)! - Fix changeset release workflow

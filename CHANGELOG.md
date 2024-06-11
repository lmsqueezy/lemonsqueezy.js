# @lemonsqueezy/lemonsqueezy.js

## 3.1.1

### Patch Changes

- [#86](https://github.com/lmsqueezy/lemonsqueezy.js/pull/86) [`2e9beae`](https://github.com/lmsqueezy/lemonsqueezy.js/commit/2e9beae1c86c3ec521a442246bffec1694189824) Thanks [@keyding](https://github.com/keyding)! - Add subscription `status` type `incomplete`

## 3.1.0

### Minor Changes

- [#94](https://github.com/lmsqueezy/lemonsqueezy.js/pull/94) [`bea7295`](https://github.com/lmsqueezy/lemonsqueezy.js/commit/bea7295eb51a31bc0a6b62c1d34dd920f19d7fdd) Thanks [@keyding](https://github.com/keyding)! - Add `generateOrderInvoice` and `generateSubscriptionInvoice`

### Patch Changes

- [#94](https://github.com/lmsqueezy/lemonsqueezy.js/pull/94) [`bea7295`](https://github.com/lmsqueezy/lemonsqueezy.js/commit/bea7295eb51a31bc0a6b62c1d34dd920f19d7fdd) Thanks [@keyding](https://github.com/keyding)! - Improve tests

- [`c3f802e`](https://github.com/lmsqueezy/lemonsqueezy.js/commit/c3f802ee1e9f9ab3e0b75ec4b9d04d84c7961747) Thanks [@brankoconjic](https://github.com/brankoconjic)! - Fix `createDiscount` function so that `variantIds` is not required unless `limitedToProducts` is true

## 3.0.0

### Major Changes

- [`59fdd9c`](https://github.com/lmsqueezy/lemonsqueezy.js/commit/59fdd9c7304577b576b4094795d9148301593cf5) Thanks [@brankoconjic](https://github.com/brankoconjic)! - ### Breaking Change

  The deprecated `LemonSqueezy` class, all its methods and related types from the library SDK (the `_deprecated` folder) have been removed.

  The class has been deprecated for some time and is no longer needed. Removing this to clean up the codebase and reduce maintenance overhead.

  If you were using any deprecated modules, you need to update your imports to use the new modules provided in the library. Visit [Wiki page](https://github.com/lmsqueezy/lemonsqueezy.js/wiki) for function usage.

### Patch Changes

- [`a7e8feb`](https://github.com/lmsqueezy/lemonsqueezy.js/commit/a7e8feb11d4eba432f9e4ea40adeda85e2dc57b0) Thanks [@brankoconjic](https://github.com/brankoconjic)! - update dependencies

- [#81](https://github.com/lmsqueezy/lemonsqueezy.js/pull/81) [`218d2ef`](https://github.com/lmsqueezy/lemonsqueezy.js/commit/218d2ef6a0adfead41938ba4cfffa6d3efbdd758) Thanks [@keyding](https://github.com/keyding)! - Add `expiresAt` to `updateLicenseKey` function

- [#76](https://github.com/lmsqueezy/lemonsqueezy.js/pull/76) [`09fdd1a`](https://github.com/lmsqueezy/lemonsqueezy.js/commit/09fdd1ad50f228ee30e7bb0085fdb656b6c15950) Thanks [@kldzj](https://github.com/kldzj)! - Made `UpdateSubscription`.`pause` nullable

- [#74](https://github.com/lmsqueezy/lemonsqueezy.js/pull/74) [`13c5ff0`](https://github.com/lmsqueezy/lemonsqueezy.js/commit/13c5ff0e0c2e115fa7e004eeabdeabee32bbafe1) Thanks [@keyding](https://github.com/keyding)! - Improve API response types.

- [`c507272`](https://github.com/lmsqueezy/lemonsqueezy.js/commit/c50727294b162acf6bc8b20d105c01e5e9e9d508) Thanks [@brankoconjic](https://github.com/brankoconjic)! - Add `from_price_formatted` and `to_price_formatted` attributes to the product object

- [#75](https://github.com/lmsqueezy/lemonsqueezy.js/pull/75) [`b4d071a`](https://github.com/lmsqueezy/lemonsqueezy.js/commit/b4d071af6f63de7d9dd3761281abf1a0c9934276) Thanks [@keyding](https://github.com/keyding)! - Add `trial_ends_at` for `updateSubscription` function;
  Add `skip_trial` for `checkoutOptions` in the `createCheckout` function;

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

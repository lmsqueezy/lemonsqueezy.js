---
"@lemonsqueezy/lemonsqueezy.js": major
---

BREAKING CHANGE: Completely rewritten the JS SDK for full type-safety and tree-shakeability.

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
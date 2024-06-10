# The official Lemon Squeezy JavaScript SDK

[![NPM version](https://img.shields.io/npm/v/%40lemonsqueezy%2Flemonsqueezy.js?label=&color=%230d9488)](https://www.npmjs.com/package/@lemonsqueezy/lemonsqueezy.js)
[![Functions usage](https://img.shields.io/badge/Wiki-%237c3aed)](https://github.com/lmsqueezy/lemonsqueezy.js/wiki)
[![APIs Count](https://img.shields.io/badge/56_Functions-%232563eb)](https://github.com/lmsqueezy/lemonsqueezy.js/wiki)
[![Weekly downloads](https://img.shields.io/npm/dw/@lemonsqueezy/lemonsqueezy.js)](https://www.npmjs.com/package/@lemonsqueezy/lemonsqueezy.js)
![NPM Downloads](https://img.shields.io/npm/d18m/%40lemonsqueezy%2Flemonsqueezy.js)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Flmsqueezy%2Flemonsqueezy.js.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Flmsqueezy%2Flemonsqueezy.js?ref=badge_shield)

## Introduction

This is the official JavaScript SDK for [Lemon Squeezy](https://lemonsqueezy.com), helping make it easy to incorporate billing into your JavaScript application.

- Read [API Reference](https://docs.lemonsqueezy.com/api) to understand how the Lemon Squeezy API works.

- Visit [Wiki page](https://github.com/lmsqueezy/lemonsqueezy.js/wiki) for function usage.

## Features

- Type-safe: Written in [TypeScript](https://www.typescriptlang.org/) and documented with [TSDoc](https://github.com/microsoft/tsdoc).
- Tree-shakeable: Use only functions that you need. See [bundle size](#bundle-size).

## Installation

### Install the package

```bash
# bun
bun install @lemonsqueezy/lemonsqueezy.js
```

```bash
# pnpm
pnpm install @lemonsqueezy/lemonsqueezy.js
```

```bash
# npm
npm install @lemonsqueezy/lemonsqueezy.js
```

### Create an API key

Create a new API key from [Settings > API](https://app.lemonsqueezy.com/settings/api) in your Lemon Squeezy dashboard.

Add this API key into your project, for example as `LEMONSQUEEZY_API_KEY` in your `.env` file.

### Using the API in test mode

You can build and test a full API integration with Lemon Squeezy using test mode.

Any API keys created in test mode will interact with your test mode store data.

When you are ready to go live with your integration, make sure to create an API key in live mode and use that in your production application.

## Usage

```tsx
lemonSqueezySetup({ apiKey });

const { data, error, statusCode } = await getAuthenticatedUser();

console.log({ data, error, statusCode });
```

For more functions usage, see [Wiki](https://github.com/lmsqueezy/lemonsqueezy.js/wiki).

## Bundle size

<details>
  <summary>Click to view</summary>

| export                          | min+brotli |
| ------------------------------- | ---------- |
| createDiscount                  | 995 B      |
| createCheckout                  | 900 B      |
| updateSubscriptionItem          | 849 B      |
| updateSubscription              | 841 B      |
| listSubscriptionItems           | 833 B      |
| listSubscriptions               | 831 B      |
| listWebhooks                    | 831 B      |
| listLicenseKeyInstances         | 830 B      |
| updateLicenseKey                | 827 B      |
| listUsageRecords                | 824 B      |
| listDiscountRedemptions         | 822 B      |
| listCustomers                   | 820 B      |
| listDiscounts                   | 820 B      |
| listProducts                    | 819 B      |
| listSubscriptionInvoices        | 819 B      |
| listVariants                    | 819 B      |
| listOrderItems                  | 818 B      |
| listFiles                       | 817 B      |
| listLicenseKeys                 | 817 B      |
| listOrders                      | 817 B      |
| listStores                      | 817 B      |
| listCheckouts                   | 816 B      |
| listPrices                      | 816 B      |
| createWebhook                   | 808 B      |
| updateWebhook                   | 793 B      |
| deactivateLicense               | 764 B      |
| validateLicense                 | 763 B      |
| activateLicense                 | 762 B      |
| createUsageRecord               | 728 B      |
| getLicenseKeyInstance           | 706 B      |
| getSubscriptionInvoice          | 702 B      |
| getDiscountRedemption           | 701 B      |
| getSubscriptionItem             | 700 B      |
| getOrderItem                    | 699 B      |
| getWebhook                      | 699 B      |
| getCheckout                     | 697 B      |
| getFile                         | 697 B      |
| getLicenseKey                   | 697 B      |
| getUsageRecord                  | 697 B      |
| getCustomer                     | 695 B      |
| getStore                        | 695 B      |
| getSubscription                 | 695 B      |
| getOrder                        | 693 B      |
| getPrice                        | 693 B      |
| getProduct                      | 693 B      |
| getDiscount                     | 692 B      |
| getVariant                      | 692 B      |
| archiveCustomer                 | 683 B      |
| updateCustomer                  | 683 B      |
| createCustomer                  | 680 B      |
| deleteWebhook                   | 663 B      |
| cancelSubscription              | 658 B      |
| deleteDiscount                  | 655 B      |
| getSubscriptionItemCurrentUsage | 651 B      |
| getAuthenticatedUser            | 598 B      |
| lemonSqueezySetup               | 106 B      |

</details>

## Notes

Do not use this package directly in the browser, as this will expose your API key. This would give anyone full API access to your Lemon Squeezy account and store(s). For more information [see more](https://docs.lemonsqueezy.com/api#authentication).

## Contributing

See the [Contributing Guide](https://github.com/lmsqueezy/lemonsqueezy.js/blob/main/CONTRIBUTING.md).

## License

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Flmsqueezy%2Flemonsqueezy.js.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Flmsqueezy%2Flemonsqueezy.js?ref=badge_large)

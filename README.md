# The official Lemon Squeezy JavaScript SDK

[![NPM Version](https://img.shields.io/npm/v/%40lemonsqueezy%2Flemonsqueezy.js?label=&color=%230d9488)](https://www.npmjs.com/package/@lemonsqueezy/lemonsqueezy.js)
![](https://img.shields.io/npm/dw/@lemonsqueezy/lemonsqueezy.js)
[![Functions usage](https://img.shields.io/badge/Docs-%237c3aed)](https://github.com/lemonsqueezy/lemonsqueezy.js/wiki)
![APIs Count](https://img.shields.io/badge/56_Functions-%232563eb)

## Introduction

This is the official JavaScript SDK for [Lemon Squeezy](https://lemonsqueezy.com), helping make it easy to incorporate billing into your JavaScript application.

- Read [API Reference](https://docs.lemonsqueezy.com/api) to understand how the Lemon Squeezy API works.

- Visit [Wiki page](https://docs.lemonsqueezy.com/api-reference) for function usage.

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

For more functions usage, see [Wiki](https://github.com/lemonsqueezy/lemonsqueezy.js/wiki).

## Bundle size

<details>
  <summary>Click to view</summary>

| export                          | min+brotli |
| :------------------------------ | ---------: |
| LemonSqueezy (deprecated)       |    1.87 kB |
| createDiscount                  |      928 B |
| createCheckout                  |      821 B |
| listWebhooks                    |      770 B |
| listSubscriptionInvoices        |      767 B |
| listDiscountRedemptions         |      766 B |
| updateSubscription              |      766 B |
| listLicenseKeyInstances         |      765 B |
| listSubscriptionItems           |      765 B |
| listLicenseKeys                 |      764 B |
| listOrderItems                  |      764 B |
| listUsageRecords                |      764 B |
| listCheckouts                   |      763 B |
| listFiles                       |      762 B |
| listOrders                      |      762 B |
| listPrices                      |      762 B |
| listProducts                    |      762 B |
| listStores                      |      762 B |
| listSubscriptions               |      762 B |
| listCustomers                   |      761 B |
| listDiscounts                   |      761 B |
| listVariants                    |      759 B |
| createWebhook                   |      744 B |
| updateLicenseKey                |      737 B |
| updateWebhook                   |      728 B |
| deactivateLicense               |      699 B |
| validateLicense                 |      699 B |
| activateLicense                 |      698 B |
| createUsageRecord               |      652 B |
| getLicenseKeyInstance           |      640 B |
| getDiscountRedemption           |      639 B |
| getSubscriptionInvoice          |      636 B |
| getLicenseKey                   |      634 B |
| getOrderItem                    |      633 B |
| getUsageRecord                  |      632 B |
| getWebhook                      |      632 B |
| getCheckout                     |      629 B |
| getSubscription                 |      629 B |
| getStore                        |      628 B |
| getCustomer                     |      627 B |
| getDiscount                     |      627 B |
| getFile                         |      627 B |
| getOrder                        |      627 B |
| getPrice                        |      627 B |
| getProduct                      |      627 B |
| getVariant                      |      627 B |
| updateSubscriptionItem          |      621 B |
| createCustomer                  |      616 B |
| archiveCustomer                 |      615 B |
| updateCustomer                  |      609 B |
| getSubscriptionItemCurrentUsage |      592 B |
| cancelSubscription              |      587 B |
| deleteWebhook                   |      587 B |
| deleteDiscount                  |      585 B |
| getSubscriptionItem             |      583 B |
| getAuthenticatedUser            |      529 B |
| lemonSqueezySetup               |      106 B |

</details>

## Notes

Do not use this package directly in the browser, as this will expose your API key. This would give anyone full API access to your Lemon Squeezy account and store(s). For more information, [see more](https://docs.lemonsqueezy.com/api#authentication).

## Contributing

See the [Contributing Guide](https://github.com/lemonsqueezy/lemonsqueezy.js/blob/main/CONTRIBUTING.md).

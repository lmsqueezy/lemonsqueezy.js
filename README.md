# The official Lemon Squeezy JavaScript SDK

[![NPM version](https://img.shields.io/npm/v/%40lemonsqueezy%2Flemonsqueezy.js?label=&color=%230d9488)](https://www.npmjs.com/package/@lemonsqueezy/lemonsqueezy.js)
[![Functions usage](https://img.shields.io/badge/Wiki-%237c3aed)](https://github.com/lmsqueezy/lemonsqueezy.js/wiki)
[![APIs Count](https://img.shields.io/badge/57_Functions-%232563eb)](https://github.com/lmsqueezy/lemonsqueezy.js/wiki)
[![Weekly downloads](https://img.shields.io/npm/dw/@lemonsqueezy/lemonsqueezy.js)](https://www.npmjs.com/package/@lemonsqueezy/lemonsqueezy.js)
![NPM Downloads](https://img.shields.io/npm/d18m/%40lemonsqueezy%2Flemonsqueezy.js)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Flmsqueezy%2Flemonsqueezy.js.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Flmsqueezy%2Flemonsqueezy.js?ref=badge_shield)

## Introduction

This is the official JavaScript SDK for [Lemon Squeezy](https://lemonsqueezy.com), making it easy to incorporate billing into your JavaScript application.

- Read [API Reference](https://docs.lemonsqueezy.com/api) to understand how the Lemon Squeezy API works.
- Visit [Wiki page](https://github.com/lmsqueezy/lemonsqueezy.js/wiki) for function usage.

## Features

- Type-safe: Written in [TypeScript](https://www.typescriptlang.org/) and documented with [TSDoc](https://github.com/microsoft/tsdoc).
- Tree-shakeable: Use only the functions you need. See [bundle size](#bundle-size).

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

> [!CAUTION]
>
> Do not use this package directly in the browser, as this will expose your API key. This would give anyone full API access to your Lemon Squeezy account and store(s). For more information [see here](https://docs.lemonsqueezy.com/api#authentication).

### Using the API in test mode

You can build and test a full API integration with Lemon Squeezy using [Test Mode](https://docs.lemonsqueezy.com/help/getting-started/test-mode).

Any API keys created in test mode will interact with your test mode store data.

When you are ready to go live with your integration, make sure to create an API key in live mode and use that in your production application.

## Usage

```tsx
import { getAuthenticatedUser, lemonSqueezySetup } from "@lemonsqueezy/lemonsqueezy.js";

const apiKey = import.meta.env.LEMON_SQUEEZY_API_KEY;

lemonSqueezySetup({
  apiKey,
  onError: (error) => console.error("Error!", error),
});

const { data, error } = await getAuthenticatedUser();

if (error) {
  console.log(error.message);
} else {
  console.log(data);
}
```

For more functions usage, see [Wiki](https://github.com/lmsqueezy/lemonsqueezy.js/wiki).

## Bundle size

<details>
  <summary>Click to view</summary>

| Export                          | min+brotli |
| ------------------------------- | ---------- |
| createDiscount                  | 991 B      |
| createCheckout                  | 895 B      |
| updateSubscriptionItem          | 849 B      |
| updateSubscription              | 841 B      |
| listWebhooks                    | 831 B      |
| listDiscountRedemptions         | 821 B      |
| listLicenseKeyInstances         | 820 B      |
| listSubscriptionInvoices        | 818 B      |
| listLicenseKeys                 | 817 B      |
| listOrderItems                  | 817 B      |
| listSubscriptionItems           | 817 B      |
| listCheckouts                   | 814 B      |
| listDiscounts                   | 814 B      |
| listSubscriptions               | 814 B      |
| listUsageRecords                | 814 B      |
| listVariants                    | 814 B      |
| listCustomers                   | 813 B      |
| listFiles                       | 813 B      |
| listOrders                      | 813 B      |
| listPrices                      | 813 B      |
| listProducts                    | 813 B      |
| listStores                      | 813 B      |
| updateLicenseKey                | 813 B      |
| createWebhook                   | 808 B      |
| updateWebhook                   | 793 B      |
| generateSubscriptionInvoice     | 789 B      |
| generateOrderInvoice            | 783 B      |
| activateLicense                 | 770 B      |
| validateLicense                 | 770 B      |
| deactivateLicense               | 764 B      |
| createUsageRecord               | 724 B      |
| getLicenseKeyInstance           | 714 B      |
| getSubscriptionInvoice          | 702 B      |
| getDiscountRedemption           | 700 B      |
| getSubscriptionItem             | 700 B      |
| getUsageRecord                  | 700 B      |
| getOrderItem                    | 699 B      |
| getLicenseKey                   | 698 B      |
| getOrder                        | 697 B      |
| getPrice                        | 697 B      |
| getStore                        | 697 B      |
| getCheckout                     | 696 B      |
| getCustomer                     | 696 B      |
| getFile                         | 696 B      |
| getProduct                      | 694 B      |
| getWebhook                      | 694 B      |
| getDiscount                     | 693 B      |
| getSubscription                 | 693 B      |
| getVariant                      | 693 B      |
| updateCustomer                  | 684 B      |
| archiveCustomer                 | 683 B      |
| createCustomer                  | 678 B      |
| cancelSubscription              | 660 B      |
| deleteDiscount                  | 658 B      |
| deleteWebhook                   | 653 B      |
| getSubscriptionItemCurrentUsage | 651 B      |
| getAuthenticatedUser            | 598 B      |
| lemonSqueezySetup               | 106 B      |

</details>

## Contributing

See the [Contributing Guide](https://github.com/lmsqueezy/lemonsqueezy.js/blob/main/CONTRIBUTING.md).

## License

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Flmsqueezy%2Flemonsqueezy.js.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Flmsqueezy%2Flemonsqueezy.js?ref=badge_large)

# The official Lemon Squeezy JavaScript SDK

[![NPM version](https://img.shields.io/npm/v/%40lemonsqueezy%2Flemonsqueezy.js?label=&color=%230d9488)](https://www.npmjs.com/package/@lemonsqueezy/lemonsqueezy.js)
[![Functions usage](https://img.shields.io/badge/Wiki-%237c3aed)](https://github.com/lmsqueezy/lemonsqueezy.js/wiki)
[![APIs Count](https://img.shields.io/badge/59_Functions-%232563eb)](https://github.com/lmsqueezy/lemonsqueezy.js/wiki)
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
import {
  getAuthenticatedUser,
  lemonSqueezySetup,
} from "@lemonsqueezy/lemonsqueezy.js";

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
| createDiscount                  | 1.01 kB    |
| createCheckout                  | 888 B      |
| updateSubscriptionItem          | 856 B      |
| updateSubscription              | 838 B      |
| listCheckouts                   | 824 B      |
| listDiscountRedemptions         | 819 B      |
| listLicenseKeyInstances         | 818 B      |
| listSubscriptionInvoices        | 816 B      |
| listLicenseKeys                 | 815 B      |
| listOrderItems                  | 815 B      |
| listSubscriptionItems           | 815 B      |
| listUsageRecords                | 814 B      |
| listSubscriptions               | 812 B      |
| listWebhooks                    | 812 B      |
| listCustomers                   | 811 B      |
| listDiscounts                   | 811 B      |
| listFiles                       | 811 B      |
| listOrders                      | 811 B      |
| listPrices                      | 811 B      |
| listProducts                    | 811 B      |
| listStores                      | 811 B      |
| listVariants                    | 811 B      |
| updateLicenseKey                | 811 B      |
| createWebhook                   | 806 B      |
| issueSubscriptionInvoiceRefund  | 796 B      |
| issueOrderRefund                | 795 B      |
| updateWebhook                   | 792 B      |
| generateSubscriptionInvoice     | 787 B      |
| generateOrderInvoice            | 785 B      |
| validateLicense                 | 761 B      |
| activateLicense                 | 760 B      |
| deactivateLicense               | 759 B      |
| createUsageRecord               | 724 B      |
| getDiscountRedemption           | 702 B      |
| getLicenseKeyInstance           | 702 B      |
| getSubscriptionInvoice          | 699 B      |
| getSubscriptionItem             | 698 B      |
| getUsageRecord                  | 698 B      |
| getOrderItem                    | 697 B      |
| getWebhook                      | 697 B      |
| getLicenseKey                   | 695 B      |
| getCheckout                     | 694 B      |
| getStore                        | 694 B      |
| getSubscription                 | 694 B      |
| getCustomer                     | 692 B      |
| getFile                         | 692 B      |
| getOrder                        | 692 B      |
| getPrice                        | 692 B      |
| getDiscount                     | 691 B      |
| getProduct                      | 691 B      |
| archiveCustomer                 | 690 B      |
| getVariant                      | 690 B      |
| createCustomer                  | 686 B      |
| updateCustomer                  | 682 B      |
| deleteWebhook                   | 660 B      |
| cancelSubscription              | 658 B      |
| deleteDiscount                  | 656 B      |
| getSubscriptionItemCurrentUsage | 650 B      |
| getAuthenticatedUser            | 595 B      |
| lemonSqueezySetup               | 106 B      |

</details>

## Contributing

See the [Contributing Guide](https://github.com/lmsqueezy/lemonsqueezy.js/blob/main/CONTRIBUTING.md).

## License

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Flmsqueezy%2Flemonsqueezy.js.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Flmsqueezy%2Flemonsqueezy.js?ref=badge_large)

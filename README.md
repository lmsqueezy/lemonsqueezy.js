# The official Lemon Squeezy JavaScript SDK

[![](https://img.shields.io/npm/v/@lemonsqueezy/lemonsqueezy.js?style=plastic)](https://www.npmjs.com/package/@lemonsqueezy/lemonsqueezy.js) [![](https://img.shields.io/npm/dw/@lemonsqueezy/lemonsqueezy.js?style=plastic)](https://www.npmjs.com/package/@lemonsqueezy/lemonsqueezy.js)

## Introduction

This is the official JavaScript SDK for [Lemon Squeezy](https://lemonsqueezy.com), helping make it easy to incorporate billing into your JavaScript application.

Now with full TypeScript support.

Please read the [API introduction page](https://docs.lemonsqueezy.com/api) to understand how the API works.

## Installation

### Install the package

Install with `npm install @lemonsqueezy/lemonsqueezy.js`

### Create an API key

Create a new API key from [Settings > API](https://app.lemonsqueezy.com/settings/api) in your Lemon Squeezy dashboard.

Add this API key into your project, for example as `LEMONSQUEEZY_API_KEY` in your `.env` file.

You can test the API/SDK when in [test mode](/help/getting-started/test-mode) so you can build a full integration without making live transactions.

## Usage

### Basic usage

```javascript
import LemonSqueezy from "@lemonsqueezy/lemonsqueezy.js";
const ls = new LemonSqueezy(process.env.LEMONSQUEEZY_API_KEY);

const products = await ls.getProducts();
```

Parameters for requests should be passed in an object. For list methods, these parameters are used for filtering and for list pagination. For create and update methods, these parameters contain the values for the request.

```javascript
const subscriptions = await ls.getSubscriptions({ storeId: 123, perPage: 50 });

const subscription = await ls.getSubscription({
  id: 123,
  include: ["subscription-invoices"],
});

const subscription = await ls.cancelSubscription({ id: 123 });
```

### Including related resources

You can use `include` in every "read" method to pull in [related resources](https://docs.lemonsqueezy.com/api#including-related-resources) (works for both individual and list methods).

Note: In v1.0.3 and lower, `include` was a string of object names. Now it should be an array of strings.

```javascript
const product = await ls.getProduct({ id: 123, include: ["store", "variants"] });
```

### Pagination

Endpoints that return a list of results can be paged using optional `page` and `perPage` values.
If `perPage` is omitted, the API returns the default of 10 results per page.
`perPage` should be a value between 1 and 100.

```javascript
// Querying a list of orders for store #3, 50 records per page, page 2, including store and customer related resources
const order = await ls.getOrders({
  storeId: 3,
  perPage: 50,
  page: 2,
  include: ["store", "customer"]
});
```

### Looping lists

You can also use `page` and `perPage` to loop lists of results.

"List" method responses contain a `meta.page` object, which describes the pagination of your request.

```json
{
  "meta": {
    "page": {
      "currentPage": 1,
      "from": 1,
      "lastPage": 16,
      "perPage": 10,
      "to": 10,
      "total": 154
    }
  },
  ...
}
```

In this example, you can use the `lastPage` value to check if you are on the last page of results.

```javascript
let hasNextPage = true;
let perPage = 100;
let page = 1;
let variants = [];
while (hasNextPage) {
  const resp = await ls.getVariants({ perPage, page });

  variants = variants.concat(resp["data"]);

  if (resp.meta.page.lastPage > page) {
    page += 1;
  } else {
    hasNextPage = false;
  }
}
```

### Handling errors

Each method will throw an exception if there are issues with the request. JSON will be returned containing error details.

Use `try { ... } catch { ... }` to access this object. Error messages will be available in a list in `errors`.

```javascript
// "something" is not a valid value for `include` so this request will return an error
try {
  const subscriptions = await ls.getSubscriptions({ include: ["something"] });
} catch (err) {
  // `err` is an object like this:
  //  {
  //   "jsonapi": {
  //     "version": "1.0"
  //   }
  //   "errors": [
  //     {
  //       "detail": "Include path something is not allowed.",
  //       "source": {
  //         "parameter": "include"
  //       },
  //       "status": "400",
  //       "title": "Invalid Query Parameter"
  //     }
  //   ]
  // }
}
```

## Notes

Do not use this package directly in the browser. as this will expose your API key. This would give anyone full API access to your Lemon Squeezy account and store(s).

---

## Methods

- [getUser()](#getuser)
- [getStores()](#getstoresparameters)
- [getStore()](#getstoreparameters)
- [getProducts()](#getproductsparameters)
- [getProduct()](#getproductparameters)
- [getVariants()](#getvariantsparameters)
- [getVariant()](#getvariantparameters)
- [getPrices()](#getpricesparameters)
- [getPrice()](#getpriceparameters)
- [getCheckouts()](#getcheckoutsparameters)
- [getCheckout()](#getcheckoutparameters)
- [createCheckout()](#createcheckoutparameters)
- [getCustomers()](#getcustomersparameters)
- [getCustomer()](#getcustomerparameters)
- [getOrders()](#getordersparameters)
- [getOrder()](#getorderparameters)
- [getFiles()](#getfilesparameters)
- [getFile()](#getfileparameters)
- [getOrderItems()](#getorderitemsparameters)
- [getOrderItem()](#getorderitemparameters)
- [getSubscriptions()](#getsubscriptionsparameters)
- [getSubscription()](#getsubscriptionparameters)
- [updateSubscription()](#updatesubscriptionparameters)
- [cancelSubscription()](#cancelsubscriptionparameters)
- [resumeSubscription()](#resumesubscriptionparameters)
- [pauseSubscription()](#pausesubscriptionparameters)
- [unpauseSubscription()](#unpausesubscriptionparameters)
- [getSubscriptionInvoices()](#getsubscriptioninvoicesparameters)
- [getSubscriptionInvoice()](#getsubscriptioninvoiceparameters)
- [getSubscriptionItems()](#getsubscriptionitemsparameters)
- [getSubscriptionItem()](#getsubscriptionitemparameters)
- [updateSubscriptionItem()](#updatesubscriptionitemparameters)
- [getSubscriptionItemUsage()](#getsubscriptionitemusageparameters)
- [getUsageRecords()](#getusagerecordsparameters)
- [getUsageRecord()](#getusagerecordparameters)
- [createUsageRecord()](#createusagerecordparameters)
- [getDiscounts()](#getdiscountsparameters)
- [getDiscount()](#getdiscountparameters)
- [createDiscount()](#creatediscountparameters)
- [deleteDiscount()](#deletediscountparameters)
- [getDiscountRedemptions()](#getdiscountredemptionsparameters)
- [getDiscountRedemption()](#getdiscountredemptionparameters)
- [getLicenseKeys()](#getlicensekeysparameters)
- [getLicenseKey()](#getlicensekeyparameters)
- [getLicenseKeyInstances()](#getlicensekeyinstancesparameters)
- [getLicenseKeyInstance()](#getlicensekeyinstanceparameters)
- [getWebhooks()](#getwebhooksparameters)
- [getWebhook()](#getwebhookparameters)
- [createWebhook()](#createwebhookparameters)
- [updateWebhook()](#updatewebhookparameters)
- [deleteWebhook()](#deletewebhookparameters)

---

### getUser()

Get the current user.

Returns a [User object](https://docs.lemonsqueezy.com/api/users).

[API reference](https://docs.lemonsqueezy.com/api/users#retrieve-the-authenticated-user).

#### Parameters

None.

#### Example

```javascript
const user = await ls.getUser()
```

---

### getStores(parameters)

Get the current user's stores.

Returns a list of [Store objects](https://docs.lemonsqueezy.com/api/stores).

[API reference](https://docs.lemonsqueezy.com/api/stores#list-all-stores).

#### Parameters

| Parameter | Type   | Required | Default | Notes                                                                                                                                          |
| --------- | ------ | -------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `perPage` | number |          | `10`    |                                                                                                                                                |
| `page`    | number |          | `1`     |                                                                                                                                                |
| `include` | string |          |         | Comma-separated list of object names: <ul><li>products</li><li>discounts</li><li>license-keys</li><li>subscriptions</li><li>webhooks</li></ul> |

#### Example

```javascript
const stores = await ls.getStores()

const stores = await ls.getStores({ include: 'products' })
```

---

### getStore(parameters)

Get a store.

Returns a [Store object](https://docs.lemonsqueezy.com/api/stores).

[API reference](https://docs.lemonsqueezy.com/api/stores#retrieve-a-store).

#### Parameters

| Parameter | Type   | Required | Default | Notes                                                                                                                                          |
| --------- | ------ | -------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`      | number | Yes      | -       |                                                                                                                                                |
| `include` | string | -        | -       | Comma-separated list of object names: <ul><li>products</li><li>discounts</li><li>license-keys</li><li>subscriptions</li><li>webhooks</li></ul> |

#### Example

```javascript
const store = await ls.getStore({ id: 123 })
```

---

### getProducts(parameters)

Get a list of products.

Returns a list of [Product objects](https://docs.lemonsqueezy.com/api/products).

[API reference](https://docs.lemonsqueezy.com/api/products#list-all-products).

#### Parameters

| Parameter | Type   | Required | Default | Notes                                                                          |
| --------- | ------ | -------- | ------- | ------------------------------------------------------------------------------ |
| `storeId` | number | -        | -       | Filter products by store.                                                      |
| `perPage` | number | -        | `10`    |                                                                                |
| `page`    | number | -        | `1`     |                                                                                |
| `include` | string | -        | -       | Comma-separated list of object names: <ul><li>store</li><li>variants</li></ul> |

#### Example

```javascript
const products = await ls.getProducts()

const products = await ls.getProducts({ storeId: 123, perPage: 50, include: 'variants' })
```

---

### getProduct(parameters)

Get a product.

Returns a [Product object](https://docs.lemonsqueezy.com/api/products).

[API reference](https://docs.lemonsqueezy.com/api/products#retrieve-a-product).

#### Parameters

| Parameter | Type   | Required | Default | Notes                                                                          |
| --------- | ------ | -------- | ------- | ------------------------------------------------------------------------------ |
| `id`      | number | Yes      | -       |                                                                                |
| `include` | string | -        | -       | Comma-separated list of object names: <ul><li>store</li><li>variants</li></ul> |

#### Example

```javascript
const product = await ls.getProduct({ id: 123 })
```

---

### getVariants(parameters)

Get a list of variants.

Returns a list of [Variant objects](https://docs.lemonsqueezy.com/api/variants).

[API reference](https://docs.lemonsqueezy.com/api/variants#list-all-variants).

#### Parameters

| Parameter   | Type   | Required | Default | Notes                                                                         |
| ----------- | ------ | -------- | ------- | ----------------------------------------------------------------------------- |
| `productId` | number | -        | -       | Filter variants by product.                                                   |
| `perPage`   | number | -        | `10`    |                                                                               |
| `page`      | number | -        | `1`     |                                                                               |
| `include`   | string | -        | -       | Comma-separated list of object names: <ul><li>product</li><li>files</li></ul> |

#### Example

```javascript
const variants = await ls.getVariants()

const variants = await ls.getVariants({ productId: 123, perPage: 50, include: 'product' })
```

---

### getVariant(parameters)

Get a variant.

Returns a [Variant object](https://docs.lemonsqueezy.com/api/variants).

[API reference](https://docs.lemonsqueezy.com/api/variants#retrieve-a-variant).

#### Parameters

| Parameter | Type   | Required | Default | Notes                                                                         |
| --------- | ------ | -------- | ------- | ----------------------------------------------------------------------------- |
| `id`      | number | Yes      | -       |                                                                               |
| `include` | string | -        | -       | Comma-separated list of object names: <ul><li>product</li><li>files</li></ul> |

#### Example

```javascript
const variant = await ls.getVariant({ id: 123 })
```

---

### getPrices(parameters)

Get a list of prices.

Returns a list of [Price objects](https://docs.lemonsqueezy.com/api/prices).

[API reference](https://docs.lemonsqueezy.com/api/prices#list-all-prices).

#### Parameters

| Parameter   | Type   | Required | Default | Notes                                                           |
| ----------- | ------ | -------- | ------- | --------------------------------------------------------------- |
| `variantId` | number | -        | -       | Filter prices by variant.                                       |
| `perPage`   | number | -        | `10`    |                                                                 |
| `page`      | number | -        | `1`     |                                                                 |
| `include`   | string | -        | -       | Comma-separated list of object names: <ul><li>variant</li></ul> |

#### Example

```javascript
const prices = await ls.getPrices()

const prices = await ls.getPrices({ variantId: 123, include: 'variant' })
```

---

### getPrice(parameters)

Get a price.

Returns a [Price object](https://docs.lemonsqueezy.com/api/prices).

[API reference](https://docs.lemonsqueezy.com/api/prices#retrieve-a-price).

#### Parameters

| Parameter | Type   | Required | Default | Notes                                                           |
| --------- | ------ | -------- | ------- | --------------------------------------------------------------- |
| `id`      | number | Yes      | -       |                                                                 |
| `include` | string | -        | -       | Comma-separated list of object names: <ul><li>variant</li></ul> |

#### Example

```javascript
const price = await ls.getPrice({ id: 123 })
```

---

### getCheckouts(parameters)

Get a list of checkouts.

Returns a list of [Checkout objects](https://docs.lemonsqueezy.com/api/checkouts).

[API reference](https://docs.lemonsqueezy.com/api/checkouts#list-all-checkouts).

#### Parameters

| Parameter   | Type   | Required | Default | Notes                                                                         |
| ----------- | ------ | -------- | ------- | ----------------------------------------------------------------------------- |
| `storeId`   | number | -        | -       | Filter checkouts by store.                                                    |
| `variantId` | number | -        | -       | Filter checkouts by variant.                                                  |
| `perPage`   | number | -        | `10`    |                                                                               |
| `page`      | number | -        | `1`     |                                                                               |
| `include`   | string | -        | -       | Comma-separated list of object names: <ul><li>store</li><li>variant</li></ul> |

#### Example

```javascript
const checkouts = await ls.getCheckouts()

const checkouts = await ls.getCheckouts({ storeId: 123, perPage: 50 })
```

---

### getCheckout(parameters)

Get a checkout.

Returns a [Checkout object](https://docs.lemonsqueezy.com/api/checkouts).

[API reference](https://docs.lemonsqueezy.com/api/checkouts#retrieve-a-checkout).

#### Parameters

| Parameter | Type   | Required | Default | Notes                                                                         |
| --------- | ------ | -------- | ------- | ----------------------------------------------------------------------------- |
| `id`      | string | Yes      | -       | Checkout IDs are UUIDs.                                                       |
| `include` | string | -        | -       | Comma-separated list of object names: <ul><li>store</li><li>variant</li></ul> |

#### Example

```javascript
const checkout = await ls.getCheckout({ id: 'edc0158c-794a-445d-bfad-24ab66baeb01' })
```

---

### createCheckout(parameters)

Create a checkout.

This method allows you to retrieve a product's checkout URL (using store and variant IDs) or create fully customised checkouts (using additional attributes).

Returns a [Checkout object](https://docs.lemonsqueezy.com/api/checkouts).

[API reference](https://docs.lemonsqueezy.com/api/checkouts#create-a-checkout).

#### Parameters

| Parameter    | Type   | Required | Default | Notes                                                                                                                |
| ------------ | ------ | -------- | ------- | -------------------------------------------------------------------------------------------------------------------- |
| `storeId`    | number | Yes      | -       |                                                                                                                      |
| `variantId`  | number | Yes      | -       |                                                                                                                      |
| `attributes` | Object | -        | -       | An [object of values](https://docs.lemonsqueezy.com/api/checkouts#create-a-checkout) used to configure the checkout. |

#### Example

```
let attributes = {
  checkout_data: {
    email: 'user@gmail.com',
    discount_code: '10PERCENT',
    custom: {
      user_id: 123
    }
  },
  product_options: {
    redirect_url: 'https://customredirect.com'
  },
  checkout_options: {
    dark: true,
    logo: false
  }
}

const checkout = await ls.createCheckout({ storeId: 123, variantId: 123, attributes })
```

---

### getCustomers(parameters)

Get a list of customers.

Returns a list of [Customer objects](https://docs.lemonsqueezy.com/api/customers).

[API reference](https://docs.lemonsqueezy.com/api/customers#list-all-customers).

#### Parameters

| Parameter | Type   | Required | Default | Notes                                                                                                                   |
| --------- | ------ | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------- |
| `storeId` | number | -        | -       | Filter customers by store.                                                                                              |
| `email`   | string | -        | -       | Filter customers by email address.                                                                                      |
| `perPage` | number | -        | `10`    |                                                                                                                         |
| `page`    | number | -        | `1`     |                                                                                                                         |
| `include` | string | -        | -       | Comma-separated list of object names: <ul><li>license-keys</li><li>orders</li><li>store</li><li>subscriptions</li></ul> |

#### Example

```javascript
const customers = await ls.getCustomers()

const customers = await ls.getCustomers({ email: 'customer@gmail.com', include: 'orders,license-keys,subscriptions' })
```

---

### getCustomer(parameters)

Get a customer.

Returns a [Customer object](https://docs.lemonsqueezy.com/api/customers).

[API reference](https://docs.lemonsqueezy.com/api/customers#retrieve-a-customer).

#### Parameters

| Parameter | Type   | Required | Default | Notes                                                                                                                   |
| --------- | ------ | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------- |
| `id`      | number | Yes      | -       |                                                                                                                         |
| `include` | string | -        | -       | Comma-separated list of object names: <ul><li>license-keys</li><li>orders</li><li>store</li><li>subscriptions</li></ul> |

#### Example

```javascript
const customer = await ls.getCustomer({ id: 123 })
```

---

### getOrders(parameters)

Get a list of orders.

Returns a list of [Order objects](https://docs.lemonsqueezy.com/api/orders).

[API reference](https://docs.lemonsqueezy.com/api/orders#list-all-orders).

#### Parameters

| Parameter   | Type   | Required | Default | Notes                                                                                                                                                                      |
| ----------- | ------ | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `storeId`   | number | -        | -       | Filter orders by store.                                                                                                                                                    |
| `userEmail` | string | -        | -       | Filter orders by email address.                                                                                                                                            |
| `perPage`   | number | -        | `10`    |                                                                                                                                                                            |
| `page`      | number | -        | `1`     |                                                                                                                                                                            |
| `include`   | string | -        | -       | Comma-separated list of object names: <ul><li>customer</li><li>discount-redemptions</li><li>license-keys</li><li>order-items</li><li>store</li><li>subscriptions</li></ul> |

#### Example

```javascript
const orders = await ls.getOrders()

const orders = await ls.getOrders({ email: 'customer@gmail.com', include: 'orders,license-keys,subscriptions' })
```

---

### getOrder(parameters)

Get an order.

Returns an [Order object](https://docs.lemonsqueezy.com/api/orders).

[API reference](https://docs.lemonsqueezy.com/api/orders#retrieve-a-order).

#### Parameters

| Parameter | Type   | Required | Default | Notes                                                                                                                                                                      |
| --------- | ------ | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`      | number | Yes      | -       |                                                                                                                                                                            |
| `include` | string | -        | -       | Comma-separated list of object names: <ul><li>customer</li><li>discount-redemptions</li><li>license-keys</li><li>order-items</li><li>store</li><li>subscriptions</li></ul> |

#### Example

```javascript
const order = await ls.getOrder({ id: 123 })
```

---

### getFiles(parameters)

Get a list of files.

Returns a list of [File objects](https://docs.lemonsqueezy.com/api/files).

[API reference](https://docs.lemonsqueezy.com/api/files#list-all-files).

#### Parameters

| Parameter   | Type   | Required | Default | Notes                                                           |
| ----------- | ------ | -------- | ------- | --------------------------------------------------------------- |
| `variantId` | number | -        | -       | Filter files by variant.                                        |
| `perPage`   | number | -        | `10`    |                                                                 |
| `page`      | number | -        | `1`     |                                                                 |
| `include`   | string | -        | -       | Comma-separated list of object names: <ul><li>variant</li></ul> |

#### Example

```javascript
const files = await ls.getFiles()

const files = await ls.getFiles({ variantId: 123 })
```

---

### getFile(parameters)

Get a file.

Returns a [File object](https://docs.lemonsqueezy.com/api/files).

[API reference](https://docs.lemonsqueezy.com/api/files#retrieve-a-file).

#### Parameters

| Parameter | Type   | Required | Default | Notes                                                           |
| --------- | ------ | -------- | ------- | --------------------------------------------------------------- |
| `id`      | number | Yes      | -       |                                                                 |
| `include` | string | -        | -       | Comma-separated list of object names: <ul><li>variant</li></ul> |

#### Example

```javascript
const file = await ls.getFile({ id: 123 })
```

---

### getOrderItems(parameters)

Get a list of order items.

Returns a list of [Order item objects](https://docs.lemonsqueezy.com/api/order-items).

[API reference](https://docs.lemonsqueezy.com/api/order-items#list-all-order-items).

#### Parameters

| Parameter   | Type   | Required | Default | Notes                                                                                         |
| ----------- | ------ | -------- | ------- | --------------------------------------------------------------------------------------------- |
| `orderId`   | number | -        | -       | Filter order items by order.                                                                  |
| `productId` | number | -        | -       | Filter order items by product.                                                                |
| `variantId` | number | -        | -       | Filter order items by variant.                                                                |
| `perPage`   | number | -        | `10`    |                                                                                               |
| `page`      | number | -        | `1`     |                                                                                               |
| `include`   | string | -        | -       | Comma-separated list of object names: <ul><li>order</li><li>product</li><li>variant</li></ul> |

#### Example

```javascript
const orderItems = await ls.getOrderItems()

const orderItems = await ls.getOrderItems({ order: 123 })
```

---

### getOrderItem(parameters)

Get an order item.

Returns an [Order item object](https://docs.lemonsqueezy.com/api/order-items).

[API reference](https://docs.lemonsqueezy.com/api/order-items#retrieve-an-order-item).

#### Parameters

| Parameter | Type   | Required | Default | Notes                                                                                         |
| --------- | ------ | -------- | ------- | --------------------------------------------------------------------------------------------- |
| `id`      | number | Yes      | -       |                                                                                               |
| `include` | string | -        | -       | Comma-separated list of object names: <ul><li>order</li><li>product</li><li>variant</li></ul> |

#### Example

```javascript
const orderItem = await ls.getOrderItem({ id: 123 })
```

---

### getSubscriptions(parameters)

Get a list of subscriptions.

Returns a list of [Subscription objects](https://docs.lemonsqueezy.com/api/subscriptions).

[API reference](https://docs.lemonsqueezy.com/api/subscriptions#list-all-subscriptions).

#### Parameters

| Parameter     | Type   | Required | Default | Notes                                                                                                                                                                            |
| ------------- | ------ | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `storeId`     | number | -        | -       | Filter subscriptions by store.                                                                                                                                                   |
| `orderId`     | number | -        | -       | Filter subscriptions by order.                                                                                                                                                   |
| `orderItemId` | number | -        | -       | Filter subscriptions by order item.                                                                                                                                              |
| `productId`   | number | -        | -       | Filter subscriptions by product.                                                                                                                                                 |
| `variantId`   | number | -        | -       | Filter subscriptions by variant.                                                                                                                                                 |
| `status`      | string | -        | -       | Filter subscriptions by status. Options: <ul><li>`on_trial`</li><li>`active`</li><li>`paused`</li><li>`past_due`</li><li>`unpaid`</li><li>`cancelled`</li><li>`expired</li></ul> |
| `perPage`     | number | -        | `10`    |                                                                                                                                                                                  |
| `page`        | number | -        | `1`     |                                                                                                                                                                                  |
| `include`     | string | -        | -       | Comma-separated list of object names: <ul><li>store</li><li>customer</li><li>order</li><li>order-item</li><li>product</li><li>variant</li></ul>                                  |

#### Example

```javascript
const subscriptions = await ls.getSubscriptions()

const subscriptions = await ls.getSubscriptions({ storeId: 123, status: 'past_due' })
```

---

### getSubscription(parameters)

Get a subscription.

Returns a [Subscription object](https://docs.lemonsqueezy.com/api/subscriptions).

[API reference](https://docs.lemonsqueezy.com/api/subscriptions#retrieve-a-subscription).

#### Parameters

| Parameter | Type   | Required | Default | Notes                                                                                                                                           |
| --------- | ------ | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`      | number | Yes      | -       |                                                                                                                                                 |
| `include` | string | -        | -       | Comma-separated list of object names: <ul><li>store</li><li>customer</li><li>order</li><li>order-item</li><li>product</li><li>variant</li></ul> |

#### Example

```javascript
const subscription = await ls.getSubscription({ id: 123 })
```

---

### updateSubscription(parameters)

Update a subscription: change plan or billing anchor.

Returns a [Subscription object](https://docs.lemonsqueezy.com/api/subscriptions).

[API reference](https://docs.lemonsqueezy.com/api/subscriptions#update-a-subscription).

#### Parameters

| Parameter       | Type   | Required          | Default | Notes                                                                                                                                                                                                                                                            |
| --------------- | ------ | ----------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`            | number | Yes               | -       |                                                                                                                                                                                                                                                                  |
| `productId`     | number | If changing plans | -       | ID of product when changing plans.                                                                                                                                                                                                                               |
| `variantId`     | number | If changing plans | -       | ID of variant when changing plans.                                                                                                                                                                                                                               |
| `proration`     | string | -                 | -       | Set the proration when changing plans. <ul><li>Use `immediate` to charge a prorated amount immediately</li><li>Use `disable` to charge a full amount immediately</li><li>If `proration` is not included, proration will occur at the next renewal date</li></ul> |
| `billingAnchor` | number | -                 | -       | Change the billing day used for renewal charges. Must be a number between `1` and `31`.                                                                                                                                                                          |

#### Example

```javascript
const subscription = await ls.updateSubscription({ id: 123, productId: 123, variantId: 123 })
```

---

### cancelSubscription(parameters)

Cancel a subscription.

Returns a [Subscription object](https://docs.lemonsqueezy.com/api/subscriptions).

[API reference](https://docs.lemonsqueezy.com/api/subscriptions#cancel-a-subscription).

#### Parameters

| Parameter | Type   | Required | Default | Notes |
| --------- | ------ | -------- | ------- | ----- |
| `id`      | number | Yes      | -       |       |

#### Example

```javascript
const subscription = await ls.cancelSubscription({ id: 123 })
```

---

### resumeSubscription(parameters)

Resume a cancelled subscription.

Returns a [Subscription object](https://docs.lemonsqueezy.com/api/subscriptions).

[API reference](https://docs.lemonsqueezy.com/api/subscriptions#update-a-subscription).

#### Parameters

| Parameter | Type   | Required | Default | Notes |
| --------- | ------ | -------- | ------- | ----- |
| `id`      | number | Yes      | -       |       |

#### Example

```javascript
const subscription = await ls.resumeSubscription({ id: 123 })
```

---

### pauseSubscription(parameters)

Pause a subscription (halt payment renewals).

Returns a [Subscription object](https://docs.lemonsqueezy.com/api/subscriptions).

[API reference](https://docs.lemonsqueezy.com/api/subscriptions#update-a-subscription).

#### Parameters

| Parameter   | Type   | Required | Default | Notes                                                                                                                                          |
| ----------- | ------ | -------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`        | number | Yes      | -       |                                                                                                                                                |
| `mode`      | string | -        | `void`  | Type of pause: <ul><li>`void` - your product or service is unavailable to customers</li><li>`free` - the user should get free access</li></ul> |
| `resumesAt` | string | -        | -       | Date to automatically resume the subscription ([ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format datetime).                            |

#### Example

```javascript
const subscription = await ls.pauseSubscription({ id: 123 })
```

---

### unpauseSubscription(parameters)

Un-pause a paused subscription.

Returns a [Subscription object](https://docs.lemonsqueezy.com/api/subscriptions).

[API reference](https://docs.lemonsqueezy.com/api/subscriptions#update-a-subscription).

#### Parameters

| Parameter | Type   | Required | Default | Notes |
| --------- | ------ | -------- | ------- | ----- |
| `id`      | number | Yes      | -       |       |

#### Example

```javascript
const subscription = await ls.unpauseSubscription({ id: 123 })
```

---

### getSubscriptionInvoices(parameters)

Get a list of subscription invoices.

Returns a list of [Subscription invoice objects](https://docs.lemonsqueezy.com/api/subscription-invoices).

[API reference](https://docs.lemonsqueezy.com/api/subscription-invoices#list-all-subscription-invoices).

#### Parameters

| Parameter        | Type    | Required | Default | Notes                                                                                                                         |
| ---------------- | ------- | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `storeId`        | number  | -        | -       | Filter subscription invoices by store.                                                                                        |
| `status`         | string  | -        | -       | Filter subscription invoices by status. Options: <ul><li>`paid`</li><li>`pending`</li><li>`void`</li><li>`refunded`</li></ul> |
| `refunded`       | boolean | -        | -       | Filter subscription invoices by refunded.                                                                                     |
| `subscriptionId` | number  | -        | -       | Filter subscription invoices by subscription.                                                                                 |
| `perPage`        | number  | -        | `10`    |                                                                                                                               |
| `page`           | number  | -        | `1`     |                                                                                                                               |
| `include`        | string  | -        | -       | Comma-separated list of object names: <ul><li>store</li><li>subscription</li></ul>                                            |

#### Example

```javascript
const subscriptionInvoices = await ls.getSubscriptionInvoices()

const subscriptionInvoices = await ls.getSubscriptionInvoices({ storeId: 123, refunded: true })
```

---

### getSubscriptionInvoice(parameters)

Get a subscription invoice.

Returns a [Subscription invoice object](https://docs.lemonsqueezy.com/api/subscription-invoices).

[API reference](https://docs.lemonsqueezy.com/api/subscription-invoices#retrieve-a-subscription-invoice).

#### Parameters

| Parameter | Type   | Required | Default | Notes                                                                              |
| --------- | ------ | -------- | ------- | ---------------------------------------------------------------------------------- |
| `id`      | number | Yes      | -       |                                                                                    |
| `include` | string | -        | -       | Comma-separated list of object names: <ul><li>store</li><li>subscription</li></ul> |

#### Example

```javascript
const subscriptionInvoice = await ls.getSubscriptionInvoice({ id: 123 })
```

---

### getSubscriptionItems(parameters)

Get a list of subscription items.

Returns a list of [Subscription item objects](https://docs.lemonsqueezy.com/api/subscription-items).

[API reference](https://docs.lemonsqueezy.com/api/subscription-items#list-all-subscription-items).

#### Parameters

| Parameter        | Type   | Required | Default | Notes                                                         |
| ---------------- | ------ | -------- | ------- | ------------------------------------------------------------- |
| `subscriptionId` | number | -        | -       | Filter subscription items by subscription.                    |
| `perPage`        | number | -        | `10`    |                                                               |
| `page`           | number | -        | `1`     |                                                               |
| `include`        | string | -        | -       | Comma-separated list of object names: <ul><li>subscription</li><li>price</li><li>usage-records</li></ul> |

#### Example

```javascript
const subscriptionItems = await ls.getSubscriptionItems()

const subscriptionItems = await ls.getSubscriptionItems({ storeId: 123 })
```

---

### getSubscriptionItem(parameters)

Get a subscription item.

Returns a [Subscription item object](https://docs.lemonsqueezy.com/api/subscription-items).

[API reference](https://docs.lemonsqueezy.com/api/subscription-items#retrieve-a-subscription-item).

#### Parameters

| Parameter | Type   | Required | Default | Notes                                                         |
| --------- | ------ | -------- | ------- | ------------------------------------------------------------- |
| `id`      | number | Yes      | -       |                                                               |
| `include` | string | -        | -       | Comma-separated list of object names: <ul><li>subscription</li><li>price</li><li>usage-records</li></ul> |

#### Example

```javascript
const subscriptionItem = await ls.getSubscriptionItem({ id: 123, include: 'price' })
```

---

### updateSubscriptionItem(parameters)

Update the quantity of a subscription item.

Returns a [Subscription item object](https://docs.lemonsqueezy.com/api/subscription-items).

[API reference](https://docs.lemonsqueezy.com/api/subscription-items#update-a-subscription-item).

#### Parameters

| Parameter  | Type   | Required | Default | Notes |
| ---------- | ------ | -------- | ------- | ----- |
| `id`       | number | Yes      | -       |       |
| `quantity` | number | Yes      | -       |       |

#### Example

```javascript
const subscriptionItem = await ls.updateSubscriptionItem({ id: 123, quantity: 10 })
```

---

### getSubscriptionItemUsage(parameters)

Retrieves a subscription item's current usage.

Returns a meta object containing usage information.

[API reference](https://docs.lemonsqueezy.com/api/subscription-items#retrieve-a-subscription-item-s-current-usage).

#### Parameters

| Parameter  | Type   | Required | Default | Notes |
| ---------- | ------ | -------- | ------- | ----- |
| `id`       | number | Yes      | -       |       |

#### Example

```javascript
const usageInformation = await ls.getSubscriptionItemUsage({ id: 123 })
```

---

### getUsageRecords(parameters)

Get a list of usage records.

Returns a list of [Usage record objects](https://docs.lemonsqueezy.com/api/usage-records).

[API reference](https://docs.lemonsqueezy.com/api/usage-records#list-all-usage-records).

#### Parameters

| Parameter            | Type   | Required | Default | Notes                                                         |
| -------------------- | ------ | -------- | ------- | ------------------------------------------------------------- |
| `subscriptionItemId` | number | -        | -       | Filter usage records by subscription item.                    |
| `perPage`            | number | -        | `10`    |                                                               |
| `page`               | number | -        | `1`     |                                                               |
| `include`            | string | -        | -       | Comma-separated list of object names: <ul><li>subscription-item</li></ul> |

#### Example

```javascript
const usageRecords = await ls.getUsageRecords()

const usageRecords = await ls.getUsageRecords({ subscriptionItemId: 123 })
```

---

### getUsageRecord(parameters)

Get a usage record.

Returns a [Usage record object](https://docs.lemonsqueezy.com/api/usage-records).

[API reference](https://docs.lemonsqueezy.com/api/usage-records#retrieve-a-usage-record).

#### Parameters

| Parameter | Type   | Required | Default | Notes                                                         |
| --------- | ------ | -------- | ------- | ------------------------------------------------------------- |
| `id`      | number | Yes      | -       |                                                               |
| `include` | string | -        | -       | Comma-separated list of object names: <ul><li>subscription-item</li></ul> |

#### Example

```javascript
const usageRecord = await ls.getUsageRecord({ id: 123 })
```

---

### createUsageRecord(parameters)

Create a usage record.

Returns a [Usage record object](https://docs.lemonsqueezy.com/api/usage-records).

[API reference](https://docs.lemonsqueezy.com/api/usage-records#create-a-usage-record).

#### Parameters

| Parameter            | Type   | Required | Default     | Notes |
| -------------------- | ------ | -------- | ----------- | ----- |
| `subscriptionItemId` | number | Yes      | -           |       |
| `quantity`           | number | Yes      | -           |       |
| `action`             | string | -        | `increment` | The type of record:<ul><li>`increment` - Add to existing records from this billing period.</li><li>`set` - Reset usage in this billing period to the given quantity.</li></ul> |

#### Example

```javascript
const usageRecord = await ls.createUsageRecord({
  subscriptionItemId: 123,
  quantity: 18
})
```

---

### getDiscounts(parameters)

Get a list of discounts.

Returns a list of [Discount objects](https://docs.lemonsqueezy.com/api/discounts).

[API reference](https://docs.lemonsqueezy.com/api/discounts#list-all-discounts).

#### Parameters

| Parameter | Type   | Required | Default | Notes                                                                                                       |
| --------- | ------ | -------- | ------- | ----------------------------------------------------------------------------------------------------------- |
| `storeId` | number | -        | -       | Filter discounts by store.                                                                                  |
| `perPage` | number | -        | `10`    |                                                                                                             |
| `page`    | number | -        | `1`     |                                                                                                             |
| `include` | string | -        | -       | Comma-separated list of object names: <ul><li>store</li><li>variants</li><li>discount-redemptions</li></ul> |

#### Example

```javascript
const discounts = await ls.getDiscounts()

const discounts = await ls.getDiscounts({ storeId: 123, include: 'discount-redemptions' })
```

---

### getDiscount(parameters)

Get a discount.

Returns a [Discount object](https://docs.lemonsqueezy.com/api/discounts).

[API reference](https://docs.lemonsqueezy.com/api/discounts#retrieve-a-discount).

#### Parameters

| Parameter | Type   | Required | Default | Notes                                                                                                       |
| --------- | ------ | -------- | ------- | ----------------------------------------------------------------------------------------------------------- |
| `id`      | number | Yes      | -       |                                                                                                             |
| `include` | string | -        | -       | Comma-separated list of object names: <ul><li>store</li><li>variants</li><li>discount-redemptions</li></ul> |

#### Example

```javascript
const discount = await ls.getDiscount({ id: 123 })
```

---

### createDiscount(parameters)

Create a discount.

Returns a [Discount object](https://docs.lemonsqueezy.com/api/discounts).

[API reference](https://docs.lemonsqueezy.com/api/discounts#create-a-discount).

#### Parameters

| Parameter          | Type     | Required | Default   | Notes                                                                                                                                                                                                                                                             |
| ------------------ | -------- | -------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `storeId`          | number   | Yes      | -         |                                                                                                                                                                                                                                                                   |
| `name`             | string   | Yes      | -         | The reference name of the discount.                                                                                                                                                                                                                               |
| `code`             | string   | Yes      | -         | The discount code. Can contain uppercase letters and numbers, between 3 and 256 characters.                                                                                                                                                                       |
| `amount`           | string   | Yes      | -         | Either a fixed amount in cents or a percentage: <ul><li>`1000` means $10 when `amount_type` is `fixed`</li><li>`10` means 10% when `amount_type` is `percent`</li>                                                                                                |
| `amountType`       | string   | -        | `percent` | The type of discount. Options: <ul><li>`percent`</li><li>`fixed`</li></ul>                                                                                                                                                                                        |
| `duration`         | string   | -        | `once`    | How many times the discount should apply (for subscriptions only). Options: <ul><li>`once` - only the first payment.</li><li>`repeating` - applies for months defined in `durationInMonths`.</li><li>`forever` - applies to every subscription .payment</li></ul> |
| `durationInMonths` | number   | -        | -         | How many months the discount should apply when `duration` is `repeating`.                                                                                                                                                                                         |
| `variantIds`       | number[] | -        | -         | Limit discount to certain variants.<br>List of variant IDs like `[1,2,3]`.                                                                                                                                                                                        |
| `maxRedemptions`   | number   | -        | -         | Limit the total amount of redemptions allowed.                                                                                                                                                                                                                    |
| `startsAt`         | string   | -        | -         | Date the discount code starts on ([ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format datetime).                                                                                                                                                            |
| `expiresAt`        | string   | -        | -         | Date the discount code expires on ([ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format datetime).                                                                                                                                                           |

#### Example

```javascript
const options = {
  storeId: 123,
  name: 'Summer sale',
  code: 'SUMMERSALE',
  amount: 30,
  amountType: 'percent',
  duration: 'repeating',
  durationInMonths: 3,
  startsAt: '2023-07-31T08:00:00.000000Z'
}
const discount = await ls.createDiscount(options)
```

---

### deleteDiscount(parameters)

Delete a discount.

[API reference](https://docs.lemonsqueezy.com/api/discounts#delete-a-discount).

#### Parameters

| Parameter | Type   | Required | Default | Notes |
| --------- | ------ | -------- | ------- | ----- |
| `id`      | number | Yes      | -       |       |

#### Example

```javascript
await ls.deleteDiscount({ id: 123 })
```

---

### getDiscountRedemptions(parameters)

Get a list of discount redemptions.

Returns a list of [Discount redemption objects](https://docs.lemonsqueezy.com/api/discount-redemptions).

[API reference](https://docs.lemonsqueezy.com/api/discount-redemptions#list-all-discount-redemptions).

#### Parameters

| Parameter    | Type   | Required | Default | Notes                                                                          |
| ------------ | ------ | -------- | ------- | ------------------------------------------------------------------------------ |
| `discountId` | number | -        | -       | Filter discount redemptions by discount.                                       |
| `orderId`    | number | -        | -       | Filter discount redemptions by order.                                          |
| `perPage`    | number | -        | `10`    |                                                                                |
| `page`       | number | -        | `1`     |                                                                                |
| `include`    | string | -        | -       | Comma-separated list of object names: <ul><li>discount</li><li>order</li></ul> |

#### Example

```javascript
const discountRedemptions = await ls.getDiscountRedemptions()

const discountRedemptions = await ls.getDiscountRedemptions({ orderId: 123, include: 'discount,order' })
```

---

### getDiscountRedemption(parameters)

Get a discount redemption.

Returns a [Discount redemption object](https://docs.lemonsqueezy.com/api/discount-redemptions).

[API reference](https://docs.lemonsqueezy.com/api/discount-redemptions#retrieve-a-discount-redemption).

#### Parameters

| Parameter | Type   | Required | Default | Notes                                                                          |
| --------- | ------ | -------- | ------- | ------------------------------------------------------------------------------ |
| `id`      | number | Yes      | -       |                                                                                |
| `include` | string | -        | -       | Comma-separated list of object names: <ul><li>discount</li><li>order</li></ul> |

#### Example

```javascript
const discountRedemption = await ls.getDiscountRedemption({ id: 123 })
```

---

### getLicenseKeys(parameters)

Get a list of license keys.

Returns a list of [License key objects](https://docs.lemonsqueezy.com/api/license-keys).

[API reference](https://docs.lemonsqueezy.com/api/license-keys#list-all-license-keys).

#### Parameters

| Parameter     | Type   | Required | Default | Notes                                                                                                                                                         |
| ------------- | ------ | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `storeId`     | number | -        | -       | Filter license keys by store.                                                                                                                                 |
| `orderId`     | number | -        | -       | Filter license keys by order.                                                                                                                                 |
| `orderItemId` | number | -        | -       | Filter license keys by order item.                                                                                                                            |
| `productId`   | number | -        | -       | Filter license keys by product.                                                                                                                               |
| `perPage`     | number | -        | `10`    |                                                                                                                                                               |
| `page`        | number | -        | `1`     |                                                                                                                                                               |
| `include`     | string | -        | -       | Comma-separated list of object names: <ul><li>store</li><li>customer</li><li>order</li><li>order-item</li><li>product</li><li>license-key-instances</li></ul> |

#### Example

```javascript
const licenseKeys = await ls.getLicenseKeys()

const licenseKeys = await ls.getLicenseKeys({ storeId: 123 })
```

---

### getLicenseKey(parameters)

Get a license key.

Returns a [License key object](https://docs.lemonsqueezy.com/api/license-keys).

[API reference](https://docs.lemonsqueezy.com/api/license-keys#retrieve-a-license-key).

#### Parameters

| Parameter | Type   | Required | Default | Notes                                                                                                                                                         |
| --------- | ------ | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`      | number | Yes      | -       |                                                                                                                                                               |
| `include` | string | -        | -       | Comma-separated list of object names: <ul><li>store</li><li>customer</li><li>order</li><li>order-item</li><li>product</li><li>license-key-instances</li></ul> |

#### Example

```javascript
const licenseKey = await ls.getLicenseKey({ id: 123 })
```

---

### getLicenseKeyInstances(parameters)

Get a list of license key instances.

Returns a list of [License key instance objects](https://docs.lemonsqueezy.com/api/license-key-instances).

[API reference](https://docs.lemonsqueezy.com/api/license-key-instances#list-all-license-key-instances).

#### Parameters

| Parameter      | Type   | Required | Default | Notes                                                                                                                                                         |
| -------------- | ------ | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `licenseKeyId` | number | -        | -       | Filter license key instances by license key.                                                                                                                  |
| `perPage`      | number | -        | `10`    |                                                                                                                                                               |
| `page`         | number | -        | `1`     |                                                                                                                                                               |
| `include`      | string | -        | -       | Comma-separated list of object names: <ul><li>store</li><li>customer</li><li>order</li><li>order-item</li><li>product</li><li>license-key-instances</li></ul> |

#### Example

```javascript
const licenseKeys = await ls.getLicenseKeys()

const licenseKeys = await ls.getLicenseKeys({ licenseKeyId: 123 })
```

---

### getLicenseKeyInstance(parameters)

Get a license key instance.

Returns a [License key instance object](https://docs.lemonsqueezy.com/api/license-key-instances).

[API reference](https://docs.lemonsqueezy.com/api/license-key-instances#retrieve-a-license-key-instance).

#### Parameters

| Parameter | Type   | Required | Default | Notes                                                                                                                                                         |
| --------- | ------ | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`      | number | Yes      | -       |                                                                                                                                                               |
| `include` | string | -        | -       | Comma-separated list of object names: <ul><li>store</li><li>customer</li><li>order</li><li>order-item</li><li>product</li><li>license-key-instances</li></ul> |

#### Example

```javascript
const licenseKey = await ls.getLicenseKey({ id: 123 })
```

---

### getWebhooks(parameters)

Get a list of webhooks.

Returns a list of [Webhook objects](https://docs.lemonsqueezy.com/api/webhooks).

[API reference](https://docs.lemonsqueezy.com/api/webhooks#list-all-webhooks).

#### Parameters

| Parameter | Type   | Required | Default | Notes                                                         |
| --------- | ------ | -------- | ------- | ------------------------------------------------------------- |
| `storeId` | number | -        | -       | Filter webhooks by store.                                     |
| `perPage` | number | -        | `10`    |                                                               |
| `page`    | number | -        | `1`     |                                                               |
| `include` | string | -        | -       | Comma-separated list of object names: <ul><li>store</li></ul> |

#### Example

```javascript
const webhooks = await ls.getWebhooks()

const webhooks = await ls.getWebhooks({ storeId: 123 })
```

---

### getWebhook(parameters)

Get a webhook.

Returns a [Webhook object](https://docs.lemonsqueezy.com/api/webhooks).

[API reference](https://docs.lemonsqueezy.com/api/webhooks#retrieve-a-webhook).

#### Parameters

| Parameter | Type   | Required | Default | Notes                                                         |
| --------- | ------ | -------- | ------- | ------------------------------------------------------------- |
| `id`      | number | Yes      | -       |                                                               |
| `include` | string | -        | -       | Comma-separated list of object names: <ul><li>store</li></ul> |

#### Example

```javascript
const webhook = await ls.getWebhook({ id: 123 })
```

---

### createWebhook(parameters)

Create a webhook.

Returns a [Webhook object](https://docs.lemonsqueezy.com/api/webhooks).

[API reference](https://docs.lemonsqueezy.com/api/webhooks#create-a-webhook).

#### Parameters

| Parameter | Type     | Required | Default | Notes                                                                                                                                             |
| --------- | -------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `storeId` | number   | Yes      | -       |                                                                                                                                                   |
| `url`     | string   | Yes      | -       | The endpoint URL that the webhooks should be sent to.                                                                                             |
| `events`  | string[] | Yes      | -       | A list of webhook events to receive. [See all options](https://docs.lemonsqueezy.com/help/webhooks#event-types)                                   |
| `secret`  | string   | Yes      | -       | A signing secret used to [secure the webhook](https://docs.lemonsqueezy.com/help/webhooks#signing-requests). Must be between 6 and 40 characters. |

#### Example

```javascript
const options = {
  storeId: 123,
  url: 'https://myapp.com/webhook/',
  events: [
    'subscription_created',
    'subscription_updated'
  ],
  secret: 'randomstring'
}
const webhook = await ls.createWebhook(options)
```

---

### updateWebhook(parameters)

Update a webhook.

Returns a [Webhook object](https://docs.lemonsqueezy.com/api/webhooks).

[API reference](https://docs.lemonsqueezy.com/api/webhooks#update-a-webhook).

#### Parameters

| Parameter | Type     | Required | Default | Notes                                                                                                                                             |
| --------- | -------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`      | number   | -        | -       |                                                                                                                                                   |
| `url`     | string   | -        | -       | The endpoint URL that the webhooks should be sent to.                                                                                             |
| `events`  | string[] | -        | -       | A list of webhook events to receive. [See all options](https://docs.lemonsqueezy.com/help/webhooks#event-types)                                   |
| `secret`  | string   | -        | -       | A signing secret used to [secure the webhook](https://docs.lemonsqueezy.com/help/webhooks#signing-requests). Must be between 6 and 40 characters. |

#### Example

```javascript
const options = {
  id: 123,
  url: 'https://myapp.com/webhook/',
}
const webhook = await ls.updateWebhook(options)
```

---

### deleteWebhook(parameters)

Delete a webhook.

[API reference](https://docs.lemonsqueezy.com/api/webhooks#delete-a-webhook).

#### Parameters

| Parameter | Type   | Required | Default | Notes |
| --------- | ------ | -------- | ------- | ----- |
| `id`      | number | Yes      | -       |       |

#### Example

```javascript
await ls.deleteWebhook({ id: 123 })
```

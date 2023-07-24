# The official Lemon Squeezy JavaScript SDK

## Introduction

Please read the [API reference introduction page](https://docs.lemonsqueezy.com/api) to understand how the API works.

**This README is a work-in-progress.**

## Installation

### Install the pacakge

Install with `npm install @lemonsqueezy/lemonsqueezy.js`

### Create an API key

Create a new API key from [Settings > API](https://app.lemonsqueezy.com/settings/api) in your Lemon Squeezy dashboard.

Add this API key into your project, for example as `LEMONSQUEEZY_API_KEY` in your `.env` file.

## Usage

### Basic usage

```javascript
import LemonSqueezy from 'lemonsqueezy.js'
const ls = new LemonSqueezy(process.env.LEMONSQUEEZY_API_KEY);

const products = await ls.getProducts()
```

Parameters for requests should be passed in an object. For list methods, these parameters are used for filtering and for list pagination. For create and update methods, these parameters contain the values for the request.

```javascript
const subscriptions = await ls.getSubscriptions({ storeId: 123, perPage: 50 })

const subscription = await ls.getSubscription({ id: 123, include: 'subscription-invoices' })

const subscription = await ls.cancelSubscription({ id: 123 })
```

### Including related resources

You can use `include` in every "read" method to pull in [related resources](https://docs.lemonsqueezy.com/api#including-related-resources) (works for both individual and list methods).

```javascript
const product = await ls.getProduct({ id: 123 include: 'variants' })
````

### Pagination

Endpoints that return a list of results can be paged using optional `page` and `perPage` values.
If `perPage` is omitted, the API returns the default of 10 results per page.
`perPage` should be a value between 1 and 100.

```javascript
// Querying a list of orders for store #3, 50 records per page, page 2, including store and customer related resoueces
const order = await ls.getOrders({ storeId: 3, perPage: 50, page: 2, include: 'store,customer' })
````

### Handling errors

Each method will throw an exception if there are issues with the request. JSON will be returned containing error details.

Use `try { ... } catch { ... }` to access this object. Error messages will be available in a list in `errors`.

```javascript
// "something" is not a valid value for `include`
try {
  const subscriptions = await ls.getSubscriptions({ include: 'something' })
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

### Looping lists

You can use `page` and `perPage` to loop lists of results.

Responses contain a `meta.page` object, which describes the pagination of your requests. In this example, you can use the `lastPage` value to check if you are on the last page of results.

```javascript
let hasNextPage = true
let perPage = 100
let page = 1
let variants = []
while (hasNextPage) {
  const resp = await ls.getVariants({ perPage, page });
  
  variants = variants.concat(resp['data'])

  if (resp.meta.page.lastPage > page) {
    page += 1
  } else {
    hasNextPage = false
  }
}
```

## Notes

Don't use this package directly in the browser as this will expose your API key, which would provide access to your full store.


## Methods

---

### getUser()

Get the current user.

Returns a [User object](https://docs.lemonsqueezy.com/api/users).

[API reference](https://docs.lemonsqueezy.com/api/users#retrieve-the-authenticated-user).

#### Parameters

None.

#### Example

```
const user = await ls.getUser()
```

---

### getStores(parameters)

Get the current user's stores.

Returns a list of [Store objects](https://docs.lemonsqueezy.com/api/stores).

[API reference](https://docs.lemonsqueezy.com/api/stores#list-all-stores).

#### Parameters

| Parameter | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `perPage`| number | | 10 | |
| `page` | number | | 1 | |
| `include`| string | | | Comma-separated list of object names: <ul><li>products</li><li>discounts</li><li>license-keys</li><li>subscriptions</li><li>webhooks</li></ul> |

#### Example

```
const stores = await ls.getStores()

const stores = await ls.getStores({ include: 'products' })
```

---

### getStore(parameters)

Get a store.

Returns a [Store object](https://docs.lemonsqueezy.com/api/stores).

[API reference](https://docs.lemonsqueezy.com/api/stores#retrieve-a-store).

#### Parameters

| Parameter | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | number | Yes | - | |
| `include`| string | - | - | Comma-separated list of object names: <ul><li>products</li><li>discounts</li><li>license-keys</li><li>subscriptions</li><li>webhooks</li></ul> |

#### Example

```
const store = await ls.getStore({ id: 123 })
```

---

### getProducts(parameters)

Get a list of products.

Returns a list of [Product objects](https://docs.lemonsqueezy.com/api/products).

[API reference](https://docs.lemonsqueezy.com/api/products#list-all-products).

#### Parameters

| Parameter | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- | 
| `storeId` | number | - | - | Filter products by store. |
| `perPage` | number | - | 10 | |
| `page` | number | - | 1 | |
| `include`| string | - | - | Comma-separated list of object names: <ul><li>store</li><li>variants</li></ul> |

#### Example

```
const products = await ls.getProducts()

const products = await ls.getProducts({ storeId: 123, perPage: 50, include: 'variants' })
```

---

### getProduct(parameters)

Get a product.

Returns a [Product object](https://docs.lemonsqueezy.com/api/products).

[API reference](https://docs.lemonsqueezy.com/api/products#retrieve-a-product).

#### Parameters

| Parameter | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | number | Yes | - | |
| `include`| string | - | - | Comma-separated list of object names: <ul><li>store</li><li>variants</li></ul> |

#### Example

```
const product = await ls.getProduct({ id: 123 })
```

---

### getVariants(parameters)

Get a list of variants.

Returns a list of [Variant objects](https://docs.lemonsqueezy.com/api/variants).

[API reference](https://docs.lemonsqueezy.com/api/variants#list-all-variants).

#### Parameters

| Parameter | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- | 
| `productId` | number | - | - | Filter variants by product. |
| `perPage` | number | - | 10 | |
| `page` | number | - | 1 | |
| `include`| string | - | - | Comma-separated list of object names: <ul><li>product</li><li>files</li></ul> |

#### Example

```
const variants = await ls.getVariants()

const variants = await ls.getVariants({ productId: 123, perPage: 50, include: 'product' })
```

---

### getVariant(parameters)

Get a variant.

Returns a [Variant object](https://docs.lemonsqueezy.com/api/variants).

[API reference](https://docs.lemonsqueezy.com/api/variants#retrieve-a-variant).

#### Parameters

| Parameter | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | number | Yes | - | |
| `include`| string | - | - | Comma-separated list of object names: <ul><li>product</li><li>files</li></ul> |

#### Example

```
const variant = await ls.getVariant({ id: 123 })
```

---

### getCheckouts(parameters)

Get a list of checkouts.

Returns a list of [Checkout objects](https://docs.lemonsqueezy.com/api/checkouts).

[API reference](https://docs.lemonsqueezy.com/api/checkouts#list-all-checkouts).

#### Parameters

| Parameter | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- | 
| `storeId` | number | - | - | Filter checkouts by store. |
| `variantId` | number | - | - | Filter checkouts by variant. |
| `perPage` | number | - | 10 | |
| `page` | number | - | 1 | |
| `include`| string | - | - | Comma-separated list of object names: <ul><li>store</li><li>variant</li></ul> |

#### Example

```
const checkouts = await ls.getCheckouts()

const checkouts = await ls.getCheckouts({ storeId: 123, perPage: 50 })
```

---

### getCheckout(parameters)

Get a checkout.

Returns a [Checkout object](https://docs.lemonsqueezy.com/api/checkouts).

[API reference](https://docs.lemonsqueezy.com/api/checkouts#retrieve-a-checkout).

#### Parameters

| Parameter | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | Yes | - | Checkout IDs are UUIDs. |
| `include`| string | - | - | Comma-separated list of object names: <ul><li>store</li><li>variant</li></ul> |

#### Example

```
const checkout = await ls.getCheckout({ id: 'edc0158c-794a-445d-bfad-24ab66baeb01' })
```

---

### createCheckout(parameters)

Create a checkout.

This method allows you to retrieve a product's checkout URL (using store and variant IDs) or create fully customised checkouts (using additional attributes).

Returns a [Checkout object](https://docs.lemonsqueezy.com/api/checkouts).

[API reference](https://docs.lemonsqueezy.com/api/checkouts#create-a-checkout).

#### Parameters

| Parameter | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `storeId` | number | Yes | - | |
| `variantId` | number | Yes | - | |
| `attributes` | Object | - | - | An [object of values](https://docs.lemonsqueezy.com/api/checkouts#create-a-checkout) used to configure the checkout. |

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

| Parameter | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- | 
| `storeId` | number | - | - | Filter customers by store. |
| `email` | string | - | - | Filter customers by email address. |
| `perPage` | number | - | 10 | |
| `page` | number | - | 1 | |
| `include`| string | - | - | Comma-separated list of object names: <ul><li>license-keys</li><li>orders</li><li>store</li><li>subscriptions</li></ul> |

#### Example

```
const customers = await ls.getCustomers()

const customers = await ls.getCustomers({ email: 'customer@gmail.com', include: 'orders,license-keys,subscriptions' })
```

---

### getCustomer(parameters)

Get a customer.

Returns a [Customer object](https://docs.lemonsqueezy.com/api/customers).

[API reference](https://docs.lemonsqueezy.com/api/customers#retrieve-a-customer).

#### Parameters

| Parameter | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | number | Yes | - | |
| `include`| string | - | - | Comma-separated list of object names: <ul><li>license-keys</li><li>orders</li><li>store</li><li>subscriptions</li></ul> |

#### Example

```
const customer = await ls.getCustomer({ id: 123 })
```

---

### getOrders(parameters)

Get a list of orders.

Returns a list of [Order objects](https://docs.lemonsqueezy.com/api/orders).

[API reference](https://docs.lemonsqueezy.com/api/orders#list-all-orders).

#### Parameters

| Parameter | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- | 
| `storeId` | number | - | - | Filter orders by store. |
| `userEmail` | string | - | - | Filter orders by email address. |
| `perPage` | number | - | 10 | |
| `page` | number | - | 1 | |
| `include`| string | - | - | Comma-separated list of object names: <ul><li>customer</li><li>discount-redemptions</li><li>license-keys</li><li>order-items</li><li>store</li><li>subscriptions</li></ul> |

#### Example

```
const orders = await ls.getOrders()

const orders = await ls.getOrders({ email: 'customer@gmail.com', include: 'orders,license-keys,subscriptions' })
```

---

### getOrder(parameters)

Get an order.

Returns a [Order object](https://docs.lemonsqueezy.com/api/orders).

[API reference](https://docs.lemonsqueezy.com/api/orders#retrieve-a-order).

#### Parameters

| Parameter | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | number | Yes | - | |
| `include`| string | - | - | Comma-separated list of object names: <ul><li>customer</li><li>discount-redemptions</li><li>license-keys</li><li>order-items</li><li>store</li><li>subscriptions</li></ul> |

#### Example

```
const order = await ls.getOrder({ id: 123 })
```

---

### getFiles(parameters)

Get a list of files.

Returns a list of [File objects](https://docs.lemonsqueezy.com/api/files).

[API reference](https://docs.lemonsqueezy.com/api/files#list-all-files).

#### Parameters

| Parameter | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- | 
| `variantId` | number | - | - | Filter files by variant. |
| `perPage` | number | - | 10 | |
| `page` | number | - | 1 | |
| `include`| string | - | - | Comma-separated list of object names: <ul><li>variant</li></ul> |

#### Example

```
const files = await ls.getFiles()

const files = await ls.getFiles({ variantId: 123 })
```

---

### getFile(parameters)

Get an file.

Returns a [File object](https://docs.lemonsqueezy.com/api/files).

[API reference](https://docs.lemonsqueezy.com/api/files#retrieve-a-file).

#### Parameters

| Parameter | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | number | Yes | - | |
| `include`| string | - | - | Comma-separated list of object names: <ul><li>variant</li></ul> |

#### Example

```
const file = await ls.getFile({ id: 123 })
```

---

More methods to follow.
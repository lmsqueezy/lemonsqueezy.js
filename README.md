# The official Javascript wrapper for the Lemon Squeezy API

## Introduction

Please read the [API reference introduction page](https://docs.lemonsqueezy.com/api) to understand how the API works.

**This README is a work-in-progress.**

## Installation

Install with `npm install lemonsqueezy.js`

## Usage

### Basic usage

```javascript
import LemonSqueezy from 'lemonsqueezy.js'
const ls = new LemonSqueezy(API_KEY); // Recommend storing in an env file, e.g. process.env.LEMONSQUEEZY_API_KEY

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

There are pagination parameters for every list method: `page`, `perPage`. If `perPage` is omitted, the API returns 10 records per page.

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

Endpoints that return a list of results can be paged using optional `page` and `perPage` values.
If `perPage` is omitted, the API returns the default of 10 results per page.
`perPage` should be a value between 1 and 100.
You can use the `lastPage` value in the `meta.page` object to check if you are on the last page of results.

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

| Parameter | Type | Default | Notes |
| --- | --- | --- | --- |
| `perPage`| number | 10 | |
| `page` | number | 1 | |
| `include`| string | | Comma-separated list of object names: <ul><li>products</li><li>discounts</li><li>license-keys</li><li>subscriptions</li><li>webhooks</li></ul> |

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
| `id` | number | Required | | |
| `include`| string | No | | Comma-separated list of object names: <ul><li>products</li><li>discounts</li><li>license-keys</li><li>subscriptions</li><li>webhooks</li></ul> |

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
| `storeId` | number | No | | |
| `perPage` | number | No | 10 | |
| `page` | number | No | 1 | |
| `include`| string | No | | Comma-separated list of object names: <ul><li>store</li><li>variants</li></ul> |

#### Example

```
const products = await ls.getProducts({ storeId: 123, perPage: 50, include: 'variants' })
```

---

### getProduct(parameters)

Get a product.

Returns a [Product object](https://docs.lemonsqueezy.com/api/products).

[API reference](https://docs.lemonsqueezy.com/api/products#retrieve-a-product).

#### Parameters

| Parameter | Type | Default | Notes |
| --- | --- | --- | --- |
| `id` required | number | | |
| `include`| string | | Comma-separated list of object names: <ul><li>store</li><li>variants</li></ul> |

#### Example

```
const products = await ls.getProduct({ id: 123 })
```

---

More methods to follow.
# The official Javascript wrapper for the Lemon Squeezy API

## Installation


## Usage

```javascript
import LemonSqueezy from 'lemonsqueezy.js'
const ls = new LemonSqueezy(API_KEY);

const products = await ls.getProducts()
```

Parameters for requests are sent in objects. For list methods, these parameters are used for filtering and for list pagination. For individual record methods, you can use `include`. For create and update methods, these parameters contain the values for the request.

```javascript
const subscriptions = await.getSubscriptions({ storeId: 123, perPage: 50 })

const subscription = await.getSubscription(123, { include: 'subscription-invoices' })
```

You can use `include` in every "read" method to pull in related objects (works for both individual and list methods).

There are pagination parameters for every list method: `page`, `perPage`.

```javascript
// Using `include` to load related resources (see https://docs.lemonsqueezy.com/api#including-related-resources).
const product = await ls.getProduct(23, { include: 'variants' })
// A configured request for a list of orders for store #3
const order = await ls.getOrders({ storeId: 3, perPage: 50, page: 2, include: 'store,customer' })
````

### Handling errors

Each method will throw an exception if there are issues with the request. An object will be returned containing error details.

Use `try { .. } catch { ... }` to access this object. Error messages will be available in a list in `errors`.

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


getProducts({ storeId, pageSize, page })

getProduct(id)

getVariants({ productId, pageSize, page })

getVariant(id)

createCheckout(storeId, variantId, attributes)

getCheckouts({ storeId, variantId, pageSize, page })

getCheckout(id)
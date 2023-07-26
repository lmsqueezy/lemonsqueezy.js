
export default class LemonSqueezy {

  apiKey;
  apiUrl = 'https://api.lemonsqueezy.com/';

  constructor(apiKey) {
    this.apiKey = apiKey;
  }


  /**
   * Builds a params object for the API query based on provided and allowed filters.
   * Also converts pagination parameters `page` to `page[number]` and `perPage` to `page[size]`
   * @params {Object} [args] Arguments to the API method
   * @params {Array} [allowedFilters] List of filters the API query permits (camelCase)
   */
  buildParams(args, allowedFilters = []) {
    let params = {}
    for (let filter in args) {
      if (allowedFilters.includes(filter)) {
        let queryFilter = filter.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
        params['filter['+queryFilter+']'] = args[filter]
      } else {
        if (filter == 'include') {
          params['include'] = args[filter]
        }
        if (filter == 'page') {
          params['page[number]'] = args[filter]
        }
        if (filter == 'perPage') {
          params['page[size]'] = args[filter]
        }
      }
    }
    return params
  }

  /**
   * Base API query
   * @param {string} path
   * @param {string} [method] POST, GET, PATCH, DELETE
   * @param {Object} [params] URL query parameters
   * @param {Object} [payload] Object/JSON payload
   * @returns {Object} JSON
   */
  async queryApi({
    path,
    method = 'GET',
    params,
    payload
  }) {

    try {

      // Prepare URL
      const url = new URL(path, this.apiUrl);
      if (params && method === "GET") {
        Object.entries(params).forEach(([key, value]) =>
          url.searchParams.append(key, value)
        );
      }

      // fetch options
      const options = {
        headers: {
          Accept: "application/vnd.api+json",
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/vnd.api+json"
        },
        method
      }

      if (payload) {
        options['body'] = JSON.stringify(payload)
      }

      const response = await fetch(url.href, options);

      if (!response.ok) {
        let errorsJson = await response.json()
        throw {
          status: response.status,
          message: response.statusText,
          errors: errorsJson.errors,
        };
      }

      if (method !== 'DELETE') {
        return await response.json();
      }

    } catch (error) {
      throw error;
    }
  }

  /**
   * Get current user
   * @returns {Object} JSON
   */
  async getUser() {
    return this.queryApi({ path: 'v1/users/me' });
  }

  /**
   * Get stores
   * @param {Object} [params]
   * @param {number} [params.perPage] Number of records to return (between 1 and 100)
   * @param {number} [params.page] Page of records to return
   * @param {"products,discounts,license-keys,subscriptions,webhooks"} [params.include] Comma-separated list of record types to include
   * @returns {Object} JSON
   */
  async getStores(params = {}) {
    params = this.buildParams(params)
    return this.queryApi({ path: 'v1/stores', params });
  }

  /**
   * Get a store
   * @param {Object} params
   * @param {number} params.id
   * @param {"products,discounts,license-keys,subscriptions,webhooks"} [params.include] Comma-separated list of record types to include
   * @returns {Object} JSON
   */
  async getStore({ id, ...params } = {}) {
    if (!id) throw 'You must provide an ID in getStore().'
    params = this.buildParams(params)
    return this.queryApi({ path: 'v1/stores/'+id, params });
  }

  /**
   * Get products
   * @param {Object} [params]
   * @param {number} [params.storeId] Filter products by store
   * @param {number} [params.perPage] Number of records to return (between 1 and 100)
   * @param {number} [params.page] Page of records to return
   * @param {"store,variants"} [params.include] Comma-separated list of record types to include
   * @returns {Object} JSON
   */
  async getProducts(params = {}) {
    params = this.buildParams(params, ['storeId'])
    return this.queryApi({ path: 'v1/products', params });
  }

  /**
   * Get a product
   * @param {Object} params
   * @param {number} params.id
   * @param {"store,variants"} [params.include] Comma-separated list of record types to include
   * @returns {Object} JSON
   */
  async getProduct({ id, ...params } = {}) {
    if (!id) throw 'You must provide an ID in getProduct().'
    params = this.buildParams(params)
    return this.queryApi({ path: 'v1/products/'+id, params });
  }

  /**
   * Get variants
   * @param {Object} [params]
   * @param {number} [params.productId] Filter variants by product
   * @param {number} [params.perPage] Number of records to return (between 1 and 100)
   * @param {number} [params.page] Page of records to return
   * @param {"product,files"} [params.include] Comma-separated list of record types to include
   * @returns {Object} JSON
   */
  async getVariants(params = {}) {
    params = this.buildParams(params, ['productId'])
    return this.queryApi({ path: 'v1/variants', params });
  }

  /**
   * Get a variant
   * @param {Object} params
   * @param {number} params.id
   * @param {product,files} [params.include] Comma-separated list of record types to include
   * @returns {Object} JSON
   */
  async getVariant({ id, ...params } = {}) {
    if (!id) throw 'You must provide an ID in getVariant().'
    params = this.buildParams(params)
    return this.queryApi({ path: 'v1/variants/'+id, params });
  }

  /**
   * Get checkouts
   * @param {Object} [params]
   * @param {number} [params.storeId] Filter variants by store
   * @param {number} [params.variantId] Filter checkouts by variant
   * @param {number} [params.perPage] Number of records to return (between 1 and 100)
   * @param {number} [params.page] Page of records to return
   * @param {"store,variant"} [params.include] Comma-separated list of record types to include
   * @returns {Object} JSON
   */
  async getCheckouts(params = {}) {
    params = this.buildParams(params, ['storeId', 'variantId'])
    return this.queryApi({ path: 'v1/checkouts', params });
  }

  /**
   * Get a checkout
   * @param {Object} params
   * @param {string} params.id
   * @param {"store,variant"} [params.include] Comma-separated list of record types to include
   * @returns {Object} JSON
   */
  async getCheckout({ id, ...params } = {}) {
    if (!id) throw 'You must provide an ID in getCheckout().'
    params = this.buildParams(params)
    return this.queryApi({ path: 'v1/checkouts/'+id, params });
  }

  /**
   * Create a checkout
   * @param {Object} params
   * @param {number} params.storeId
   * @param {number} params.variantId
   * @param {Object} [params.attributes] An object of values used to configure the checkout
   *                              https://docs.lemonsqueezy.com/api/checkouts#create-a-checkout
   * @returns {Object} JSON
   */
  async createCheckout({ storeId, variantId, attributes = {} } = {}) {
    if (!storeId) throw 'You must provide a store ID in createCheckout().'
    if (!variantId) throw 'You must provide a variant ID in createCheckout().'
    let payload = {
      'data': {
        'type': 'checkouts',
        'attributes': attributes,
        'relationships': {
          'store': {
            'data': {
              'type': 'stores',
              'id': '' + storeId // convert to string
            }
          },
          'variant': {
            'data': {
              'type': 'variants',
              'id': '' + variantId // convert to string
            }
          }
        }
      }
    }
    return this.queryApi({ path: 'v1/checkouts', method: 'POST', payload });
  }

  /**
   * Get customers
   * @param {Object} [params]
   * @param {number} [params.storeId] Filter customers by store
   * @param {number} [params.email] Filter customers by email address
   * @param {number} [params.perPage] Number of records to return (between 1 and 100)
   * @param {number} [params.page] Page of records to return
   * @param {"license-keys,orders,store,subscriptions"} [params.include] Comma-separated list of record types to include
   * @returns {Object} JSON
   */
  async getCustomers(params = {}) {
    params = this.buildParams(params, ['storeId', 'email'])
    return this.queryApi({ path: 'v1/customers', params });
  }

  /**
   * Get a customer
   * @param {Object} params
   * @param {number} params.id
   * @param {"license-keys,orders,store,subscriptions"} [params.include] Comma-separated list of record types to include
   * @returns {Object} JSON
   */
  async getCustomer({ id, ...params } = {}) {
    if (!id) throw 'You must provide an ID in getCustomer().'
    params = this.buildParams(params)
    return this.queryApi({ path: 'v1/customers/'+id, params });
  }

  /**
   * Get orders
   * @param {Object} [params]
   * @param {number} [params.storeId] Filter orders by store
   * @param {number} [params.userEmail] Filter orders by email address
   * @param {number} [params.perPage] Number of records to return (between 1 and 100)
   * @param {number} [params.page] Page of records to return
   * @param {"customer,discount-redemptions,license-keys,order-items,store,subscriptions"} [params.include] Comma-separated list of record types to include
   * @returns {Object} JSON
   */
  async getOrders(params = {}) {
    params = this.buildParams(params, ['storeId', 'userEmail'])
    return this.queryApi({ path: 'v1/orders', params });
  }

  /**
   * Get an order
   * @param {Object} params
   * @param {number} params.id
   * @param {"customer,discount-redemptions,license-keys,order-items,store,subscriptions"} [params.include] Comma-separated list of record types to include
   * @returns {Object} JSON
   */
  async getOrder({ id, ...params } = {}) {
    if (!id) throw 'You must provide an ID in getOrder().'
    params = this.buildParams(params)
    return this.queryApi({ path: 'v1/orders/'+id, params });
  }

  /**
   * Get files
   * @param {Object} [params]
   * @param {number} [params.variantId] Filter orders by variant
   * @param {number} [params.perPage] Number of records to return (between 1 and 100)
   * @param {number} [params.page] Page of records to return
   * @param {"variant"} [params.include] Comma-separated list of record types to include
   * @returns {Object} JSON
   */
  async getFiles(params = {}) {
    params = this.buildParams(params, ['variantId'])
    return this.queryApi({ path: 'v1/files', params });
  }

  /**
   * Get a file
   * @param {Object} params
   * @param {number} params.id
   * @param {"variant"} [params.include] Comma-separated list of record types to include
   * @returns {Object} JSON
   */
  async getFile({ id, ...params } = {}) {
    if (!id) throw 'You must provide an ID in getFile().'
    params = this.buildParams(params)
    return this.queryApi({ path: 'v1/files/'+id, params });
  }

  /**
   * Get order items
   * @param {Object} [params]
   * @param {number} [params.orderId] Filter order items by order
   * @param {number} [params.productId] Filter order items by product
   * @param {number} [params.variantId] Filter order items by variant
   * @param {number} [params.perPage] Number of records to return (between 1 and 100)
   * @param {number} [params.page] Page of records to return
   * @param {"order,product,variant"} [params.include] Comma-separated list of record types to include
   * @returns {Object} JSON
   */
  async getOrderItems(params = {}) {
    params = this.buildParams(params, ['orderId', 'productId', 'variantId'])
    return this.queryApi({ path: 'v1/order-items', params });
  }

  /**
   * Get an order item
   * @param {Object} params
   * @param {number} params.id
   * @param {"order,product,variant"} [params.include] Comma-separated list of record types to include
   * @returns {Object} JSON
   */
  async getOrderItem({ id, ...params } = {}) {
    if (!id) throw 'You must provide an ID in getOrderItem().'
    params = this.buildParams(params)
    return this.queryApi({ path: 'v1/order-items/'+id, params });
  }

  /**
   * Get subscriptions
   * @param {Object} [params]
   * @param {number} [params.storeId] Filter subscriptions by store
   * @param {number} [params.orderId] Filter subscriptions by order
   * @param {number} [params.orderItemId] Filter subscriptions by order item
   * @param {number} [params.productId] Filter subscriptions by product
   * @param {number} [params.variantId] Filter subscriptions by variant
   * @param {"on_trial"|"active"|"paused"|"past_due"|"unpaid"|"cancelled"|"expired"} [params.status] Filter subscriptions by status
   * @param {number} [params.perPage] Number of records to return (between 1 and 100)
   * @param {number} [params.page] Page of records to return
   * @param {"store,customer,order,order-item,product,variant"} [params.include] Comma-separated list of record types to include
   * @returns {Object} JSON
   */
  async getSubscriptions(params = {}) {
    params = this.buildParams(params, ['storeId', 'orderId', 'orderItemId', 'productId', 'variantId', 'status'])
    return this.queryApi({ path: 'v1/subscriptions', params });
  }


  /**
   * Get a subscription
   * @param {Object} params
   * @param {number} params.id
   * @param {"store,customer,order,order-item,product,variant"} [params.include] Comma-separated list of record types to include
   * @returns {Object} JSON
   */
  async getSubscription({ id, ...params } = {}) {
    if (!id) throw 'You must provide an ID in getSubscription().'
    params = this.buildParams(params)
    return this.queryApi({ path: 'v1/subscriptions/'+id, params });
  }

  /**
   * Update a subscription's plan
   * @param {Object} params
   * @param {number} params.id
   * @param {number} [params.variantId] ID of variant (required if changing plans)
   * @param {number} [params.productId] ID of product (required if changing plans)
   * @param {number} [params.billingAnchor] Set the billing day (1–31) used for renewal charges
   * @param {"immediate"|"disable"} [params.proration] If not included, proration will occur at the next renewal date.
   *                                   Use 'immediate' to charge a prorated amount immediately.
   *                                   Use 'disable' to charge a full ammount immediately.
   * @returns {Object} JSON
   */
  async updateSubscription({ id, variantId, productId, billingAnchor, proration } = {}) {
    if (!id) throw 'You must provide an ID in updateSubscription().'
    let attributes = {
      variant_id: variantId,
      product_id: productId,
      billing_anchor: billingAnchor
    }
    if (proration == 'disable') attributes.disable_prorations = true
    if (proration == 'immediate') attributes.invoice_immediately = true
    let payload = {
      data: {
        type: 'subscriptions',
        id: '' + id,
        attributes
      }
    }
    return this.queryApi({ path: 'v1/subscriptions/'+id, method: 'PATCH', payload });
  }

  /**
   * Cancel a subscription
   * @param {Object} params
   * @param {number} params.id
   * @returns {Object} JSON
   */
  async cancelSubscription({ id }) {
    if (!id) throw 'You must provide an ID in cancelSubscription().'
    return this.queryApi({ path: 'v1/subscriptions/'+id, method: 'DELETE' });
  }

  /**
   * Resume (un-cancel) a subscription
   * @param {Object} params
   * @param {number} params.id
   * @returns {Object} JSON
   */
  async resumeSubscription({ id }) {
    if (!id) throw 'You must provide an ID in resumeSubscription().'
    let payload = {
      data: {
        type: 'subscriptions',
        id: '' + id,
        attributes: {
          cancelled: false,
        }
      }
    }
    return this.queryApi({ path: 'v1/subscriptions/'+id, method: 'PATCH', payload });
  }

  /**
   * Pause a subscription
   * @param {Object} params
   * @param {number} params.id
   * @param {"void"|"free"} [params.mode] Pause mode: "void" (default) or "free"
   * @param {string} [params.resumesAt] Date to automatically resume the subscription (ISO 8601 format)
   * @returns {Object} JSON
   */
  async pauseSubscription({ id, mode, resumesAt } = {}) {
    if (!id) throw 'You must provide an ID in pauseSubscription().'
    let pause = { mode: 'void' }
    if (mode) pause.mode = mode
    if (resumesAt) pause.resumes_at = resumesAt
    let payload = {
      data: {
        type: 'subscriptions',
        id: '' + id,
        attributes: { pause }
      }
    }
    return this.queryApi({ path: 'v1/subscriptions/'+id, method: 'PATCH', payload });
  }

  /**
   * Unpause a subscription
   * @param {Object} params
   * @param {number} params.id
   * @returns {Object} JSON
   */
  async unpauseSubscription({ id }) {
    if (!id) throw 'You must provide an ID in unpauseSubscription().'
    let payload = {
      data: {
        type: 'subscriptions',
        id: '' + id,
        attributes: { pause: null }
      }
    }
    return this.queryApi({ path: 'v1/subscriptions/'+id, method: 'PATCH', payload });
  }

  /**
   * Get subscription invoices
   * @param {Object} [params]
   * @param {number} [params.storeId] Filter subscription invoices by store
   * @param {"paid"|"pending"|"void"|"refunded"} [params.status] Filter subscription invoices by status
   * @param {boolean} [params.refunded] Filter subscription invoices by refunded
   * @param {number} [params.subscriptionId] Filter subscription invoices by subscription
   * @param {number} [params.perPage] Number of records to return (between 1 and 100)
   * @param {number} [params.page] Page of records to return
   * @param {"store,subscription"} [params.include] Comma-separated list of record types to include
   * @returns {Object} JSON
   */
  async getSubscriptionInvoices(params = {}) {
    params = this.buildParams(params, ['storeId', 'status', 'refunded', 'subscriptionId'])
    return this.queryApi({ path: 'v1/subscription-invoices', params });
  }

  /**
   * Get a subscription invoice
   * @param {Object} params
   * @param {number} params.id
   * @param {"store,subscription"} [params.include] Comma-separated list of record types to include
   * @returns {Object} JSON
   */
  async getSubscriptionInvoice({ id, ...params } = {}) {
    if (!id) throw 'You must provide an ID in getSubscriptionInvoice().'
    params = this.buildParams(params)
    return this.queryApi({ path: 'v1/subscription-invoices/'+id, params });
  }

  /**
   * Get discounts
   * @param {Object} [params]
   * @param {number} [params.storeId] Filter discounts by store
   * @param {number} [params.perPage] Number of records to return (between 1 and 100)
   * @param {number} [params.page] Page of records to return
   * @param {"store,variants,discount-redemptions"} [params.include] Comma-separated list of record types to include
   * @returns {Object} JSON
   */
  async getDiscounts(params = {}) {
    params = this.buildParams(params, ['storeId'])
    return this.queryApi({ path: 'v1/discounts', params });
  }

  /**
   * Get a discount
   * @param {Object} params
   * @param {number} params.id
   * @param {"store,variants,discount-redemptions"} [params.include] Comma-separated list of record types to include
   * @returns {Object} JSON
   */
  async getDiscount({ id, ...params } = {}) {
    if (!id) throw 'You must provide an ID in getDiscount().'
    params = this.buildParams(params)
    return this.queryApi({ path: 'v1/discounts/'+id, params });
  }

  /**
   * Create a discount
   * @param {Object} params
   * @param {number} params.storeId Store to create a discount in
   * @param {string} params.name Name of discount
   * @param {string} params.code Discount code (uppercase letters and numbers, between 3 and 256 characters)
   * @param {number} params.amount Amount discount code is for
   * @param {"percent"|"fixed"} [params.amountType] Type of discount
   * @param {"once"|"repeating"|"forever"} [params.duration] Duration of discount
   * @param {number} [params.durationInMonths] Number of months to repeat the discount for
   * @param {number[]} [params.variantIds] Limit the discount to certain variants
   * @param {number} [params.maxRedemptions] Limit the total number of redemptions allowed
   * @param {number} [params.startsAt] Date the discount code starts on (ISO 8601 format)
   * @param {number} [params.expiresAt] Date the discount code expires on (ISO 8601 format)
   * @returns {Object} JSON
   */
  async createDiscount({
    storeId,
    name,
    code,
    amount,
    amountType='percent',
    duration='once',
    durationInMonths,
    variantIds,
    maxRedemptions,
    startsAt,
    expiresAt
  }) {
    if (!storeId) throw 'You must include a `storeId` in createDiscount().'
    if (!name) throw 'You must include a `name` in createDiscount().'
    if (!code) throw 'You must include a `code` in createDiscount().'
    if (!amount) throw 'You must include an `amount` in createDiscount().'
    let attributes = {
      name,
      code,
      amount,
      amount_type: amountType,
      duration,
      starts_at: startsAt,
      expires_at: expiresAt
    }
    if (durationInMonths && duration != 'once') {
      attributes.duration_in_months = durationInMonths
    }
    if (maxRedemptions) {
      attributes.is_limited_redemptions = true
      attributes.max_redemptions = maxRedemptions
    }
    let payload = {
      data: {
        type: 'discounts',
        attributes,
        relationships: {
          store: {
            data: {
              type: 'stores',
              id: '' + storeId
            }
          }
        }
      }
    }
    if (variantIds) {
      let variantData = []
      for (var i = 0; i < variantIds.length; i++) {
        variantData.push({ type: 'variants', id: '' + variantIds[i] })
      }
      payload.data.attributes.is_limited_to_products = true
      payload.data.relationships.variants = {
        data: variantData
      }
    }
    return this.queryApi({ path: 'v1/discounts', method: 'POST', payload });
  }

  /**
   * Delete a discount
   * @param {Object} params
   * @param {number} params.id
   */
  async deleteDiscount({ id }) {
    if (!id) throw 'You must provide an ID in deleteDiscount().'
    this.queryApi({ path: 'v1/discounts/'+id, method: 'DELETE' });
  }

  /**
   * Get discount redemptions
   * @param {Object} [params]
   * @param {number} [params.discountId] Filter discount redemptions by discount
   * @param {number} [params.orderId] Filter discount redemptions by order
   * @param {number} [params.perPage] Number of records to return (between 1 and 100)
   * @param {number} [params.page] Page of records to return
   * @param {"discount,order"} [params.include] Comma-separated list of record types to include
   * @returns {Object} JSON
   */
  async getDiscountRedemptions(params = {}) {
    params = this.buildParams(params, ['discountId', 'orderId'])
    return this.queryApi({ path: 'v1/discount-redemptions', params });
  }

  /**
   * Get a discount redemption
   * @param {Object} params
   * @param {number} params.id
   * @param {"discount,order"} [params.include] Comma-separated list of record types to include
   * @returns {Object} JSON
   */
  async getDiscountRedemption({ id, ...params } = {}) {
    if (!id) throw 'You must provide an ID in getDiscountRedemption().'
    params = this.buildParams(params)
    return this.queryApi({ path: 'v1/discount-redemptions/'+id, params });
  }

  /**
   * Get license keys
   * @param {Object} [params]
   * @param {number} [params.storeId] Filter license keys by store
   * @param {number} [params.orderId] Filter license keys by order
   * @param {number} [params.orderItemId] Filter license keys by order item
   * @param {number} [params.productId] Filter license keys by product
   * @param {number} [params.perPage] Number of records to return (between 1 and 100)
   * @param {number} [params.page] Page of records to return
   * @param {"store,customer,order,order-item,product,license-key-instances"} [params.include] Comma-separated list of record types to include
   * @returns {Object} JSON
   */
  async getLicenseKeys(params = {}) {
    params = this.buildParams(params, ['storeId', 'orderId', 'orderItemId', 'productId'])
    return this.queryApi({ path: 'v1/license-keys', params });
  }

  /**
   * Get a license key
   * @param {Object} params
   * @param {number} params.id
   * @param {"store,customer,order,order-item,product,license-key-instances"} [params.include] Comma-separated list of record types to include
   * @returns {Object} JSON
   */
  async getLicenseKey({ id, ...params } = {}) {
    if (!id) throw 'You must provide an ID in getLicenseKey().'
    params = this.buildParams(params)
    return this.queryApi({ path: 'v1/license-keys/'+id, params });
  }

  /**
   * Get license key instances
   * @param {Object} [params]
   * @param {number} [params.licenseKeyId] Filter license keys instances by license key
   * @param {number} [params.perPage] Number of records to return (between 1 and 100)
   * @param {number} [params.page] Page of records to return
   * @param {"license-key"} [params.include] Comma-separated list of record types to include
   * @returns {Object} JSON
   */
  async getLicenseKeyInstances(params = {}) {
    params = this.buildParams(params, ['licenseKeyId'])
    return this.queryApi({ path: 'v1/license-key-instances', params });
  }

  /**
   * Get a license key instance
   * @param {Object} params
   * @param {number} params.id
   * @param {"license-key"} [params.include] Comma-separated list of record types to include
   * @returns {Object} JSON
   */
  async getLicenseKeyInstance({ id, ...params } = {}) {
    if (!id) throw 'You must provide an ID in getLicenseKeyInstance().'
    params = this.buildParams(params)
    return this.queryApi({ path: 'v1/license-key-instances/'+id, params });
  }

  /**
   * Get webhooks
   * @param {Object} [params]
   * @param {number} [params.storeId] Filter webhooks by store
   * @param {number} [params.perPage] Number of records to return (between 1 and 100)
   * @param {number} [params.page] Page of records to return
   * @param {"store"} [params.include] Comma-separated list of record types to include
   * @returns {Object} JSON
   */
  async getWebhooks(params = {}) {
    params = this.buildParams(params, ['storeId'])
    return this.queryApi({ path: 'v1/webhooks', params });
  }

  /**
   * Get a webhook
   * @param {Object} params
   * @param {number} params.id
   * @param {"store"} [params.include] Comma-separated list of record types to include
   * @returns {Object} JSON
   */
  async getWebhook({ id, ...params } = {}) {
    if (!id) throw 'You must provide an ID.'
    params = this.buildParams(params)
    return this.queryApi({ path: 'v1/webhooks/'+id, params });
  }

  /**
   * Create a webhook
   * @param {Object} params
   * @param {string} params.url Endpoint URL that the webhooks should be sent to
   * @param {Array} params.events List of webhook events to receive
   * @param {string} params.secret Signing secret (between 6 and 40 characters)
   * @returns {Object} JSON
   */
  async createWebhook({ storeId, url, events, secret } = {}) {
    if (!storeId) throw 'You must provide a store ID.'
    if (!url) throw 'You must provide a URL.'
    if (!events || events?.length < 1) throw 'You must provide a list of events.'
    if (!secret) throw 'You must provide a signing secret.'
    let payload = {
      data: {
        type: 'webhooks',
        attributes: {
          url,
          events,
          secret
        },
        relationships: {
          store: {
            data: {
              type: 'stores',
              id: '' + storeId
            }
          }
        }
      }
    }
    return this.queryApi({ path: 'v1/webhooks', method: 'POST', payload });
  }

  /**
   * Update a webhook
   * @param {Object} params
   * @param {number} params.id
   * @param {string} [params.url] Endpoint URL that the webhooks should be sent to
   * @param {Array} [params.events] List of webhook events to receive
   * @param {string} [params.secret] Signing secret (between 6 and 40 characters)
   * @returns {Object} JSON
   */
  async updateWebhook({ id, url, events, secret } = {}) {
    if (!id) throw 'You must provide an ID.'
    let attributes = {}
    if (url) attributes.url = url
    if (events) attributes.events = events
    if (secret) attributes.secret = secret
    let payload = {
      data: {
        type: 'webhooks',
        id: '' + id,
        attributes
      }
    }
    return this.queryApi({ path: 'v1/webhooks/'+id, method: 'PATCH', payload });
  }

  /**
   * Delete a webhook
   * @param {Object} params
   * @param {number} params.id
   */
  async deleteWebhook({ id }) {
    this.queryApi({ path: 'v1/webhooks/'+id, method: 'DELETE' });
  }
}
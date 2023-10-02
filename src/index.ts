import {
  BaseUpdateSubscriptionOptions,
  CreateCheckoutOptions,
  CreateDiscountAttributes,
  CreateDiscountOptions,
  CreateWebhookOptions,
  DeleteDiscountOptions,
  DeleteWebhookOptions,
  GetCheckoutOptions,
  GetCheckoutsOptions,
  GetCustomerOptions,
  GetCustomersOptions,
  GetDiscountOptions,
  GetDiscountsOptions,
  GetDiscountRedemptionOptions,
  GetDiscountRedemptionsOptions,
  GetFileOptions,
  GetFilesOptions,
  GetLicenseKeyOptions,
  GetLicenseKeysOptions,
  GetLicenseKeyInstanceOptions,
  GetLicenseKeyInstancesOptions,
  GetOrderItemOptions,
  GetOrderItemsOptions,
  GetOrderOptions,
  GetOrdersOptions,
  GetProductOptions,
  GetProductsOptions,
  GetStoreOptions,
  GetStoresOptions,
  GetSubscriptionOptions,
  GetSubscriptionsOptions,
  GetSubscriptionInvoiceOptions,
  GetSubscriptionInvoicesOptions,
  GetVariantOptions,
  GetVariantsOptions,
  GetWebhookOptions,
  GetWebhooksOptions,
  PauseSubscriptionAttributes,
  PauseSubscriptionOptions,
  QueryApiOptions,
  UpdateSubscriptionAttributes,
  UpdateSubscriptionOptions,
  UpdateWebhookOptions,
  GetSubscriptionItemsOptions,
  GetUsageRecordsOptions,
  GetSubscriptionItemOptions,
  GetUsageRecordOptions,
  CreateUsageRecordOptions,
  GetPricesOptions,
  GetPriceOptions,
  UpdateSubscriptionItemOptions,
  GetSubscriptionItemUsageOptions,
} from "./types/methods";
import {
  CheckoutsResponse,
  CheckoutResponse,
  CustomersResponse,
  CustomerResponse,
  DiscountsResponse,
  DiscountResponse,
  DiscountRedemptionsResponse,
  DiscountRedemptionResponse,
  FilesResponse,
  FileResponse,
  LicenseKeysResponse,
  LicenseKeyResponse,
  LicenseKeyInstancesResponse,
  LicenseKeyInstanceResponse,
  OrdersResponse,
  OrderResponse,
  ProductsResponse,
  ProductResponse,
  StoresResponse,
  StoreResponse,
  SubscriptionInvoicesResponse,
  SubscriptionInvoiceResponse,
  SubscriptionsResponse,
  SubscriptionResponse,
  UserResponse,
  VariantsResponse,
  VariantResponse,
  WebhooksResponse,
  WebhookResponse,
  SubscriptionItemResponse,
  SubscriptionItemUsageResponse,
  UsageRecordsResponse,
  UsageRecordResponse
} from "./types/api";

export class LemonSqueezy {
  public apiKey: string;

  public apiUrl = "https://api.lemonsqueezy.com/";

  /**
   * LemonSqueezy API client
   *
   * @param {String} apiKey - Your LemonSqueezy API key
   */
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * Builds a params object for the API query based on provided and allowed filters.
   *
   * Also converts pagination parameters `page` to `page[number]` and `perPage` to `page[size]`
   *
   * @params {Object} [args] Arguments to the API method
   * @params {string[]} [allowedFilters] List of filters the API query permits (camelCase)
   */
  private _buildParams<TArgs extends Record<string, any>>(
    args: TArgs,
    allowedFilters: Array<string> = []
  ): Record<string, unknown> {
    let params: Record<string, unknown> = {};

    for (let filter in args) {
      if (allowedFilters.includes(filter)) {
        const queryFilter = filter.replace(
          /[A-Z]/g,
          (letter) => `_${letter.toLowerCase()}`
        );

        params["filter[" + queryFilter + "]"] = args[filter];
      } else {
        // In v1.0.3 and lower we supported passing in a string of comma separated values
        // for the `include` filter. This is now deprecated in favour of an array.
        if (filter === "include") {
          params["include"] = Array.isArray(args[filter])
            ? args[filter].join(",")
            : args[filter];
        }

        if (filter === "page") params["page[number]"] = args[filter];
        if (filter === "perPage") params["page[size]"] = args[filter];
      }
    }

    return params;
  }

  /**
   * Send an API query to the LemonSqueezy API
   *
   * @param {string} path
   * @param {string} [method] POST, GET, PATCH, DELETE
   * @param {Object} [params] URL query parameters
   * @param {Object} [payload] Object/JSON payload
   *
   * @returns {Object} JSON
   */
  private async _query({
    path,
    method = "GET",
    params,
    payload,
  }: QueryApiOptions) {
    try {
      const url = new URL(path, this.apiUrl);
      if (params && method === "GET")
        Object.entries(params).forEach(([key, value]) =>
          url.searchParams.append(key, value)
        );

      const headers = new Headers();
      headers.set("Accept", "application/vnd.api+json");
      headers.set("Authorization", `Bearer ${this.apiKey}`);
      headers.set("Content-Type", "application/vnd.api+json");

      const response = await fetch(url.href, {
        headers,
        method,
        body: payload ? JSON.stringify(payload) : undefined,
      });

      if (!response.ok) {
        let errorsJson = await response.json();
        throw {
          status: response.status,
          message: response.statusText,
          errors: errorsJson.errors,
        };
      }

      if (method !== "DELETE") return await response.json();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get current user
   *
   * @returns {Object} JSON
   */
  async getUser(): Promise<UserResponse> {
    return this._query({ path: "v1/users/me" });
  }

  /**
   * Get stores
   *
   * @param {Object} [params]
   * @param {number} [params.perPage] Number of records to return (between 1 and 100)
   * @param {number} [params.page] Page of records to return
   * @param {Array<"products" | "discounts" | "license-keys" | "subscriptions" | "webhooks">} [params.include] List of record types to include
   *
   * @returns {Object} JSON
   */
  async getStores(params: GetStoresOptions = {}): Promise<StoresResponse> {
    return this._query({
      path: "v1/stores",
      params: this._buildParams(params),
    });
  }

  /**
   * Get a store
   *
   * @param {Object} params
   * @param {number} params.id
   * @param {Array<"products" | "discounts" | "license-keys" | "subscriptions" | "webhooks">} [params.include] List of record types to include
   *
   * @returns {Object} JSON
   */
  async getStore({ id, ...params }: GetStoreOptions): Promise<StoreResponse> {
    if (!id) throw "You must provide an `id` in getStore().";

    return this._query({
      path: `v1/stores/${id}`,
      params: this._buildParams(params),
    });
  }

  /**
   * Get products
   *
   * @param {Object} [params]
   * @param {number} [params.storeId] Filter products by store
   * @param {number} [params.perPage] Number of records to return (between 1 and 100)
   * @param {number} [params.page] Page of records to return
   * @param {Array<"store" | "variants">} [params.include] List of record types to include
   *
   * @returns {Object} JSON
   */
  async getProducts(params: GetProductsOptions = {}): Promise<ProductsResponse> {
    return this._query({
      path: "v1/products",
      params: this._buildParams(params, ["storeId"]),
    });
  }

  /**
   * Get a product
   *
   * @param {Object} params
   * @param {number} params.id
   * @param {Array<"store" | "variants">} [params.include] List of record types to include
   *
   * @returns {Object} JSON
   */
  async getProduct({ id, ...params }: GetProductOptions): Promise<ProductResponse> {
    if (!id) throw "You must provide an `id` in getProduct().";
    return this._query({
      path: `v1/products/${id}`,
      params: this._buildParams(params),
    });
  }

  /**
   * Get variants
   *
   * @param {Object} [params]
   * @param {number} [params.productId] Filter variants by product
   * @param {number} [params.perPage] Number of records to return (between 1 and 100)
   * @param {number} [params.page] Page of records to return
   * @param {Array<"product" | "files">} [params.include] List of record types to include
   *
   * @returns {Object} JSON
   */
  async getVariants(params: GetVariantsOptions = {}): Promise<VariantsResponse> {
    return this._query({
      path: "v1/variants",
      params: this._buildParams(params, ["productId"]),
    });
  }

  /**
   * Get a variant
   *
   * @param {Object} params
   * @param {number} params.id
   * @param {Array<"product" | "files">} [params.include] List of record types to include
   *
   * @returns {Object} JSON
   */
  async getVariant({ id, ...params }: GetVariantOptions): Promise<VariantResponse> {
    if (!id) throw "You must provide an `id` in getVariant().";
    return this._query({
      path: `v1/variants/${id}`,
      params: this._buildParams(params),
    });
  }

  /**
   * Get prices
   * 
   * @param {Object} [params]
   * @param {number} [params.variantId] Filter prices by variant
   * @param {number} [params.perPage] Number of records to return (between 1 and 100)
   * @param {number} [params.page] Page of records to return
   * @param {Array<"variant">} [params.include] List of record types to include
   * 
   * @returns {Object} JSON
   */
  async getPrices(params: GetPricesOptions = {}) {
    return this._query({
      path: "v1/prices",
      params: this._buildParams(params, ["variantId"])
    });
  }

  /**
   * Get a price
   * 
   * @param {Object} params
   * @param {number} params.id
   * @param {Array<"variant">} [params.include] List of record types to include
   * 
   * @returns {Object} JSON
   */
  async getPrice({ id, ...params }: GetPriceOptions) {
    if (!id) throw 'You must provide an `id` in getPrice().'
    return this._query({
      path: `v1/prices/${id}`,
      params: this._buildParams(params)
    });
  }


  /**
   * Get checkouts
   *
   * @param {Object} [params]
   * @param {number} [params.storeId] Filter variants by store
   * @param {number} [params.variantId] Filter checkouts by variant
   * @param {number} [params.perPage] Number of records to return (between 1 and 100)
   * @param {number} [params.page] Page of records to return
   * @param {Array<"store" | "variant">} [params.include] List of record types to include
   *
   * @returns {Object} JSON
   */
  async getCheckouts(params: GetCheckoutsOptions = {}): Promise<CheckoutsResponse> {
    return this._query({
      path: "v1/checkouts",
      params: this._buildParams(params, ["storeId", "variantId"])
    });
  }

  /**
   * Get a checkout
   *
   * @param {Object} params
   * @param {string} params.id
   * @param {Array<"store" | "variant">} [params.include] List of record types to include
   *
   * @returns {Object} JSON
   */
  async getCheckout({ id, ...params }: GetCheckoutOptions): Promise<CheckoutResponse> {
    if (!id) throw "You must provide an `id` in getCheckout().";
    return this._query({
      path: `v1/checkouts/${id}`,
      params: this._buildParams(params),
    });
  }

  /**
   * Create a checkout
   *
   * @param {Object} params
   * @param {number} params.storeId
   * @param {number} params.variantId
   * @param {Object} [params.attributes] An object of values used to configure the checkout
   * 
   * @see https://docs.lemonsqueezy.com/api/checkouts#create-a-checkout
   *
   * @returns {Object} JSON
   */
  async createCheckout({
    storeId,
    variantId,
    attributes = {},
  }: CreateCheckoutOptions): Promise<CheckoutResponse> {
    if (!storeId) throw "You must provide a `storeId` in createCheckout().";
    if (!variantId) throw "You must provide a `variantId` in createCheckout().";
    return this._query({
      path: "v1/checkouts",
      method: "POST",
      payload: {
        data: {
          type: "checkouts",
          attributes: attributes,
          relationships: {
            store: {
              data: {
                type: "stores",
                id: "" + storeId, // convert to string
              },
            },
            variant: {
              data: {
                type: "variants",
                id: "" + variantId, // convert to string
              },
            },
          },
        },
      },
    });
  }

  /**
   * Get customers
   *
   * @param {Object} [params]
   * @param {number} [params.storeId] Filter customers by store
   * @param {number} [params.email] Filter customers by email address
   * @param {number} [params.perPage] Number of records to return (between 1 and 100)
   * @param {number} [params.page] Page of records to return
   * @param {Array<"license-keys" | "orders" | "store" | "subscriptions">} [params.include] List of record types to include
   *
   * @returns {Object} JSON
   */
  async getCustomers(params: GetCustomersOptions = {}): Promise<CustomersResponse> {
    return this._query({
      path: "v1/customers",
      params: this._buildParams(params, ["storeId", "email"]),
    });
  }

  /**
   * Get a customer
   *
   * @param {Object} params
   * @param {number} params.id
   * @param {Array<"license-keys" | "orders" | "store" | "subscriptions">} [params.include] List of record types to include
   *
   * @returns {Object} JSON
   */
  async getCustomer({ id, ...params }: GetCustomerOptions): Promise<CustomerResponse> {
    if (!id) throw "You must provide an `id` in getCustomer().";
    return this._query({
      path: `v1/customers/${id}`,
      params: this._buildParams(params),
    });
  }

  /**
   * Get orders
   *
   * @param {Object} [params]
   * @param {number} [params.storeId] Filter orders by store
   * @param {number} [params.userEmail] Filter orders by email address
   * @param {number} [params.perPage] Number of records to return (between 1 and 100)
   * @param {number} [params.page] Page of records to return
   * @param {Array<"customer" | "discount-redemptions" | "license-keys" | "order-items" | "store" | "subscriptions">} [params.include] List of record types to include
   *
   * @returns {Object} JSON
   */
  async getOrders(params: GetOrdersOptions = {}): Promise<OrdersResponse> {
    return this._query({
      path: "v1/orders",
      params: this._buildParams(params, ["storeId", "userEmail"]),
    });
  }

  /**
   * Get an order
   *
   * @param {Object} params
   * @param {number} params.id
   * @param {Array<"customer" | "discount-redemptions" | "license-keys" | "order-items" | "store" | "subscriptions">} [params.include] List of record types to include
   *
   * @returns {Object} JSON
   */
  async getOrder({ id, ...params }: GetOrderOptions): Promise<OrderResponse> {
    if (!id) throw "You must provide an `id` in getOrder().";
    return this._query({
      path: `v1/orders/${id}`,
      params: this._buildParams(params),
    });
  }

  /**
   * Get files
   *
   * @param {Object} [params]
   * @param {number} [params.variantId] Filter orders by variant
   * @param {number} [params.perPage] Number of records to return (between 1 and 100)
   * @param {number} [params.page] Page of records to return
   * @param {Array<"variant">} [params.include] List of record types to include
   *
   * @returns {Object} JSON
   */
  async getFiles(params: GetFilesOptions = {}): Promise<FilesResponse> {
    return this._query({
      path: "v1/files",
      params: this._buildParams(params, ["variantId"]),
    });
  }

  /**
   * Get a file
   *
   * @param {Object} params
   * @param {number} params.id
   * @param {Array<"variant">} [params.include] List of record types to include
   *
   * @returns {Object} JSON
   */
  async getFile({ id, ...params }: GetFileOptions): Promise<FileResponse> {
    if (!id) throw "You must provide an `id` in getFile().";
    return this._query({
      path: `v1/files/${id}`,
      params: this._buildParams(params),
    });
  }

  /**
   * Get order items
   *
   * @param {Object} [params]
   * @param {number} [params.orderId] Filter order items by order
   * @param {number} [params.productId] Filter order items by product
   * @param {number} [params.variantId] Filter order items by variant
   * @param {number} [params.perPage] Number of records to return (between 1 and 100)
   * @param {number} [params.page] Page of records to return
   * @param {Array<"order" | "product" | "variant">} [params.include] List of record types to include
   *
   * @returns {Object} JSON
   */
  async getOrderItems(params: GetOrderItemsOptions = {}) {
    return this._query({
      path: "v1/order-items",
      params: this._buildParams(params, ["orderId", "productId", "variantId"]),
    });
  }

  /**
   * Get an order item
   *
   * @param {Object} params
   * @param {number} params.id
   * @param {Array<"order" | "product" | "variant">} [params.include] List of record types to include
   *
   * @returns {Object} JSON
   */
  async getOrderItem({ id, ...params }: GetOrderItemOptions) {
    if (!id) throw "You must provide an `id` in getOrderItem().";
    return this._query({
      path: `v1/order-items/${id}`,
      params: this._buildParams(params),
    });
  }

  /**
   * Get subscriptions
   * 
   * @param {Object} [params]
   * @param {number} [params.storeId] Filter subscriptions by store
   * @param {number} [params.orderId] Filter subscriptions by order
   * @param {number} [params.orderItemId] Filter subscriptions by order item
   * @param {number} [params.productId] Filter subscriptions by product
   * @param {number} [params.variantId] Filter subscriptions by variant
   * @param {"on_trial" | "active" | "paused" | "past_due" | "unpaid" | "cancelled" | "expired"} [params.status] Filter subscriptions by status
   * @param {number} [params.perPage] Number of records to return (between 1 and 100)
   * @param {number} [params.page] Page of records to return
   * @param {Array<"store" | "customer" | "order" | "order-item" | "product" | "variant">} [params.include] List of record types to include
   * 
   * @returns {Object} JSON
   */
  async getSubscriptions(params: GetSubscriptionsOptions = {}): Promise<SubscriptionsResponse> {
    return this._query({
      path: "v1/subscriptions",
      params: this._buildParams(params, [
        "storeId",
        "orderId",
        "orderItemId",
        "productId",
        "variantId",
        "status",
      ])
    })
  }

  /**
   * Get a subscription
   * 
   * @param {Object} params
   * @param {number} params.id
   * @param {Array<"store" | "customer" | "order" | "order-item" | "product" | "variant">} [params.include] List of record types to include
   * 
   * @returns {Object} JSON
   */
  async getSubscription({ id, ...params }: GetSubscriptionOptions): Promise<SubscriptionResponse> {
    if (!id) throw "You must provide an `id` in getSubscription().";
    return this._query({
      path: `v1/subscriptions/${id}`,
      params: this._buildParams(params),
    });
  }

  /**
   * Update a subscription's plan
   * 
   * @param {Object} params
   * @param {number} params.id
   * @param {number} [params.variantId] ID of variant (required if changing plans)
   * @param {number} [params.productId] ID of product (required if changing plans)
   * @param {number} [params.billingAnchor] Set the billing day (1–31) used for renewal charges
   * @param {"immediate" | "disable"} [params.proration] If not included, proration will occur at the next renewal date.
   *                                   Use 'immediate' to charge a prorated amount immediately.
   *                                   Use 'disable' to charge a full ammount immediately.
   * 
   * @returns {Object} JSON
   */
  async updateSubscription({
    id,
    variantId,
    productId,
    billingAnchor,
    proration,
  }: UpdateSubscriptionOptions): Promise<SubscriptionResponse> {
    if (!id) throw "You must provide an `id` in updateSubscription().";
    let attributes: UpdateSubscriptionAttributes = {
      variant_id: variantId,
      product_id: productId,
      billing_anchor: billingAnchor,
    };
    if (proration == "disable") attributes.disable_prorations = true;
    if (proration == "immediate") attributes.invoice_immediately = true;
    return this._query({
      path: `v1/subscriptions/${id}`,
      method: "PATCH",
      payload: {
        data: {
          type: "subscriptions",
          id: "" + id,
          attributes
        }
      }
    });
  }

  /**
   * Cancel a subscription
   * 
   * @param {Object} params
   * @param {number} params.id
   * 
   * @returns {Object} JSON
   */
  async cancelSubscription({ id }: BaseUpdateSubscriptionOptions): Promise<SubscriptionResponse> {
    if (!id) throw "You must provide an `id` in cancelSubscription().";
    return this._query({
      path: `v1/subscriptions/${id}`,
      method: "PATCH",
      payload: {
        data: {
          type: "subscriptions",
          id: "" + id,
          attributes: {
            cancelled: true,
          }
        }
      }
    });
  }

  /**
   * Resume (un-cancel) a subscription
   * 
   * @param {Object} params
   * @param {number} params.id
   * 
   * @returns {Object} JSON
   */
  async resumeSubscription({ id }: BaseUpdateSubscriptionOptions): Promise<SubscriptionResponse> {
    if (!id) throw "You must provide an `id` in resumeSubscription().";
    return this._query({
      path: `v1/subscriptions/${id}`,
      method: "PATCH",
      payload: {
        data: {
          type: "subscriptions",
          id: "" + id,
          attributes: {
            cancelled: false,
          }
        }
      }
    });
  }

  /**
   * Pause a subscription
   * 
   * @param {Object} params
   * @param {number} params.id
   * @param {"void" | "free"} [params.mode] Pause mode: "void" (default) or "free"
   * @param {string} [params.resumesAt] Date to automatically resume the subscription (ISO 8601 format)
   * 
   * @returns {Object} JSON
   */
  async pauseSubscription({
    id,
    mode,
    resumesAt
  }: PauseSubscriptionOptions): Promise<SubscriptionResponse> {
    if (!id) throw "You must provide an `id` in pauseSubscription().";
    let pause: PauseSubscriptionAttributes = { mode: "void" };
    if (mode) pause.mode = mode;
    if (resumesAt) pause.resumes_at = resumesAt;
    return this._query({
      path: `v1/subscriptions/${id}`,
      method: "PATCH",
      payload: {
        data: {
          type: "subscriptions",
          id: "" + id,
          attributes: { pause },
        },
      }
    });
  }

  /**
   * Unpause a subscription
   * 
   * @param {Object} params
   * @param {number} params.id
   * 
   * @returns {Object} JSON
   */
  async unpauseSubscription({ id }: BaseUpdateSubscriptionOptions): Promise<SubscriptionResponse> {
    if (!id) throw "You must provide an `id` in unpauseSubscription().";
    return this._query({
      path: `v1/subscriptions/${id}`,
      method: "PATCH",
      payload: {
        data: {
          type: "subscriptions",
          id: "" + id,
          attributes: {
            pause: null
          },
        },
      }
    });
  }

  /**
   * Get subscription invoices
   * 
   * @param {Object} [params]
   * @param {number} [params.storeId] Filter subscription invoices by store
   * @param {"paid" | "pending" | "void" | "refunded"} [params.status] Filter subscription invoices by status
   * @param {boolean} [params.refunded] Filter subscription invoices by refunded
   * @param {number} [params.subscriptionId] Filter subscription invoices by subscription
   * @param {number} [params.perPage] Number of records to return (between 1 and 100)
   * @param {number} [params.page] Page of records to return
   * @param {Array<"store" | "subscription">} [params.include] List of record types to include
   * 
   * @returns {Object} JSON
   */
  async getSubscriptionInvoices(params: GetSubscriptionInvoicesOptions = {}): Promise<SubscriptionInvoicesResponse> {
    return this._query({
      path: "v1/subscription-invoices",
      params: this._buildParams(params, [
        "storeId",
        "status",
        "refunded",
        "subscriptionId",
      ])
    });
  }

  /**
   * Get a subscription invoice
   * 
   * @param {Object} params
   * @param {number} params.id
   * @param {Array<"store" | "subscription">} [params.include] List of record types to include
   * 
   * @returns {Object} JSON
   */
  async getSubscriptionInvoice({ id, ...params }: GetSubscriptionInvoiceOptions): Promise<SubscriptionInvoiceResponse> {
    if (!id) throw "You must provide an `id` in getSubscriptionInvoice().";
    return this._query({
      path: `v1/subscription-invoices/${id}`,
      params: this._buildParams(params)
    });
  }

  /**
   * Get subscription items
   * 
   * @param {Object} [params]
   * @param {number} [params.subscriptionId] Filter subscription items by subscription
   * @param {number} [params.priceId] Filter subscription items by price
   * @param {number} [params.perPage] Number of records to return (between 1 and 100)
   * @param {number} [params.page] Page of records to return
   * @param {Array<"subscription" | "price" | "usage-records">} [params.include] List of record types to include
   * 
   * @returns {Object} JSON
   */
  async getSubscriptionItems(params: GetSubscriptionItemsOptions = {}): Promise<SubscriptionItemResponse> {
    return this._query({
      path: "v1/subscription-items",
      params: this._buildParams(params, ['subscriptionId', 'priceId'])
    });
  }

  /**
   * Get a subscription item
   * 
   * @param {Object} params
   * @param {number} params.id
   * @param {Array<"subscription" | "price" | "usage-records">} [params.include] List of record types to include
   * 
   * @returns {Object} JSON
   */
  async getSubscriptionItem({ id, ...params }: GetSubscriptionItemOptions): Promise<SubscriptionItemResponse> {
    if (!id) throw 'You must provide an `id` in getSubscriptionItem().'
    return this._query({
      path: `v1/subscription-items/${id}`,
      params: this._buildParams(params)
    });
  }

  /**
   * Update the quantity of a subscription item
   * 
   * @param {Object} params
   * @param {number} params.id
   * @param {number} params.quantity The new quantity for the subscription item
   * 
   * @returns {Object} JSON
   */
  async updateSubscriptionItem({ id, quantity }: UpdateSubscriptionItemOptions): Promise<SubscriptionItemResponse> {
    if (!id) throw 'You must provide an `id` in updateSubscriptionItem().'
    if (!id) throw 'You must provide a `quantity` in updateSubscriptionItem().'
    return this._query({
      path: `v1/subscription-items/${id}`,
      method: "PATCH",
      params: {
        data: {
          type: "subscription-items",
          id: "" + id,
          attributes: {
            quantity
          }
        }
      }
    });
  }

  /**
   * Retrieves a subscription item's current usage
   * 
   * @param {Object} params
   * @param {number} params.id
   * 
   * @returns {Object} JSON
   */
  async getSubscriptionItemUsage({ id }: GetSubscriptionItemUsageOptions): Promise<SubscriptionItemUsageResponse> {
    if (!id) throw 'You must provide an `id` in getSubscriptionItemUsage().'
    return this._query({
      path: `v1/subscription-items/${id}/current-usage`
    });
  }

  /**
   * Get usage records
   * 
   * @param {Object} [params]
   * @param {number} [params.subscriptionItemId] Filter usage records by subscription item
   * @param {number} [params.perPage] Number of records to return (between 1 and 100)
   * @param {number} [params.page] Page of records to return
   * @param {Array<"subscription-item">} [params.include] List of record types to include
   * 
   * @returns {Object} JSON
   */
  async getUsageRecords(params: GetUsageRecordsOptions = {}): Promise<UsageRecordsResponse> {
    return this._query({
      path: "v1/usage-records",
      params: this._buildParams(params, ['subscriptionItemId'])
    });
  }

  /**
   * Get a usage record
   * 
   * @param {Object} params
   * @param {number} params.id
   * @param {Array<"subscription-item">} [params.include] List of record types to include
   * 
   * @returns {Object} JSON
   */
  async getUsageRecord({ id, ...params }: GetUsageRecordOptions): Promise<UsageRecordResponse> {
    if (!id) throw 'You must provide an `id` in getUsageRecord().'
    return this._query({
      path: `v1/usage-records/${id}`,
      params: this._buildParams(params)
    });
  }

  /**
   * Create a usage record
   * 
   * @param {Object} params
   * @param {number} params.subscriptionItemId The ID of the subscription item to report usage for
   * @param {number} params.quantity The number of units to report
   * @param {"increment" | "set"} [params.action] Type of record
   * 
   * @returns {Object} JSON
   */
  async createUsageRecord({
      subscriptionItemId,
      quantity,
      action = "increment"
    }: CreateUsageRecordOptions): Promise<UsageRecordResponse> {
    if (!subscriptionItemId) throw 'You must provide a `subscriptionItemId` in createUsageRecord().'
    if (!quantity) throw 'You must provide a `quantity` in createUsageRecord().'
    return this._query({
      path: "v1/usage-records",
      method: "POST",
      payload: {
        data: {
          type: "usage-records",
          attributes: {
            quantity,
            action
          },
          relationships: {
            "subscription-item": {
              data: {
                type: "subscription-items",
                id: "" + subscriptionItemId
              }
            }
          }
        }
      }
    });
  }

  /**
   * Get discounts
   * 
   * @param {Object} [params]
   * @param {number} [params.storeId] Filter discounts by store
   * @param {number} [params.perPage] Number of records to return (between 1 and 100)
   * @param {number} [params.page] Page of records to return
   * @param {Array<"store" | "variants" | "discount-redemptions">} [params.include] List of record types to include
   * 
   * @returns {Object} JSON
   */
  async getDiscounts(params: GetDiscountsOptions = {}): Promise<DiscountsResponse> {
    return this._query({
      path: "v1/discounts",
      params: this._buildParams(params, ["storeId"])
    });
  }

  /**
   * Get a discount
   * 
   * @param {Object} params
   * @param {number} params.id
   * @param {Array<"store" | "variants" | "discount-redemptions">} [params.include] List of record types to include
   * 
   * @returns {Object} JSON
   */
  async getDiscount({ id, ...params }: GetDiscountOptions): Promise<DiscountResponse> {
    if (!id) throw "You must provide an `id` in getDiscount().";
    return this._query({
      path: `v1/discounts/${id}`,
      params: this._buildParams(params)
    });
  }

  /**
   * Create a discount
   * 
   * @param {Object} params
   * @param {number} params.storeId Store to create a discount in
   * @param {string} params.name Name of discount
   * @param {string} params.code Discount code (uppercase letters and numbers, between 3 and 256 characters)
   * @param {number} params.amount Amount the discount is for
   * @param {"percent" | "fixed"} [params.amountType] Type of discount
   * @param {"once" | "repeating" | "forever"} [params.duration] Duration of discount
   * @param {number} [params.durationInMonths] Number of months to repeat the discount for
   * @param {number[]} [params.variantIds] Limit the discount to certain variants
   * @param {number} [params.maxRedemptions] The total number of redemptions allowed
   * @param {number} [params.startsAt] Date the discount code starts on (ISO 8601 format)
   * @param {number} [params.expiresAt] Date the discount code expires on (ISO 8601 format)
   * 
   * @returns {Object} JSON
   */
  async createDiscount({
    storeId,
    name,
    code,
    amount,
    amountType = "percent",
    duration = "once",
    durationInMonths,
    variantIds,
    maxRedemptions,
    startsAt,
    expiresAt
  }: CreateDiscountOptions): Promise<DiscountResponse> {
    if (!storeId) throw "You must provide a `storeId` in createDiscount().";
    if (!name) throw "You must provide a `name` in createDiscount().";
    if (!code) throw "You must provide a `code` in createDiscount().";
    if (!amount) throw "You must provide an `amount` in createDiscount().";
    let attributes: CreateDiscountAttributes = {
      name,
      code,
      amount,
      amount_type: amountType,
      duration,
      starts_at: startsAt,
      expires_at: expiresAt,
    };
    if (durationInMonths && duration != "once") {
      attributes.duration_in_months = durationInMonths;
    }
    if (maxRedemptions) {
      attributes.is_limited_redemptions = true;
      attributes.max_redemptions = maxRedemptions;
    }
    
    let relationships: {store: Object; variants?: Object} = {
      store: {
        data: {
          type: "stores",
          id: "" + storeId,
        }
      }
    }

    if (variantIds) {
      let variantData: Array<{ type: string; id: string }> = [];
      for (var i = 0; i < variantIds.length; i++) {
        variantData.push({ type: "variants", id: "" + variantIds[i] });
      }
      attributes.is_limited_to_products = true;
      relationships.variants = {
        data: variantData,
      };
    }
    
    return this._query({
      path: "v1/discounts",
      method: "POST",
      payload: {
        data: {
          type: "discounts",
          attributes,
          relationships
        }
      }
    });
  }

  /**
   * Delete a discount
   * 
   * @param {Object} params
   * @param {number} params.id
   */
  async deleteDiscount({ id }: DeleteDiscountOptions): Promise<void> {
    if (!id) throw "You must provide a `id` in deleteDiscount().";
    this._query({ path: `v1/discounts/${id}`, method: "DELETE" });
  }

  /**
   * Get discount redemptions
   * 
   * @param {Object} [params]
   * @param {number} [params.discountId] Filter discount redemptions by discount
   * @param {number} [params.orderId] Filter discount redemptions by order
   * @param {number} [params.perPage] Number of records to return (between 1 and 100)
   * @param {number} [params.page] Page of records to return
   * @param {Array<"discount" | "order">} [params.include] List of record types to include
   * 
   * @returns {Object} JSON
   */
  async getDiscountRedemptions(params: GetDiscountRedemptionsOptions = {}): Promise<DiscountRedemptionsResponse> {
    return this._query({
      path: "v1/discount-redemptions",
      params: this._buildParams(params, ["discountId", "orderId"])
    });
  }


  /**
   * Get a discount redemption
   * 
   * @param {Object} params
   * @param {number} params.id
   * @param {Array<"discount" | "order">} [params.include] List of record types to include
   * 
   * @returns {Object} JSON
   */
  async getDiscountRedemption({ id, ...params }: GetDiscountRedemptionOptions): Promise<DiscountRedemptionResponse> {
    if (!id) throw "You must provide a `id` in getDiscountRedemption().";
    return this._query({
      path: `v1/discount-redemptions/${id}`,
      params: this._buildParams(params)
    });
  }

  /**
   * Get license keys
   * 
   * @param {Object} [params]
   * @param {number} [params.storeId] Filter license keys by store
   * @param {number} [params.orderId] Filter license keys by order
   * @param {number} [params.orderItemId] Filter license keys by order item
   * @param {number} [params.productId] Filter license keys by product
   * @param {number} [params.perPage] Number of records to return (between 1 and 100)
   * @param {number} [params.page] Page of records to return
   * @param {Array<"store" | "customer" | "order" | "order-item" | "product" | "license-key-instances">} [params.include] List of record types to include
   * 
   * @returns {Object} JSON
   */
  async getLicenseKeys(params: GetLicenseKeysOptions = {}): Promise<LicenseKeysResponse> {
    return this._query({
      path: "v1/license-keys",
      params: this._buildParams(params, [
        "storeId",
        "orderId",
        "orderItemId",
        "productId",
      ])
    });
  }

  /**
   * Get a license key
   * 
   * @param {Object} params
   * @param {number} params.id
   * @param {Array<"store" | "customer" | "order" | "order-item" | "product" | "license-key-instances">} [params.include] List of record types to include
   * 
   * @returns {Object} JSON
   */
  async getLicenseKey({ id, ...params }: GetLicenseKeyOptions): Promise<LicenseKeyResponse> {
    if (!id) throw "You must provide an `id` in getLicenseKey().";
    return this._query({
      path: `v1/license-keys/${id}`,
      params: this._buildParams(params)
    });
  }

  /**
   * Get license key instances
   * 
   * @param {Object} [params]
   * @param {number} [params.licenseKeyId] Filter license keys instances by license key
   * @param {number} [params.perPage] Number of records to return (between 1 and 100)
   * @param {number} [params.page] Page of records to return
   * @param {Array<"license-key">} [params.include] List of record types to include
   * 
   * @returns {Object} JSON
   */
  async getLicenseKeyInstances(params: GetLicenseKeyInstancesOptions = {}): Promise<LicenseKeyInstancesResponse> {
    return this._query({
      path: "v1/license-key-instances",
      params: this._buildParams(params, ["licenseKeyId"])
    });
  }

  /**
   * Get a license key instance
   * 
   * @param {Object} params
   * @param {number} params.id
   * @param {Array<"license-key">} [params.include] List of record types to include
   * 
   * @returns {Object} JSON
   */
  async getLicenseKeyInstance({ id, ...params }: GetLicenseKeyInstanceOptions): Promise<LicenseKeyInstanceResponse> {
    if (!id) throw "You must provide an `id` in getLicenseKeyInstance().";
    return this._query({
      path: `v1/license-key-instances/${id}}`,
      params: this._buildParams(params)
    });
  }

  /**
   * Get webhooks
   * 
   * @param {Object} [params]
   * @param {number} [params.storeId] Filter webhooks by store
   * @param {number} [params.perPage] Number of records to return (between 1 and 100)
   * @param {number} [params.page] Page of records to return
   * @param {Array<"store">} [params.include] List of record types to include
   * 
   * @returns {Object} JSON
   */
  async getWebhooks(params: GetWebhooksOptions = {}): Promise<WebhooksResponse> {
    return this._query({
      path: "v1/webhooks",
      params: this._buildParams(params, ["storeId"])
    });
  }

  /**
   * Get a webhook
   * 
   * @param {Object} params
   * @param {number} params.id
   * @param {Array<"store">} [params.include] List of record types to include
   * 
   * @returns {Object} JSON
   */
  async getWebhook({ id, ...params }: GetWebhookOptions): Promise<WebhookResponse> {
    if (!id) throw "You must provide an `id` in getWebhook().";
    return this._query({
      path: `v1/webhooks/${id}`,
      params: this._buildParams(params)
    });
  }

  /**
   * Create a webhook
   * 
   * @param {Object} params
   * @param {string} params.storeId ID of the store the webhook is for
   * @param {string} params.url Endpoint URL that the webhooks should be sent to
   * @param {string[]} params.events List of webhook events to receive
   * @param {string} params.secret Signing secret (between 6 and 40 characters)
   * 
   * @returns {Object} JSON
   */
  async createWebhook({ storeId, url, events, secret }: CreateWebhookOptions): Promise<WebhookResponse> {
    if (!storeId) throw "You must provide a `storeId` in createWebhook().";
    if (!url) throw "You must provide a `url` in createWebhook().";
    if (!events || events?.length < 1)
      throw "You must provide a list of events in createWebhook().";
    if (!secret) throw "You must provide a `secret` in createWebhook().";
    return this._query({
      path: "v1/webhooks",
      method: "POST",
      payload: {
        data: {
          type: "webhooks",
          attributes: {
            url,
            events,
            secret,
          },
          relationships: {
            store: {
              data: {
                type: "stores",
                id: "" + storeId,
              },
            },
          },
        },
      }
    });
  }

  /**
   * Update a webhook
   * 
   * @param {Object} params
   * @param {number} params.id
   * @param {string} [params.url] Endpoint URL that the webhooks should be sent to
   * @param {string[]} [params.events] List of webhook events to receive
   * @param {string} [params.secret] Signing secret (between 6 and 40 characters)
   * 
   * @returns {Object} JSON
   */
  async updateWebhook({ id, url, events, secret }: UpdateWebhookOptions): Promise<WebhookResponse> {
    if (!id) throw "You must provide an `id` in updateWebhook().";
    let attributes: { url?: string; events?: string[]; secret?: string } = {};
    if (url) attributes.url = url;
    if (events) attributes.events = events;
    if (secret) attributes.secret = secret;
    return this._query({
      path: `v1/webhooks/${id}`,
      method: "PATCH",
      payload: {
        data: {
          type: "webhooks",
          id: "" + id,
          attributes,
        },
      }
    });
  }

  /**
   * Delete a webhook
   * 
   * @param {Object} params
   * @param {number} params.id
   */
  async deleteWebhook({ id }: DeleteWebhookOptions): Promise<void> {
    if (!id) throw "You must provide an `id` in deleteWebhook().";
    this._query({ path: `v1/webhooks/${id}`, method: "DELETE" });
  }
}

export default LemonSqueezy;

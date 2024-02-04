import { requiredCheck } from "../internal";
import type {
  CheckoutResponse,
  CheckoutsResponse,
  CustomerResponse,
  CustomersResponse,
  DiscountRedemptionResponse,
  DiscountRedemptionsResponse,
  DiscountResponse,
  DiscountsResponse,
  FileResponse,
  FilesResponse,
  LicenseKeyInstanceResponse,
  LicenseKeyInstancesResponse,
  LicenseKeyResponse,
  LicenseKeysResponse,
  OrderResponse,
  OrdersResponse,
  ProductResponse,
  ProductsResponse,
  StoreResponse,
  StoresResponse,
  SubscriptionInvoiceResponse,
  SubscriptionInvoicesResponse,
  SubscriptionItemResponse,
  SubscriptionItemUsageResponse,
  SubscriptionResponse,
  SubscriptionsResponse,
  UsageRecordResponse,
  UsageRecordsResponse,
  UserResponse,
  VariantResponse,
  VariantsResponse,
  WebhookResponse,
  WebhooksResponse,
} from "./types/api";
import {
  type BaseUpdateSubscriptionOptions,
  type CreateCheckoutOptions,
  type CreateDiscountAttributes,
  type CreateDiscountOptions,
  type CreateUsageRecordOptions,
  type CreateWebhookOptions,
  type DeleteDiscountOptions,
  type DeleteWebhookOptions,
  type GetCheckoutOptions,
  type GetCheckoutsOptions,
  type GetCustomerOptions,
  type GetCustomersOptions,
  type GetDiscountOptions,
  type GetDiscountRedemptionOptions,
  type GetDiscountRedemptionsOptions,
  type GetDiscountsOptions,
  type GetFileOptions,
  type GetFilesOptions,
  type GetLicenseKeyInstanceOptions,
  type GetLicenseKeyInstancesOptions,
  type GetLicenseKeyOptions,
  type GetLicenseKeysOptions,
  type GetOrderItemOptions,
  type GetOrderItemsOptions,
  type GetOrderOptions,
  type GetOrdersOptions,
  type GetPriceOptions,
  type GetPricesOptions,
  type GetProductOptions,
  type GetProductsOptions,
  type GetStoreOptions,
  type GetStoresOptions,
  type GetSubscriptionInvoiceOptions,
  type GetSubscriptionInvoicesOptions,
  type GetSubscriptionItemOptions,
  type GetSubscriptionItemUsageOptions,
  type GetSubscriptionItemsOptions,
  type GetSubscriptionOptions,
  type GetSubscriptionsOptions,
  type GetUsageRecordOptions,
  type GetUsageRecordsOptions,
  type GetVariantOptions,
  type GetVariantsOptions,
  type GetWebhookOptions,
  type GetWebhooksOptions,
  type PauseSubscriptionAttributes,
  type PauseSubscriptionOptions,
  type QueryApiOptions,
  type UpdateSubscriptionAttributes,
  type UpdateSubscriptionItemOptions,
  type UpdateSubscriptionOptions,
  type UpdateWebhookOptions,
} from "./types/methods";

/**
 * @deprecated Deprecated since version 2.0.0. It will be removed with the
 * next major version. Use the new setup method.
 *
 * @see https://github.com/lmsqueezy/lemonsqueezy.js?tab=readme-ov-file#usage.
 */
export class LemonSqueezy {
  protected apiKey: string;
  public apiUrl = "https://api.lemonsqueezy.com/";

  constructor(apiKey: string) {
    console.warn(
      "Warning: LemonSqueezy class is deprecated. Please use the new setup method. See https://github.com/lmsqueezy/lemonsqueezy.js?tab=readme-ov-file#usage."
    );

    this.apiKey = apiKey;
  }

  /* -------------------------------------------------------------------------- */
  /*                                   Helpers                                  */
  /* -------------------------------------------------------------------------- */

  /**
   * Builds a params object for the API query based on provided and allowed
   * filters.
   *
   * Also converts pagination parameters `page` to `page[number]` and `perPage`
   * to `page[size]`
   *
   * @param [args] Arguments to the API method
   * @param [allowedFilters] List of filters the API query permits
   * (camelCase)
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _buildParams<TArgs extends Record<string, any>>(
    args: TArgs,
    allowedFilters: Array<string> = []
  ): Record<string, unknown> {
    const params: Record<string, unknown> = {};

    for (const filter in args) {
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
   * @param [path] The path to the API endpoint.
   * @param [method] POST, GET, PATCH, DELETE.
   * @param [params] URL query parameters.
   * @param [payload] Object/JSON payload.
   *
   * @returns JSON response from the API or throws an error.
   */
  private async _query({
    path,
    method = "GET",
    params,
    payload,
  }: QueryApiOptions) {
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errorsJson = (await response.json()) as any;

      throw {
        status: response.status,
        message: response.statusText,
        errors: errorsJson.errors,
      };
    }

    if (method !== "DELETE") {
      return await response.json();
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                                    Users                                   */
  /* -------------------------------------------------------------------------- */

  /**
   * Get current user
   *
   * @deprecated Deprecated since version 2.0.0. It will be removed with the
   * next major version. Use the new setup method and `getAuthenticatedUser`
   * function.
   *
   * @returns JSON
   */
  async getUser(): Promise<UserResponse> {
    return this._query({ path: "v1/users/me" }) as Promise<UserResponse>;
  }

  /* -------------------------------------------------------------------------- */
  /*                                   Stores                                   */
  /* -------------------------------------------------------------------------- */

  /**
   * Get stores
   *
   * @deprecated Deprecated since version 2.0.0. It will be removed with the
   * next major version. Use the new setup method and `getStore` function
   * instead.
   *
   * @deprecated Deprecated since version 2.0.0. It will be removed with the
   * next major version. Use the new setup method and `listStores` function
   * instead.
   *
   * @param [params]
   * @param [params.perPage] Number of records to return (between 1 and 100)
   * @param [params.page] Page of records to return
   * @param [params.include] List of record types to include
   *
   * @returns A paginated list of `store` objects ordered by name.
   */
  async getStores(params: GetStoresOptions = {}): Promise<StoresResponse> {
    return this._query({
      path: "v1/stores",
      params: this._buildParams(params),
    }) as Promise<StoresResponse>;
  }

  /**
   * Retrieve a store.
   *
   * @deprecated Deprecated since version 2.0.0. It will be removed with the
   * next major version. Use the new setup method and `getStore` function
   * instead.
   *
   * @param storeId (Required) The given store id.
   * @param [params] (Optional) Additional parameters.
   * @param [params.include] (Optional) Related resources.
   * @returns A store object.
   */
  async getStore(p: GetStoreOptions): Promise<StoreResponse> {
    const { id, ...params } = p || {};
    requiredCheck({ id });

    return this._query({
      path: `v1/stores/${id}`,
      params: this._buildParams(params),
    }) as Promise<StoreResponse>;
  }

  /* -------------------------------------------------------------------------- */
  /*                                  Customers                                 */
  /* -------------------------------------------------------------------------- */

  /**
   * Get customers
   *
   * @deprecated Deprecated since version 2.0.0. It will be removed with the
   * next major version. Use the new setup method and `listCustomers` function
   * instead.
   *
   * @param [params]
   * @param [params.storeId] Filter customers by store
   * @param [params.email] Filter customers by email address
   * @param [params.perPage] Number of records to return (between 1 and 100)
   * @param [params.page] Page of records to return
   * @param [params.include] List of record types to include
   *
   * @returns A paginated list of customer objects ordered by `created_at` (descending).
   */
  async getCustomers(
    params: GetCustomersOptions = {}
  ): Promise<CustomersResponse> {
    return this._query({
      path: "v1/customers",
      params: this._buildParams(params, ["storeId", "email"]),
    }) as Promise<CustomersResponse>;
  }

  /**
   * Get a customer
   *
   * @deprecated Deprecated since version 2.0.0. It will be removed with the
   * next major version. Use the new setup method and `getCustomer` function
   * instead.
   *
   * @param customerId The given customer id.
   * @param [params]
   * @param [params.id]
   * @param [params.include] List of record types to include
   *
   * @returns A customer object.
   */
  async getCustomer(p: GetCustomerOptions): Promise<CustomerResponse> {
    const { id, ...params } = p || {};
    requiredCheck({ id });

    return this._query({
      path: `v1/customers/${id}`,
      params: this._buildParams(params),
    }) as Promise<CustomerResponse>;
  }

  /* -------------------------------------------------------------------------- */
  /*                                  Products                                  */
  /* -------------------------------------------------------------------------- */

  /**
   * Get products
   *
   * @deprecated Deprecated since version 2.0.0. It will be removed with the
   * next major version. Use the new setup method and `listProducts` function
   * instead.
   *
   * @param [params] Additional parameters.
   * @param [params.storeId] Filter products by store
   * @param [params.perPage] Number of records to return (between 1 and 100)
   * @param [params.page] Page of records to return
   * @param [params.include] List of record types to include
   *
   * @returns A paginated list of product objects ordered by `name`.
   */
  async getProducts(
    params: GetProductsOptions = {}
  ): Promise<ProductsResponse> {
    return this._query({
      path: "v1/products",
      params: this._buildParams(params, ["storeId"]),
    }) as Promise<ProductsResponse>;
  }

  /**
   * Get a product
   *
   * @deprecated Deprecated since version 2.0.0. It will be removed with the
   * next major version. Use the new setup method and `getProduct` function
   * instead.
   *
   * @param productId The given product id.
   * @param [params]
   * @param [params.id]
   * @param [params.include] List of record types to include
   *
   * @returns A product object.
   */
  async getProduct(p: GetProductOptions): Promise<ProductResponse> {
    const { id, ...params } = p || {};
    requiredCheck({ id });

    return this._query({
      path: `v1/products/${id}`,
      params: this._buildParams(params),
    }) as Promise<ProductResponse>;
  }

  /* -------------------------------------------------------------------------- */
  /*                                  Variants                                  */
  /* -------------------------------------------------------------------------- */

  /**
   * Get variants
   *
   * @deprecated Deprecated since version 2.0.0. It will be removed with the
   * next major version. Use the new setup method and `listVariants` function
   * instead.
   *
   * @param [params]
   * @param [params.productId Filter variants by product
   * @param [params.perPage] Number of records to return (between 1 and 100)
   * @param [params.page] Page of records to return
   * @param [params.include] List of record types to include
   *
   * @returns {Object} JSON
   */
  async getVariants(
    params: GetVariantsOptions = {}
  ): Promise<VariantsResponse> {
    return this._query({
      path: "v1/variants",
      params: this._buildParams(params, ["productId"]),
    }) as Promise<VariantsResponse>;
  }

  /**
   * Get a variant
   *
   * @deprecated Deprecated since version 2.0.0. It will be removed with the
   * next major version. Use the new setup method and `getVariant` function
   * instead.
   *
   * @param {Object} params
   * @param {number} params.id
   * @param {Array<"product" | "files">} [params.include] List of record types to include
   *
   * @returns {Object} JSON
   */
  async getVariant(p: GetVariantOptions): Promise<VariantResponse> {
    const { id, ...params } = p || {};
    requiredCheck({ id });

    return this._query({
      path: `v1/variants/${id}`,
      params: this._buildParams(params),
    }) as Promise<VariantResponse>;
  }

  /* -------------------------------------------------------------------------- */
  /*                                   Prices                                   */
  /* -------------------------------------------------------------------------- */

  /**
   * Get prices
   *
   * @deprecated Deprecated since version 2.0.0. It will be removed with the
   * next major version. Use the new setup method and `listPrices` function
   * instead.
   *
   * @param [params]
   * @param [params.variantId] Filter prices by variant
   * @param [params.perPage] Number of records to return (between 1 and 100)
   * @param [params.page] Page of records to return
   * @param [params.include] List of record types to include
   *
   * @returns A paginated list of price objects ordered by `created_at` (descending).
   */
  async getPrices(params: GetPricesOptions = {}) {
    return this._query({
      path: "v1/prices",
      params: this._buildParams(params, ["variantId"]),
    });
  }

  /**
   * Get a price
   *
   * @deprecated Deprecated since version 2.0.0. It will be removed with the
   * next major version. Use the new setup method and `listPrices` function
   * instead.
   *
   * @param priceId The given price id.
   * @param [params]
   * @param [params.include] List of record types to include
   *
   * @returns A price object.
   */
  async getPrice(p: GetPriceOptions) {
    const { id, ...params } = p || {};
    requiredCheck({ id });

    return this._query({
      path: `v1/prices/${id}`,
      params: this._buildParams(params),
    });
  }

  /* -------------------------------------------------------------------------- */
  /*                                    Files                                   */
  /* -------------------------------------------------------------------------- */
  /**
   * Get files
   *
   * @deprecated Deprecated since version 2.0.0. It will be removed with the
   * next major version. Use the new setup method and `listFiles` function
   * instead.
   *
   * @param [params] (Optional) Additional parameters.
   * @param [params.filter] (Optional) Filter parameters.
   * @param [params.filter.variantId] (Optional) Only return files belonging to the variant with this ID.
   * @param [params.page] (Optional) Custom paginated queries.
   * @param [params.page.number] (Optional) The parameter determine which page to retrieve.
   * @param [params.page.size] (Optional) The parameter to determine how many results to return per page.
   * @param [params.include] (Optional) Related resources.
   * @returns A paginated list of file objects ordered by `sort`.
   */
  async getFiles(params: GetFilesOptions = {}): Promise<FilesResponse> {
    return this._query({
      path: "v1/files",
      params: this._buildParams(params, ["variantId"]),
    }) as Promise<FilesResponse>;
  }

  /**
   * Retrieve a file.
   *
   * @deprecated Deprecated since version 2.0.0. It will be removed with the
   * next major version. Use the new setup method and `getFile` function
   * instead.
   *
   * @param fileId The given file id
   * @param [params] (Optional) Additional parameters.
   * @param [params.include] (Optional) Related resources.
   * @returns A file object.
   */
  async getFile(p: GetFileOptions): Promise<FileResponse> {
    const { id, ...params } = p || {};
    requiredCheck({ id });

    return this._query({
      path: `v1/files/${id}`,
      params: this._buildParams(params),
    }) as Promise<FileResponse>;
  }

  /* -------------------------------------------------------------------------- */
  /*                                   Orders                                   */
  /* -------------------------------------------------------------------------- */

  /**
   * Get orders.
   *
   * @deprecated Deprecated since version 2.0.0. It will be removed with the
   * next major version. Use the new setup method and `listOrders` function
   * instead.
   *
   * @param [params] (Optional) Additional parameters.
   * @param [params.filter] (Optional) Filter parameters.
   * @param [params.filter.storeId] (Optional) Only return orders belonging to the store with this ID.
   * @param [params.filter.userEmail] (Optional) Only return orders where the `user_email` field is equal to this email address.
   * @param [params.page] (Optional) Custom paginated queries.
   * @param [params.page.number] (Optional) The parameter determine which page to retrieve.
   * @param [params.page.size] (Optional) The parameter to determine how many results to return per page.
   * @param [params.include] (Optional) Related resources.
   * @returns A paginated list of order objects ordered by `created_at` (descending).
   */
  async getOrders(params: GetOrdersOptions = {}): Promise<OrdersResponse> {
    return this._query({
      path: "v1/orders",
      params: this._buildParams(params, ["storeId", "userEmail"]),
    }) as Promise<OrdersResponse>;
  }

  /**
   * Retrieve an order.
   *
   * @deprecated Deprecated since version 2.0.0. It will be removed with the
   * next major version. Use the new setup method and `getOrder` function
   * instead.
   *
   * @param orderId The given order id.
   * @param [params] (Optional) Additional parameters.
   * @param [params.include] (Optional) Related resources.
   * @returns An order object.
   */
  async getOrder(p: GetOrderOptions): Promise<OrderResponse> {
    const { id, ...params } = p || {};
    requiredCheck({ id });

    return this._query({
      path: `v1/orders/${id}`,
      params: this._buildParams(params),
    }) as Promise<OrderResponse>;
  }

  /* -------------------------------------------------------------------------- */
  /*                                 Order Items                                */
  /* -------------------------------------------------------------------------- */

  /**
   * List all order items.
   *
   * @deprecated Deprecated since version 2.0.0. It will be removed with the
   * next major version. Use the new setup method and `listOrderItems` function
   * instead.
   *
   * @param [params] (Optional) Additional parameters.
   * @param [params.filter] (Optional) Filter parameters.
   * @param [params.filter.orderId] (Optional) Only return order items belonging to the order with this ID.
   * @param [params.filter.productId] (Optional) Only return order items belonging to the product with this ID.
   * @param [params.filter.variantId] (Optional) Only return order items belonging to the variant with this ID.
   * @param [params.page] (Optional) Custom paginated queries.
   * @param [params.page.number] (Optional) The parameter determine which page to retrieve.
   * @param [params.page.size] (Optional) The parameter to determine how many results to return per page.
   * @param [params.include] (Optional) Related resources.
   * @returns A paginated list of order item objects ordered by `id`.
   */
  async getOrderItems(params: GetOrderItemsOptions = {}) {
    return this._query({
      path: "v1/order-items",
      params: this._buildParams(params, ["orderId", "productId", "variantId"]),
    });
  }

  /**
   * Retrieve an order item.
   *
   * @deprecated Deprecated since version 2.0.0. It will be removed with the
   * next major version. Use the new setup method and `getOrderItem` function
   * instead.
   *
   * @param orderItemId The given order item id.
   * @param [params] (Optional) Additional parameters.
   * @param [params.include] (Optional) Related resources.
   * @returns An order item object.
   */
  async getOrderItem(p: GetOrderItemOptions) {
    const { id, ...params } = p || {};
    requiredCheck({ id });

    return this._query({
      path: `v1/order-items/${id}`,
      params: this._buildParams(params),
    });
  }

  /* -------------------------------------------------------------------------- */
  /*                                Subscriptions                               */
  /* -------------------------------------------------------------------------- */

  /**
   * Get all subscriptions.
   *
   * @deprecated Deprecated since version 2.0.0. It will be removed with the
   * next major version. Use the new setup method and `listSubscriptions` function
   * instead.
   *
   * @param [params] (Optional) Additional parameters.
   * @param [params.filter.storeId] (Optional) Only return subscriptions belonging to the store with this ID.
   * @param [params.filter.orderId] (Optional) Only return subscriptions belonging to the order with this ID.
   * @param [params.filter.orderItemId] (Optional) Only return subscriptions belonging to the order item with this ID.
   * @param [params.filter.productId] (Optional) Only return subscriptions belonging to the product with this ID.
   * @param [params.filter.variantId] (Optional) Only return subscriptions belonging to the variant with this ID.
   * @param [params.filter.userEmail] (Optional) Only return subscriptions where the `user_email` field is equal to this email address.
   * @param [params.filter.status] (Optional) Only return subscriptions with this status.
   * @param [params.page] (Optional) Custom paginated queries.
   * @param [params.page.number] (Optional) The parameter determine which page to retrieve.
   * @param [params.page.size] (Optional) The parameter to determine how many results to return per page.
   * @param [params.include] (Optional) Related resources.
   * @returns A paginated list of subscription objects ordered by `created_at` (descending).
   */
  async getSubscriptions(
    params: GetSubscriptionsOptions = {}
  ): Promise<SubscriptionsResponse> {
    return this._query({
      path: "v1/subscriptions",
      params: this._buildParams(params, [
        "storeId",
        "orderId",
        "orderItemId",
        "productId",
        "variantId",
        "status",
      ]),
    }) as Promise<SubscriptionsResponse>;
  }

  /**
   * Retrieve a subscription.
   *
   * @deprecated Deprecated since version 2.0.0. It will be removed with the
   * next major version. Use the new setup method and `getSubscription` function
   * instead.
   *
   * @param subscriptionId The given subscription id.
   * @param [params] (Optional) Additional parameters.
   * @param [params.include] (Optional) Related resources.
   * @returns A subscription object.
   */
  async getSubscription(
    p: GetSubscriptionOptions
  ): Promise<SubscriptionResponse> {
    const { id, ...params } = p || {};
    requiredCheck({ id });

    return this._query({
      path: `v1/subscriptions/${id}`,
      params: this._buildParams(params),
    }) as Promise<SubscriptionResponse>;
  }

  /**
   * Update a subscription's plan
   *
   * @deprecated Deprecated since version 2.0.0. It will be removed with the
   * next major version. Use the new setup method and `updateSubscription` function
   * instead.
   *
   * @param params.id
   * @param [params.variantId] ID of variant (required if changing plans)
   * @param [params.productId] ID of product (required if changing plans)
   * @param [params.billingAnchor] Set the billing day (1–31) used for renewal charges
   * @param {"immediate" | "disable"} [params.proration] If not included, proration will occur at the next renewal date.
   *                                   Use 'immediate' to charge a prorated amount immediately.
   *                                   Use 'disable' to charge a full ammount immediately.
   *
   * @returns {Object} JSON
   */
  async updateSubscription(
    p: UpdateSubscriptionOptions
  ): Promise<SubscriptionResponse> {
    const { id, variantId, productId, billingAnchor, proration } = p || {};
    requiredCheck({ id });

    const attributes: UpdateSubscriptionAttributes = {
      variant_id: variantId,
      product_id: productId,
      billing_anchor: billingAnchor,
    };

    if (proration == "disable") {
      attributes.disable_prorations = true;
    }

    if (proration == "immediate") {
      attributes.invoice_immediately = true;
    }

    return this._query({
      path: `v1/subscriptions/${id}`,
      method: "PATCH",
      payload: {
        data: {
          type: "subscriptions",
          id: "" + id,
          attributes,
        },
      },
    }) as Promise<SubscriptionResponse>;
  }

  /**
   * Cancel a subscription.
   *
   * @deprecated Deprecated since version 2.0.0. It will be removed with the
   * next major version. Use the new setup method and `cancelSubscription` function
   * instead.
   *
   * @param subscriptionId The given subscription id
   * @returns The Subscription object in a cancelled state.
   */
  async cancelSubscription(
    p: BaseUpdateSubscriptionOptions
  ): Promise<SubscriptionResponse> {
    const { id } = p || {};
    requiredCheck({ id });

    return this._query({
      path: `v1/subscriptions/${id}`,
      method: "DELETE",
    }) as Promise<SubscriptionResponse>;
  }

  /**
   * Resume (un-cancel) a subscription
   *
   * @deprecated Deprecated since version 2.0.0. It will be removed with the
   * next major version. Use the new setup method and `updateSubscription` function
   * instead.
   *
   * @param subscriptionId The given subscription id
   * @returns The Subscription object.
   */
  async resumeSubscription(
    p: BaseUpdateSubscriptionOptions
  ): Promise<SubscriptionResponse> {
    const { id } = p || {};
    requiredCheck({ id });

    return this._query({
      path: `v1/subscriptions/${id}`,
      method: "PATCH",
      payload: {
        data: {
          type: "subscriptions",
          id: "" + id,
          attributes: {
            cancelled: false,
          },
        },
      },
    }) as Promise<SubscriptionResponse>;
  }

  /**
   * Pause a subscription
   *
   * @deprecated Deprecated since version 2.0.0. It will be removed with the
   * next major version. Use the new setup method and `updateSubscription` function
   * instead.
   *
   * @param subscriptionId The given subscription id
   * @param [params] (Optional) Additional parameters.
   * @param [params.mode] Pause mode: "void" (default) or "free"
   * @param [params.resumesAt] Date to automatically resume the subscription (ISO 8601 format)
   *
   * @returns {Object} JSON
   */
  async pauseSubscription(
    p: PauseSubscriptionOptions
  ): Promise<SubscriptionResponse> {
    const { id, mode, resumesAt } = p || {};
    requiredCheck({ id });

    const pause: PauseSubscriptionAttributes = { mode: "void" };

    if (mode) {
      pause.mode = mode;
    }

    if (resumesAt) {
      pause.resumes_at = resumesAt;
    }

    return this._query({
      path: `v1/subscriptions/${id}`,
      method: "PATCH",
      payload: {
        data: {
          type: "subscriptions",
          id: id.toString(),
          attributes: { pause },
        },
      },
    }) as Promise<SubscriptionResponse>;
  }

  /**
   * Unpause a subscription.
   *
   * @deprecated Deprecated since version 2.0.0. It will be removed with the
   * next major version. Use the new setup method and `updateSubscription` function
   * instead.
   *
   * @param subscriptionId The given subscription id
   * @returns The Subscription object.
   */
  async unpauseSubscription(
    p: BaseUpdateSubscriptionOptions
  ): Promise<SubscriptionResponse> {
    const { id } = p || {};
    requiredCheck({ id });

    return this._query({
      path: `v1/subscriptions/${id}`,
      method: "PATCH",
      payload: {
        data: {
          type: "subscriptions",
          id: "" + id,
          attributes: {
            pause: null,
          },
        },
      },
    }) as Promise<SubscriptionResponse>;
  }

  /* -------------------------------------------------------------------------- */
  /*                            Subscription Invoices                           */
  /* -------------------------------------------------------------------------- */

  /**
   * Get subscription invoices
   *
   * @deprecated Deprecated since version 2.0.0. It will be removed with the
   * next major version. Use the new setup method and `listSubscriptionInvoices` function
   * instead.
   *
   * @param [params]
   * @param [params.storeId] Filter subscription invoices by store
   * @param [params.status] Filter subscription invoices by status
   * @param [params.refunded] Filter subscription invoices by refunded
   * @param [params.subscriptionId] Filter subscription invoices by subscription
   * @param [params.perPage] Number of records to return (between 1 and 100)
   * @param [params.page] Page of records to return
   * @param [params.include] List of record types to include
   *
   * @returns A paginated list of subscription invoice objects ordered by `created_at` (descending).
   */
  async getSubscriptionInvoices(
    params: GetSubscriptionInvoicesOptions = {}
  ): Promise<SubscriptionInvoicesResponse> {
    return this._query({
      path: "v1/subscription-invoices",
      params: this._buildParams(params, [
        "storeId",
        "status",
        "refunded",
        "subscriptionId",
      ]),
    }) as Promise<SubscriptionInvoicesResponse>;
  }

  /**
   * Retrieve a subscription invoice.
   *
   * @deprecated Deprecated since version 2.0.0. It will be removed with the
   * next major version. Use the new setup method and `getSubscriptionInvoice` function
   * instead.
   *
   * @param subscriptionInvoiceId The given subscription invoice id.
   * @param [params] (Optional) Additional parameters.
   * @param [params.include] (Optional) Related resources.
   * @returns A subscription invoice object.
   */
  async getSubscriptionInvoice(
    p: GetSubscriptionInvoiceOptions
  ): Promise<SubscriptionInvoiceResponse> {
    const { id, ...params } = p || {};
    requiredCheck({ id });

    return this._query({
      path: `v1/subscription-invoices/${id}`,
      params: this._buildParams(params),
    }) as Promise<SubscriptionInvoiceResponse>;
  }

  /* -------------------------------------------------------------------------- */
  /*                             Subscription Items                             */
  /* -------------------------------------------------------------------------- */

  /**
   * List all subscription items.
   *
   * @deprecated Deprecated since version 2.0.0. It will be removed with the
   * next major version. Use the new setup method and `listSubscriptionItems` function
   * instead.
   *
   * @param [params] (Optional) Additional parameters.
   * @param [params.filter] (Optional) Filter parameters.
   * @param [params.filter.subscriptionId] (Optional) Only return subscription items belonging to a subscription with this ID.
   * @param [params.filter.priceId] (Optional) Only return subscription items belonging to a price with this ID.
   * @param [params.page] (Optional) Custom paginated queries.
   * @param [params.page.number] (Optional) The parameter determine which page to retrieve.
   * @param [params.page.size] (Optional) The parameter to determine how many results to return per page.
   * @param [params.include] (Optional) Related resources.
   * @returns A paginated list of subscription item objects ordered by `created_at` (descending).
   */
  async getSubscriptionItems(
    params: GetSubscriptionItemsOptions = {}
  ): Promise<SubscriptionItemResponse> {
    return this._query({
      path: "v1/subscription-items",
      params: this._buildParams(params, ["subscriptionId", "priceId"]),
    }) as Promise<SubscriptionItemResponse>;
  }

  /**
   * Retrieve a subscription item.
   *
   * @deprecated Deprecated since version 2.0.0. It will be removed with the
   * next major version. Use the new setup method and `getSubscriptionItem` function
   * instead.
   *
   * @param subscriptionItemId The given subscription item id.
   * @param [params] (Optional) Additional parameters.
   * @param [params.include] (Optional) Related resources.
   * @returns A subscription item object.
   */
  async getSubscriptionItem(
    p: GetSubscriptionItemOptions
  ): Promise<SubscriptionItemResponse> {
    const { id, ...params } = p || {};
    requiredCheck({ id });

    return this._query({
      path: `v1/subscription-items/${id}`,
      params: this._buildParams(params),
    }) as Promise<SubscriptionItemResponse>;
  }

  /**
   * Update a subscription item.
   *
   * @deprecated Deprecated since version 2.0.0. It will be removed with the
   * next major version. Use the new setup method and `updateSubscriptionItem` function
   * instead.
   *
   * Note: this endpoint is only used with quantity-based billing.
   * If the related subscription's product/variant has usage-based billing
   * enabled, this endpoint will return a `422 Unprocessable Entity` response.
   *
   * @param subscriptionItemId The given subscription item id.
   * @param quantity The unit quantity of the subscription.
   * @returns A subscription item object.
   */
  async updateSubscriptionItem(
    p: UpdateSubscriptionItemOptions
  ): Promise<SubscriptionItemResponse> {
    const { id, quantity } = p || {};
    requiredCheck({ id, quantity });

    return this._query({
      path: `v1/subscription-items/${id}`,
      method: "PATCH",
      payload: {
        data: {
          type: "subscription-items",
          id: "" + id,
          attributes: {
            quantity,
          },
        },
      },
    }) as Promise<SubscriptionItemResponse>;
  }

  /**
   * Retrieve a subscription item's current usage.
   *
   * @deprecated Deprecated since version 2.0.0. It will be removed with the
   * next major version. Use the new setup method and `getSubscriptionItemCurrentUsage` function
   * instead.
   *
   * Note: this endpoint is only for subscriptions with usage-based billing
   * enabled. It will return a `404 Not Found` response if the related
   * subscription product/variant does not have usage-based billing enabled.
   *
   * @param subscriptionItemId The given subscription item id.
   * @returns A meta object containing usage information.
   */
  async getSubscriptionItemUsage(
    p: GetSubscriptionItemUsageOptions
  ): Promise<SubscriptionItemUsageResponse> {
    const { id } = p || {};
    requiredCheck({ id });

    return this._query({
      path: `v1/subscription-items/${id}/current-usage`,
    }) as Promise<SubscriptionItemUsageResponse>;
  }

  /* -------------------------------------------------------------------------- */
  /*                                Usage Records                               */
  /* -------------------------------------------------------------------------- */

  /**
   * Get all usage records.
   *
   * @deprecated Deprecated since version 2.0.0. It will be removed with the
   * next major version. Use the new setup method and `listUsageRecords` function
   * instead.
   *
   * @param [params] (Optional) Additional parameters.
   * @param [params.filter] (Optional) Filter parameters.
   * @param [params.filter.subscriptionItemId] (Optional) Only return usage records belonging to the subscription item with this ID.
   * @param [params.page] (Optional) Custom paginated queries.
   * @param [params.page.number] (Optional) The parameter determine which page to retrieve.
   * @param [params.page.size] (Optional) The parameter to determine how many results to return per page.
   * @param [params.include] (Optional) Related resources.
   * @returns A paginated list of usage record objects ordered by `created_at` (descending).
   */
  async getUsageRecords(
    params: GetUsageRecordsOptions = {}
  ): Promise<UsageRecordsResponse> {
    return this._query({
      path: "v1/usage-records",
      params: this._buildParams(params, ["subscriptionItemId"]),
    }) as Promise<UsageRecordsResponse>;
  }

  /**
   * Retrieve a usage record.
   *
   * @deprecated Deprecated since version 2.0.0. It will be removed with the
   * next major version. Use the new setup method and `getUsageRecord` function
   * instead.
   *
   * @param params.id The usage record id.
   * @param [params] (Optional) Additional parameters.
   * @param [params.include] (Optional) Related resources.
   * @returns A usage record object.
   */
  async getUsageRecord(p: GetUsageRecordOptions): Promise<UsageRecordResponse> {
    const { id, ...params } = p || {};
    requiredCheck({ id });

    return this._query({
      path: `v1/usage-records/${id}`,
      params: this._buildParams(params),
    }) as Promise<UsageRecordResponse>;
  }

  /**
   * Create a usage record
   *
   * @deprecated Deprecated since version 2.0.0. It will be removed with the
   * next major version. Use the new setup method and `createUsageRecord` function
   * instead.
   *
   * @param params
   * @param params.subscriptionItemId The ID of the subscription item to report usage for
   * @param params.quantity The number of units to report
   * @param [params.action] Type of record
   *
   * @returns A usage record object.
   */
  async createUsageRecord(
    p: CreateUsageRecordOptions
  ): Promise<UsageRecordResponse> {
    const { subscriptionItemId, quantity, action } = p || {};
    requiredCheck({ subscriptionItemId, quantity });

    return this._query({
      path: "v1/usage-records",
      method: "POST",
      payload: {
        data: {
          type: "usage-records",
          attributes: {
            quantity,
            action,
          },
          relationships: {
            "subscription-item": {
              data: {
                type: "subscription-items",
                id: subscriptionItemId.toString(),
              },
            },
          },
        },
      },
    }) as Promise<UsageRecordResponse>;
  }

  /* -------------------------------------------------------------------------- */
  /*                                  Discounts                                 */
  /* -------------------------------------------------------------------------- */

  /**
   * List all discounts.
   *
   * @deprecated Deprecated since version 2.0.0. It will be removed with the
   * next major version. Use the new setup method and `listDiscounts` function
   * instead.
   *
   * @param [params] (Optional) Additional parameters.
   * @param [params.filter] (Optional) Filter parameters.
   * @param [params.filter.storeId] (Optional) Only return discounts belonging to the store with this ID.
   * @param [params.page] (Optional) Custom paginated queries.
   * @param [params.page.number] (Optional) The parameter determine which page to retrieve.
   * @param [params.page.size] (Optional) The parameter to determine how many results to return per page.
   * @param [params.include] (Optional) Related resources.
   * @returns A paginated list of discount objects ordered by `created_at`.
   */
  async getDiscounts(
    params: GetDiscountsOptions = {}
  ): Promise<DiscountsResponse> {
    return this._query({
      path: "v1/discounts",
      params: this._buildParams(params, ["storeId"]),
    }) as Promise<DiscountsResponse>;
  }

  /**
   * Retrieve a discount.
   *
   * @deprecated Deprecated since version 2.0.0. It will be removed with the
   * next major version. Use the new setup method and `getDiscount` function
   * instead.
   *
   * @param params.id The usage record id.
   * @param [params] (Optional) Additional parameters.
   * @param [params.include] (Optional) Related resources.
   * @returns A discount object.
   */
  async getDiscount(p: GetDiscountOptions): Promise<DiscountResponse> {
    const { id, ...params } = p || {};
    requiredCheck({ id });

    return this._query({
      path: `v1/discounts/${id}`,
      params: this._buildParams(params),
    }) as Promise<DiscountResponse>;
  }

  /**
   * Create a discount
   *
   * @deprecated Deprecated since version 2.0.0. It will be removed with the
   * next major version. Use the new setup method and `createDiscount` function
   * instead.
   *
   * @param params
   * @param params.storeId Store to create a discount in
   * @param params.name Name of discount
   * @param params.code Discount code (uppercase letters and numbers, between 3 and 256 characters)
   * @param params.amount Amount the discount is for
   * @param params.amountType Type of discount
   * @param [params.duration] Duration of discount
   * @param [params.durationInMonths] Number of months to repeat the discount for
   * @param [params.variantIds] Limit the discount to certain variants
   * @param [params.maxRedemptions] The total number of redemptions allowed
   * @param [params.startsAt] Date the discount code starts on (ISO 8601 format)
   * @param [params.expiresAt] Date the discount code expires on (ISO 8601 format)
   *
   * @returns A discount object.
   */
  async createDiscount(p: CreateDiscountOptions): Promise<DiscountResponse> {
    const {
      storeId,
      name,
      code,
      amount,
      amountType = "fixed",
      duration = "once",
      durationInMonths,
      variantIds,
      maxRedemptions,
      startsAt,
      expiresAt,
    } = p || {};
    requiredCheck({ storeId, name, code, amount });

    const attributes: CreateDiscountAttributes = {
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

    const relationships: { store: object; variants?: object } = {
      store: {
        data: {
          type: "stores",
          id: storeId.toString(),
        },
      },
    };

    if (variantIds) {
      const variantData: Array<{ type: string; id: string }> = [];
      for (let i = 0; i < variantIds.length; i++) {
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
          relationships,
        },
      },
    }) as Promise<DiscountResponse>;
  }

  /**
   * Delete a discount.
   *
   * @deprecated Deprecated since version 2.0.0. It will be removed with the
   * next major version. Use the new setup method and `deleteDiscount` function
   * instead.
   *
   * @param params.id The given discount id.
   * @returns A `204 No Content` response on success.
   */
  async deleteDiscount(p: DeleteDiscountOptions): Promise<void> {
    const { id } = p || {};
    requiredCheck({ id });

    return this._query({
      path: `v1/discounts/${id}`,
      method: "DELETE",
    }) as Promise<void>;
  }

  /* -------------------------------------------------------------------------- */
  /*                            Discount Redemptions                            */
  /* -------------------------------------------------------------------------- */

  /**
   * List all discount redemptions.
   *
   * @deprecated Deprecated since version 2.0.0. It will be removed with the
   * next major version. Use the new setup method and `listDiscountRedemption` function
   * instead.
   *
   * @param [params] (Optional) Additional parameters.
   * @param [params.filter] (Optional) Filter parameters.
   * @param [params.filter.discountId] (Optional) Only return discount redemptions belonging to the discount with this ID.
   * @param [params.filter.orderId] (Optional) Only return discount redemptions belonging to the order with this ID.
   * @param [params.page] (Optional) Custom paginated queries.
   * @param [params.page.number] (Optional) The parameter determine which page to retrieve.
   * @param [params.page.size] (Optional) The parameter to determine how many results to return per page.
   * @param [params.include] (Optional) Related resources.
   * @returns A paginated list of discount redemption objects ordered by `created_at` (descending).
   */
  async getDiscountRedemptions(
    params: GetDiscountRedemptionsOptions = {}
  ): Promise<DiscountRedemptionsResponse> {
    return this._query({
      path: "v1/discount-redemptions",
      params: this._buildParams(params, ["discountId", "orderId"]),
    }) as Promise<DiscountRedemptionsResponse>;
  }

  /**
   * Retrieve a discount redemption.
   *
   * @deprecated Deprecated since version 2.0.0. It will be removed with the
   * next major version. Use the new setup method and `getDiscountRedemption` function
   * instead.
   *
   * @param discountRedemptionId The given discount redemption id.
   * @param [params] (Optional) Additional parameters.
   * @param [params.include] (Optional) Related resources.
   * @returns A discount redemption object.
   */
  async getDiscountRedemption(
    p: GetDiscountRedemptionOptions
  ): Promise<DiscountRedemptionResponse> {
    const { id, ...params } = p || {};
    requiredCheck({ id });

    return this._query({
      path: `v1/discount-redemptions/${id}`,
      params: this._buildParams(params),
    }) as Promise<DiscountRedemptionResponse>;
  }

  /* -------------------------------------------------------------------------- */
  /*                                License Keys                                */
  /* -------------------------------------------------------------------------- */

  /**
   * List all license keys.
   *
   * @deprecated Deprecated since version 2.0.0. It will be removed with the
   * next major version. Use the new setup method and `listLicenseKeys` function
   * instead.
   *
   * @param [params] (Optional) Additional parameters.
   * @param [params.filter] (Optional) Filter parameters.
   * @param [params.filter.storeId] (Optional) Only return license keys belonging to the store with this ID.
   * @param [params.filter.orderId] (Optional) (Optional) Only return license keys belonging to the order with this ID.
   * @param [params.filter.orderItemId] (Optional) Only return license keys belonging to the order item with this ID.
   * @param [params.filter.productId] (Optional) Only return license keys belonging to the product with this ID.
   * @param [params.page] (Optional) Custom paginated queries.
   * @param [params.page.number] (Optional) The parameter determine which page to retrieve.
   * @param [params.page.size] (Optional) The parameter to determine how many results to return per page.
   * @param [params.include] (Optional) Related resources.
   * @returns A paginated list of license key objects ordered by `id`.
   */
  async getLicenseKeys(
    params: GetLicenseKeysOptions = {}
  ): Promise<LicenseKeysResponse> {
    return this._query({
      path: "v1/license-keys",
      params: this._buildParams(params, [
        "storeId",
        "orderId",
        "orderItemId",
        "productId",
      ]),
    }) as Promise<LicenseKeysResponse>;
  }

  /**
   * Retrieve a license key.
   *
   * @deprecated Deprecated since version 2.0.0. It will be removed with the
   * next major version. Use the new setup method and `getLicenseKey` function
   * instead.
   *
   * @param params parameters.
   * @param params.id The license key id.
   * @param [params.include] (Optional) Related resources.
   * @returns A license key object.
   */
  async getLicenseKey(p: GetLicenseKeyOptions): Promise<LicenseKeyResponse> {
    const { id, ...params } = p || {};
    requiredCheck({ id });

    return this._query({
      path: `v1/license-keys/${id}`,
      params: this._buildParams(params),
    }) as Promise<LicenseKeyResponse>;
  }

  /* -------------------------------------------------------------------------- */
  /*                           License Keys Instances                           */
  /* -------------------------------------------------------------------------- */

  /**
   * Get license key instances
   *
   * @deprecated Deprecated since version 2.0.0. It will be removed with the
   * next major version. Use the new setup method and `listLicenseKeyInstances` function
   * instead.
   *
   * @param {Object} [params]
   * @param {number} [params.licenseKeyId] Filter license keys instances by license key
   * @param {number} [params.perPage] Number of records to return (between 1 and 100)
   * @param {number} [params.page] Page of records to return
   * @param {Array<"license-key">} [params.include] List of record types to include
   *
   * @returns {Object} JSON
   */
  async getLicenseKeyInstances(
    params: GetLicenseKeyInstancesOptions = {}
  ): Promise<LicenseKeyInstancesResponse> {
    return this._query({
      path: "v1/license-key-instances",
      params: this._buildParams(params, ["licenseKeyId"]),
    }) as Promise<LicenseKeyInstancesResponse>;
  }

  /**
   * Retrieve a license key instance.
   *
   * @deprecated Deprecated since version 2.0.0. It will be removed with the
   * next major version. Use the new setup method and `getLicenseKeyInstance` function
   * instead.
   *
   * @param params.id The given license key instance id.
   * @param [params] (Optional) Additional parameters.
   * @param [params.include] (Optional) Related resources.
   * @returns A license key instance object.
   */
  async getLicenseKeyInstance({
    id,
    ...params
  }: GetLicenseKeyInstanceOptions): Promise<LicenseKeyInstanceResponse> {
    if (!id) throw "You must provide an `id` in getLicenseKeyInstance().";

    return this._query({
      path: `v1/license-key-instances/${id}}`,
      params: this._buildParams(params),
    }) as Promise<LicenseKeyInstanceResponse>;
  }

  /* -------------------------------------------------------------------------- */
  /*                                  Checkouts                                 */
  /* -------------------------------------------------------------------------- */

  /**
   * List all checkouts.
   *
   * @deprecated Deprecated since version 2.0.0. It will be removed with the
   * next major version. Use the new setup method and `listCheckouts` function
   * instead.
   *
   * @param [params] (Optional) Additional parameters.
   * @param [params.filter] (Optional) Filter parameters.
   * @param [params.filter.storeId] (Optional) Only return products belonging to the store with this ID.
   * @param [params.filter.variantId] (Optional) Only return products belonging to the variant with this ID.
   * @param [params.page] (Optional) Custom paginated queries.
   * @param [params.page.number] (Optional) The parameter determine which page to retrieve.
   * @param [params.page.size] (Optional) The parameter to determine how many results to return per page.
   * @param [params.include] (Optional) Related resources.
   * @returns A paginated list of checkout objects ordered by `created_at` (descending).
   */
  async getCheckouts(
    params: GetCheckoutsOptions = {}
  ): Promise<CheckoutsResponse> {
    return this._query({
      path: "v1/checkouts",
      params: this._buildParams(params, ["storeId", "variantId"]),
    }) as Promise<CheckoutsResponse>;
  }

  /**
   * Retrieve a checkout.
   *
   * @deprecated Deprecated since version 2.0.0. It will be removed with the
   * next major version. Use the new setup method and `getCheckout` function
   * instead.
   *
   * @deprecated Deprecated since version 2.0.0. It will be removed with the
   * next major version. Use the new setup method and `getCheckout` function
   * instead.
   *
   * @param params.id (Required) The checkout id.
   * @param [params] (Optional) Additional parameters.
   * @param [params.include] (Optional) Related resources.
   * @returns A checkout object.
   */
  async getCheckout(p: GetCheckoutOptions): Promise<CheckoutResponse> {
    const { id, ...params } = p || {};
    requiredCheck({ id });

    return this._query({
      path: `v1/checkouts/${id}`,
      params: this._buildParams(params),
    }) as Promise<CheckoutResponse>;
  }

  /**
   * Create a checkout
   *
   * @deprecated Deprecated since version 2.0.0. It will be removed with the
   * next major version. Use the new setup method and `createCheckout` function
   * instead.
   *
   * @param params
   * @param params.storeId
   * @param params.variantId
   * @param [params.attributes] An object of values used to configure the checkout
   *
   * @see https://docs.lemonsqueezy.com/api/checkouts#create-a-checkout
   *
   * @returns {Object} JSON
   */
  async createCheckout(p: CreateCheckoutOptions): Promise<CheckoutResponse> {
    const { storeId, variantId, attributes } = p || {};
    requiredCheck({ storeId, variantId });

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
    }) as Promise<CheckoutResponse>;
  }

  /* -------------------------------------------------------------------------- */
  /*                                  Webhooks                                  */
  /* -------------------------------------------------------------------------- */

  /**
   * Get webhooks
   *
   * @deprecated Deprecated since version 2.0.0. It will be removed with the
   * next major version. Use the new setup method and `listWebhooks` function
   * instead.
   *
   * @param [params]
   * @param [params.storeId] Filter webhooks by store
   * @param [params.perPage] Number of records to return (between 1 and 100)
   * @param [params.page] Page of records to return
   * @param [params.include] List of record types to include
   *
   * @returns A webhook object.
   */
  async getWebhooks(
    params: GetWebhooksOptions = {}
  ): Promise<WebhooksResponse> {
    return this._query({
      path: "v1/webhooks",
      params: this._buildParams(params, ["storeId"]),
    }) as Promise<WebhooksResponse>;
  }

  /**
   * Get a webhook
   *
   * @deprecated Deprecated since version 2.0.0. It will be removed with the
   * next major version. Use the new setup method and `getWebhook` function
   * instead.
   *
   * @param params
   * @param params.id
   * @param [params.include] List of record types to include
   *
   * @returns A webhook object.
   */
  async getWebhook(p: GetWebhookOptions): Promise<WebhookResponse> {
    const { id, ...params } = p || {};
    requiredCheck({ id });

    return this._query({
      path: `v1/webhooks/${id}`,
      params: this._buildParams(params),
    }) as Promise<WebhookResponse>;
  }

  /**
   * Create a webhook
   *
   * @deprecated Deprecated since version 2.0.0. It will be removed with the
   * next major version. Use the new setup method and `createWebhook` function
   * instead.
   *
   * @param params
   * @param params.storeId ID of the store the webhook is for
   * @param params.url Endpoint URL that the webhooks should be sent to
   * @param params.events List of webhook events to receive
   * @param params.secret Signing secret (between 6 and 40 characters)
   *
   * @returns A webhook object.
   */
  async createWebhook(p: CreateWebhookOptions): Promise<WebhookResponse> {
    const { storeId, url, events, secret } = p || {};
    requiredCheck({ storeId, url, events, secret });

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
      },
    }) as Promise<WebhookResponse>;
  }

  /**
   * Update a webhook
   *
   * @deprecated Deprecated since version 2.0.0. It will be removed with the
   * next major version. Use the new setup method and `updateWebhook` function
   * instead.
   *
   * @param params
   * @param params.id
   * @param [params.url] Endpoint URL that the webhooks should be sent to
   * @param [params.events] List of webhook events to receive
   * @param [params.secret] Signing secret (between 6 and 40 characters)
   *
   * @returns A webhook object.
   */
  async updateWebhook(p: UpdateWebhookOptions): Promise<WebhookResponse> {
    const { id, url, events, secret } = p || {};
    requiredCheck({ id });

    const attributes: { url?: string; events?: string[]; secret?: string } = {};

    if (url) {
      attributes.url = url;
    }

    if (events) {
      attributes.events = events;
    }

    if (secret) {
      attributes.secret = secret;
    }

    return this._query({
      path: `v1/webhooks/${id}`,
      method: "PATCH",
      payload: {
        data: {
          type: "webhooks",
          id: "" + id,
          attributes,
        },
      },
    }) as Promise<WebhookResponse>;
  }

  /**
   * Delete a webhook
   *
   * @deprecated Deprecated since version 2.0.0. It will be removed with the
   * next major version. Use the new setup method and `deleteWebhook` function
   * instead.
   *
   * @param params
   * @param params.id
   */
  async deleteWebhook(p: DeleteWebhookOptions): Promise<null> {
    const { id } = p || {};
    requiredCheck({ id });

    return this._query({
      path: `v1/webhooks/${id}`,
      method: "DELETE",
    }) as Promise<null>;
  }
}

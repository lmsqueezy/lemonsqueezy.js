/**
 * A union of all possible API versions available.
 */
type ApiVersion = "v1";

export interface QueryApiOptions {
  /**
   * The path to the API endpoint.
   */
  path: `${ApiVersion}/${string}`;
  /**
   * The HTTP method to use.
   *
   * @default "GET"
   */
  method?: "POST" | "GET" | "PATCH" | "DELETE";
  /**
   * Any query parameters to add to the request.
   */
  params?: unknown;
  /**
   * Any data to send in the request body.
   */
  payload?: object;
}

interface PaginatedOptions {
  /**
   * Number of records to return (between 1 and 100)
   */
  perPage?: number;
  /**
   * Page of records to return
   */
  page?: number;
}

export interface GetStoresOptions extends PaginatedOptions {
  /**
   * List of record types to include
   */
  include?: Array<
    "products" | "discounts" | "license-keys" | "subscriptions" | "webhooks"
  >;
}

export interface GetStoreOptions {
  /**
   * The ID of the store to retrieve
   */
  id: string;
  /**
   * List of record types to include
   */
  include?: Array<
    "products" | "discounts" | "license-keys" | "subscriptions" | "webhooks"
  >;
}

export interface GetProductsOptions extends PaginatedOptions {
  /**
   * List of record types to include
   */
  include?: Array<"store" | "variants">;
  /**
   * Filter products by store
   */
  storeId?: number;
}

export interface GetProductOptions {
  /**
   * The ID of the store to retrieve
   */
  id: string;
  /**
   * List of record types to include
   */
  include?: Array<"store" | "variants">;
}

export interface GetVariantsOptions extends PaginatedOptions {
  /**
   * List of record types to include
   */
  include?: Array<"product" | "files">;
  /**
   * Filter variants by product
   */
  productId?: number;
}

export interface GetVariantOptions {
  /**
   * The ID of the variant to retrieve
   */
  id: number;
  /**
   * List of record types to include
   */
  include?: Array<"product" | "files">;
}

export interface GetCheckoutsOptions extends PaginatedOptions {
  /**
   * List of record types to include
   */
  include?: Array<"store" | "variant">;
  /**
   * Filter variants by store
   */
  storeId?: number;
  /**
   * Filter checkouts by variant
   */
  variantId?: number;
}

export interface GetCheckoutOptions {
  /**
   * The ID of the checkout to retrieve
   */
  id: string;
  /**
   * List of record types to include
   */
  include?: Array<"store" | "variant">;
}

export interface CreateCheckoutOptions {
  /**
   * An object of values used to configure the checkout
   *
   * @see https://docs.lemonsqueezy.com/api/checkouts#create-a-checkout
   */
  attributes?: object;
  storeId: number;
  variantId: number;
}

export interface GetCustomersOptions extends PaginatedOptions {
  /**
   * Filter customers by email address
   */
  email?: number;
  /**
   * List of record types to include
   */
  include?: Array<"license-keys" | "orders" | "store" | "subscriptions">;
  /**
   * Filter customers by store
   */
  storeId?: number;
}

export interface GetCustomerOptions {
  /**
   * The ID of the customer to retrieve
   */
  id: number;
  /**
   * List of record types to include
   */
  include?: Array<"license-keys" | "orders" | "store" | "subscriptions">;
}

export interface GetOrdersOptions extends PaginatedOptions {
  /**
   * List of record types to include
   */
  include?: Array<
    | "customer"
    | "discount-redemptions"
    | "license-keys"
    | "order-items"
    | "store"
    | "subscriptions"
  >;
  /**
   * Filter orders by store
   */
  storeId?: number;
  /**
   * Filter orders by email address
   */
  userEmail?: number;
}

export interface GetOrderOptions {
  /**
   * The ID of the order to retrieve
   */
  id: number;
  /**
   * List of record types to include
   */
  include?: Array<
    | "customer"
    | "discount-redemptions"
    | "license-keys"
    | "order-items"
    | "store"
    | "subscriptions"
  >;
}

export interface GetFilesOptions extends PaginatedOptions {
  /**
   * List of record types to include
   */
  include?: Array<"variant">;
  /**
   * Filter files by variant
   */
  variantId?: number;
}

export interface GetFileOptions {
  /**
   * The ID of the file to retrieve
   */
  id: number;
  /**
   * List of record types to include
   */
  include?: Array<"variant">;
}

export interface GetOrderItemsOptions extends PaginatedOptions {
  /**
   * List of record types to include
   */
  include?: Array<"order" | "product" | "variant">;
  /**
   * Filter order items by order
   */
  orderId?: number;
  /**
   * Filter order items by product
   */
  productId?: number;
  /**
   * Filter order items by variant
   */
  variantId?: number;
}

export interface GetOrderItemOptions {
  /**
   * The ID of the order item to retrieve
   */
  id: number;
  /**
   * List of record types to include
   */
  include?: Array<"order" | "product" | "variant">;
}

export interface GetSubscriptionsOptions extends PaginatedOptions {
  /**
   * List of record types to include
   */
  include?: Array<"store" | "customer" | "order" | "order-item" | "product" | "variant">;
  /**
   * Filter subscriptions by store
   */
  storeId?: number;
  /**
   * Filter subscriptions by order
   */
  orderId?: number;
  /**
   * Filter subscriptions by order item
   */
  orderItemId?: number;
  /**
   * Filter subscriptions by product
   */
  productId?: number;
  /**
   * Filter subscriptions by variant
   */
  variantId?: number;
  /**
   * Filter subscriptions by status
   */
  status?: "on_trial" | "active" | "paused" | "past_due" | "unpaid" | "cancelled" | "expired";
}

export interface GetSubscriptionOptions {
  /**
   * The ID of the subscription to retrieve
   */
  id: number;
  /**
   * List of record types to include
   */
  include?: Array<"store" | "customer" | "order" | "order-item" | "product" | "variant">;
}


export interface BaseUpdateSubscriptionOptions {
  /**
   * The ID of the subscription to update
   */
  id: number;
}

export interface UpdateSubscriptionOptions extends BaseUpdateSubscriptionOptions {
  /**
   * The ID of the product (required when changing plans)
   */
  productId?: number;
  /**
   * The ID of the variant (required when changing plans)
   */
  variantId?: number;
  /**
   * Set the proration when changing plans. If ommitted, proration will occur at the next renewal date.
   */
  proration?: "immediate" | "disable";
  /**
   * Change the billing day used for renewal charges. Must be a number between 1 and 31
   */
  billingAnchor?: number;
}

export interface UpdateSubscriptionAttributes {
  variant_id?: number;
  product_id?: number;
  billing_anchor?: number;
  disable_prorations?: boolean;
  invoice_immediately?: boolean;
}

export interface PauseSubscriptionOptions extends BaseUpdateSubscriptionOptions {
  /**
   * Type of pause
   * 
   * @default "void"
   */
  mode?: "void" | "free"
  /**
   * Date to automatically resume the subscription (ISO 8601 format datetime)
   */
  resumesAt?: string
}

export interface PauseSubscriptionAttributes {
  mode?: "void" | "free";
  resumesAt?: string;
}
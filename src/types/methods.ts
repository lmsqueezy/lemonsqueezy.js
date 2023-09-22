import { WebhookEvent } from "./api";

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

export interface GetPricesOptions extends PaginatedOptions {
  /**
   * List of record types to include
   */
  include?: Array<"variant">;
  /**
   * Filter prices by variant
   */
  variantId?: number;
}
export interface GetPriceOptions {
  /**
   * The ID of the price to retrieve
   */
  id: number;
  /**
   * List of record types to include
   */
  include?: Array<"variant">;
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
  /**
   * The ID of the store
   */
  storeId: number;
  /**
   * The ID of the variant
   */
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
  /**
   * The ID of the variant (required when changing plans)
   */
  variant_id?: number;
  /**
   * The ID of the product (required when changing plans)
   */
  product_id?: number;
  /**
   * Change the billing day used for renewal charges. Must be a number between 1 and 31
   */
  billing_anchor?: number;
  /**
   * Disable proration; charge customer the full amount immediately
   */
  disable_prorations?: boolean;
  /**
   * Invoice the customer now for a prorated amount
   */
  invoice_immediately?: boolean;
}

export interface PauseSubscriptionOptions extends BaseUpdateSubscriptionOptions {
  /**
   * Type of pause
   * 
   * @default "void"
   */
  mode?: "void" | "free";
  /**
   * Date to automatically resume the subscription (ISO 8601 format datetime)
   */
  resumesAt?: string;
}

export interface PauseSubscriptionAttributes {
  /**
   * Type of pause
   * 
   * @default "void"
   */
  mode?: "void" | "free";
  /**
   * Date to automatically resume the subscription (ISO 8601 format datetime)
   */
  resumes_at?: string;
}

export interface GetSubscriptionInvoicesOptions extends PaginatedOptions {
  /**
   * List of record types to include
   */
  include?: Array<"store" | "subscription">;
  /**
   * Filter subscription invoices by store
   */
  storeId?: number;
  /**
   * Filter subscription invoices by status
   */
  status?: "paid" | "pending" | "void" | "refunded";
  /**
   * Filter subscription invoices by refunded
   */
  refunded?: boolean;
  /**
   * Filter subscription invoices by subscription
   */
  subscriptionId?: number;
}

export interface GetSubscriptionInvoiceOptions {
  /**
   * The ID of the subscription invoice to retrieve
   */
  id: number;
  /**
   * List of record types to include
   */
  include?: Array<"store" | "subscription">;
}

export interface GetSubscriptionItemsOptions extends PaginatedOptions {
  /**
   * List of record types to include
   */
  include?: Array<"subscription" | "price" | "usage-records">;
  /**
   * Filter subscription items by subscription
   */
  subscriptionId?: number;
  /**
   * Filter subscription items by price
   */
  priceId?: number;
}

export interface GetSubscriptionItemOptions {
  /**
   * The ID of the subscription item to retrieve
   */
  id: number;
  /**
   * List of record types to include
   */
  include?: Array<"subscription" | "price" | "usage-records">;
}
export interface UpdateSubscriptionItemOptions {
  /**
   * The ID of the subscription item to update
   */
  id: number;
  /**
   * The new quantity for the subscription item
   */
  quantity: number;
}

export interface GetSubscriptionItemUsageOptions {
  /**
   * The ID of the subscription item to get usage for
   */
  id: number;
}

export interface GetUsageRecordsOptions extends PaginatedOptions {
  /**
   * List of record types to include
   */
  include?: Array<"subscription-item">;
  /**
   * Filter usage records by subscription item
   */
  subscriptionItemId?: number;
}

export interface GetUsageRecordOptions {
  /**
   * The ID of the usage record to retrieve
   */
  id: number;
  /**
   * List of record types to include
   */
  include?: Array<"subscription-item">;
}

export interface CreateUsageRecordOptions {
  /**
   * The ID of the subscription item to report usage for
   */
  subscriptionItemId: number;
  /**
   * The number of units to report
   */
  quantity: number;
  /**
   * Type of record
   */
  action?: "increment" | "set";
}

export interface GetDiscountsOptions extends PaginatedOptions {
  /**
   * Filter discounts by store
   */
  storeId?: number;
  /**
   * List of record types to include
   */
  include?: Array<"store" | "variants" | "discount-redemptions">;
}

export interface GetDiscountOptions {
  /**
   * The ID of the discount to retrieve
   */
  id: number;
  /**
   * List of record types to include
   */
  include?: Array<"store" | "variants" | "discount-redemptions">;
}

export interface CreateDiscountOptions {
  /**
   * Store to create a discount in
   */
  storeId: number;
  /**
   * Name of discount
   */
  name: string;
  /**
   * Discount code (uppercase letters and numbers, between 3 and 256 characters)
   */
  code: string;
  /**
   * Amount the discount is for
   */
  amount: number;
  /**
   * Type of discount
   */
  amountType?: "percent" | "fixed";
  /**
   * Duration of discount
   */
  duration?: "once" | "repeating" | "forever";
  /**
   * Number of months to repeat the discount for
   */
  durationInMonths?: number;
  /**
   * Limit the discount to certain variants
   */
  variantIds?: number[];
  /**
   * The total number of redemptions allowed
   */
  maxRedemptions?: number;
  /**
   * Date the discount code starts on (ISO 8601 format)
   */
  startsAt?: string;
  /**
   * Date the discount code expires on (ISO 8601 format)
   */
  expiresAt?: string;
}

export interface CreateDiscountAttributes {
  /**
   * Name of discount
   */
  name: string;
  /**
   * Discount code (uppercase letters and numbers, between 3 and 256 characters)
   */
  code: string;
  /**
   * Amount the discount is for
   */
  amount: number;
  /**
   * Type of discount
   */
  amount_type: "percent" | "fixed";
  /**
   * Duration of discount
   */
  duration: "once" | "repeating" | "forever";
  /**
   * Date the discount code starts on (ISO 8601 format)
   */
  starts_at?: string;
  /**
   * Date the discount code expires on (ISO 8601 format)
   */
  expires_at?: string;
  /**
   * Number of months to repeat the discount for
   */
  duration_in_months?: number;
  /**
   * Is discount limited to a certain number of redemptions
   */
  is_limited_redemptions?: boolean;
  /**
   * The total number of redemptions allowed
   */
  max_redemptions?: number;
  /**
   * Is discount applied only to certain variants
   */
  is_limited_to_products?: boolean;
}

export interface DeleteDiscountOptions {
  /**
   * The ID of the discount to delete
   */
  id: number;
}

export interface GetDiscountRedemptionsOptions extends PaginatedOptions {
  /**
   * Filter discount redemptions by discount
   */
  discountId?: number;
  /**
   * Filter discount redemptions by order
   */
  orderId?: number;
  /**
   * List of record types to include
   */
  include?: Array<"discount" | "order">;
}

export interface GetDiscountRedemptionOptions {
  /**
   * ID of the discount to retrieve
   */
  id: number;
  /**
   * List of record types to include
   */
  include?: Array<"discount" | "order">;
}

export interface GetLicenseKeysOptions extends PaginatedOptions {
  /**
   * Filter license keys by store
   */
  storeId?: number;
  /**
   * Filter license keys by order
   */
  orderId?: number;
  /**
   * Filter license keys by order item
   */
  orderItemId?: number;
  /**
   * Filter license keys by product
   */
  productId?: number;
  /**
   * List of record types to include
   */
  include?: Array<
    | "store"
    | "customer"
    | "order"
    | "order-item"
    | "product"
    | "license-key-instances"
  >;
}

export interface GetLicenseKeyOptions {
  /**
   * ID of the license key to retrieve
   */
  id: number;
  /**
   * List of record types to include
   */
  include?: Array<
    | "store"
    | "customer"
    | "order"
    | "order-item"
    | "product"
    | "license-key-instances"
  >;
}

export interface GetLicenseKeyInstancesOptions extends PaginatedOptions {
  /**
   * Filter license key instances by license key
   */
  licenseKeyId?: number;
  /**
   * List of record types to include
   */
  include?: Array<"license-key">;
}

export interface GetLicenseKeyInstanceOptions {
  /**
   * ID of the license key instance to retrieve
   */
  id: number;
  /**
   * List of record types to include
   */
  include?: Array<"license-key">;
}

export interface GetWebhooksOptions extends PaginatedOptions {
  /**
   * Filter webhooks by store
   */
  storeId?: number;
  /**
   * List of record types to include
   */
  include?: Array<"store">;
}

export interface GetWebhookOptions {
  /**
   * ID of the license key instance to retrieve
   */
  id: number;
  /**
   * List of record types to include
   */
  include?: Array<"store">;
}


export interface CreateWebhookOptions {
  /**
   * ID of the store the webhook is for
   */
  storeId: number;
  /**
   * Endpoint URL that the webhooks should be sent to
   */
  url: string;
  /**
   * List of webhook events to receive
   * 
   * @see https://docs.lemonsqueezy.com/help/webhooks#event-types
   */
  events: Array<WebhookEvent>;
  /**
   * Signing secret (between 6 and 40 characters
   */
  secret: string;
}

export interface UpdateWebhookOptions {
  /**
   * ID of the webhook to update
   */
  id: number;
  /**
   * Endpoint URL that the webhooks should be sent to
   */
  url?: string;
  /**
   * List of webhook events to receive
   * 
   * @see https://docs.lemonsqueezy.com/help/webhooks#event-types
   */
  events?: Array<WebhookEvent>;
  /**
   * Signing secret (between 6 and 40 characters
   */
  secret?: string;
}

export interface DeleteWebhookOptions {
  /**
   * ID of the webhook to delete
   */
  id: number;
}
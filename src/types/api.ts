interface BaseListResponse {
  meta: object;
  jsonapi: {
    version: "1.0";
  };
  links: object;
  included?: Record<string, any>;
}

interface BaseIndividualResponse {
  jsonapi: {
    version: "1.0";
  };
  links: object;
  included?: Record<string, any>;
}

interface BaseApiObject {
  type: string;
  id: string;
  relationships: object;
  links: object;
}


interface SubscriptionAttributes {
  /**
   * The ID of the store this subscription belongs to.
   */
  store_id: number;
  /**
   * The ID of the customer this subscription belongs to.
   */
  customer_id: number;
  /**
   * The ID of the order associated with this subscription.
   */
  order_id: number;
  /**
   * The ID of the order item associated with this subscription.
   */
  order_item_id: number;
  /**
   * The ID of the product associated with this subscription.
   */
  product_id: number;
  /**
   * The ID of the variant associated with this subscription.
   */
  variant_id: number;
  /**
   * The name of the product.
   */
  product_name: string;
  /**
   * The name of the variant.
   */
  variant_name: string;
  /**
   * The full name of the customer.
   */
  user_name: string;
  /**
   * The email address of the customer.
   */
  user_email: string;
  /**
   * The status of the subscription.
   */
  status: "on_trial" | "active" | "paused" | "unpaid" | "cancelled" | "expired";
  /**
   * The title-case formatted status of the subscription.
   */
  status_formatted: "On Trial" | "Active" | "Paused" | "Unpaid" | "Cancelled" | "Expired";
  /**
   * Lowercase brand of the card used to pay for the latest subscription payment.
   */
  card_brand: "visa" | "mastercard" | "amex" | "discover" | "jcb" | "diners" | "unionpay" | null;
  /**
   * The last 4 digits of the card used to pay for the latest subscription payment.
   */
  card_last_four: string | null;
  /**
   * An object containing the payment collection pause behaviour options for the subscription, if set.
   */
  pause: {
    /**
     * Defines payment pause behaviour, can be one of:
     *
     *  - `void` - If you can't offer your services for a period of time (for maintenance as an example), you can void invoices so your customers aren't charged
     *  - `free` - Offer your subscription services for free, whilst halting payment collection
     */
    mode: 'void' | 'free';
    /**
     * An ISO-8601 formatted date-time string indicating when the subscription will continue collecting payments
     */
    resumes_at: string;
  } | null;
  /**
   * A boolean indicating if the subscription has been cancelled.
   */
  cancelled: boolean;
  /**
   * If the subscription has a free trial, an ISO-8601 formatted date-time indicating when the trial period ends.
   */
  trial_ends_at: string | null;
  /**
   * An integer representing the day of the month on which subscription invoice payments are collected.
   */
  billing_anchor: number;
  /**
   * An object representing the first subscription item belonging to this subscription.
   */
  first_subscription_item: {
    /**
     * ID of the subscription item.
     */
    id: number;
    /**
     * ID of the related subscription.
     */
    subscription_id: number;
    /**
     * ID of the subscription item's price.
     */
    price_id: number;
    /**
     * Quantity of the subscription item.
     */
    quantity: number;
    /**
     * Date the subscription item was created (ISO 8601 format).
     */
    created_at: string;
    /**
     * Date the subscription item was updated (ISO 8601 format).
     */
    updated_at: string;
  };
  /**
   * URLs for the customer to manage the subscription.
   */
  urls: {
    /**
     * A signed URL for managing payment and billing infanaginormation for the subscription, valid for 24 hours.
     */
    update_payment_method: string;
  };
  /**
   * Date indicating the end of the current billing cycle, and when the next invoice will be issued (ISO 8601 format).
   */
  renews_at: string | null;
  /**
   * Date indicating when the subscription will expire or has expired (ISO 8601 format).
   */
  ends_at: string | null;
  /**
   * Date the subscription was created (ISO 8601 format).
   */
  created_at: string;
  /**
   * Date the subscription was updated (ISO 8601 format).
   */
  updated_at: string;
  /**
   * A boolean indicating if the customer was created within test mode.
   */
  test_mode: boolean;
}


interface SubscriptionObject extends BaseApiObject {
  attributes: SubscriptionAttributes;
}

export interface SubscriptionsResponse extends BaseListResponse {
  data: SubscriptionObject[];
}

export interface SubscriptionResponse extends BaseIndividualResponse {
  data: SubscriptionObject;
}


interface StoreAttributes {
  /**
   * The name of the store.
   */
  name: string;
  /**
   * The slug used to identify the store.
   */
  slug: string;
  /**
   * The domain of the store in the format {slug}.lemonsqueezy.com.
   */
  domain: string;
  /**
   * The fully-qualified URL for the store (e.g. https://{slug}.lemonsqueezy.com).
   */
  url: string;
  /**
   * The URL for the store avatar.
   */
  avatar_url: string;
  /**
   * The current billing plan for the store.
   */
  plan: string;
  /**
   * The ISO 3166-1 two-letter country code for the store.
   */
  country: string;
  /**
   * The full country name for the store.
   */
  country_nicename: string;
  /**
   * The ISO 4217 currency code for the store.
   */
  currency: string;
  /**
   * A count of the all-time total sales made by this store.
   */
  total_sales: number;
  /**
   * A positive integer in cents representing the total all-time revenue of the store in USD.
   */
  total_revenue: number;
  /**
   * A count of the sales made by this store in the last 30 days.
   */
  thirty_day_sales: number;
  /**
   * A positive integer in cents representing the total revenue of the store in USD in the last 30 days.
   */
  thirty_day_revenue: number;
  /**
   * Date the store was created (ISO 8601 format).
   */
  created_at: string;
  /**
   * Date the store was updated (ISO 8601 format).
   */
  updated_at: string;
}

interface StoreObject extends BaseApiObject {
  attributes: StoreAttributes;
}

export interface StoresResponse extends BaseListResponse {
  data: StoreObject[];
}

export interface StoreResponse extends BaseIndividualResponse {
  data: StoreObject;
}


interface CustomerAttributes {
  /**
   * The ID of the store this customer belongs to.
   */
  store_id: number;
  /**
   * The full name of the customer.
   */
  name: string;
  /**
   * The email address of the customer.
   */
  email: string;
  /**
   * The email marketing status of the customer.
   */
  status: "subscribed" | "unsubscribed" | "archived" | "requires_verification" | "invalid_email" | "bounced";
  /**
   * The city of the customer.
   */
  city: string | null;
  /**
   * The region of the customer.
   */
  region: string | null;
  /**
   * The country of the customer.
   */
  country: string;
  /**
   * A positive integer in cents representing the total revenue from the customer (USD).
   */
  total_revenue_currency: number;
  /**
   * A positive integer in cents representing the monthly recurring revenue from the customer (USD).
   */
  mrr: number;
  /**
   * The formatted status of the customer.
   */
  status_formatted: "Subscribed" | "Unsubscribed" | "Archived" | "Requires Verification" | "Invalid Email" | "Bounced";
  /**
   * The formatted country of the customer.
   */
  country_formatted: string;
  /**
   * A human-readable string representing the total revenue from the customer (e.g. $9.99).
   */
  total_revenue_currency_formatted: string;
  /**
   * A human-readable string representing the monthly recurring revenue from the customer (e.g. $9.99).
   */
  mrr_formatted: string;
  /**
   * Date the customer was created (ISO 8601 format).
   */
  created_at: string;
  /**
   * Date the customer was updated (ISO 8601 format).
   */
  updated_at: string;
  /**
   * A boolean indicating if the customer was created within test mode.
   */
  test_mode: boolean;
}

interface CustomerObject extends BaseApiObject {
  attributes: CustomerAttributes;
}

export interface CustomersResponse extends BaseListResponse {
  data: CustomerObject[];
}

export interface CustomerResponse extends BaseIndividualResponse {
  data: CustomerObject;
}


interface UserAttributes {
  /**
   * The name of the user.
   */
  name: string;
  /**
   * The email address of the user.
   */
  email: string;
  /**
   * A randomly generated hex color code for the user.
   */
  color: string;
  /**
   * A URL to the avatar image for this user.
   */
  avatar_url: string;
  /**
   * Has the value true if the user has uploaded a custom avatar image.
   */
  has_custom_avatar: string;
  /**
   * Date the user was created (ISO 8601 format).
   */
  createdAt: string;
  /**
   * Date the user was updated (ISO 8601 format).
   */
  updatedAt: string;
}

interface UserObject extends BaseApiObject {
  attributes: UserAttributes;
}

export interface UserResponse extends BaseIndividualResponse {
  data: UserObject;
}


interface ProductAttributes {
  /**
   * The ID of the store this product belongs to.
   */
  store_id: number;
  /**
   * The name of the product.
   */
  name: string;
  /**
   * The slug used to identify the product.
   */
  slug: string;
  /**
   * The description of the product in HTML.
   */
  description: string;
  /**
   * The status of the product.
   */
  status: "draft" | "published";
  /**
   * The formatted status of the product.
   */
  status_formatted: "Draft" | "Published";
  /**
   * A URL to the thumbnail image for this product (if one exists). The image will be 100x100px in size.
   */
  thumb_url: string | null;
  /**
   * A URL to the large thumbnail image for this product (if one exists). The image will be 1000x1000px in size.
   */
  large_thumb_url: string | null;
  /**
   * A positive integer in cents representing the price of the product.
   */
  price: number;
  /**
   * A human-readable string representing the price of the product (e.g. $9.99).
   */
  price_formatted: string;
  /**
   * If this product has multiple variants, this will be a positive integer in cents representing the price of the cheapest variant. Otherwise, it will be null.
   */
  from_price: number | null;
  /**
   * If this product has multiple variants, this will be a positive integer in cents representing the price of the most expensive variant. Otherwise, it will be null.
   */
  to_price: number | null;
  /**
   * Has the value true if this is a “pay what you want” product where the price can be set by the customer at checkout.
   */
  pay_what_you_want: boolean;
  /**
   * A URL to purchase this product using the Lemon Squeezy checkout.
   */
  buy_now_url: string;
  /**
   * Date the product was created (ISO 8601 format).
   */
  created_at: string;
  /**
   * Date the product was updated (ISO 8601 format).
   */
  updated_at: string;
  /**
   * A boolean indicating if the product was created within test mode.
   */
  test_mode: boolean;
}

interface ProductObject extends BaseApiObject {
  attributes: ProductAttributes;
}

export interface ProductsResponse extends BaseListResponse {
  data: ProductObject[];
}

export interface ProductResponse extends BaseIndividualResponse {
  data: ProductObject;
}


interface VariantAttributes {
  /**
   * The ID of the product this variant belongs to.
   */
  product_id: number;
  /**
   * The name of the variant.
   */
  name: string;
  /**
   * The slug used to identify the variant.
   */
  slug: string;
  /**
   * The description of the variant in HTML.
   */
  description: string;
  /**
   * @deprecated Price information has been moved to Price objects.
   */
  price: number;
  /**
   * @deprecated Price information has been moved to Price objects.
   */
  is_subscription: boolean;
  /**
   * @deprecated Price information has been moved to Price objects.
   */
  interval: "day" | "week" | "month" | "year" | null;
  /**
   * @deprecated Price information has been moved to Price objects.
   */
  interval_count: number | null;
  /**
   * @deprecated Price information has been moved to Price objects.
   */
  has_free_trial: boolean;
  /**
   * @deprecated Price information has been moved to Price objects.
   */
  trial_interval: "day" | "week" | "month" | "year" | null;
  /**
   * @deprecated Price information has been moved to Price objects.
   */
  trial_interval_count: number | null;
  /**
   * @deprecated Price information has been moved to Price objects.
   */
  pay_what_you_want: boolean;
  /**
   * @deprecated Price information has been moved to Price objects.
   */
  min_price: number;
  /**
   * @deprecated Price information has been moved to Price objects.
   */
  suggested_price: number;
  /**
   * A boolean representing if this variant should generate license keys for the customer on purchase.
   */
  has_license_keys: boolean;
  /**
   * The maximum number of times a license key can be activated for this variant
   */
  license_activation_limit: number;
  /**
   * A boolean representing if license key activations are unlimited for this variant.
   */
  is_license_limit_unlimited: boolean;
  /**
   * The number of units (specified in the `license_length_unit attribute`) until a license key expires.
   */
  license_length_value: number | null;
  /**
   * The unit linked with the `license_length_value` attribute.
   */
  license_length_unit: "days" | "months" | "years" | null;
  /**
   * A boolean representing if license keys should never expire.
   */
  is_license_length_unlimited: boolean;
  /**
   * An integer representing the order of this variant when displayed on the checkout.
   */
  sort: number;
  /**
   * The status of the variant.
   */
  status: "pending" | "draft" | "published";
  /**
   * The formatted status of the variant.
   */
  status_formatted: "Pending" | "Draft" | "Published";
  /**
   * Date the variant was created (ISO 8601 format).
   */
  created_at: string;
  /**
   * Date the variant was updated (ISO 8601 format).
   */
  updated_at: string;
  /**
   * A boolean indicating if the variant was created within test mode.
   */
  test_mode: boolean;
}

interface VariantObject extends BaseApiObject {
  attributes: VariantAttributes;
}

export interface VariantsResponse extends BaseListResponse {
  data: VariantObject[];
}

export interface VariantResponse extends BaseIndividualResponse {
  data: VariantObject;
}


interface CheckoutProductOptions {
  /**
   * A custom name for the product.
   */
  name: string;
  /**
   * A custom description for the product.
   */
  description: string;
  /**
   * An array of image URLs to use as the product's media.
   */
  media: string[];
  /**
   * A custom URL to redirect to after a successful purchase.
   */
  redirect_url: string;
  /**
   * A custom text to use for the order receipt email button.
   */
  receipt_button_text: string;
  /**
   * A custom URL to use for the order receipt email button.
   */
  receipt_link_url: string;
  /**
   * A custom thank you note to use for the order receipt email.
   */
  receipt_thank_you_note: string;
  /**
   * An array of variant IDs to enable for this checkout. If this is empty, all variants will be enabled.
   */
  enabled_variants: number[];
}

interface CheckoutCheckoutOptions {
  /**
   * A boolean indicating whether to show the checkout overlay.
   */
  embed: boolean;
  /**
   * A boolean indicating whether to show product media.
   */
  media: boolean;
  /**
   * A boolean indicating whether to show the store log.
   */
  logo: boolean;
  /**
   * A boolean indicating whether to show the product description
   * */
  desc: boolean;
  /**
   * A boolean indicating whether to show the discount code.
   */
  discount: boolean;
  /**
   * A boolean indicating whether to use the dark theme.
   */
  dark: boolean;
  /**
   * A boolean indicating whether to show the text "You will be charged..."
   */
  subscription_preview: boolean;
  /**
   * A custom hex color to use for the checkout button.
   */
  button_color: string;
}

interface CheckoutCheckoutData {
  /**
   * A pre-filled email address.
   */
  email: string;
  /**
   * A pre-filled name.
   */
  name: string;
  /**
   * A pre-filled billing address.
   */
  billing_address: {
    /**
     * A country in a ISO 3166-1 alpha-2 format
     */
    country: string;
    /**
     * A zip/postal code.
     */
    address_zip: string;
  };
  /**
   * A pre-filled tax number.
   */
  tax_number: string;
  /**
   * A pre-filled discount code.
   */
  discount_code: string;
  /**
   * An object containing any custom data to be passed to the checkout.
   */
  custom: Record<string, any>;
  /**
   * A list containing quantity data objects.
   */
  variant_quantities: Array<{
    quantity: number;
    variant_id: number;
  }>;
}

interface CheckoutPreview {
  /**
   * The ISO 4217 currency code of the store.
   */
  currency: string;
  /**
   * The currency conversion rate used to determine the price of the checkout in USD.
   */
  currency_rate: number;
  /**
   * A positive integer in cents representing the subtotal of the checkout in the store currency.
   */
  subtotal: number;
  /**
   * A positive integer in cents representing the total discount value applied to the checkout in the store currency.
   */
  discount_total: number;
  /**
   * A positive integer in cents representing the tax applied to the checkout in the store currency.
   */
  tax: number;
  /**
   * A positive integer in cents representing the total price of the checkout in the store currency.
   */
  total: number;
  /**
   * A positive integer in cents representing the subtotal of the checkout in USD.
   */
  subtotal_usd: number;
  /**
   * A positive integer in cents representing the total discount value applied to the checkout in USD.
   */
  discount_total_usd: number;
  /**
   * A positive integer in cents representing the tax applied to the checkout in USD.
   */
  tax_usd: number;
  /**
   * A positive integer in cents representing the total price of the checkout in USD.
   */
  total_usd: number;
  /**
   * A human-readable string representing the subtotal of the checkout in the store currency.
   */
  subtotal_formatted: string;
  /**
   * A human-readable string representing the total discount value applied to the checkout in the store currency.
   */
  discount_total_formatted: string;
  /**
   * A human-readable string representing the tax applied to the checkout in the store currency.
   */
  tax_formatted: string;
  /**
   * A human-readable string representing the total price of the checkout in the store currency.
   */
  total_formatted:  string;
}

interface CheckoutAttributes {
  /**
   * The ID of the store this checkout belongs to.
   */
  store_id: number;
  /**
   * The ID of the variant associated with this checkout.
   */
  variant_id: number;
  /**
   * A positive integer in cents representing the custom price of the variant.
   */
  custom_price: number | null;
  /**
   * An object containing any overridden product options for this checkout.
   */
  product_options: CheckoutProductOptions;
  /**
   * An object containing checkout options for this checkout.
   */
  checkout_options: CheckoutCheckoutOptions;
  /**
   * An object containing any prefill or custom data to be used in the checkout.
   */
  checkout_data: CheckoutCheckoutData;
  /**
   * An object containin pricing information for this checkout. Will be `false` if `preview` was not `true` in the request.
   */
  preview: CheckoutPreview | false;
  /**
   * Date the checkout expires (ISO 8601 format).
   */
  expires_at: string | null;
  /**
   * Date the checkout was created (ISO 8601 format).
   */
  created_at: string;
  /**
   * Date the checkout was updated (ISO 8601 format).
   */
  updated_at: string;
  /**
   * A boolean indicating if the checkout was created within test mode.
   */
  test_mode: boolean;
  /**
   * The unique URL to access the checkout.
   */
  url: string;
}

interface CheckoutObject extends BaseApiObject {
  attributes: CheckoutAttributes;
}

export interface CheckoutsResponse extends BaseListResponse {
  data: CheckoutObject[];
}

export interface CheckoutResponse extends BaseIndividualResponse {
  data: CheckoutObject;
}


interface OrderAttributes {
  /**
   * The ID of the store this order belongs to.
   */
  store_id: number;
  /**
   * The ID of the customer this order belongs to.
   */
  customer_id: number;
  /**
   * The unique identifier (UUID) for this order.
   */
  identifier: string;
  /**
   * An integer representing the sequential order number for this store.
   */
  order_number: number;
  /**
   * The full name of the customer.
   */
  user_name: string;
  /**
   * The email address of the customer.
   */
  user_email: string;
  /**
   * The ISO 4217 currency code for the order.
   */
  currency: string;
  /**
   * The currency conversion rate used to determine the price of the checkout in USD.
   */
  currency_rate: string;
  /**
   * A positive integer in cents representing the subtotal of the order in the order currency.
   */
  subtotal: number;
  /**
   * A positive integer in cents representing the total discount value applied to the order in the order currency.
   */
  discount_total: number;
  /**
   * A positive integer in cents representing the tax applied to the order in the order currency.
   */
  tax: number;
  /**
   * A positive integer in cents representing the total cost of the order in the order currency.
   */
  total: number;
  /**
   * A positive integer in cents representing the subtotal of the order in USD.
   */
  subtotal_usd: number;
  /**
   * A positive integer in cents representing the total discount value applied to the order in USD.
   */
  discount_total_usd: number;
  /**
   * A positive integer in cents representing the tax applied to the order in USD.
   */
  tax_usd: number;
  /**
   * A positive integer in cents representing the total cost of the order in USD.
   */
  total_usd: number;
  /**
   * The name of the tax rate applied to the order.
   */
  tax_name: string | null;
  /**
   * If tax is applied to the order, this will be the rate of tax displayed as a decimal percentage as a string.
   */
  tax_rate: string;
  /**
   * The status of the order.
   */
  status: "pending" | "failed" | "paid" | "refunded";
  /**
   * The formatted status of the order.
   */
  status_formatted: "Pending" | "Failed" | "Paid" | "Refunded";
  /**
   * A boolean indicating if the order has been refunded.
   */
  refunded: boolean;
  /**
   * Date the order was refuned (ISO 8601 format).
   */
  refunded_at: string | null;
  /**
   * A human-readable string representing the subtotal of the order in the order currency.
   */
  subtotal_formatted: string;
  /**
   * A human-readable string representing the total discount value applied to the order in the order currency.
   */
  discount_total_formatted: string;
  /**
   * A human-readable string representing the tax applied to the order in the order currency.
   */
  tax_formatted: string;
  /**
   * A human-readable string representing the total cost of the order in the order currency.
   */
  total_formatted: string;
  /**
   * An object representing the first order item belonging to this order.
   */
  first_order_item: {
    /**
     * The ID of the order item.
     */
    id: number;
    /**
     * The ID of the order.
     */
    order_id: number;
    /**
     * The ID of the product.
     */
    product_id: number;
    /**
     * The ID of the product variant.
     */
    variant_id: number;
    /**
     * The name of the product.
     */
    product_name: string;
    /**
     * The name of the product variant.
     */
    variant_name: string;
    /**
     * A positive integer in cents representing the price of the order item in the order currency.
     */
    price: number;
    /**
     * Date the order item was created (ISO 8601 format).
     */
    created_at: string;
    /**
     * Date the order item was updated (ISO 8601 format).
     */
    updated_at: string;
    /**
     * A boolean indicating if the order item was created within test mode.
     */
    test_mode: boolean;
  };
  urls: {
    /**
     * A signed URL for viewing the order in the customer's My Orders page.
     */
    receipt: string;
  };
  /**
   * Date the order was created (ISO 8601 format).
   */
  created_at: string;
  /**
   * Date the order was updated (ISO 8601 format).
   */
  updated_at: string;
  /**
   * A boolean indicating if the order was created within test mode.
   */
  test_mode: boolean;
}

interface OrderObject extends BaseApiObject {
  attributes: OrderAttributes;
}

export interface OrdersResponse extends BaseListResponse {
  data: OrderObject[];
}

export interface OrderResponse extends BaseIndividualResponse {
  data: OrderObject;
}


interface FileAttributes {
  /**
   * The ID of the variant this file belongs to.
   */
  variant_id: number;
  /**
   * The unique identifier (UUID) for this file.
   */
  identifier: string;
  /**
   * The name of the file.
   */
  name: string;
  /**
   * The file extension of the file.
   */
  extension: string;
  /**
   * The unique URL to download the file.
   */
  download_url: string;
  /**
   * A positive integer in bytes representing the size of the file.
   */
  size: number;
  /**
   * The human-readable size of the file.
   */
  size_formatted: string;
  /**
   * The software version of this file.
   */
  version: string | null;
  /**
   * An integer representing the order of this file when displayed.
   */
  sort: number;
  /**
   * The status of the file
   */
  status: "draft" | "published";
  /**
   * Date the file was created (ISO 8601 format).
   */
  createdAt: string;
  /**
   * Date the file was updated (ISO 8601 format).
   */
  updatedAt: string;
  /**
   * A boolean indicating if the file was created within test mode.
   */
  test_mode: boolean;
}

interface FileObject extends BaseApiObject {
  attributes: FileAttributes;
}

export interface FilesResponse extends BaseListResponse {
  data: FileObject[];
}

export interface FileResponse extends BaseIndividualResponse {
  data: FileObject;
}


interface SubscriptionInvoiceAttributes {
  /**
   * The ID of the Store this subscription invoice belongs to.
   */
  store_id: number;
  /**
   * The ID of the Subscription associated with this subscription invoice.
   */
  subscription_id: number;
  /**
   * The ID of the customer this subscription invoice belongs to.
   */
  customer_id: number;
  /**
   * The full name of the customer.
   */
  user_name: string;
  /**
   * The email address of the customer.
   */
  user_email: string;
  /**
   * The reason for the invoice being generated.
   */
  billing_reason: "initial" | "renewal" | "updated";
  /**
   * Lowercase brand of the card used to pay for the invoice.
   */
  card_brand: "visa" | "mastercard" | "amex" | "discover" | "jcb" | "diners" | "unionpay" | null;
  /**
   * The last 4 digits of the card used to pay for the invoice.
   */
  card_last_four: string | null;
  /**
   * The ISO 4217 currency code for the invoice
   */
  currency: string;
  /**
   * The currency conversion rate used to determine the price of the checkout in USD.
   */
  currency_rate: string;
  /**
   * The status of the invoice.
   */
  status: "pending" | "paid" | "void" | "refunded";
  /**
   * The formatted status of the invoice.
   */
  status_formatted: "Pending" | "Paid" | "Void" | "Refunded";
  /**
   * A boolean value indicating whether the invoice has been refunded.
   */
  refunded: boolean;
  /**
   * Date the order was refuned (ISO 8601 format).
   */
  refunded_at: string | null;
  /**
   * A positive integer in cents representing the subtotal of the invoice in the invoice currency.
   */
  subtotal: number;
  /**
   * A positive integer in cents representing the total discount value applied to the invoice in the invoice currency.
   */
  discount_total: number;
  /**
   * A positive integer in cents representing the tax applied to the invoice in the invoice currency.
   */
  tax: number;
  /**
   * A positive integer in cents representing the total cost of the invoice in the invoice currency.
   */
  total: number;
  /**
   * A positive integer in cents representing the subtotal of the invoice in USD.
   */
  subtotal_usd: number;
  /**
   * A positive integer in cents representing the total discount value applied to the invoice in USD.
   */
  discount_total_usd: number;
  /**
   * A positive integer in cents representing the tax applied to the invoice in USD.
   */
  tax_usd: number;
  /**
   * A positive integer in cents representing the total cost of the invoice in USD.
   */
  total_usd: number;
  /**
   * A human-readable string representing the subtotal of the invoice in the invoice currency (e.g. $9.99).
   */
  subtotal_formatted: string;
  /**
   * A human-readable string representing the total discount value applied to the invoice in the invoice currency (e.g. $9.99).
   */
  discount_total_formatted: string;
  /**
   * A human-readable string representing the tax applied to the invoice in the invoice currency (e.g. $9.99).
   */
  tax_formatted: string;
  /**
   * A human-readable string representing the total cost of the invoice in the invoice currency (e.g. $9.99).
   */
  total_formatted: string;
  /**
   * An object of customer-facing URLs for the invoice.
   */
  urls: {
    /**
     * The unique URL to download a PDF of the invoice (will be `null` if status is `pending`).
     */
    invoice_url: string | null;
  };
  /**
   * Date the subscription invoice was created (ISO 8601 format).
   */
  created_at: string;
  /**
   * Date the subscription invoice was updated (ISO 8601 format).
   */
  updated_at: string;
  /**
   * A boolean indicating if the subscription invoice was created within test mode.
   */
  test_mode: boolean;
}

interface SubscriptionInvoiceObject extends BaseApiObject {
  attributes: SubscriptionInvoiceAttributes;
}

export interface SubscriptionInvoicesResponse extends BaseListResponse {
  data: SubscriptionInvoiceObject[];
}

export interface SubscriptionInvoiceResponse extends BaseIndividualResponse {
  data: SubscriptionInvoiceObject;
}


interface SubscriptionItemAttributes {
  /**
   * The ID of the Subscription this subscription item belongs to.
   */
  subscription_id: number;
  /**
   * The ID of the Price this subscription item belongs to.
   */
  price_id: number;
  /**
   * A positive integer representing the unit quantity of this subscription item.
   */
  quantity: number;
  /**
   * A boolean value indicating whether the related subscription product/variant has usage-based billing enabled.
   */
  is_usage_based: boolean;
  /**
   * Date the subscription item was created (ISO 8601 format).
   */
  created_at: string;
  /**
   * Date the subscription item was updated (ISO 8601 format).
   */
  updated_at: string;
}

interface SubscriptionItemObject extends BaseApiObject {
  attributes: SubscriptionItemAttributes;
}

export interface SubscriptionItemsResponse extends BaseListResponse {
  data: SubscriptionItemObject[];
}

export interface SubscriptionItemResponse extends BaseIndividualResponse {
  data: SubscriptionItemObject;
}


export interface SubscriptionItemUsageResponse {
  jsonapi: {
    version: "1.0";
  };
  meta: {
    /**
     * Date the billing period started (ISO 8601 format).
     */
    period_start: string;
    /**
     * Date the billing period will end (ISO 8601 format).
     */
    period_end: string;
    /**
     * A positive integer representing the usage total.
     */
    quantity: number;
    /**
     * The interval unit of the subscription's variant.
     */
    interval_unit: "day" | "week" | "month" | "year";
    /**
     * The interval count of the subscription's variant.
     */
    interval_quantity: number;
  }
}


interface UsageRecordAttributes {
  /**
   * The ID of the Subscription item this usage record belongs to.
   */
  subscription_item_id: number;
  /**
   * A positive integer representing the unit usage reported.
   */
  quantity: number;
  /**
   * The type of record.
   */
  action: "increment" | "set";
  /**
   * Date the usage record was created (ISO 8601 format).
   */
  created_at: string;
  /**
   * Date the usage record was updated (ISO 8601 format).
   */
  updated_at: string;
}

interface UsageRecordObject extends BaseApiObject {
  attributes: UsageRecordAttributes;
}

export interface UsageRecordsResponse extends BaseListResponse {
  data: UsageRecordObject[];
}

export interface UsageRecordResponse extends BaseIndividualResponse {
  data: UsageRecordObject;
}


interface DiscountAttributes {
  /**
   * The ID of the store this discount belongs to.
   */
  store_id: number;
  /**
   * The name of the discount.
   */
  name: string;
  /**
   * The discount code that can be used at checkout.
   */
  code: string;
  /**
   * The amount of discount to apply to the order.
   */
  amount: number;
  /**
   * The type of the amount.
   */
  amount_type: "percent" | "fixed";
  /**
   * A boolean indicating if the discount can only be applied to certain products/variants.
   */
  is_limited_to_products: boolean;
  /**
   * A boolean indicating if the discount can only be redeemed a limited number of times.
   */
  is_limited_redemptions: boolean;
  /**
   * If is_limited_redemptions is true, this is the maximum number of redemptions.
   */
  max_redemptions: number;
  /**
   * Date the discount is valid from (ISO 8601 format).
   */
  starts_at: string | null;
  /**
   * Date the discount expires (ISO 8601 format).
   */
  expires_at: string | null;
  /**
   * When applied to a subscription, how often the discount should be applied.
   */
  duration: "once" | "repeating" | "forever";
  /**
   * If duration is repeating, this specifies how many months the discount should apply.
   */
  duration_in_months: number;
  /**
   * The status of the discount.
   */
  status: "draft" | "published";
  /**
   * The formatted status of the discount.
   */
  status_formatted: "Draft" | "Published";
  /**
   * Date the discount was created (ISO 8601 format).
   */
  created_at: string;
  /**
   * Date the discount was updated (ISO 8601 format).
   */
  updated_at: string;
  /**
   * A boolean indicating if the subscription invoice was created within test mode.
   */
  test_mode: boolean;
}

interface DiscountObject extends BaseApiObject {
  attributes: DiscountAttributes;
}

export interface DiscountsResponse extends BaseListResponse {
  data: DiscountObject[];
}

export interface DiscountResponse extends BaseIndividualResponse {
  data: DiscountObject;
}


interface DiscountRedemptionAttributes {
  /**
   * The ID of the discount this redemption belongs to.
   */
  discount_id: number;
  /**
   * The ID of the order this redemption belongs to.
   */
  order_id: number;
  /**
   * The name of the discount.
   */
  discount_name: string;
  /**
   * The discount code that was used at checkout.
   */
  discount_code: string;
  /**
   * The amount of the discount.
   */
  discount_amount: number;
  /**
   * The type of the discount_amount.
   */
  discount_amount_type: "percent" | "fixed";
  /**
   * A positive integer in cents representing the amount of the discount that was applied to the order (in the order currency).
   */
  amount: number;
  /**
   * Date the discount redemption was created (ISO 8601 format).
   */
  created_at: string;
  /**
   * Date the discount redemption was updated (ISO 8601 format).
   */
  updated_at: string;
}

interface DiscountRedemptionObject extends BaseApiObject {
  attributes: DiscountRedemptionAttributes;
}

export interface DiscountRedemptionsResponse extends BaseListResponse {
  data: DiscountRedemptionObject[];
}

export interface DiscountRedemptionResponse extends BaseIndividualResponse {
  data: DiscountRedemptionObject;
}


interface LicenseKeyAttributes {
  /**
   * The ID of the store this license key belongs to.
   */
  store_id: number;
  /**
   * The ID of the customer this license key belongs to.
   */
  customer_id: number;
  /**
   * The ID of the order associated with this license key.
   */
  order_id: number;
  /**
   * The ID of the order item associated with this license key.
   */
  order_item_id: number;
  /**
   * The ID of the product associated with this license key.
   */
  product_id: number;
  /**
   * The full name of the customer.
   */
  user_name: string;
  /**
   * The email address of the customer.
   */
  user_email: string;
  /**
   * The full license key.
   */
  key: string;
  /**
   * A “short” representation of the license key, made up of the string “XXXX-” followed by the last 12 characters of the license key.
   */
  key_short: string;
  /**
   * The activation limit of this license key.
   */
  activation_limit: number;
  /**
   * A count of the number of instances this license key has been activated on.
   */
  instances_count: number;
  /**
   * A boolean indicating if this license key has been disabled.
   */
  disabled: boolean;
  /**
   * The status of the license key.
   */
  status: "inactive" | "active" | "expired" | "disabled";
  /**
   * The formatted status of the license key.
   */
  status_formatted: "Inactive" | "Active" | "Expired" | "Disabled";
  /**
   * Date the license key expires (ISO 8601 format).
   */
  expires_at: string | null;
  /**
   * Date the license key was created (ISO 8601 format).
   */
  created_at: string;
  /**
   * Date the license key was updated (ISO 8601 format).
   */
  updated_at: string;
}

interface LicenseKeyObject extends BaseApiObject {
  attributes: LicenseKeyAttributes;
}

export interface LicenseKeysResponse extends BaseListResponse {
  data: LicenseKeyObject[];
}

export interface LicenseKeyResponse extends BaseIndividualResponse {
  data: LicenseKeyObject;
}


interface LicenseKeyInstanceAttributes {
  /**
   * The ID of the license key this instance belongs to.
   */
  license_key_id: number;
  /**
   * The unique identifier (UUID) for this instance.
   */
  identifier: string;
  /**
   * The name of the license key instance.
   */
  name: string;
  /**
   * Date the license key instance was created (ISO 8601 format).
   */
  created_at: string;
  /**
   * Date the license key instance was updated (ISO 8601 format).
   */
  updated_at: string;
}

interface LicenseKeyInstanceObject extends BaseApiObject {
  attributes: LicenseKeyInstanceAttributes;
}

export interface LicenseKeyInstancesResponse extends BaseListResponse {
  data: LicenseKeyInstanceObject[];
}

export interface LicenseKeyInstanceResponse extends BaseIndividualResponse {
  data: LicenseKeyInstanceObject;
}

export type WebhookEvent =
  | "order_created"
  | "order_refunded"
  | "subscription_created"
  | "subscription_updated"
  | "subscription_cancelled"
  | "subscription_resumed"
  | "subscription_expired"
  | "subscription_paused"
  | "subscription_unpaused"
  | "subscription_payment_success"
  | "subscription_payment_failed"
  | "subscription_payment_recovered"
  | "license_key_created"
  | "license_key_updated";

interface WebhookAttributes {
  /**
   * The ID of the store this webhook belongs to.
   */
  store_id: number;
  /**
   * The URL that events will be sent to.
   */
  url: string;
  /**
   * An array of events that will be sent.
   */
  events: Array<WebhookEvent>;
  /**
   * Date the webhook was last sent (ISO 8601 format).
   */
  last_sent_at: string | null;
  /**
   * Date the webhook was created (ISO 8601 format).
   */
  created_at: string;
  /**
   * Date the webhook was updated (ISO 8601 format).
   */
  updated_at: string;
  /**
   * A boolean indicating if the webhook was created within test mode.
   */
  test_mode: boolean;
}

interface WebhookObject extends BaseApiObject {
  attributes: WebhookAttributes;
}

export interface WebhooksResponse extends BaseListResponse {
  data: WebhookObject[];
}

export interface WebhookResponse extends BaseIndividualResponse {
  data: WebhookObject;
}

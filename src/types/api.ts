interface BaseListResponse {
  meta: object;
  jsonapi: object;
  links: object;
  included?: Array<T>;
}

interface BaseIndividualResponse {
  jsonapi: object;
  links: object;
  included?: Array<T>;
}

interface BaseApiObject {
  type: string;
  id: string;
  relationships: object;
  links: object;
}

interface FirstSubscriptionItem {
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
}

interface SubscriptionUrls {
  /**
   * A signed URL for managing payment and billing information for the subscription, valid for 24 hours.
   */
  update_payment_method: string;
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
  pause: object | null;
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
   * URLs for the customer to manage the subscription.
   */
  urls: SubscriptionUrls;
  /**
   * An object representing the first subscription item belonging to this subscription.
   */
  first_subscription_item: FirstSubscriptionItem;
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
  name: string;
  slug: string;
  domain: string;
  url: string;
  avatar_url: string;
  plan: string;
  country: string;
  country_nicename: string;
  currency: string;
  total_sales: number;
  total_revenue: number;
  thirty_day_sales: number;
  thirty_day_revenue: number;
  created_at: string;
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
  store_id: number;
  name: string;
  email: string;
  status: "subscribed" | "unsubscribed" | "archived" | "requires_verification" | "invalid_email" | "bounced";
  city: string | null;
  region: string | null;
  country: string;
  total_revenue_currency: number;
  mrr: number;
  status_formatted: "Subscribed" | "Unsubscribed" | "Archived" | "Requires Verification" | "Invalid Email" | "Bounced";
  country_formatted: string;
  total_revenue_currency_formatted: string;
  mrr_formatted: string;
  created_at: string;
  updated_at: string;
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
  name: string;
  email: string;
  color: string;
  avatar_url: string;
  has_custom_avatar: string;
  createdAt: string;
  updatedAt: string;
}

interface UserObject extends BaseApiObject {
  attributes: UserAttributes;
}

export interface UserResponse extends BaseIndividualResponse {
  data: UserObject;
}


interface ProductAttributes {
  store_id: number;
  name: string;
  slug: string;
  description: string;
  status: "draft" | "published";
  status_formatted: "Draft" | "Published";
  thumb_url: string;
  large_thumb_url: string;
  price: number;
  pay_what_you_want: boolean;
  from_price: number | null;
  to_price: number | null;
  buy_now_url: string;
  price_formatted: string;
  created_at: string;
  updated_at: string;
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
  product_id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  is_subscription: boolean;
  interval: "day" | "week" | "month" | "year" | null;
  interval_count: number | null;
  has_free_trial: boolean;
  trial_interval: "day" | "week" | "month" | "year" | null;
  trial_interval_count: number | null;
  pay_what_you_want: boolean;
  min_price: number;
  suggested_price: number;
  has_license_keys: boolean;
  license_activation_limit: number;
  is_license_limit_unlimited: boolean;
  license_length_value: number | null;
  license_length_unit: "days" | "months" | "years" | null;
  is_license_length_unlimited: boolean;
  sort: number;
  status: "pending" | "draft" | "published";
  status_formatted: "Pending" | "Draft" | "Published";
  created_at: string;
  updated_at: string;
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
  name: string;
  description: string;
  media: string[];
  redirect_url: string;
  receipt_button_text: string;
  receipt_link_url: string;
  receipt_thank_you_note: string;
  enabled_variants: number[];
}

interface CheckoutCheckoutOptions {
  embed: boolean;
  media: boolean;
  logo: boolean;
  desc: boolean;
  discount: boolean;
  dark: boolean;
  subscription_preview: boolean;
  button_color: string;
}

interface CheckoutCheckoutData {
  email: string;
  name: string;
  billing_address: object;
  tax_number: string;
  discount_code: string;
  custom: Array<T>;
  variant_quantities: Array<T>;
}

interface CheckoutPreview {
  currency: string;
  currency_rate: number;
  subtotal: number;
  discount_total: number;
  tax: number;
  total: number;
  subtotal_usd: number;
  discount_total_usd: number;
  tax_usd: number;
  total_usd: number;
  subtotal_formatted: string;
  discount_total_formatted: string;
  tax_formatted: string;
  total_formatted:  string;
}

interface CheckoutAttributes {
  store_id: number;
  variant_id: number;
  custom_price: number| null;
  product_options: CheckoutProductOptions;
  checkout_options: CheckoutCheckoutOptions;
  checkout_data: CheckoutCheckoutData;
  preview: CheckoutPreview;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
  test_mode: boolean;
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


interface OrderFirstOrderItem {
  id: number;
  order_id: number;
  product_id: number;
  variant_id: number;
  product_name: string;
  variant_name: string;
  price: number;
  created_at: string;
  updated_at: string;
  test_mode: boolean;
}

interface OrderUrls {
  receipt: string;
}

interface OrderAttributes {
  store_id: number;
  customer_id: number;
  identifier: string;
  order_number: number;
  user_name: string;
  user_email: string;
  currency: string;
  currency_rate: string;
  subtotal: number;
  discount_total: number;
  tax: number;
  total: number;
  subtotal_usd: number;
  discount_total_usd: number;
  tax_usd: number;
  total_usd: number;
  tax_name: string | null;
  tax_rate: string;
  status: "pending" | "failed" | "paid" | "refunded";
  status_formatted: "Pending" | "Failed" | "Paid" | "Refunded";
  refunded: boolean;
  refunded_at: string | null;
  subtotal_formatted: string;
  discount_total_formatted: string;
  tax_formatted: string;
  total_formatted: string;
  first_order_item: OrderFirstOrderItem;
  urls: OrderUrls;
  created_at: string;
  updated_at: string;
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
  variant_id: number;
  identifier: string;
  name: string;
  extension: string;
  download_url: string;
  size:number;
  size_formatted: string;
  version: string | null;
  sort: number;
  status: "draft" | "published";
  created_at: string;
  updated_at: string;
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


interface SubscriptionInvoiceUrls {
  invoice_url: string;
}

interface SubscriptionInvoiceAttributes {
  store_id: number;
  subscription_id: number;
  customer_id: number;
  user_name: string;
  user_email: string;
  billing_reason: "initial" | "renewal" | "updated";
  card_brand: "visa" | "mastercard" | "amex" | "discover" | "jcb" | "diners" | "unionpay";
  card_last_four: string | null;
  currency: string;
  currency_rate: string;
  subtotal: number;
  discount_total: number;
  tax: number;
  total: number;
  subtotal_usd: number;
  discount_total_usd: number;
  tax_usd: number;
  total_usd: number;
  status: "pending" | "paid" | "void" | "refunded";
  status_formatted: "Pending" | "Paid" | "Void" | "Refunded";
  refunded: boolean;
  refunded_at: string | null;
  subtotal_formatted: string;
  discount_total_formatted: string;
  tax_formatted: string;
  total_formatted: string;
  urls: SubscriptionInvoiceUrls;
  created_at: string;
  updated_at: string;
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


interface DiscountAttributes {
  store_id: number;
  name: string;
  code: string;
  amount: number;
  amount_type: "percent" | "fixed";
  is_limited_to_products: boolean;
  is_limited_redemptions: boolean;
  max_redemptions: number;
  starts_at: string | null;
  expires_at: string | null;
  duration: "once" | "repeating" | "forever";
  duration_in_months: number;
  status: "draft" | "published";
  status_formatted: "Draft" | "Published";
  created_at: string;
  updated_at: string;
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
  discount_id: number;
  order_id: number;
  discount_name: string;
  discount_code: string;
  discount_amount: number;
  discount_amount_type: "percent" | "fixed";
  amount: number;
  created_at: string;
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
  store_id: number;
  customer_id: number;
  order_id: number;
  order_item_id: number;
  product_id: number;
  user_name: string;
  user_email: string;
  key: string;
  key_short: string;
  activation_limit: number;
  instances_count: number;
  disabled: boolean;
  status: "inactive" | "active" | "expired" | "disabled";
  status_formatted: "Inactive" | "Active" | "Expired" | "Disabled";
  expires_at: string | null;
  created_at: string;
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
  license_key_id: number;
  identifier: string;
  name: string;
  created_at: string;
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


interface WebhookAttributes {
  store_id: number;
  url: string;
  events: string[];
  last_sent_at: string | null;
  created_at: string;
  updated_at: string;
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
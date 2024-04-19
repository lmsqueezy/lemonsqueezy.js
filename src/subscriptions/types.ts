import type {
  Data,
  LemonSqueezyResponse,
  Links,
  Meta,
  Params,
  Relationships,
} from "../types";
type SubscriptionStatus =
  | "on_trial"
  | "active"
  | "paused"
  | "pause"
  | "past_due"
  | "unpaid"
  | "cancelled"
  | "expired"
  | "cancelled";
type CardBrand =
  | "visa"
  | "mastercard"
  | "amex"
  | "discover"
  | "jcb"
  | "diners"
  | "unionpay";
type Pause = {
  /**
   * - `void` - If you can't offer your services for a period of time (for maintenance as an example), you can void invoices so your customers aren't charged.
   * - `free` - Offer your subscription services for free, whilst halting payment collection.
   */
  mode: "void" | "free";
  /**
   * An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) formatted date-time string indicating when the subscription will continue collecting payments.
   */
  resumes_at?: string | null;
};
type FirstSubscriptionItem = {
  /**
   * The ID of the subscription item.
   */
  id: number;
  /**
   * The ID of the subscription.
   */
  subscription_id: number;
  /**
   * The ID of the price
   */
  price_id: number;
  /**
   * The quantity of the subscription item.
   */
  quantity: number;
  /**
   * A boolean value indicating whether the related subscription product/variant has usage-based billing enabled.
   *
   * Note: Not in the documentation, but in the response
   */
  is_usage_based: boolean;
  /**
   * An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) formatted date-time string indicating when the subscription item was created.
   */
  created_at: string;
  /**
   * An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) formatted date-time string indicating when the subscription item was last updated.
   */
  updated_at: string;
};

type Attributes = {
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
   * The status of the subscription. One of
   *
   * - `on_trial`
   * - `active`
   * - `paused` - The subscription's payment collection has been paused. See the `pause` attribute below for more information.
   * - `past_due` - A renewal payment has failed. The subscription will go through [4 payment retries](https://docs.lemonsqueezy.com/help/online-store/recovery-dunning#failed-payments) over the course of 2 weeks. If a retry is successful, the subscription's status changes back to `active`. If all four retries are unsuccessful, the status is changed to `unpaid`.
   * - `unpaid` - [Payment recovery](https://docs.lemonsqueezy.com/help/online-store/recovery-dunning#failed-payments) has been unsuccessful in capturing a payment after 4 attempts. If dunning is enabled in your store, your dunning rules now will determine if the subscription becomes `expired` after a certain period. If dunning is turned off, the status remains `unpaid` (it is up to you to determine what this means for users of your product).
   * - `cancelled` - The customer or store owner has cancelled future payments, but the subscription is still technically active and valid (on a "grace period"). The `ends_at` value shows the date-time when the subscription is scheduled to expire.
   * - `expired` - The subscription has ended (either it had previously been `cancelled` and the grace period created from its final payment has run out, or it was previously `unpaid` and the subscription was not re-activated during dunning). The `ends_at` value shows the date-time when the subscription expired. Customers should no longer have access to your product.
   */
  status: SubscriptionStatus;
  /**
   * The title-case formatted status of the subscription.
   *
   * For example, when `status` is `active`, `status_formatted` will be `Active` and `past_due` will be `Past due`.
   */
  status_formatted: string;
  /**
   * Lowercase brand of the card used to pay for the latest subscription payment. One of
   *
   * - `visa`
   * - `mastercard`
   * - `amex`
   * - `discover`
   * - `jcb`
   * - `diners`
   * - `unionpay`
   *
   * Will be empty for non-card payments.
   */
  card_brand: CardBrand | null;
  /**
   * The last 4 digits of the card used to pay for the latest subscription payment. Will be empty for non-card payments.
   */
  card_last_four: string | null;
  /**
   * An object containing the payment collection pause behavior options for the subscription, if set. Options include:
   *
   * - `mode` - Defines payment pause behavior, can be one of:
   *    - `void` - If you can't offer your services for a period of time (for maintenance as an example), you can void invoices so your customers aren't charged.
   *    - `free` - Offer your subscription services for free, whilst halting payment collection.
   * - `resumes_at` - (Optional) An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) formatted date-time string indicating when the subscription will continue collecting payments.
   *
   * For a subscription that isn't in the `paused` state, the pause object will be `null`.
   */
  pause: Pause | null;
  /**
   * A boolean indicating if the subscription has been cancelled.
   *
   * When `cancelled` is `true`:
   *
   * - `status` will be `cancelled`
   * - `ends_at` will be populated with a date-time string
   */
  cancelled: boolean;
  /**
   * If the subscription has a free trial (`status` is `on_trial`), this will be an [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) formatted date-time string indicating when the trial period ends. For all other status values, this will be `null`.
   */
  trial_ends_at: string | null;
  /**
   * An integer representing a day of the month (`21` equals `21st day of the month`). This is the day on which subscription invoice payments are collected.
   */
  billing_anchor: number;
  /**
   * An object representing the first subscription item belonging to this subscription.
   *
   * - `id` - The ID of the subscription item.
   * - `subscription_id` - The ID of the subscription.
   * - `price_id` - The ID of the price
   * - `quantity` - The quantity of the subscription item.
   * - `created_at` - An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) formatted date-time string indicating when the subscription item was created.
   * - `updated_at` - An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) formatted date-time string indicating when the subscription item was last updated.
   *
   * Will be `null` if there is no subscription item, for example if the subscription is currently in a free trial.
   */
  first_subscription_item: FirstSubscriptionItem | null;
  /**
   * An object of customer-facing URLs for managing the subscription. It contains
   *
   * - `update_payment_method` - A pre-signed URL for managing payment and billing information for the subscription. This can be used in conjunction with [Lemon.js](https://docs.lemonsqueezy.com/help/lemonjs/what-is-lemonjs) to allow your customer to change their billing information from within your application. The URL is valid for 24 hours from time of request.
   * - `customer_portal` - A pre-signed URL to the [Customer Portal](https://docs.lemonsqueezy.com/help/online-store/customer-portal), which allows customers to fully manage their subscriptions and billing information from within your application. The URL is valid for 24 hours from time of request.
   */
  urls: {
    update_payment_method: string;
    customer_portal: string;
    customer_portal_update_subscription: string;
  };
  /**
   * An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) formatted date-time string indicating the end of the current billing cycle, and when the next invoice will be issued. This also applies to `past_due` subscriptions; `renews_at` will reflect the next renewal charge attempt.
   */
  renews_at: string;
  /**
   * f the subscription has as `status` of `cancelled` or `expired`, this will be an [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) formatted date-time string indicating when the subscription expires (or expired). For all other `status` values, this will be `null`.
   */
  ends_at: string | null;
  /**
   * An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) formatted date-time string indicating when the object was created.
   */
  created_at: string;
  /**
   * An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) formatted date-time string indicating when the object was last updated.
   */
  updated_at: string;
  /**
   * A boolean indicating if the object was created within test mode.
   */
  test_mode: boolean;
};
type SubscriptionData = Data<
  Attributes,
  Pick<
    Relationships,
    | "store"
    | "customer"
    | "order"
    | "order-item"
    | "product"
    | "variant"
    | "subscription-items"
    | "subscription-invoices"
  >
>;

export type GetSubscriptionParams = Pick<
  Params<(keyof SubscriptionData["relationships"])[]>,
  "include"
>;
export type ListSubscriptionsParams = Params<
  GetSubscriptionParams["include"],
  {
    /**
     * Only return subscriptions belonging to the store with this ID.
     */
    storeId?: string | number;
    /**
     * Only return subscriptions belonging to the order with this ID.
     */
    orderId?: string | number;
    /**
     * Only return subscriptions belonging to the order item with this ID.
     */
    orderItemId?: string | number;
    /**
     * Only return subscriptions belonging to the product with this ID.
     */
    productId?: string | number;
    /**
     * Only return subscriptions belonging to the variant with this ID.
     */
    variantId?: string | number;
    /**
     * Only return subscriptions where the `user_email` field is equal to this email address.
     */
    userEmail?: string;
    /**
     * Only return subscriptions with this status.
     */
    status?: SubscriptionStatus;
  }
>;
export type UpdateSubscription = Partial<{
  /**
   * The ID of the [Variant](https://docs.lemonsqueezy.com/api/variants) you want to switch this subscription to. Required if changing a subscription's product/variant.
   */
  variantId: number;
  /**
   * An object containing the payment collection pause behavior options for the subscription. Options include:
   *
   * - `mode` - Defines payment pause behavior, can be one of:
   *    - `void` - If you can't offer your services for a period of time (for maintenance as an example), you can void invoices so your customers aren't charged.
   *    - `free` - Offer your subscription services for free, whilst halting payment collection.
   * - `resumes_at` (optional) - An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) formatted date-time string indicating when the subscription will continue collecting payments.
   *
   * You can set the pause object to `null` to unpause the subscription.
   */
  pause: {
    mode: "void" | "free";
    resumesAt?: string | null;
  } | null;
  /**
   * Set as `true` to cancel the subscription. You can resume a subscription (before the `ends_at` date) by setting this to `false`.
   */
  cancelled: boolean;
  /**
   * An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) formatted date-time string indicating when the subscription's free trial should end.
   */
  trialEndsAt: string | null;
  /**
   * - Use an integer representing a day of the month (`21` equals `21st day of the month`) to change the day on which subscription invoice payments are collected.
   * - Use `null` or `0` to reset the billing anchor to the current date. Doing this will also remove an active trial.
   *
   * Setting this value to a valid integer (1-31) will set the billing anchor to the next occurrence of that day. For example, if on the 21st of January you set the subscription billing anchor to the 1st, the next occurrence of that day is February 1st. All invoices from that point on will be generated on the 1st of the month.
   *
   * If the current month doesn’t contain the day that matches your `billing_anchor` (for example, if the `billing_anchor` is 31 and the month is November), the customer will be charged on the last day of the month.
   *
   * When setting a new billing anchor day, we calculate the next occurrence and issue a paid, prorated trial which ends on the next occurrence date. When the trial ends, the customer is charged for the full prorated amount.
   */
  billingAnchor: number | null;
  /**
   * If `true`, any updates to the subscription will be charged immediately. A new prorated invoice will be generated and payment attempted. Defaults to `false`. Note that this will be overridden by the `disable_prorations` option if used.
   */
  invoiceImmediately: boolean;
  /**
   * If `true`, no proration will be charged and the customer will simply be charged the new price at the next renewal. Defaults to `false`. Note that this will override the `invoice_immediately` option if used.
   */
  disableProrations: boolean;
}>;
export type Subscription = Omit<
  LemonSqueezyResponse<SubscriptionData, unknown, Pick<Links, "self">>,
  "meta"
>;
export type ListSubscriptions = LemonSqueezyResponse<
  SubscriptionData[],
  Pick<Meta, "page">,
  Pick<Links, "first" | "last">
>;

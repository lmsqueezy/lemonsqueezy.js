import type {
  Data,
  ISO3166Alpha2CountryCode,
  ISO4217CurrencyCode,
  LemonSqueezyResponse,
  Links,
  Meta,
  Params,
  Relationships,
} from "../types";

type ProductOptions = {
  /**
   * A custom name for the product
   */
  name: string;
  /**
   * A custom description for the product
   */
  description: string;
  /**
   * An array of image URLs to use as the product's media
   */
  media: string[];
  /**
   * A custom URL to redirect to after a successful purchase
   */
  redirect_url: string;
  /**
   * A custom text to use for the order receipt email button
   */
  receipt_button_text: string;
  /**
   * A custom URL to use for the order receipt email button
   */
  receipt_link_url: string;
  /**
   * A custom thank you note to use for the order receipt email
   */
  receipt_thank_you_note: string;
  /**
   * An array of variant IDs to enable for this checkout. If this is empty, all variants will be enabled.
   */
  enabled_variants: number[];
  /**
   * A custom text to use for order payment success message alert title
   *
   * Note: Not in the documentation, but in the response
   */
  confirmation_title: string;
  /**
   * A custom text to use for order payment success message alert content
   *
   * Note: Not in the documentation, but in the response
   */
  confirmation_message: string;
  /**
   * A custom text to use for order payment success message alert button
   *
   * Note: Not in the documentation, but in the response
   */
  confirmation_button_text: string;
};
type CheckoutOptions = {
  /**
   * If `true`, show the [checkout overlay](https://docs.lemonsqueezy.com/help/checkout/checkout-overlay)
   */
  embed: boolean;
  /**
   * If `false`, hide the product media
   */
  media: boolean;
  /**
   * If `false`, hide the store logo
   */
  logo: boolean;
  /**
   * If `false`, hide the product description
   */
  desc: boolean;
  /**
   * If `false`, hide the discount code field
   */
  discount: boolean;
  /**
   *  If `true`, remove the free trial
   */
  skip_trial: boolean;
  quantity: number;
  /**
   * If `true`, use the dark theme
   */
  dark: boolean;
  /**
   * If `false`, hide the "You will be charged..." subscription preview text
   */
  subscription_preview: boolean;
  /**
   * A custom hex color to use for the checkout button. Text within the button will be either white or dark depending on the brightness of your button color.
   */
  button_color: string;
};
type CheckoutData = {
  /**
   * A pre-filled email address
   */
  email: string;
  /**
   * A pre-filled name
   */
  name: string;
  billing_address: {
    /**
     * A pre-filled billing address country in a [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) format
     */
    country: ISO3166Alpha2CountryCode;
    /**
     * A pre-filled billing address zip/postal code
     */
    zip: string;
  };
  /**
   * A pre-filled tax number
   */
  tax_number: string;
  /**
   * A pre-filled discount code
   */
  discount_code: string;
  /**
   * An object containing any custom data to be passed to the checkout
   */
  custom: unknown[] | Record<string, unknown>;
  /**
   * An array of variant IDs to enable for this checkout. If this is empty, all variants will be enabled.
   */
  variant_quantities: number[];
};
type Preview = {
  /**
   * The [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code of the store (e.g. `USD`, `GBP`, etc).
   */
  currency: ISO4217CurrencyCode;
  /**
   * If the store currency is USD, this will always be `1.0`. Otherwise, this is the currency conversion rate used to determine the price of the checkout in USD at the time of purchase.
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
   * A positive integer in cents representing the setup fee of the checkout in USD.
   */
  setup_fee_usd: number;
  /**
   * A positive integer in cents representing the setup fee.
   */
  setup_fee: number;
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
   * A human-readable string representing the subtotal of the checkout in the store currency (e.g. `$9.99`).
   */
  subtotal_formatted: string;
  /**
   * A human-readable string representing the total discount value applied to the checkout in the store currency (e.g. `$9.99`).
   */
  discount_total_formatted: string;
  /**
   * A human-readable string representing the setup fee of the checkout in the store currency (e.g. `$9.99`).
   */
  setup_fee_formatted: string;
  /**
   * A human-readable string representing the tax applied to the checkout in the store currency (e.g. `$9.99`).
   */
  tax_formatted: string;
  /**
   * A human-readable string representing the total price of the checkout in the store currency (e.g. `$9.99`).
   */
  total_formatted: string;
};
type Attributes = {
  /**
   * The ID of the store this checkout belongs to.
   */
  store_id: number;
  /**
   * The ID of the variant associated with this checkout.
   *
   * Note: by default, all variants of the related product will be shown in the checkout, with your selected variant highlighted. If you want hide to other variants, you can utilise the `product_options.enabled_variants` option to determine which variant(s) are displayed in the checkout.
   */
  variant_id: number;
  /**
   * If the value is not `null`, this represents a positive integer in cents representing the custom price of the variant.
   */
  custom_price: null | number;
  /**
   * An object containing any overridden product options for this checkout. Possible options include:
   *
   * - `name` - A custom name for the product
   * - `description` - A custom description for the product
   * - `media` - An array of image URLs to use as the product's media
   * - `redirect_url` - A custom URL to redirect to after a successful purchase
   * - `receipt_button_text` - A custom text to use for the order receipt email button
   * - `receipt_link_url` - A custom URL to use for the order receipt email button
   * - `receipt_thank_you_note` - A custom thank you note to use for the order receipt email
   * - `enabled_variants` - An array of variant IDs to enable for this checkout. If this is empty, all variants will be enabled.
   */
  product_options: ProductOptions;
  /**
   * An object containing checkout options for this checkout. Possible options include:
   *
   * - `embed` - If `true`, show the [checkout overlay](https://docs.lemonsqueezy.com/help/checkout/checkout-overlay)
   * - `media` - If `false`, hide the product media
   * - `logo` - If `false`, hide the store logo
   * - `desc` - If `false`, hide the product description
   * - `discount` - If `false`, hide the discount code field
   * - `dark` - If `true`, use the dark theme
   * - `subscription_preview` - If `false`, hide the "You will be charged..." subscription preview text
   * - `button_color` - A custom hex color to use for the checkout button. Text within the button will be either white or dark depending on the brightness of your button color.
   */
  checkout_options: CheckoutOptions;
  /**
   * An object containing any [prefill](https://docs.lemonsqueezy.com/help/checkout/prefilling-checkout-fields) or [custom data](https://docs.lemonsqueezy.com/help/checkout/passing-custom-data) to be used in the checkout. Possible options include:
   *
   * - `email` - A pre-filled email address
   * - `name` - A pre-filled name
   * - `billing_address.country` - A pre-filled billing address country in a [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) format
   * - `billing_address.zip` - A pre-filled billing address zip/postal code
   * - `tax_number` - A pre-filled tax number
   * - `discount_code` - A pre-filled discount code
   * - `custom` - An object containing any custom data to be passed to the checkout
   * - `variant_quantities` - A list containing quantity data objects
   */
  checkout_data: CheckoutData;
  /**
   * If `preview` is passed as `true` in the request, the Checkout object will contain a `preview` object. This contains pricing information for the checkout, including tax, any discount applied, and the total price.
   *
   * The `preview` object is only available when the checkout is created.
   *
   * Values returned:
   *
   * - `currency` - The [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code of the store (e.g. `USD`, `GBP`, etc).
   * - `currency_rate` - If the store currency is USD, this will always be `1.0`. Otherwise, this is the currency conversion rate used to determine the price of the checkout in USD at the time of purchase.
   * - `subtotal` - A positive integer in cents representing the subtotal of the checkout in the store currency.
   * - `discount_total` - A positive integer in cents representing the total discount value applied to the checkout in the store currency.
   * - `tax` - A positive integer in cents representing the tax applied to the checkout in the store currency.
   * - `total` - A positive integer in cents representing the total price of the checkout in the store currency.
   * - `subtotal_usd` - A positive integer in cents representing the subtotal of the checkout in USD.
   * - `discount_total_usd` - A positive integer in cents representing the total discount value applied to the checkout in USD.
   * - `tax_usd` - A positive integer in cents representing the tax applied to the checkout in USD.
   * - `total_usd` - A positive integer in cents representing the total price of the checkout in USD.
   * - `subtotal_formatted` - A human-readable string representing the subtotal of the checkout in the store currency (e.g. `$9.99`).
   * - `discount_total_formatted` - A human-readable string representing the total discount value applied to the checkout in the store currency (e.g. `$9.99`).
   * - `tax_formatted` - A human-readable string representing the tax applied to the checkout in the store currency (e.g. `$9.99`).
   * - `total_formatted` - A human-readable string representing the total price of the checkout in the store currency (e.g. `$9.99`).
   */
  preview: Preview;
  /**
   * An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) formatted date-time string indicating when the checkout expires. Can be `null` if the checkout is perpetual.
   */
  expires_at: null | string;
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
  /**
   * The unique URL to access the checkout. Note: for security reasons, download URLs are signed. If the checkout `expires_at` is set, the URL will expire after the specified time.
   */
  url: string;
};
type CheckoutResponseData = Data<
  Attributes,
  Pick<Relationships, "store" | "variant">
>;

export type NewCheckout = {
  /**
   * The store this checkout belongs to.
   */
  // storeId: string | number
  /**
   * The variant associated with this checkout.
   *
   * Note: by default, all variants of the related product will be shown in the checkout, with your selected variant highlighted. If you want hide to other variants, you can utilize the `productOptions.enabledVariants` option to determine which variant(s) are displayed in the checkout.
   */
  // variantId: string | number
  /**
   * A positive integer in cents representing the custom price of the variant.
   *
   * Note: If the product purchased is a subscription, this custom price is used for all renewal payments. If the subscription's variant changes in the future (i.e. the customer is moved to a different subscription "tier") the new variant's price will be used from that moment forward.
   */
  customPrice?: number;
  /**
   * An object containing any overridden product options for this checkout. Possible options include:
   *
   * - `name` - A custom name for the product
   * - `description` - A custom description for the product
   * - `media` - An array of image URLs to use as the product's media
   * - `redirectUrl` - A custom URL to redirect to after a successful purchase
   * - `receiptButtonText` - A custom text to use for the order receipt email button
   * - `receiptLinkUrl` - A custom URL to use for the order receipt email button
   * - `receiptThankYouNote` - A custom thank you note to use for the order receipt email
   * - `enabledVariants` - An array of variant IDs to enable for this checkout. If this is empty, all variants will be enabled.
   */
  productOptions?: {
    /**
     * A custom name for the product
     */
    name?: string;
    /**
     * A custom description for the product
     */
    description?: string;
    /**
     * An array of image URLs to use as the product's media
     */
    media?: string[];
    /**
     * A custom URL to redirect to after a successful purchase
     */
    redirectUrl?: string;
    /**
     * A custom text to use for the order receipt email button
     */
    receiptButtonText?: string;
    /**
     * A custom URL to use for the order receipt email button
     */
    receiptLinkUrl?: string;
    /**
     * A custom thank you note to use for the order receipt email
     */
    receiptThankYouNote?: string;
    /**
     * An array of variant IDs to enable for this checkout. If this is empty, all variants will be enabled.
     */
    enabledVariants?: number[];
    /**
     * A custom text to use for order payment success message alert title
     */
    confirmationTitle?: string;
    /**
     * A custom text to use for order payment success message alert content
     */
    confirmationMessage?: string;
    /**
     * A custom text to use for order payment success message alert button
     */
    confirmationButtonText?: string;
  };
  /**
   * An object containing checkout options for this checkout. Possible options include:
   *
   * - `embed` - If `true`, show the [checkout overlay](https://docs.lemonsqueezy.com/help/checkout/checkout-overlay)
   * - `media` - If `false`, hide the product media
   * - `logo` - If `false`, hide the store logo
   * - `desc` - If `false`, hide the product description
   * - `discount` - If `false`, hide the discount code field
   * - `dark` - If `true`, use the dark theme
   * - `subscription_preview` - If `false`, hide the "You will be charged..." subscription preview text
   * - `buttonColor` - A custom hex color to use for the checkout button. Text within the button will be either white or dark depending on the brightness of your button color.
   */
  checkoutOptions?: {
    /**
     * If `true`, show the checkout overlay
     */
    embed?: boolean;
    /**
     *  If `false`, hide the product media
     */
    media?: boolean;
    /**
     *  If `false`, hide the store logo
     */
    logo?: boolean;
    /**
     * If `false`, hide the product description
     */
    desc?: boolean;
    /**
     *  If `false`, hide the discount code field
     */
    discount?: boolean;
    /**
     *  If `true`, remove the free trial
     */
    skipTrial?: boolean;
    /**
     * If `true`, use the dark theme
     */
    dark?: boolean;
    /**
     * If `false`, hide the "You will be charged..." subscription preview text
     */
    subscriptionPreview?: boolean;
    /**
     * A custom hex color to use for the checkout button
     */
    buttonColor?: string;
  };
  /**
   * An object containing any [prefill](https://docs.lemonsqueezy.com/help/checkout/prefilling-checkout-fields) or [custom data](https://docs.lemonsqueezy.com/help/checkout/passing-custom-data) to be used in the checkout. Possible options include:
   *
   * - `email` - A pre-filled email address
   * - `name` - A pre-filled name
   * - `billingAddress.country` - A pre-filled billing address country in a [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) format
   * - `billingAddress.zip` - A pre-filled billing address zip/postal code
   * - `taxNumber` - A pre-filled tax number
   * - `discountCode` - A pre-filled discount code
   * - `custom` - An object containing any custom data to be passed to the checkout
   * - `variantQuantities` - A list containing quantity data objects
   */
  checkoutData?: {
    /**
     * A pre-filled email address
     */
    email?: string;
    /**
     * A pre-filled name
     */
    name?: string;
    billingAddress?: {
      /**
       * A pre-filled billing address country in a [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) format
       */
      country?: ISO3166Alpha2CountryCode;
      /**
       * A pre-filled billing address zip/postal code
       */
      zip?: string;
    };
    /**
     * A pre-filled tax number
     */
    taxNumber?: string;
    /**
     * A pre-filled discount discountCode
     */
    discountCode?: string;
    /**
     * An object containing any custom data to be passed to the checkout
     */
    custom?: Record<string, unknown>;
    /**
     *  A list containing quantity data objects
     */
    variantQuantities?: {
      variantId: number;
      quantity: number;
    }[];
  };
  /**
   * A boolean indicating whether to return a preview of the checkout. If `true`, the checkout will include a `preview` object with the checkout preview data.
   */
  preview?: boolean;
  /**
   * A boolean indicating whether the checkout should be created in test mode.
   */
  testMode?: boolean;
  /**
   * An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) formatted date-time string indicating when the checkout expires. Can be null if the checkout is perpetual.
   */
  expiresAt?: null | string;
};
export type GetCheckoutParams = Pick<
  Params<(keyof CheckoutResponseData["relationships"])[]>,
  "include"
>;
export type ListCheckoutsParams = Params<
  GetCheckoutParams["include"],
  { storeId?: number | string; variantId?: string | number }
>;
export type Checkout = Omit<
  LemonSqueezyResponse<CheckoutResponseData, unknown, Pick<Links, "self">>,
  "meta"
>;
export type ListCheckouts = LemonSqueezyResponse<
  CheckoutResponseData[],
  Pick<Meta, "page">,
  Omit<Links, "self">
>;

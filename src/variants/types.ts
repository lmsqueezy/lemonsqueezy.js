import type { Data, IntervalUnit, LemonSqueezyResponse, Links, Meta, Params, Relationships } from '../types'

export type VariantStatus = 'pending' | 'draft' | 'published'

type DeprecatedAttributes = {
	/**
	 * `Deprecated` A positive integer in cents representing the price of the variant.
	 */
	price: number
	/**
	 * `Deprecated` Has the value true if this variant is a subscription.
	 */
	is_subscription: boolean
	/**
	 * `Deprecated` If this variant is a subscription, this is the frequency at which a subscription is billed. One of
	 *
	 * - `day`
	 * - `week`
	 * - `month`
	 * - `year`
	 */
	interval: null | IntervalUnit
	/**
	 * `Deprecated` If this variant is a subscription, this is the number of intervals (specified in the `interval` attribute) between subscription billings. For example, `interval=month` and `interval_count=3` bills every 3 months.
	 */
	interval_count: null | number
	/**
	 * `Deprecated` Has the value `true` if this variant has a free trial period. Only available if the variant is a subscription.
	 */
	has_free_trial: boolean
	/**
	 * `Deprecated` The interval unit of the free trial. One of
	 *
	 * - `day`
	 * - `week`
	 * - `month`
	 * - `year`
	 */
	trial_interval: IntervalUnit
	/**
	 * `Deprecated` If interval count of the free trial. For example, a variant with `trial_interval=day` and `trial_interval_count=14` would have a free trial that lasts 14 days.
	 */
	trial_interval_count: number
	/**
	 * `Deprecated` Has the value true if this is a “pay what you want” variant where the price can be set by the customer at checkout.
	 */
	pay_what_you_want: boolean
	/**
	 * `Deprecated` If `pay_what_you_want` is `true`, this is the minimum price this variant can be purchased for, as a positive integer in cents.
	 */
	min_price: number
	/**
	 * `Deprecated` If `pay_what_you_want` is `true`, this is the suggested price for this variant shown at checkout, as a positive integer in cents.
	 */
	suggested_price: number
}

type Attributes = {
	/**
	 * The ID of the product this variant belongs to.
	 */
	product_id: number
	/**
	 * The name of the variant.
	 */
	name: string
	/**
	 * The slug used to identify the variant.
	 */
	slug: string
	/**
	 * The description of the variant in HTML.
	 */
	description: string
	/**
	 * Has the value `true` if this variant should generate license keys for the customer on purchase.
	 */
	has_license_keys: boolean
	/**
	 * The maximum number of times a license key can be activated for this variant.
	 */
	license_activation_limit: number
	/**
	 * Has the value `true` if license key activations are unlimited for this variant.
	 */
	is_license_limit_unlimited: boolean
	/**
	 * The number of units (specified in the `license_length_unit` attribute) until a license key expires.
	 */
	license_length_value: number
	/**
	 * The unit linked with the `license_length_value` attribute. One of
	 *
	 * - `days`
	 * - `months`
	 * - `years`
	 *
	 * For example, `license_length_value=3` and `license_length_unit=months` license keys will expire after 3 months.
	 */
	license_length_unit: 'days' | 'months' | 'years'
	/**
	 * Has the value `true` if license keys should never expire.
	 *
	 * Note: If the variant is a subscription, the license key expiration will be linked to the status of the subscription (e.g. the license will expire when the subscription expires).
	 */
	is_license_length_unlimited: boolean
	/**
	 * An integer representing the order of this variant when displayed on the checkout.
	 */
	sort: number
	/**
	 * The status of the variant. One of
	 *
	 * - `pending`
	 * - `draft`
	 * - `published`
	 *
	 * Note: If a variant has a `pending` status and its product has no other variants, it is considered the “default” variant and is not shown as a separate option at checkout.
	 */
	status: VariantStatus
	/**
	 * The formatted status of the variant.
	 */
	status_formatted: string
	/**
	 * An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) formatted date-time string indicating when the object was created.
	 */
	created_at: string
	/**
	 * An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) formatted date-time string indicating when the object was last updated.
	 */
	updated_at: string
	/**
	 * A boolean indicating if the object was created within test mode.
	 */
	test_mode: boolean
}
type VariantData = Data<Attributes & DeprecatedAttributes, Pick<Relationships, 'product' | 'files' | 'price-model'>>

export type GetVariantParams = Pick<Params<(keyof VariantData['relationships'])[]>, 'include'>
export type ListVariantsParams = Params<
	GetVariantParams['include'],
	{ productId?: number | string; status?: VariantStatus }
>
export type Variant = Omit<LemonSqueezyResponse<VariantData, unknown, Pick<Links, 'self'>>, 'meta'>
export type ListVariants = LemonSqueezyResponse<VariantData[], Pick<Meta, 'page'>, Pick<Links, 'first' | 'last'>>

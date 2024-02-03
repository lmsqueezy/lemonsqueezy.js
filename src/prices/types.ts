import type { Data, IntervalUnit, LemonSqueezyResponse, Links, Meta, Params, Relationships } from '../types'

type Category = 'one_time' | 'subscription' | 'lead_magnet' | 'pwyw'
type Scheme = 'standard' | 'package' | 'graduated' | 'volume'
type UsageAggregation = 'sum' | 'last_during_period' | 'last_ever' | 'max'
type TaxCode = 'eservice' | 'ebook' | 'saas'
type Tier = {
	/**
	 * The top limit of this tier. Will be an integer or `"inf"` (for "infinite") if this is the highest-level tier.
	 */
	last_unit: string | number
	/**
	 * A positive integer in cents representing the price of each unit.
	 */
	unit_price: number
	/**
	 * A positive decimal string in cents representing the price of each unit. Will be `null` if usage-based billing is not activated on this price's variant.
	 */
	unit_price_decimal: string | null
	/**
	 * An optional fixed fee charged alongside the unit price.
	 */
	fixed_fee: number
}

type Attributes = {
	/**
	 * The ID of the variant this price belongs to.
	 */
	variant_id: number
	/**
	 * The type of variant this price was created for. One of
	 *
	 * `one_time` - A regular product
	 * `subscription` - A subscription
	 * `lead_magnet` - A free lead magnet
	 * `pwyw` - "Pay what you want" product
	 */
	category: Category
	/**
	 * The pricing model for this price. One of
	 *
	 * `standard`
	 * `package`
	 * `graduated`
	 * `volume`
	 */
	scheme: Scheme
	/**
	 * The type of usage aggregation in use if usage-based billing is activated. One of
	 *
	 * - `sum` - Sum of usage during period
	 * - `last_during_period` - Most recent usage during a period
	 * - `last_ever` - Most recent usage
	 * - `max` - Maximum usage during period
	 *
	 * Will be `null` if usage-based billing is not activated on this price's variant.
	 */
	usage_aggregation: UsageAggregation | null
	/**
	 * A positive integer in cents representing the price.
	 *
	 * Not used for volume and graduated pricing (tier data is used instead).
	 *
	 * Note: If `usage_aggregation` is enabled for this price, `unit_price` will be null and `unit_price_decimal` will be used instead.
	 */
	unit_price: number
	/**
	 * A positive decimal string in cents representing the price.
	 *
	 * Not used for volume and graduated pricing (tier data is used instead).
	 *
	 * Note: If `usage_aggregation` is not enabled for this price, `unit_price_decimal` will be `null` and `unit_price` will be used instead.
	 */
	unit_price_decimal: string | null
	/**
	 * A boolean indicating if the price has a setup fee.
	 * Will be `null` for non-subscription pricing.
	 */
	setup_fee_enabled: boolean | null
	/**
	 * A positive integer in cents representing the setup fee.
	 * Will be `null` for non-subscription pricing.
	 */
	setup_fee: number | null
	/**
	 * The number of units included in each package when using package pricing.
	 *
	 * Will be `1` for standard, graduated and volume pricing.
	 */
	package_size: number
	/**
	 * A list of pricing tier objects when using volume and graduated pricing.
	 *
	 * Tiers have three values:
	 *
	 * - `last_unit` - The top limit of this tier. Will be an integer or `"inf"` (for "infinite") if this is the highest-level tier.
	 * - `unit_price` - A positive integer in cents representing the price of each unit.
	 * - `unit_price_decimal` - A positive decimal string in cents representing the price of each unit. Will be `null` if usage-based billing is not activated on this price's variant.
	 * - `fixed_fee` - An optional fixed fee charged alongside the unit price.
	 *
	 * Will be `null` for standard and package pricing.
	 */
	tiers: Tier[] | null
	/**
	 * If the price's variant is a subscription, the billing interval. One of
	 *
	 * - `day`
	 * - `week`
	 * - `week`
	 * - `year`
	 *
	 * Will be `null` if the product is not a subscription.
	 */
	renewal_interval_unit: IntervalUnit | null
	/**
	 * If the price's variant is a subscription, this is the number of intervals (specified in the `renewal_interval_unit` attribute) between subscription billings.
	 *
	 * For example, `renewal_interval_unit=month` and `renewal_interval_quantity=3` bills every 3 months.
	 *
	 * Will be `null` if the product is not a subscription.
	 */
	renewal_interval_quantity: number | null
	/**
	 * The interval unit of the free trial. One of
	 *
	 * - `day`
	 * - `week`
	 * - `week`
	 * - `year`
	 *
	 * Will be `null` if there is no trial.
	 */
	trial_interval_unit: IntervalUnit | null
	/**
	 * The interval count of the free trial. For example, a variant with `trial_interval_unit=day` and `trial_interval_quantity=14` would have a free trial that lasts 14 days.
	 *
	 * Will be `null` if there is no trial.
	 */
	trial_interval_quantity: number | null
	/**
	 * If `category` is `pwyw`, this is the minimum price this variant can be purchased for, as a positive integer in cents.
	 *
	 * Will be `null` for all other categories.
	 */
	min_price: number | null
	/**
	 * If `category` is `pwyw`, this is the suggested price for this variant shown at checkout, as a positive integer in cents.
	 *
	 * Will be `null` for all other categories.
	 */
	suggested_price: null
	/**
	 * The product's [tax category](https://docs.lemonsqueezy.com/help/products/tax-categories). One of
	 *
	 * - `eservice`
	 * - `ebook`
	 * - `saas`
	 */
	tax_code: TaxCode
	/**
	 * An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) formatted date-time string indicating when the object was created.
	 */
	created_at: string
	/**
	 * An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) formatted date-time string indicating when the object was last updated.
	 */
	updated_at: string
}
type PriceData = Data<Attributes, Pick<Relationships, 'variant'>>

export type GetPriceParams = Pick<Params<(keyof PriceData['relationships'])[]>, 'include'>
export type ListPricesParams = Params<GetPriceParams['include'], { variantId?: string | number }>
export type Price = Omit<LemonSqueezyResponse<PriceData, unknown, Pick<Links, 'self'>>, 'meta'>
export type ListPrices = LemonSqueezyResponse<PriceData[], Pick<Meta, 'page'>, Pick<Links, 'first' | 'last'>>

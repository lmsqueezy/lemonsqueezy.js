import type { Data, LemonSqueezyResponse, Links, Meta, Params, Relationships } from '../types'

type AmountType = 'percent' | 'fixed'
type Duration = 'once' | 'repeating' | 'forever'
type Attributes = {
	/**
	 * The ID of the store this discount belongs to.
	 */
	store_id: number
	/**
	 * The name of the discount.
	 */
	name: string
	/**
	 * The discount code that can be used at checkout. Made up of uppercase letters and numbers and between 3 and 256 characters long.
	 */
	code: string
	/**
	 * The amount of discount to apply to the Discount. Either a fixed amount in cents or a percentage depending on the value of `amount_type`.
	 */
	amount: number
	/**
	 * The type of the amount. Either `percent` or `fixed`.
	 */
	amount_type: AmountType
	/**
	 * Has the value `true` if the discount can only be applied to certain products/variants.
	 */
	is_limited_to_products: boolean
	/**
	 * Has the value `true` if the discount can only be redeemed a limited number of times.
	 */
	is_limited_redemptions: boolean
	/**
	 * If `is_limited_redemptions` is `true`, this is the maximum number of redemptions.
	 */
	max_redemptions: number
	/**
	 * An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) formatted date-time string indicating when the discount is valid from. Can be `null` if no start date is specified.
	 */
	starts_at: string | null
	/**
	 * An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) formatted date-time string indicating when the discount expires. Can be `null` if no expiration date is specified.
	 */
	expires_at: string | null
	/**
	 * If the discount is applied to a subscription, this specifies how often the discount should be applied. One of
	 *
	 * - `once` - The discount will be applied to the initial payment only.
	 * - `repeating` - The discount will be applied to a certain number of payments (use in combination with `duration_in_months`.
	 * - `forever` - The discount will apply to all payments.
	 */
	duration: Duration
	/**
	 * If `duration` is `repeating`, this specifies how many months the discount should apply.
	 */
	duration_in_months: number
	/**
	 * The status of the discount. Either `draft` or `published`.
	 */
	status: 'published' | 'draft'
	/**
	 * The formatted status of the discount.
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
type DiscountData = Data<Attributes, Pick<Relationships, 'store' | 'variants' | 'discount-redemptions'>>

export type GetDiscountParams = Pick<Params<(keyof DiscountData['relationships'])[]>, 'include'>
export type ListDiscountsParams = Params<GetDiscountParams['include'], { storeId?: string | number }>
export type NewDiscount = {
	/**
	 * The store id this discount belongs to.
	 */
	storeId: number | string
	/**
	 * If `isLimitedToProducts` is `true`, the variant(s) the discount belongs to (this is not required otherwise).
	 */
	variantIds: Array<number | string>
	/**
	 * The name of the discount.
	 */
	name: string
	/**
	 * The discount code that can be used at checkout. Uppercase letters and numbers are allowed. Must be between 3 and 256 characters.
	 *
	 * @default An 8-character string of uppercase letters and numbers. e.g. `I0NTQZNG`
	 */
	code?: string
	/**
	 * The amount of discount to apply to the order. Either a fixed amount in cents or a percentage depending on the value of `amountType`.
	 *
	 * - `1000` means `$10` when `amountType` is `fixed`.
	 * - `10` means `10%` when `amountType` is `percent`.
	 */
	amount: number
	/**
	 * The type of the amount. Either `percent` or `fixed`.
	 */
	amountType: AmountType
	/**
	 * Set this to true if the discount should only be applied to certain products/variants. See details in the Relationships section below.
	 */
	isLimitedToProducts?: boolean
	/**
	 * Set this to `true` if the discount should only be redeemed a limited number of times. See `maxRedemptions` below.
	 */
	isLimitedRedemptions?: boolean
	/**
	 * If `isLimitedToProducts` is `true`, this is the maximum number of redemptions.
	 */
	maxRedemptions?: number
	/**
	 * An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) formatted date-time string indicating when the discount is valid from. Can omitted or `null` if no start date is specified.
	 */
	startsAt?: string | null
	/**
	 * An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) formatted date-time string indicating when the discount expires. Can omitted or `null` if the discount is perpetual.
	 */
	expiresAt?: string | null
	/**
	 * If the discount is applied to a subscription, this specifies how often the discount should be applied. One of
	 *
	 * - `once` - The discount will be applied to the initial payment only.
	 * - `repeating` - The discount will be applied to a certain number of payments (use in combination with `duration_in_months`.
	 * - `forever` - The discount will apply to all payments.
	 *
	 * Defaults to `once` if omitted.
	 * @default `once`
	 */
	duration?: Duration
	/**
	 * If `duration` is `repeating`, this specifies how many months the discount should apply. Defaults to `1` if omitted.
	 *
	 * Note: for yearly subscription, the value needs to be `years x 12`, so `24` if you want the discount to repeat for the first two yearly payments. We do not recommend repeated discounts for daily or weekly subscriptions.
	 *
	 * @default `1`
	 */
	durationInMonths?: number
	/**
	 * Set this to `true` if the discount should only be applied to test mode orders.
	 */
	testMode?: boolean
}
export type Discount = Omit<LemonSqueezyResponse<DiscountData, unknown, Pick<Links, 'self'>>, 'meta'>
export type ListDiscounts = LemonSqueezyResponse<DiscountData[], Pick<Meta, 'page'>, Pick<Links, 'first' | 'last'>>

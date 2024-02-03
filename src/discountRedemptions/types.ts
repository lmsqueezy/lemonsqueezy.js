import type { Data, LemonSqueezyResponse, Links, Meta, Params, Relationships } from '../types'

type Attributes = {
	/**
	 * The ID of the discount this redemption belongs to.
	 */
	discount_id: number
	/**
	 * The ID of the order this redemption belongs to.
	 */
	order_id: number
	/**
	 * The name of the discount.
	 */
	discount_name: string
	/**
	 * The discount code that was used at checkout.
	 */
	discount_code: string
	/**
	 * The amount of the discount. Either a fixed amount in cents or a percentage depending on the value of `discount_amount_type`.
	 */
	discount_amount: number
	/**
	 * The type of the discount_amount. Either `percent` or `fixed`.
	 */
	discount_amount_type: 'percent' | 'fixed'
	/**
	 * A positive integer in cents representing the amount of the discount that was applied to the order (in the order currency).
	 */
	amount: number
	/**
	 * An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) formatted date-time string indicating when the object was created.
	 */
	created_at: string
	/**
	 * An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) formatted date-time string indicating when the object was last updated.
	 */
	updated_at: string
}
type DiscountRedemptionData = Data<Attributes, Pick<Relationships, 'discount' | 'order'>>

export type GetDiscountRedemptionParams = Pick<Params<(keyof DiscountRedemptionData['relationships'])[]>, 'include'>
export type ListDiscountRedemptionsParams = Params<
	GetDiscountRedemptionParams['include'],
	{ discountId?: number | string; orderId?: number | string }
>
export type DiscountRedemption = Omit<
	LemonSqueezyResponse<DiscountRedemptionData, unknown, Pick<Links, 'self'>>,
	'meta'
>
export type ListDiscountRedemptions = LemonSqueezyResponse<
	DiscountRedemptionData[],
	Pick<Meta, 'page'>,
	Pick<Links, 'first' | 'last'>
>

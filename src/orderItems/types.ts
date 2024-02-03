import type { Data, LemonSqueezyResponse, Links, Meta, Params, Relationships } from '../types'

type Attributes = {
	/**
	 * The ID of the order this order item belongs to.
	 */
	order_id: number
	/**
	 * The ID of the product associated with this order item.
	 */
	product_id: number
	/**
	 * The ID of the variant associated with this order item.
	 */
	variant_id: number
	/**
	 * The ID of the price.
	 *
	 * Note: Not in the documentation, but in the response
	 */
	price_id: number
	/**
	 * The name of the product.
	 */
	product_name: string
	/**
	 * The name of the variant.
	 */
	variant_name: string
	/**
	 * A positive integer in cents representing the price of this order item (in the order currency).
	 *
	 * Note, for “pay what you want” products the price will be whatever the customer entered at checkout.
	 */
	price: number
	/**
	 * A positive integer representing the quantity of this order item.
	 */
	quantity: number
	/**
	 * An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) formatted date-time string indicating when the object was created.
	 */
	created_at: string
	/**
	 * An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) formatted date-time string indicating when the object was last updated.
	 */
	updated_at: string
	/**
	 * A boolean indicating if the order was made in test mode.
	 *
	 * Note: Not in the documentation, but in the response
	 */
	test_mode: boolean
}
type OrderItemData = Data<Attributes, Pick<Relationships, 'order' | 'product' | 'variant'>>

export type GetOrderItemParams = Pick<Params<(keyof OrderItemData['relationships'])[]>, 'include'>
export type ListOrderItemsParams = Params<
	GetOrderItemParams['include'],
	{ orderId?: string | number; productId?: string | number; variantId?: string | number }
>
export type OrderItem = Omit<LemonSqueezyResponse<OrderItemData, unknown, Pick<Links, 'self'>>, 'meta'>
export type ListOrderItems = LemonSqueezyResponse<OrderItemData[], Pick<Meta, 'page'>, Pick<Links, 'first' | 'last'>>

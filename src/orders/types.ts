import type { Data, ISO4217CurrencyCode, LemonSqueezyResponse, Links, Meta, Params, Relationships } from '../types'

type OrderStatus = 'pending' | 'failed' | 'paid' | 'refunded'
type FirstOrderItem = {
	/**
	 * The ID of the order item.
	 */
	id: number
	/**
	 * The ID of the order.
	 */
	order_id: number
	/**
	 * The ID of the product.
	 */
	product_id: number
	/**
	 * The ID of the product variant.
	 */
	variant_id: number
	/**
	 * The ID of the price.
	 *
	 * Note: Not in the documentation, but in the response
	 */
	price_id: number
	/**
	 * A positive integer representing the quantity of this order item.
	 *
	 * Note: Not in the documentation, but in the response
	 */
	quantity: number
	/**
	 * The name of the product.
	 */
	product_name: string
	/**
	 * The name of the product variant.
	 */
	variant_name: string
	/**
	 * A positive integer in cents representing the price of the order item in the order currency.
	 */
	price: number
	/**
	 * An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) formatted date-time string indicating when the order item was created.
	 */
	created_at: string
	/**
	 * An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) formatted date-time string indicating when the order item was last updated.
	 */
	updated_at: string
	/**
	 * A boolean indicating if the order was made in test mode.
	 */
	test_mode: boolean
}
type Attributes = {
	/**
	 * The ID of the store this order belongs to.
	 */
	store_id: number
	/**
	 * The ID of the customer this order belongs to.
	 */
	customer_id: number
	/**
	 * The unique identifier (UUID) for this order.
	 */
	identifier: string
	/**
	 * An integer representing the sequential order number for this store.
	 */
	order_number: number
	/**
	 * The full name of the customer.
	 */
	user_name: string
	/**
	 * The email address of the customer.
	 */
	user_email: string
	/**
	 * The [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code for the order (e.g. `USD`, `GBP`, etc).
	 */
	currency: ISO4217CurrencyCode
	/**
	 * If the order currency is USD, this will always be `1.0`. Otherwise, this is the currency conversion rate used to determine the cost of the order in USD at the time of purchase.
	 */
	currency_rate: string
	/**
	 * A positive integer in cents representing the subtotal of the order in the order currency.
	 */
	subtotal: number
	/**
	 * A positive integer in cents representing the total discount value applied to the order in the order currency.
	 */
	discount_total: number
	/**
	 * A positive integer in cents representing the tax applied to the order in the order currency.
	 */
	tax: number
	/**
	 * A positive integer in cents representing the total cost of the order in the order currency.
	 */
	total: number
	/**
	 * A positive integer in cents representing the subtotal of the order in USD.
	 */
	subtotal_usd: number
	/**
	 * A positive integer in cents representing the total discount value applied to the order in USD.
	 */
	discount_total_usd: number
	/**
	 * A positive integer in cents representing the tax applied to the order in USD.
	 */
	tax_usd: number
	/**
	 * A positive integer in cents representing the total cost of the order in USD.
	 */
	total_usd: number
	/**
	 * The name of the tax rate (e.g. `VAT`, `Sales Tax`, etc) applied to the order. Will be `null` if no tax was applied.
	 */
	tax_name: string | null
	/**
	 * If tax is applied to the order, this will be the rate of tax as a decimal percentage.
	 */
	tax_rate: string
	/**
	 * The status of the order. One of
	 *
	 * - `pending`
	 * - `failed`
	 * - `paid`
	 * - `refunded`
	 */
	status: OrderStatus
	/**
	 * The formatted status of the order.
	 */
	status_formatted: string
	/**
	 * Has the value `true` if the order has been refunded.
	 */
	refunded: boolean
	/**
	 * If the order has been refunded, this will be an [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) formatted date-time string indicating when the order was refunded.
	 */
	refunded_at: Date | null
	/**
	 * A human-readable string representing the subtotal of the order in the order currency (e.g. `$9.99`).
	 */
	subtotal_formatted: string
	/**
	 * A human-readable string representing the total discount value applied to the order in the order currency (e.g. `$9.99`).
	 */
	discount_total_formatted: string
	/**
	 * A human-readable string representing the tax applied to the order in the order currency (e.g. `$9.99)`.
	 */
	tax_formatted: string
	/**
	 * A human-readable string representing the total cost of the order in the order currency (e.g. `$9.99`).
	 */
	total_formatted: string
	/**
	 * An object representing the [first order](https://docs.lemonsqueezy.com/api/order-items) item belonging to this order.
	 *
	 * - `id` - The ID of the order item.
	 * - `order_id` - The ID of the order.
	 * - `product_id` - The ID of the product.
	 * - `variant_id` - The ID of the product variant.
	 * - `product_name` - The name of the product.
	 * - `variant_name` - The name of the product variant.
	 * - `price` - A positive integer in cents representing the price of the order item in the order currency.
	 * - `created_at` - An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) formatted date-time string indicating when the order item was created.
	 * - `updated_at` - An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) formatted date-time string indicating when the order item was last updated.
	 * - `test_mode` - A boolean indicating if the order was made in test mode.
	 */
	first_order_item: FirstOrderItem
	/**
	 * An object of customer-facing URLs for this order. It contains:
	 *
	 * - `receipt` - A pre-signed URL for viewing the order in the customer's [My Orders](https://docs.lemonsqueezy.com/help/online-store/my-orders) page.
	 */
	urls: {
		receipt: string
	}
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
type OrderData = Data<
	Attributes,
	Pick<Relationships, 'store' | 'customer' | 'order-items' | 'subscriptions' | 'license-keys' | 'discount-redemptions'>
>

export type GetOrderParams = Pick<Params<(keyof OrderData['relationships'])[]>, 'include'>
export type ListOrdersParams = Params<GetOrderParams['include'], { storeId?: string | number; userEmail?: string }>
export type Order = Omit<LemonSqueezyResponse<OrderData, unknown, Pick<Links, 'self'>>, 'meta'>
export type ListOrders = LemonSqueezyResponse<OrderData[], Pick<Meta, 'page'>, Pick<Links, 'first' | 'last'>>

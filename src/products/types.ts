import type { Data, LemonSqueezyResponse, Links, Meta, Params, Relationships } from '../types'

type Attributes = {
	/**
	 * The ID of the store this product belongs to.
	 */
	store_id: number
	/**
	 * The name of the product.
	 */
	name: string
	/**
	 * The slug used to identify the product.
	 */
	slug: string
	/**
	 * The description of the product in HTML.
	 */
	description: string
	/**
	 * The status of the product. Either `draft` or `published`.
	 */
	status: 'published' | 'draft'
	/**
	 * The formatted status of the product.
	 */
	status_formatted: string
	/**
	 * A URL to the thumbnail image for this product (if one exists). The image will be 100x100px in size.
	 */
	thumb_url: string
	/**
	 * A URL to the large thumbnail image for this product (if one exists). The image will be 1000x1000px in size.
	 */
	large_thumb_url: string
	/**
	 * A positive integer in cents representing the price of the product.
	 */
	price: number
	/**
	 * A human-readable string representing the price of the product (e.g. `$9.99`).
	 */
	price_formatted: string
	/**
	 * If this product has multiple variants, this will be a positive integer in cents representing the price of the cheapest variant. Otherwise, it will be `null`.
	 */
	from_price: number | null
	/**
	 * If this product has multiple variants, this will be a positive integer in cents representing the price of the most expensive variant. Otherwise, it will be `null`.
	 */
	to_price: number | null
	/**
	 * Has the value `true` if this is a “pay what you want” product where the price can be set by the customer at checkout.
	 */
	pay_what_you_want: boolean
	/**
	 * A URL to purchase this product using the Lemon Squeezy checkout.
	 */
	buy_now_url: string
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
type ProductData = Data<Attributes, Pick<Relationships, 'store' | 'variants'>>

export type GetProductParams = Pick<Params<(keyof ProductData['relationships'])[]>, 'include'>
export type ListProductsParams = Params<GetProductParams['include'], { storeId?: string | number }>
export type Product = Omit<LemonSqueezyResponse<ProductData, unknown, Pick<Links, 'self'>>, 'meta'>
export type ListProducts = LemonSqueezyResponse<ProductData[], Pick<Meta, 'page'>, Pick<Links, 'first' | 'last'>>

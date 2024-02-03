export type Data<A, R = unknown> = {
	/**
	 * The type of the resource (e.g. `products`, `orders`, etc.)
	 */
	type: string
	/**
	 * The id of the resource
	 */
	id: string
	/**
	 * An object representing the resources data
	 */
	attributes: A
	relationships: R
	/**
	 * API Url
	 */
	links: {
		self: string
	}
}

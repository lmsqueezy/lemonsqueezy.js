import type {
	Data,
	ISO3166Alpha2CountryCode,
	ISO4217CurrencyCode,
	LemonSqueezyResponse,
	Links,
	Meta,
	Params,
	Relationships,
} from '../types'

type Attributes = {
	/**
	 * The name of the store.
	 */
	name: string
	/**
	 * The slug used to identify the store.
	 */
	slug: string
	/**
	 * The domain of the store, either in the format `{slug}.lemonsqueezy.com` or a [custom domain](https://docs.lemonsqueezy.com/help/domains/adding-a-custom-domain).
	 */
	domain: string
	/**
	 * The fully-qualified URL for the store (e.g. `https://{slug}.lemonsqueezy.com` or `https://customdomain.com` when a [custom domain](https://docs.lemonsqueezy.com/help/domains/adding-a-custom-domain) is set up).
	 */
	url: string
	/**
	 * The URL for the store avatar.
	 */
	avatar_url: string
	/**
	 * The current billing plan for the store (e.g. `fresh`, `sweet`).
	 */
	plan: string
	/**
	 * The [ISO 3166-1](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) two-letter country code for the store (e.g.`US`, `GB`, etc).
	 */
	country: ISO3166Alpha2CountryCode
	/**
	 * The full country name for the store (e.g. `United States`, `United Kingdom`, etc).
	 */
	country_nicename: string
	/**
	 * The [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code for the store (e.g. `USD`, `GBP`, etc).
	 */
	currency: ISO4217CurrencyCode
	/**
	 * A count of the all-time total sales made by this store.
	 */
	total_sales: number
	/**
	 * A positive integer in cents representing the total all-time revenue of the store in USD.
	 */
	total_revenue: number
	/**
	 * A count of the sales made by this store in the last 30 days.
	 */
	thirty_day_sales: number
	/**
	 * A positive integer in cents representing the total revenue of the store in USD in the last 30 days.
	 */
	thirty_day_revenue: number
	/**
	 * An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) formatted date-time string indicating when the object was created.
	 */
	created_at: string
	/**
	 * An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) formatted date-time string indicating when the object was last updated.
	 */
	updated_at: string
}
type StoreData = Data<
	Attributes,
	Pick<Relationships, 'products' | 'orders' | 'subscriptions' | 'discounts' | 'license-keys' | 'webhooks'>
>

export type Store = Omit<LemonSqueezyResponse<StoreData, unknown, Pick<Links, 'self'>>, 'meta'>
export type ListStores = LemonSqueezyResponse<StoreData[], Pick<Meta, 'page'>, Pick<Links, 'last' | 'first'>>
export type GetStoreParams = Pick<Params<(keyof StoreData['relationships'])[]>, 'include'>
export type ListStoresParams = Omit<Params<GetStoreParams['include']>, 'filter'>

import type { Data, ISO3166Alpha2CountryCode, LemonSqueezyResponse, Links, Meta, Params, Relationships } from '../types'
type MarketingStatus =
	| 'subscribed'
	| 'unsubscribed'
	| 'archived'
	| 'requires_verification'
	| 'invalid_email'
	| 'bounced'
type Attributes = {
	/**
	 * The ID of the store this customer belongs to.
	 */
	store_id: number
	/**
	 * The full name of the customer.
	 */
	name: string
	/**
	 * The email address of the customer.
	 */
	email: string
	/**
	 * The email marketing status of the customer. One of
	 *
	 * - `subscribed` - This customer is subscribed to marketing emails.
	 * - `unsubscribed` - This customer has unsubscribed from marketing emails.
	 * - `archived` - This customer has been archived and will no longer receive marketing emails.
	 * - `requires_verification` - The customers email address need to be verified (happens automatically).
	 * - `invalid_email` - The customers email address has failed validation.
	 * - `bounced` - The customers email has hard bounced.
	 */
	status: MarketingStatus
	/**
	 * The city of the customer.
	 */
	city: string | null
	/**
	 * The region of the customer.
	 */
	region: string | null
	/**
	 * The country of the customer.
	 */
	country: ISO3166Alpha2CountryCode | null
	/**
	 * A positive integer in cents representing the total revenue from the customer (USD).
	 */
	total_revenue_currency: number
	/**
	 * A positive integer in cents representing the monthly recurring revenue from the customer (USD).
	 */
	mrr: number
	/**
	 * The formatted status of the customer.
	 */
	status_formatted: string
	/**
	 * The formatted country of the customer.
	 */
	country_formatted: string | null
	/**
	 * A human-readable string representing the total revenue from the customer (e.g. `$9.99`).
	 */
	total_revenue_currency_formatted: string
	/**
	 * A human-readable string representing the monthly recurring revenue from the customer (e.g. `$9.99`).
	 */
	mrr_formatted: string
	/**
	 * An object of customer-facing URLs. It contains:
	 *
	 * - `customer_portal` - A pre-signed URL to the [Customer Portal](https://docs.lemonsqueezy.com/help/online-store/customer-portal), which allows customers to fully manage their subscriptions and billing information from within your application. The URL is valid for 24 hours from time of request. Will be `null` if the customer has not bought a subscription in your store.
	 */
	urls: {
		customer_portal: string | null
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
type CustomerData = Data<Attributes, Pick<Relationships, 'store' | 'orders' | 'subscriptions' | 'license-keys'>>

export type GetCustomerParams = Pick<Params<(keyof CustomerData['relationships'])[]>, 'include'>
export type ListCustomersParams = Params<GetCustomerParams['include'], { storeId?: string | number; email?: string }>
export type NewCustomer = Pick<Attributes, 'name' | 'email'> & Partial<Pick<Attributes, 'city' | 'country' | 'region'>>
export type UpdateCustomer = Partial<NewCustomer & { status: 'archived' }>
export type Customer = Omit<LemonSqueezyResponse<CustomerData, unknown, Pick<Links, 'self'>>, 'meta'>
export type ListCustomers = LemonSqueezyResponse<CustomerData[], Pick<Meta, 'page'>, Pick<Links, 'last' | 'first'>>

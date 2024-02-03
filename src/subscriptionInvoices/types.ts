import type { Data, ISO4217CurrencyCode, LemonSqueezyResponse, Links, Meta, Params, Relationships } from '../types'

type InvoiceBillingReason = 'initial' | 'renewal' | 'renewal'
type InvoiceCardBrand = 'visa' | 'mastercard' | 'amex' | 'discover' | 'jcb' | 'diners' | 'unionpay'
type InvoiceStatus = 'pending' | 'paid' | 'void' | 'refunded'
type Attributes = {
	/**
	 * The ID of the [Store](https://docs.lemonsqueezy.com/api/stores#the-store-object) this subscription invoice belongs to.
	 */
	store_id: number
	/**
	 * The ID of the [Subscription](https://docs.lemonsqueezy.com/api/subscriptions#the-subscription-object) associated with this subscription invoice.
	 */
	subscription_id: number
	/**
	 * The ID of the customer this subscription invoice belongs to.
	 */
	customer_id: number
	/**
	 * The full name of the customer.
	 */
	user_name: string
	/**
	 * The email address of the customer.
	 */
	user_email: string
	/**
	 * The reason for the invoice being generated.
	 *
	 * - `initial` - The initial invoice generated when the subscription is created.
	 * - `renewal` - A renewal invoice generated when the subscription is renewed.
	 * - `renewal` - An invoice generated when the subscription is updated.
	 */
	billing_reason: InvoiceBillingReason
	/**
	 * Lowercase brand of the card used to pay for the invoice. One of
	 *
	 * - `visa`
	 * - `mastercard`
	 * - `amex`
	 * - `discover`
	 * - `jcb`
	 * - `diners`
	 * - `unionpay`
	 *
	 * Will be empty for non-card payments.
	 */
	card_brand: InvoiceCardBrand | null
	/**
	 * The last 4 digits of the card used to pay for the invoice. Will be empty for non-card payments.
	 */
	card_last_four: string | null
	/**
	 * The [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code for the invoice (e.g. `USD`, `GBP`, etc).
	 */
	currency: ISO4217CurrencyCode
	/**
	 * If the invoice currency is USD, this will always be `1.0`. Otherwise, this is the currency conversion rate used to determine the cost of the invoice in USD at the time of payment.
	 */
	currency_rate: string
	/**
	 * The status of the invoice. One of
	 *
	 * - `pending` - The invoice is waiting for payment.
	 * - `paid` - The invoice has been paid.
	 * - `void` - The invoice was cancelled or cannot be paid.
	 * - `refunded` - The invoice was paid but has since been fully refunded.
	 */
	status: InvoiceStatus
	/**
	 * The formatted status of the invoice.
	 */
	status_formatted: string
	/**
	 * A boolean value indicating whether the invoice has been refunded.
	 */
	refunded: boolean
	/**
	 * If the invoice has been refunded, this will be an [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) formatted date-time string indicating when the invoice was refunded. Otherwise, it will be `null`.
	 */
	refunded_at: string | null
	/**
	 * A positive integer in cents representing the subtotal of the invoice in the invoice currency.
	 */
	subtotal: number
	/**
	 * A positive integer in cents representing the total discount value applied to the invoice in the invoice currency.
	 */
	discount_total: number
	/**
	 * A positive integer in cents representing the tax applied to the invoice in the invoice currency.
	 */
	tax: number
	/**
	 * A positive integer in cents representing the total cost of the invoice in the invoice currency.
	 */
	total: number
	/**
	 * A positive integer in cents representing the subtotal of the invoice in USD.
	 */
	subtotal_usd: number
	/**
	 * A positive integer in cents representing the total discount value applied to the invoice in USD.
	 */
	discount_total_usd: number
	/**
	 * A positive integer in cents representing the tax applied to the invoice in USD.
	 */
	tax_usd: number
	/**
	 * A positive integer in cents representing the total cost of the invoice in USD.
	 */
	total_usd: number
	/**
	 * A human-readable string representing the subtotal of the invoice in the invoice currency (e.g. `$9.99`).
	 */
	subtotal_formatted: string
	/**
	 * A human-readable string representing the total discount value applied to the invoice in the invoice currency (e.g. `$9.99`).
	 */
	discount_total_formatted: string
	/**
	 * A human-readable string representing the tax applied to the invoice in the invoice currency (e.g. `$9.99`).
	 */
	tax_formatted: string
	/**
	 * A human-readable string representing the total cost of the invoice in the invoice currency (e.g. `$9.99`).
	 */
	total_formatted: string
	/**
	 * An object of customer-facing URLs for the invoice. It contains:
	 *
	 * - `invoice_url` - The unique URL to download a PDF of the invoice. Note: for security reasons, download URLs are signed (but do not expire). Will be `null` if status is `pending`.
	 */
	urls: {
		invoice_url: string | null
	}
	/**
	 * An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) formatted date-time string indicating when the invoice was created.
	 */
	created_at: string
	/**
	 * An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) formatted date-time string indicating when the invoice was last updated.
	 */
	updated_at: string
	/**
	 * A boolean indicating if the object was created within test mode.
	 */
	test_mode: boolean
}
type SubscriptionInvoiceData = Data<Attributes, Pick<Relationships, 'store' | 'subscription' | 'customer'>>

export type GetSubscriptionInvoiceParams = Pick<Params<(keyof SubscriptionInvoiceData['relationships'])[]>, 'include'>
export type ListSubscriptionInvoicesParams = Params<
	GetSubscriptionInvoiceParams['include'],
	{
		/**
		 * Only return subscription invoices belonging to the store with this ID.
		 */
		storeId?: string | number
		/**
		 * Only return subscription invoices with this status.
		 */
		status?: InvoiceStatus
		/**
		 * Only return subscription invoices that are `refunded` (the value should be `true` or `false`).
		 */
		refunded?: boolean
		/**
		 * Only return subscription invoices belonging to a subscription with this ID.
		 */
		subscriptionId?: string | number
	}
>
export type SubscriptionInvoice = Omit<
	LemonSqueezyResponse<SubscriptionInvoiceData, unknown, Pick<Links, 'self'>>,
	'meta'
>
export type ListSubscriptionInvoices = LemonSqueezyResponse<
	SubscriptionInvoiceData[],
	Pick<Meta, 'page'>,
	Pick<Links, 'first' | 'last'>
>

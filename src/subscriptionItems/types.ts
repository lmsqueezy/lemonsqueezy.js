import type { Data, LemonSqueezyResponse, Links, Meta, Params, Relationships } from '../types'

type Attributes = {
	/**
	 * The ID of the [Subscription](https://docs.lemonsqueezy.com/api/subscriptions#the-subscription-object) associated with this subscription item.
	 */
	subscription_id: number
	/**
	 * The ID of the [Price](https://docs.lemonsqueezy.com/api/prices#the-price-object) associated with this subscription item.
	 */
	price_id: number
	/**
	 * A positive integer representing the unit quantity of this subscription item.
	 *
	 * Will be  if the related subscription product/variant has usage-based billing enabled.
	 */
	quantity: number
	/**
	 * A boolean value indicating whether the related subscription product/variant has usage-based billing enabled.
	 */
	is_usage_based: boolean
	/**
	 * An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) formatted date-time string indicating when the subscription item was created.
	 */
	created_at: string
	/**
	 * An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) formatted date-time string indicating when the subscription item was last updated.
	 */
	updated_at: string
}
type SubscriptionItemData = Data<Attributes, Pick<Relationships, 'subscription' | 'price' | 'usage-records'>>

export type GetSubscriptionItemParams = Pick<Params<(keyof SubscriptionItemData['relationships'])[]>, 'include'>
export type ListSubscriptionItemsParams = Params<
	GetSubscriptionItemParams['include'],
	{ subscriptionId?: number | string; priceId?: number | string }
>
export type SubscriptionItem = Omit<LemonSqueezyResponse<SubscriptionItemData, unknown, Pick<Links, 'self'>>, 'meta'>
export type SubscriptionItemCurrentUsage = Omit<
	LemonSqueezyResponse<
		unknown,
		Pick<Meta, 'period_start' | 'period_end' | 'quantity' | 'interval_unit' | 'interval_quantity'>
	>,
	'data' | 'links'
>
export type ListSubscriptionItems = LemonSqueezyResponse<
	SubscriptionItemData[],
	Pick<Meta, 'page'>,
	Pick<Links, 'first' | 'last'>
>

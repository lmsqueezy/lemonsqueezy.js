import type { Data, LemonSqueezyResponse, Links, Meta, Params, Relationships } from '../types'

type UsageRecordAction = 'increment' | 'set'
type Attributes = {
	/**
	 * The ID of the subscription item this usage record belongs to.
	 */
	subscription_item_id: number
	/**
	 * A positive integer representing the usage to be reported.
	 */
	quantity: number
	/**
	 * The type of record. One of
	 *
	 * - `increment` - The provided quantity was added to existing records for the current billing period.
	 * - `set` - The provided quantity was set as the total usage for the current billing period.
	 */
	action: UsageRecordAction
	/**
	 * An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) formatted date-time string indicating when the object was created.
	 */
	created_at: string
	/**
	 * An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) formatted date-time string indicating when the object was last updated.
	 */
	updated_at: string
}
type UsageRecordData = Data<Attributes, Pick<Relationships, 'subscription-item'>>

export type GetUsageRecordParams = Pick<Params<(keyof UsageRecordData['relationships'])[]>, 'include'>
export type ListUsageRecordsParams = Params<GetUsageRecordParams['include'], { subscriptionItemId?: number | string }>
export type NewUsageRecord = {
	/**
	 * A positive integer representing the usage to be reported.
	 */
	quantity: number
	/**
	 * The type of record. One of
	 *
	 * - `increment` - Add the provided quantity to existing records for the current billing period.
	 * - `set` - Set the quantity for the current billing period to the provided quantity.
	 *
	 * Defaults to `increment` if omitted.
	 *
	 * Note: increment should only be used alongside the "Sum of usage during period" aggregation setting. set should be only used alongside "Most recent usage during a period" and "Most recent usage" aggregation settings. [Read more about aggregation settings](https://docs.lemonsqueezy.com/help/products/usage-based-billing#usage-aggregation-setting).
	 *
	 * @default increment
	 */
	action?: UsageRecordAction
	/**
	 * The subscription item id this usage record belongs to.
	 */
	subscriptionItemId: number | string
}
export type UsageRecord = Omit<LemonSqueezyResponse<UsageRecordData, unknown, Pick<Links, 'self'>>, 'meta'>
export type ListUsageRecords = LemonSqueezyResponse<
	UsageRecordData[],
	Pick<Meta, 'page'>,
	Pick<Links, 'first' | 'last'>
>

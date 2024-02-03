import { $fetch, convertIncludeToQueryString, convertListParamsToQueryString, requiredCheck } from '../internal'
import type {
	GetSubscriptionItemParams,
	ListSubscriptionItems,
	ListSubscriptionItemsParams,
	SubscriptionItem,
	SubscriptionItemCurrentUsage,
} from './types'

/**
 * Retrieve a subscription item.
 *
 * @param subscriptionItemId The given subscription item id.
 * @param [params] (Optional) Additional parameters.
 * @param [params.include] (Optional) Related resources.
 * @returns A subscription item object.
 */
export function getSubscriptionItem(subscriptionItemId: number | string, params: GetSubscriptionItemParams = {}) {
	return $fetch<SubscriptionItem>({
		path: `/v1/subscription-items/${subscriptionItemId}${convertIncludeToQueryString(params.include)}`,
	})
}

/**
 * Retrieve a subscription item's current usage.
 *
 * Note: this endpoint is only for subscriptions with usage-based billing enabled. It will return a `404 Not Found` response if the related subscription product/variant does not have usage-based billing enabled.
 *
 * @param subscriptionItemId The given subscription item id.
 * @returns A meta object containing usage information.
 */
export function getSubscriptionItemCurrentUsage(subscriptionItemId: number | string) {
	requiredCheck({ subscriptionItemId })
	return $fetch<SubscriptionItemCurrentUsage>({
		path: `/v1/subscription-items/${subscriptionItemId}/current-usage`,
	})
}

/**
 * List all subscription items.
 * @param [params] (Optional) Additional parameters.
 * @param [params.filter] (Optional) Filter parameters.
 * @param [params.filter.subscriptionId] (Optional) Only return subscription items belonging to a subscription with this ID.
 * @param [params.filter.priceId] (Optional) Only return subscription items belonging to a price with this ID.
 * @param [params.page] (Optional) Custom paginated queries.
 * @param [params.page.number] (Optional) The parameter determine which page to retrieve.
 * @param [params.page.size] (Optional) The parameter to determine how many results to return per page.
 * @param [params.include] (Optional) Related resources.
 * @returns A paginated list of subscription item objects ordered by `created_at` (descending).
 */
export function listSubscriptionItems(params: ListSubscriptionItemsParams = {}) {
	return $fetch<ListSubscriptionItems>({
		path: `/v1/subscription-items${convertListParamsToQueryString(params)}`,
	})
}

/**
 * Update a subscription item.
 *
 * Note: this endpoint is only used with quantity-based billing. If the related subscription's product/variant has usage-based billing enabled, this endpoint will return a `422 Unprocessable Entity` response.
 *
 * @param subscriptionItemId The given subscription item id.
 * @param quantity The unit quantity of the subscription.
 * @returns A subscription item object.
 */
export function updateSubscriptionItem(subscriptionItemId: string | number, quantity: number) {
	requiredCheck({ subscriptionItemId })
	return $fetch<SubscriptionItem>({
		path: `/v1/subscription-items/${subscriptionItemId}`,
		method: 'PATCH',
		body: {
			data: {
				type: 'subscription-items',
				id: subscriptionItemId.toString(),
				attributes: {
					quantity,
				},
			},
		},
	})
}

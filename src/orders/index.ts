import { $fetch, convertIncludeToQueryString, convertListParamsToQueryString, requiredCheck } from '../internal'
import type { GetOrderParams, ListOrders, ListOrdersParams, Order } from './types'

/**
 * Retrieve an order.
 *
 * @param orderId The given order id.
 * @param [params] (Optional) Additional parameters.
 * @param [params.include] (Optional) Related resources.
 * @returns An order object.
 */
export function getOrder(orderId: number | string, params: GetOrderParams = {}) {
	requiredCheck({ orderId })
	return $fetch<Order>({
		path: `/v1/orders/${orderId}${convertIncludeToQueryString(params.include)}`,
	})
}

/**
 * List all orders.
 *
 * @param [params] (Optional) Additional parameters.
 * @param [params.filter] (Optional) Filter parameters.
 * @param [params.filter.storeId] (Optional) Only return orders belonging to the store with this ID.
 * @param [params.filter.userEmail] (Optional) Only return orders where the `user_email` field is equal to this email address.
 * @param [params.page] (Optional) Custom paginated queries.
 * @param [params.page.number] (Optional) The parameter determine which page to retrieve.
 * @param [params.page.size] (Optional) The parameter to determine how many results to return per page.
 * @param [params.include] (Optional) Related resources.
 * @returns A paginated list of order objects ordered by `created_at` (descending).
 */
export function listOrders(params: ListOrdersParams = {}) {
	return $fetch<ListOrders>({
		path: `/v1/orders${convertListParamsToQueryString(params)}`,
	})
}

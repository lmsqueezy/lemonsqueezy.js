import { $fetch, convertIncludeToQueryString, convertListParamsToQueryString, requiredCheck } from '../internal'
import type { GetOrderItemParams, ListOrderItems, ListOrderItemsParams, OrderItem } from './types'

/**
 * Retrieve an order item.
 *
 * @param orderItemId The given order item id.
 * @param [params] (Optional) Additional parameters.
 * @param [params.include] (Optional) Related resources.
 * @returns An order item object.
 */
export function getOrderItem(orderItemId: number | string, params: GetOrderItemParams = {}) {
	requiredCheck({ orderItemId })
	return $fetch<OrderItem>({
		path: `/v1/order-items/${orderItemId}${convertIncludeToQueryString(params.include)}`,
	})
}

/**
 * List all order items.
 *
 * @param [params] (Optional) Additional parameters.
 * @param [params.filter] (Optional) Filter parameters.
 * @param [params.filter.orderId] (Optional) Only return order items belonging to the order with this ID.
 * @param [params.filter.productId] (Optional) Only return order items belonging to the product with this ID.
 * @param [params.filter.variantId] (Optional) Only return order items belonging to the variant with this ID.
 * @param [params.page] (Optional) Custom paginated queries.
 * @param [params.page.number] (Optional) The parameter determine which page to retrieve.
 * @param [params.page.size] (Optional) The parameter to determine how many results to return per page.
 * @param [params.include] (Optional) Related resources.
 * @returns A paginated list of order item objects ordered by `id`.
 */
export function listOrderItems(params: ListOrderItemsParams = {}) {
	return $fetch<ListOrderItems>({
		path: `/v1/order-items${convertListParamsToQueryString(params)}`,
	})
}

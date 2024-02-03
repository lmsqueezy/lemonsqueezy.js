import { $fetch, convertIncludeToQueryString, convertListParamsToQueryString, requiredCheck } from '../internal'
import type { GetPriceParams, ListPrices, ListPricesParams, Price } from './types'

/**
 * Retrieve a price.
 *
 * @param priceId The given price id.
 * @param [params] (Optional) Additional parameters.
 * @param [params.include] (Optional) Related resources.
 * @returns A price object.
 */
export function getPrice(priceId: number | string, params: GetPriceParams = {}) {
	requiredCheck({ priceId })
	return $fetch<Price>({
		path: `/v1/prices/${priceId}${convertIncludeToQueryString(params.include)}`,
	})
}

/**
 * List all prices.
 *
 * @param [params] (Optional) Additional parameters.
 * @param [params.filter] (Optional) Filter parameters.
 * @param [params.filter.variantId] Only return prices belonging to the variant with this ID.
 * @param [params.page] (Optional) Custom paginated queries.
 * @param [params.page.number] (Optional) The parameter determine which page to retrieve.
 * @param [params.page.size] (Optional) The parameter to determine how many results to return per page.
 * @param [params.include] (Optional) Related resources.
 * @returns A paginated list of price objects ordered by `created_at` (descending).
 */
export function listPrices(params: ListPricesParams = {}) {
	return $fetch<ListPrices>({
		path: `/v1/prices${convertListParamsToQueryString(params)}`,
	})
}

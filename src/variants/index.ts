import { $fetch, convertIncludeToQueryString, convertListParamsToQueryString, requiredCheck } from '../internal'
import type { GetVariantParams, ListVariants, ListVariantsParams, Variant } from './types'

/**
 * Retrieve a variant.
 *
 * @param variantId The given variant id.
 * @param [params] (Optional) Additional parameters.
 * @param [params.include] (Optional) Related resources.
 * @returns A variant object.
 */
export function getVariant(variantId: number | string, params: GetVariantParams = {}) {
	requiredCheck({ variantId })
	return $fetch<Variant>({
		path: `/v1/variants/${variantId}${convertIncludeToQueryString(params.include)}`,
	})
}

/**
 * List all variants
 *
 * @param [params] (Optional) Additional parameters.
 * @param [params.filter] (Optional) Filter parameters.
 * @param [params.filter.productId] (Optional) Only return variants belonging to the product with this ID.
 * @param [params.filter.status] (Optional) Only return variants with this status.
 * @param [params.page] (Optional) Custom paginated queries.
 * @param [params.page.number] (Optional) The parameter determine which page to retrieve.
 * @param [params.page.size] (Optional) The parameter to determine how many results to return per page.
 * @param [params.include] (Optional) Related resources.
 * @returns A paginated list of variant objects ordered by `sort`.
 */
export function listVariants(params: ListVariantsParams = {}) {
	return $fetch<ListVariants>({
		path: `/v1/variants${convertListParamsToQueryString(params)}`,
	})
}

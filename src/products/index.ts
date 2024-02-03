import { $fetch, convertIncludeToQueryString, convertListParamsToQueryString, requiredCheck } from '../internal'
import type { GetProductParams, ListProducts, ListProductsParams, Product } from './types'

/**
 * Retrieve a product.
 *
 * @param productId The given product id.
 * @param [params] (Optional) Additional parameters.
 * @param [params.include] (Optional) Related resources.
 * @returns A product object.
 */
export function getProduct(productId: number | string, params: GetProductParams = {}) {
	requiredCheck({ productId })
	return $fetch<Product>({
		path: `/v1/products/${productId}${convertIncludeToQueryString(params.include)}`,
	})
}

/**
 * List all products.
 *
 * @param [params] (Optional) Additional parameters.
 * @param [params.filter] (Optional) Filter parameters.
 * @param [params.filter.storeId] (Optional) Only return products belonging to the store with this ID.
 * @param [params.page] (Optional) Custom paginated queries.
 * @param [params.page.number] (Optional) The parameter determine which page to retrieve.
 * @param [params.page.size] (Optional) The parameter to determine how many results to return per page.
 * @param [params.include] (Optional) Related resources.
 * @returns A paginated list of product objects ordered by `name`.
 */
export function listProducts(params: ListProductsParams = {}) {
	return $fetch<ListProducts>({
		path: `/v1/products${convertListParamsToQueryString(params)}`,
	})
}

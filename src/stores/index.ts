import { $fetch, convertIncludeToQueryString, convertListParamsToQueryString, requiredCheck } from '../internal'
import type { GetStoreParams, ListStores, ListStoresParams, Store } from './types'

/**
 * Retrieve a store.
 *
 * @param storeId (Required) The given store id.
 * @param [params] (Optional) Additional parameters.
 * @param [params.include] (Optional) Related resources.
 * @returns A store object.
 */
export function getStore(storeId: number | string, params: GetStoreParams = {}) {
	requiredCheck({ storeId })
	return $fetch<Store>({ path: `/v1/stores/${storeId}${convertIncludeToQueryString(params.include)}` })
}

/**
 * List all stores.
 *
 * @param [params] (Optional) Additional parameters.
 * @param [params.page] (Optional) Custom paginated queries.
 * @param [params.page.number] (Optional) The parameter determine which page to retrieve.
 * @param [params.page.size] (Optional) The parameter to determine how many results to return per page.
 * @param [params.include] (Optional) Related resources.
 * @returns A paginated list of `store` objects ordered by name.
 */
export function listStores(params: ListStoresParams = {}) {
	return $fetch<ListStores>({ path: `/v1/stores${convertListParamsToQueryString(params)}` })
}

import {
	$fetch,
	convertIncludeToQueryString,
	convertKeys,
	convertListParamsToQueryString,
	requiredCheck,
} from '../internal'
import type { Checkout, GetCheckoutParams, ListCheckouts, ListCheckoutsParams, NewCheckout } from './types'

/**
 * Create a checkout.
 *
 * @param storeId (Required) The given store id.
 * @param variantId (Required) The given variant id.
 * @param [checkout] (Optional) A new checkout info.
 * @returns A checkout object.
 */
export function createCheckout(storeId: number | string, variantId: number | string, checkout: NewCheckout = {}) {
	requiredCheck({ storeId, variantId })

	const { customPrice, productOptions, checkoutOptions, checkoutData, expiresAt, preview, testMode } = checkout
	const relationships = {
		store: {
			data: {
				type: 'stores',
				id: storeId.toString(),
			},
		},
		variant: {
			data: {
				type: 'variants',
				id: variantId.toString(),
			},
		},
	}
	const attributes = {
		customPrice,
		expiresAt,
		preview,
		testMode,
		productOptions,
		checkoutOptions,
		checkoutData: {
			...checkoutData,
			variantQuantities: checkoutData?.variantQuantities?.map((item) => convertKeys(item)),
		},
	}

	return $fetch<Checkout>({
		path: '/v1/checkouts',
		method: 'POST',
		body: {
			data: {
				type: 'checkouts',
				attributes: convertKeys(attributes),
				relationships,
			},
		},
	})
}

/**
 * Retrieve a checkout.
 *
 * @param checkoutId (Required) The checkout id.
 * @param [params] (Optional) Additional parameters.
 * @param [params.include] (Optional) Related resources.
 * @returns A checkout object.
 */
export function getCheckout(checkoutId: number | string, params: GetCheckoutParams = {}) {
	requiredCheck({ checkoutId })
	return $fetch<Checkout>({
		path: `/v1/checkouts/${checkoutId}${convertIncludeToQueryString(params.include)}`,
	})
}

/**
 * List all checkouts.
 *
 * @param [params] (Optional) Additional parameters.
 * @param [params.filter] (Optional) Filter parameters.
 * @param [params.filter.storeId] (Optional) Only return products belonging to the store with this ID.
 * @param [params.filter.variantId] (Optional) Only return products belonging to the variant with this ID.
 * @param [params.page] (Optional) Custom paginated queries.
 * @param [params.page.number] (Optional) The parameter determine which page to retrieve.
 * @param [params.page.size] (Optional) The parameter to determine how many results to return per page.
 * @param [params.include] (Optional) Related resources.
 * @returns A paginated list of checkout objects ordered by `created_at` (descending).
 */
export function listCheckouts(params: ListCheckoutsParams = {}) {
	return $fetch<ListCheckouts>({
		path: `/v1/checkouts${convertListParamsToQueryString(params)}`,
	})
}

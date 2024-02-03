import {
	$fetch,
	convertIncludeToQueryString,
	convertKeys,
	convertListParamsToQueryString,
	generateDiscount,
	requiredCheck,
} from '../internal'
import type { Discount, GetDiscountParams, ListDiscounts, ListDiscountsParams, NewDiscount } from './types'

/**
 * Create a discount.
 *
 * @param discount New discount info.
 * @returns A discount object.
 */
export function createDiscount(discount: NewDiscount) {
	const {
		storeId,
		variantIds,
		name,
		amount,
		amountType,
		code = generateDiscount(),
		isLimitedToProducts = false,
		isLimitedRedemptions = false,
		maxRedemptions = 0,
		startsAt = null,
		expiresAt = null,
		duration = 'once',
		durationInMonths = 1,
		testMode,
	} = discount

	const attributes = convertKeys({
		name,
		amount,
		amountType,
		code,
		isLimitedRedemptions,
		isLimitedToProducts,
		maxRedemptions,
		startsAt,
		expiresAt,
		duration,
		durationInMonths,
		testMode,
	})

	const relationships = {
		store: {
			data: {
				type: 'stores',
				id: storeId.toString(),
			},
		},
		variants: {
			data: variantIds.map((id) => ({
				type: 'variants',
				id: id.toString(),
			})),
		},
	}

	return $fetch<Discount>({
		path: '/v1/discounts',
		method: 'POST',
		body: {
			data: {
				type: 'discounts',
				attributes,
				relationships,
			},
		},
	})
}

/**
 * List all discounts.
 *
 * @param [params] (Optional) Additional parameters.
 * @param [params.filter] (Optional) Filter parameters.
 * @param [params.filter.storeId] (Optional) Only return discounts belonging to the store with this ID.
 * @param [params.page] (Optional) Custom paginated queries.
 * @param [params.page.number] (Optional) The parameter determine which page to retrieve.
 * @param [params.page.size] (Optional) The parameter to determine how many results to return per page.
 * @param [params.include] (Optional) Related resources.
 * @returns A paginated list of discount objects ordered by `created_at`.
 */
export function listDiscounts(params: ListDiscountsParams = {}) {
	return $fetch<ListDiscounts>({
		path: `/v1/discounts${convertListParamsToQueryString(params)}`,
	})
}

/**
 * Retrieve a discount.
 *
 * @param discountId The given discount id.
 * @param [params] (Optional) Additional parameters.
 * @param [params.include] (Optional) Related resources.
 * @returns A discount object.
 */
export function getDiscount(discountId: number | string, params: GetDiscountParams = {}) {
	requiredCheck({ discountId })
	return $fetch<Discount>({
		path: `/v1/discounts/${discountId}${convertIncludeToQueryString(params.include)}`,
	})
}

/**
 * Delete a discount.
 *
 * @param discountId The given discount id.
 * @returns A `204 No Content` response on success.
 */
export function deleteDiscount(discountId: string | number) {
	requiredCheck({ discountId })
	return $fetch<null>({
		path: `/v1/discounts/${discountId}`,
		method: 'DELETE',
	})
}

import type { Params } from '../../types'
export * from './kv'
export const CONFIG_KEY = '__config__'
export const API_BASE_URL = 'https://api.lemonsqueezy.com'

/**
 * Checking if a `value` is an object type.
 *
 * @param value Value to be checked.
 * @returns Whether it is an object type.
 */
export function isObject(value: unknown): value is Record<string, unknown> {
	return Object.prototype.toString.call(value) === '[object Object]'
}

/**
 * Convert camel naming to underscore naming.
 *
 * @param key A string key.
 * @returns Underscore naming.
 */
export function camelToUnderscore(key: string) {
	return key.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`)
}

/**
 * Recursively converts an object's key to an underscore naming and exclude the specified values.
 *
 * @param obj An object.
 * @param excludedValue Value to be excluded. The default is `undefined`.
 * @returns A converted object.
 */
export function convertKeys(obj: Record<string, unknown>, excludedValue: unknown = undefined) {
	const newObj: Record<string, unknown> = {}

	for (const key in obj) {
		if (obj[key] === excludedValue) continue
		newObj[camelToUnderscore(key)] = isObject(obj[key])
			? convertKeys(obj[key] as Record<string, unknown>, excludedValue)
			: obj[key]
	}

	return newObj
}

/**
 * Convert `include` array to query string.
 *
 * @param include Related resources `include` array.
 * @returns A query string containing `include`.
 */
export function convertIncludeToQueryString(include: string[] | undefined) {
	if (!include || !Array.isArray(include) || !include.length) return ''
	return `?include=${include.join(',')}`
}

/**
 * Convert list parameters to query string.
 *
 * @param params List parameters.
 * @returns A query string containing `filter`, `include` and `page`.
 */
export function convertListParamsToQueryString(params: Params) {
	const { filter = {}, page = {}, include = [] } = params
	const convertedQuery = convertKeys({ filter, page, include: include.join(',') })
	const searchParams = {} as Record<string, string>

	for (const key in convertedQuery) {
		const params = convertedQuery[key]

		if (isObject(params)) {
			for (const iKey in params) {
				searchParams[`${key}[${iKey}]`] = `${params[iKey]}`
			}
		} else {
			searchParams[`${key}`] = `${convertedQuery[key]}`
		}
	}

	const queryString = new URLSearchParams(searchParams).toString()

	return queryString ? `?${queryString}` : ''
}

/**
 * Generate a discount code.
 *
 * @returns An 8-character string of uppercase letters and numbers.
 */
export function generateDiscount() {
	return btoa(Date.now().toString()).slice(-10, -2).toUpperCase()
}

/**
 * Checking required parameters.
 *
 * @param checkedObject The checked object value
 */
export function requiredCheck(checkedObject: Record<string, unknown>) {
	for (const key in checkedObject) {
		if (!checkedObject[key]) {
			throw Error(`Please provide the required parameter: ${key}.`)
		}
	}
}

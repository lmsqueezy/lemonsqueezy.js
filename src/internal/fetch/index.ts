import { API_BASE_URL, CONFIG_KEY, getKV } from '../utils'
import type { FetchOptions, FetchResponse } from './types'

/**
 * Internal customization of fetch.
 *
 * @param {FetchOptions} options Fetch options.
 * @param {boolean} [needApiKey] (Optional) Whether `apiKey` is required. Default `true`.
 *
 * @returns Fetch response. Includes `statusCode`, `error` and `data`.
 */
export async function $fetch<T>(options: FetchOptions, needApiKey = true) {
	const response: FetchResponse<T> = {
		statusCode: null,
		data: null,
		error: null,
	}
	const { apiKey, onError } = getKV(CONFIG_KEY) || {}

	try {
		if (needApiKey && !apiKey) {
			response.error = Error(
				'Please provide your Lemon Squeezy API key. Create a new API key: https://app.lemonsqueezy.com/settings/api',
				{ cause: 'Missing API key' },
			)
			onError?.(response.error)
			return response
		}

		const { path, method = 'GET', query, body } = options
		const _options: FetchRequestInit = {
			method,
		}

		// url
		const url = new URL(`${API_BASE_URL}${path}`)
		for (const key in query) {
			url.searchParams.append(key, query[key])
		}

		// headers
		_options.headers = new Headers()
		_options.headers.set('Accept', 'application/vnd.api+json')
		_options.headers.set('Content-Type', 'application/vnd.api+json')
		if (needApiKey) _options.headers.set('Authorization', `Bearer ${apiKey}`)

		// If payload method, serialize body
		if (['PATCH', 'POST'].includes(method)) {
			_options.body = body ? JSON.stringify(body) : null
		}

		const fetchResponse = await fetch(url.href, _options)
		const data = (await fetchResponse.json()) as { error?: any; errors?: any }
		const fetchOk = fetchResponse.ok

		Object.assign(response, {
			statusCode: fetchResponse.status,
			// The license api returns data in the event of an error
			data: fetchOk ? data : data.error ? data : null,
			error: fetchOk ? null : Error(fetchResponse.statusText, { cause: data.errors || data.error }),
		})
	} catch (error) {
		response.error = error as Error
	}

	response.error && onError?.(response.error)
	return response
}

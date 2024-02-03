type ApiVersion = 'v1'

export type FetchResponse<T> = {
	statusCode: number | null
	data: T | null
	error: Error | null
}

export type FetchOptions = {
	/**
	 * The path to the API endpoint.
	 */
	path: `/${ApiVersion}/${string}`
	/**
	 * The HTTP method to use.
	 * @default "GET"
	 */
	method?: 'GET' | 'POST' | 'PATCH' | 'DELETE'
	/**
	 * Query parameters.
	 */
	query?: Record<string, any>
	/**
	 * Request body.
	 */
	body?: Record<string, any>
}

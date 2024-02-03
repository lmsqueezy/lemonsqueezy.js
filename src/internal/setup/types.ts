export type Config = {
	/**
	 * `Lemon Squeezy` API Key
	 */
	apiKey?: string
	/**
	 * Fires after a fetch response error
	 *
	 * @param error Error
	 * @returns void
	 */
	onError?: (error: Error) => void
}

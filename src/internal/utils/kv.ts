const KV: Record<string, any> = {}

/**
 * Get the `value` corresponding to the `key`.
 *
 * @param key String type key.
 * @returns Returns the `value` corresponding to `key`.
 */
export function getKV(key: string) {
	return KV[key]
}

/**
 * Set the `value` corresponding to the `key`.
 *
 * @param key String type key.
 * @param value Set the `value` of the `key`.
 */
export function setKV(key: string, value: any) {
	KV[key] = value
}

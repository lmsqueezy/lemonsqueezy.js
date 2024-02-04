const KV: Record<string, unknown> = {};

/**
 * Get the `value` corresponding to the `key`.
 *
 * @param key String type key.
 * @returns Returns the `value` corresponding to `key`.
 */
export function getKV<T>(key: string) {
  return KV[key] as T;
}

/**
 * Set the `value` corresponding to the `key`.
 *
 * @param key String type key.
 * @param value Set the `value` of the `key`.
 */
export function setKV(key: string, value: unknown) {
  KV[key] = value;
}

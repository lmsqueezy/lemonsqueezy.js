import { CONFIG_KEY, setKV } from '../utils'
import type { Config } from './types'

/**
 * Lemon squeezy setup.
 *
 * @param config The config.
 * @returns User configuration.
 */
export function lemonSqueezySetup(config: Config) {
	const { apiKey, onError } = config
	setKV(CONFIG_KEY, { apiKey, onError })
	return config
}

import { describe, expect, it } from 'bun:test'
import { CONFIG_KEY, getKV, lemonSqueezySetup } from '../../src/internal'

describe('Lemon Squeezy Setup', () => {
	const API_KEY = '0123456789'
	const onError = (error: Error) => {
		console.log(error)
	}

	it('Configuration created successfully', () => {
		const config = lemonSqueezySetup({ apiKey: API_KEY, onError })

		expect(config).toEqual(getKV(CONFIG_KEY))
		expect(config.apiKey).toEqual(API_KEY)
		expect(config.onError).toBeFunction()
	})
})

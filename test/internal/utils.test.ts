import { describe, expect, it } from 'bun:test'
import { camelToUnderscore, getKV, isObject, setKV } from '../../src/internal'

describe('Test isObject', () => {
	it('String is not an object type', () => {
		expect(isObject('test')).toBeFalse()
	})
	it('Number is not an object type', () => {
		expect(isObject(1)).toBeFalse()
	})
	it('Boolean is not an object type', () => {
		expect(isObject(true)).toBeFalse()
	})
	it('null is not an object type', () => {
		expect(isObject(null)).toBeFalse()
	})
	it('undefined is not an object type', () => {
		expect(isObject(undefined)).toBeFalse()
	})
	it('symbol is not an object type', () => {
		expect(isObject(Symbol('test'))).toBeFalse()
	})
	it('Array is not an object type', () => {
		expect(isObject([1])).toBeFalse()
	})
	it('Function is not an object type', () => {
		expect(isObject(() => {})).toBeFalse()
	})
	it('Date is not an object type', () => {
		expect(isObject(new Date())).toBeFalse()
	})
	it('RegExp is not an object type', () => {
		expect(isObject(/(?:)/)).toBeFalse()
	})
	it('Map is not an object type', () => {
		expect(isObject(new Map())).toBeFalse()
	})
	it('Set is not an object type', () => {
		expect(isObject(new Set())).toBeFalse()
	})
	it('Object is an object type', () => {
		expect(isObject(new Object())).toBeTrue()
	})
	it('Object is an object type', () => {
		expect(isObject({})).toBeTrue()
	})
})

describe('Test KV', () => {
	const config = { apiKey: '0123456789' }
	const key = 'Store'

	it('Set value successfully', () => {
		expect(getKV(key)).toBeUndefined()

		setKV(key, config)
		expect(getKV(key)).toEqual(config)
	})

	it('Get value successfully', () => {
		const _config = getKV(key)
		expect(_config).toEqual(config)
		expect(_config.apiKey).toEqual(config.apiKey)
	})
})

describe('Test camelToUnderscore', () => {
	it('Convert camel to underscore successfully', () => {
		expect(camelToUnderscore('storeId')).toEqual('store_id')
	})

	it('Convert no camel to no camel successfully', () => {
		expect(camelToUnderscore('store')).toEqual('store')
	})

	it('Convert camel to camel successfully', () => {
		expect(camelToUnderscore('store_id')).toEqual('store_id')
	})
})

// todo: other utils test

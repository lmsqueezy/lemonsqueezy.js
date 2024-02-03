import { beforeAll, describe, expect, it } from 'bun:test'
import { lemonSqueezySetup } from '../../src'
import { $fetch } from '../../src/internal'

const StoreId = import.meta.env.LEMON_SQUEEZY_STORE_ID
beforeAll(() => {
	lemonSqueezySetup({
		apiKey: import.meta.env.LEMON_SQUEEZY_API_KEY,
	})
})

describe('$fetch test', () => {
	it('Should call success', async () => {
		const { error, data, statusCode } = await $fetch({ path: '/v1/users/me' })
		expect(statusCode).toEqual(200)
		expect(data).toBeDefined()
		expect(error).toBeNull()
	})

	it('Should return an error that the Lemon Squeezy API key was not provided', async () => {
		lemonSqueezySetup({ apiKey: '' })
		const { error, data, statusCode } = await $fetch({ path: '/v1/user/me' })
		expect(data).toBeNull()
		expect(statusCode).toBeNull()
		expect(error?.message).toMatch('Lemon Squeezy API')
	})

	it('The configured `onError` method should be executed', async () => {
		lemonSqueezySetup({
			apiKey: '',
			onError(error) {
				expect(error.message).toMatch('Lemon Squeezy API')
			},
		})
		const { error, data, statusCode } = await $fetch({ path: '/v1/user/me' })
		expect(data).toBeNull()
		expect(statusCode).toBeNull()
		expect(error?.message).toMatch('Lemon Squeezy API')
	})

	it('Should return a Lemon Squeezy API error', async () => {
		lemonSqueezySetup({ apiKey: '0123456789' })
		const { error, data, statusCode } = await $fetch({ path: '/v1/user/me' })
		expect(data).toBeNull()
		expect(statusCode).toEqual(404)
		expect(error).toBeDefined()
		expect(error?.cause).toBeArray()
	})

	it('Should be called successfully with the query parameter', async () => {
		lemonSqueezySetup({
			apiKey: import.meta.env.LEMON_SQUEEZY_API_KEY,
		})
		const { error, data, statusCode } = await $fetch({
			path: '/v1/products',
			query: {
				'filter[store_id]': StoreId,
			},
		})

		expect(data).toBeDefined()
		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
	})

	it('Should be called successfully with the body parameter', async () => {
		const {
			statusCode,
			error,
			data: _data,
		} = await $fetch({
			path: '/v1/webhooks',
			method: 'POST',
			body: {
				data: {
					type: 'webhooks',
					attributes: {
						url: 'https://google.com/webhooks',
						events: ['subscription_created', 'subscription_cancelled'],
						secret: 'SUBSCRIPTION_SECRET',
					},
					relationships: {
						store: {
							data: {
								type: 'stores',
								id: StoreId.toString(),
							},
						},
					},
				},
			},
		})
		expect(statusCode).toEqual(201)
		expect(error).toBeNull()
		expect(_data).toBeDefined()
	})
})

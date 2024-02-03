import { beforeAll, describe, expect, it } from 'bun:test'
import { getAuthenticatedUser, lemonSqueezySetup } from '../../src'
import { API_BASE_URL } from '../../src/internal'

const DATA_TYPE = 'users'

beforeAll(() => {
	lemonSqueezySetup({ apiKey: import.meta.env.LEMON_SQUEEZY_API_KEY })
})

describe('Retrieve the authenticated user', () => {
	it('The currently authenticated user should be returned', async () => {
		const { error, data: _data, statusCode } = await getAuthenticatedUser()
		expect(error).toBeNull()
		expect(_data).toBeDefined()
		expect(statusCode).toEqual(200)

		const { meta, links, data } = _data!
		expect(meta).toBeDefined()
		expect(links).toBeDefined()
		expect(data).toBeDefined()

		const { test_mode } = meta
		expect(test_mode).toBeDefined()

		const { self } = links
		expect(self).toBe(`${API_BASE_URL}/v1/${DATA_TYPE}/${data.id}`)

		const { id, type, attributes } = data
		expect(id).toBeDefined()
		expect(type).toEqual(DATA_TYPE)
		expect(attributes).toBeDefined()

		const { name, email, color, avatar_url, has_custom_avatar, createdAt, updatedAt } = attributes
		const items = [name, email, color, avatar_url, has_custom_avatar, createdAt, updatedAt]
		for (const item of items) expect(item).toBeDefined()
		expect(Object.keys(attributes).length).toEqual(items.length)
	})

	it('An error should be returned when no `apiKey` is provided', async () => {
		lemonSqueezySetup({ apiKey: '' })
		const { error, data, statusCode } = await getAuthenticatedUser()
		expect(data).toBeNull()
		expect(statusCode).toBeNull()
		expect(error).toBeDefined()
	})

	it('An error and a 401 statusCode should be returned when the `apiKey` is incorrect', async () => {
		lemonSqueezySetup({ apiKey: 'INCORRECT_API_KEY' })
		const { error, data, statusCode } = await getAuthenticatedUser()
		expect(data).toBeNull()
		expect(statusCode).toEqual(401)
		expect(error).toBeDefined()
		expect(error?.cause).toBeArray()
	})
})

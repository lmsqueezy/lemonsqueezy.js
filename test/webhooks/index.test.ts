import { beforeAll, describe, expect, it } from 'bun:test'
import { createWebhook, deleteWebhook, getWebhook, lemonSqueezySetup, listWebhooks, updateWebhook } from '../../src'
import { API_BASE_URL } from '../../src/internal'

const DATA_TYPE = 'webhooks'
const storeId = import.meta.env.LEMON_SQUEEZY_STORE_ID
let webhookId: number | string

beforeAll(() => {
	lemonSqueezySetup({
		apiKey: import.meta.env.LEMON_SQUEEZY_API_KEY,
	})
})

describe('Create a webhook', () => {
	it('Throw an error about a parameter that must be provided', async () => {
		try {
			await createWebhook('', {} as any)
		} catch (error) {
			expect((error as Error).message).toMatch('Please provide the required parameter:')
		}
	})

	it('Should return a webhook object', async () => {
		const {
			statusCode,
			error,
			data: _data,
		} = await createWebhook(storeId, {
			url: 'https://google.com/webhooks',
			events: ['subscription_created', 'subscription_cancelled'],
			secret: 'SUBSCRIPTION_SECRET',
		})
		expect(statusCode).toEqual(201)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { data, links } = _data!
		expect(data).toBeDefined()
		expect(links).toBeDefined()

		const { id, type, attributes, relationships } = data
		expect(id).toBeDefined()
		expect(type).toEqual(DATA_TYPE)
		expect(attributes).toBeDefined()
		expect(relationships).toBeDefined()

		const { store_id, url, events, last_sent_at, test_mode, created_at, updated_at } = attributes
		const items = [store_id, url, events, last_sent_at, test_mode, created_at, updated_at]
		for (const item of items) expect(item).toBeDefined()
		expect(Object.keys(attributes).length).toEqual(items.length)
		expect(store_id).toEqual(Number(storeId))
		expect(url).toEqual('https://google.com/webhooks')
		expect(events).toEqual(['subscription_created', 'subscription_cancelled'])

		const { store } = relationships
		expect(store.links).toBeDefined()

		const { self } = links
		expect(self).toEqual(`${API_BASE_URL}/v1/${DATA_TYPE}/${id}`)

		webhookId = id
	})
})

describe('Update a checkout', () => {
	it('Throw an error about a parameter that must be provided', async () => {
		try {
			await updateWebhook('', {})
		} catch (error) {
			expect((error as Error).message).toMatch('Please provide the required parameter:')
		}
	})

	it('Should return a webhook object', async () => {
		const {
			statusCode,
			error,
			data: _data,
		} = await updateWebhook(webhookId, {
			url: 'https://google.com/webhooks2',
			events: ['subscription_created', 'subscription_cancelled', 'subscription_paused'],
			secret: 'SUBSCRIPTION_SECRET_2',
		})
		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { data, links } = _data!
		expect(data).toBeDefined()
		expect(links).toBeDefined()

		const { id, type, attributes, relationships } = data
		expect(id).toBeDefined()
		expect(type).toEqual(DATA_TYPE)
		expect(attributes).toBeDefined()
		expect(relationships).toBeDefined()

		const { store_id, url, events, last_sent_at, test_mode, created_at, updated_at } = attributes
		const items = [store_id, url, events, last_sent_at, test_mode, created_at, updated_at]
		for (const item of items) expect(item).toBeDefined()
		expect(Object.keys(attributes).length).toEqual(items.length)
		expect(store_id).toEqual(Number(storeId))
		expect(url).toEqual('https://google.com/webhooks2')
		expect(events).toEqual(['subscription_created', 'subscription_cancelled', 'subscription_paused'])

		const { store } = relationships
		expect(store).toBeDefined()

		const { self } = links
		expect(self).toEqual(`${API_BASE_URL}/v1/${DATA_TYPE}/${id}`)
	})
})

describe('Retrieve a checkout', () => {
	it('Throw an error about a parameter that must be provided', async () => {
		try {
			await getWebhook('')
		} catch (error) {
			expect((error as Error).message).toMatch('Please provide the required parameter:')
		}
	})

	it('Should return a webhook object', async () => {
		const { statusCode, error, data: _data } = await getWebhook(webhookId)
		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { data, links } = _data!
		expect(data).toBeDefined()
		expect(links).toBeDefined()

		const { id, type, attributes, relationships } = data
		expect(id).toBeDefined()
		expect(type).toEqual(DATA_TYPE)
		expect(attributes).toBeDefined()
		expect(relationships).toBeDefined()

		const { store_id, url, events, last_sent_at, test_mode, created_at, updated_at } = attributes
		const items = [store_id, url, events, last_sent_at, test_mode, created_at, updated_at]
		for (const item of items) expect(item).toBeDefined()
		expect(Object.keys(attributes).length).toEqual(items.length)
		expect(store_id).toEqual(Number(storeId))
		expect(url).toEqual('https://google.com/webhooks2')
		expect(events).toEqual(['subscription_created', 'subscription_cancelled', 'subscription_paused'])

		const { store } = relationships
		expect(store).toBeDefined()

		const { self } = links
		expect(self).toEqual(`${API_BASE_URL}/v1/${DATA_TYPE}/${id}`)
	})

	it('Should return a webhook object with related resources', async () => {
		const { statusCode, error, data: _data } = await getWebhook(webhookId, { include: ['store'] })
		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { data, links, included } = _data!
		expect(data).toBeDefined()
		expect(links).toBeDefined()
		expect(included).toBeArray()
		expect(!!included?.filter((item) => item.type === 'stores')).toBeTrue()

		const { id, type, attributes, relationships } = data
		expect(id).toBeDefined()
		expect(type).toEqual(DATA_TYPE)
		expect(attributes).toBeDefined()
		expect(relationships).toBeDefined()

		const { store_id, url, events, last_sent_at, test_mode, created_at, updated_at } = attributes
		const items = [store_id, url, events, last_sent_at, test_mode, created_at, updated_at]
		for (const item of items) expect(item).toBeDefined()
		expect(Object.keys(attributes).length).toEqual(items.length)
		expect(store_id).toEqual(Number(storeId))
		expect(url).toEqual('https://google.com/webhooks2')
		expect(events).toEqual(['subscription_created', 'subscription_cancelled', 'subscription_paused'])

		const { store } = relationships
		expect(store).toBeDefined()

		const { self } = links
		expect(self).toEqual(`${API_BASE_URL}/v1/${DATA_TYPE}/${id}`)
	})
})

describe('List all webhooks', () => {
	it('Should return a paginated list of webhooks', async () => {
		const { statusCode, error, data: _data } = await listWebhooks()
		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { meta, data, links } = _data!
		expect(meta.page).toBeDefined()
		expect(data).toBeArray()
		expect(links.first).toBeDefined()
		expect(links.last).toBeDefined()

		const { currentPage, from, to, perPage, lastPage, total } = meta.page
		const items = [currentPage, from, to, perPage, lastPage, total]
		for (const item of items) expect(item).toBeInteger()
		expect(Object.keys(meta.page).length).toEqual(items.length)
	})

	it('Should return a paginated list of webhooks with related resources', async () => {
		const { statusCode, error, data: _data } = await listWebhooks({ include: ['store'] })
		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { meta, data, links, included } = _data!
		expect(meta.page).toBeDefined()
		expect(data).toBeArray()
		expect(links.first).toBeDefined()
		expect(links.last).toBeDefined()
		expect(included).toBeArray()
		expect(!!included?.filter((item) => item.type === 'stores')).toBeTrue()

		const { currentPage, from, to, perPage, lastPage, total } = meta.page
		const items = [currentPage, from, to, perPage, lastPage, total]
		for (const item of items) expect(item).toBeInteger()
		expect(Object.keys(meta.page).length).toEqual(items.length)
	})

	it('Should return a paginated list of webhooks filtered by store id', async () => {
		const { statusCode, error, data: _data } = await listWebhooks({ filter: { storeId } })
		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { meta, data, links } = _data!
		expect(meta.page).toBeDefined()
		expect(data.filter((item) => item.attributes.store_id === Number(storeId)).length).toEqual(data.length)
		expect(links.first).toBeDefined()
		expect(links.last).toBeDefined()

		const { currentPage, from, to, perPage, lastPage, total } = meta.page
		const items = [currentPage, from, to, perPage, lastPage, total]
		for (const item of items) expect(item).toBeInteger()
		expect(Object.keys(meta.page).length).toEqual(items.length)
	})

	it('Should return a paginated list of webhooks with page_number = 1 and page_size = 5', async () => {
		const {
			error,
			data: _data,
			statusCode,
		} = await listWebhooks({
			page: {
				number: 1,
				size: 5,
			},
		})
		expect(error).toBeNull()
		expect(statusCode).toEqual(200)
		expect(_data).toBeDefined()

		const { meta, data, links } = _data!
		expect(meta).toBeDefined()
		expect(data).toBeArray()
		expect(links.first).toBeDefined()
		expect(links.last).toBeDefined()

		const { currentPage, from, to, perPage, lastPage, total } = meta.page
		const items = [currentPage, from, to, perPage, lastPage, total]
		for (const item of items) expect(item).toBeInteger()
		expect(Object.keys(meta.page).length).toEqual(items.length)
		expect(currentPage).toEqual(1)
		expect(perPage).toEqual(5)
	})
})

describe('Delete a checkout', () => {
	it('Throw an error about a parameter that must be provided', async () => {
		try {
			await deleteWebhook('')
		} catch (error) {
			expect((error as Error).message).toMatch('Please provide the required parameter:')
		}
	})

	it('Should return a 204 No Content response on success', async () => {
		const { statusCode, data, error } = await deleteWebhook(webhookId)
		expect(statusCode).toEqual(204)
		expect(data).toBeNull()
		expect(error).toBeNull()
	})
})

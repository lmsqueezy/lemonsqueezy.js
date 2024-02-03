import { beforeAll, describe, expect, it } from 'bun:test'
import {
	getSubscriptionItem,
	getSubscriptionItemCurrentUsage,
	lemonSqueezySetup,
	listSubscriptionItems,
	updateSubscriptionItem,
} from '../../src'
import { API_BASE_URL } from '../../src/internal'

const DATA_TYPE = 'subscription-items'
const PATH = '/v1/subscription-items/'
let subscriptionItemId: number | string
let noUsageBasedSubscriptionItemId: number | string
let subscriptionId: number | string
let priceId: number | string

beforeAll(() => {
	lemonSqueezySetup({ apiKey: import.meta.env.LEMON_SQUEEZY_API_KEY })
})

describe('List all subscription items', () => {
	it('Should return a paginated list of subscription items', async () => {
		const { statusCode, error, data: _data } = await listSubscriptionItems()
		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { meta, links, data } = _data!

		expect(meta.page).toBeDefined()
		expect(links.first).toBeDefined()
		expect(links.last).toBeDefined()
		expect(data).toBeArray()
		expect(data[0]).toBeDefined()

		const { id, attributes } = data.find((item) => item.attributes.is_usage_based)!
		const { subscription_id, price_id } = attributes
		subscriptionItemId = id
		noUsageBasedSubscriptionItemId = data.find((item) => !item.attributes.is_usage_based)!.id
		subscriptionId = subscription_id
		priceId = price_id
	})

	it('Should return a paginated list of subscription items with related resources', async () => {
		const { statusCode, error, data: _data } = await listSubscriptionItems({ include: ['subscription'] })
		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { meta, links, data, included } = _data!

		expect(meta.page).toBeDefined()
		expect(links.first).toBeDefined()
		expect(links.last).toBeDefined()
		expect(data).toBeArray()
		expect(data[0]).toBeDefined()
		expect(included).toBeArray()
		expect(!!included?.filter((item) => item.type === 'subscriptions')).toBeTrue()
	})

	it('Should return a paginated list of subscription items filtered by subscription id', async () => {
		const { statusCode, error, data: _data } = await listSubscriptionItems({ filter: { subscriptionId } })
		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { meta, links, data } = _data!
		expect(meta.page).toBeDefined()
		expect(links.first).toBeDefined()
		expect(links.last).toBeDefined()
		expect(data.filter((item) => item.attributes.subscription_id === subscriptionId).length).toEqual(data.length)
	})

	it('Should return a paginated list of subscription items filtered by price id', async () => {
		const { statusCode, error, data: _data } = await listSubscriptionItems({ filter: { priceId } })
		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { meta, links, data } = _data!
		expect(meta.page).toBeDefined()
		expect(links.first).toBeDefined()
		expect(links.last).toBeDefined()
		expect(data.filter((item) => item.attributes.price_id === priceId).length).toEqual(data.length)
	})

	it('Should return a paginated list of subscription items with page_number = 1 and page_size = 5', async () => {
		const {
			error,
			data: _data,
			statusCode,
		} = await listSubscriptionItems({
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

describe('Retrieve a subscription item', () => {
	it('Should return the subscription item object', async () => {
		const { statusCode, error, data: _data } = await getSubscriptionItem(subscriptionItemId)
		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { data, links } = _data!
		expect(data).toBeDefined()
		expect(links.self).toEqual(`${API_BASE_URL}${PATH}${subscriptionItemId}`)

		const { id, type, attributes, relationships } = data
		expect(id).toEqual(subscriptionItemId.toString())
		expect(type).toEqual(DATA_TYPE)
		expect(attributes).toBeDefined()
		expect(relationships).toBeDefined()

		const { subscription_id, price_id, quantity, is_usage_based, created_at, updated_at } = attributes
		const items = [subscription_id, price_id, quantity, is_usage_based, created_at, updated_at]
		expect(subscription_id).toEqual(Number(subscriptionId))
		expect(Object.keys(attributes).length).toEqual(items.length)
		for (const item of items) expect(item).toBeDefined()

		const { subscription, price, 'usage-records': usageRecords } = relationships
		const relationshipItems = [subscription, price, usageRecords]
		expect(Object.keys(relationships).length).toEqual(relationshipItems.length)
		for (const item of relationshipItems) expect(item.links).toBeDefined()
	})

	it('Should return the subscription item object with related resources', async () => {
		const {
			statusCode,
			error,
			data: _data,
		} = await getSubscriptionItem(subscriptionItemId, { include: ['subscription'] })
		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { data, links, included } = _data!
		expect(data).toBeDefined()
		expect(links.self).toEqual(`${API_BASE_URL}${PATH}${subscriptionItemId}`)
		expect(included).toBeArray()
		expect(!!included?.filter((item) => item.type === 'subscriptions')).toBeTrue()

		const { id, type, attributes, relationships } = data
		expect(id).toEqual(subscriptionItemId.toString())
		expect(type).toEqual(DATA_TYPE)
		expect(attributes).toBeDefined()
		expect(relationships).toBeDefined()

		const { subscription_id, price_id, quantity, is_usage_based, created_at, updated_at } = attributes
		const items = [subscription_id, price_id, quantity, is_usage_based, created_at, updated_at]
		expect(subscription_id).toEqual(Number(subscriptionId))
		expect(Object.keys(attributes).length).toEqual(items.length)
		for (const item of items) expect(item).toBeDefined()

		const { subscription, price, 'usage-records': usageRecords } = relationships
		const relationshipItems = [subscription, price, usageRecords]
		expect(Object.keys(relationships).length).toEqual(relationshipItems.length)
		for (const item of relationshipItems) expect(item.links).toBeDefined()
	})
})

describe(`Retrieve a subscription item's current usage`, () => {
	it('Throw an error about a parameter that must be provided', async () => {
		try {
			await getSubscriptionItem('')
		} catch (error) {
			expect((error as Error).message).toMatch('Please provide the required parameter:')
		}
	})

	it('Should return a meta object containing usage information', async () => {
		const { statusCode, error, data: _data } = await getSubscriptionItemCurrentUsage(subscriptionItemId)
		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { meta } = _data!
		expect(meta).toBeDefined()

		const { period_start, period_end, quantity, interval_quantity, interval_unit } = meta
		const items = [period_start, period_end, quantity, interval_quantity, interval_unit]
		expect(Object.keys(meta).length).toEqual(items.length)
		for (const item of items) expect(item).toBeDefined()
	})

	it('Should return a 404 Not Found response', async () => {
		const { error, statusCode, data } = await getSubscriptionItemCurrentUsage(noUsageBasedSubscriptionItemId)
		expect(error).toBeDefined()
		expect(statusCode).toEqual(404)
		expect(data).toBeNull()
	})
})

describe('Update a subscription item', () => {
	it('Throw an error about a parameter that must be provided', async () => {
		try {
			await updateSubscriptionItem('', {} as any)
		} catch (error) {
			expect((error as Error).message).toMatch('Please provide the required parameter:')
		}
	})

	it('Should return a updated subscription item object', async () => {
		const { error, statusCode, data: _data } = await updateSubscriptionItem(noUsageBasedSubscriptionItemId, 10)
		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { links, data } = _data!
		expect(data).toBeDefined()
		expect(links.self).toEqual(`${API_BASE_URL}${PATH}${noUsageBasedSubscriptionItemId}`)

		const { id, type, attributes, relationships } = data
		expect(id).toEqual(noUsageBasedSubscriptionItemId.toString())
		expect(type).toEqual(DATA_TYPE)
		expect(attributes).toBeDefined()
		expect(relationships).toBeDefined()

		const { subscription_id, price_id, quantity, is_usage_based, created_at, updated_at } = attributes
		const items = [subscription_id, price_id, quantity, is_usage_based, created_at, updated_at]
		expect(quantity).toEqual(10)
		expect(Object.keys(attributes).length).toEqual(items.length)
		for (const item of items) expect(item).toBeDefined()

		const { subscription, price, 'usage-records': usageRecords } = relationships
		const relationshipItems = [subscription, price, usageRecords]
		expect(Object.keys(relationships).length).toEqual(relationshipItems.length)
		for (const item of relationshipItems) expect(item.links).toBeDefined()
	})
})

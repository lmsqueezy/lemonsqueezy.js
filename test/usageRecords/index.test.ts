import { beforeAll, describe, expect, it } from 'bun:test'
import {
	createUsageRecord,
	getUsageRecord,
	lemonSqueezySetup,
	listSubscriptionItems,
	listUsageRecords,
} from '../../src'
import { API_BASE_URL } from '../../src/internal'

const DATA_TYPE = 'usage-records'
const PATH = '/v1/usage-records/'
let usageRecordId: number | string
let subscriptionItemId: number | string

beforeAll(async () => {
	lemonSqueezySetup({ apiKey: import.meta.env.LEMON_SQUEEZY_API_KEY })
	const { data } = await listSubscriptionItems()
	subscriptionItemId = data!.data[0].id
})

describe('Create a usage record', async () => {
	it('Should return a usage record object using the subscription item id & quantity', async () => {
		const newQuantity = 10
		const {
			error,
			statusCode,
			data: _data,
		} = await createUsageRecord({
			quantity: newQuantity,
			subscriptionItemId,
		})
		expect(statusCode).toEqual(201)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { data, links } = _data!
		expect(data).toBeDefined()
		expect(links).toBeDefined()

		const { type, id, attributes, relationships } = data
		expect(id).toBeDefined()
		expect(type).toEqual(DATA_TYPE)
		expect(attributes).toBeDefined()
		expect(relationships).toBeDefined()

		const { subscription_item_id, quantity, action, created_at, updated_at } = attributes
		const items = [subscription_item_id, quantity, action, created_at, updated_at]
		for (const item of items) expect(item).toBeDefined()
		expect(Object.keys(attributes).length).toEqual(items.length)
		expect(subscription_item_id).toEqual(Number(subscriptionItemId))
		expect(quantity).toEqual(newQuantity)
		expect(action).toEqual('increment')

		const { 'subscription-item': subscriptionItem } = relationships
		expect(subscriptionItem.links).toBeDefined()

		expect(links.self).toEqual(`${API_BASE_URL}${PATH}${id}`)

		usageRecordId = id
	})

	it('Should return a usage record object using the subscription item id, quantity and action=set', async () => {
		const newQuantity = 5
		const {
			error,
			statusCode,
			data: _data,
		} = await createUsageRecord({
			quantity: newQuantity,
			action: 'set',
			subscriptionItemId,
		})
		expect(statusCode).toEqual(201)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { data, links } = _data!
		expect(data).toBeDefined()
		expect(links).toBeDefined()

		const { type, id, attributes, relationships } = data
		expect(id).toBeDefined()
		expect(type).toEqual(DATA_TYPE)
		expect(attributes).toBeDefined()
		expect(relationships).toBeDefined()

		const { subscription_item_id, quantity, action, created_at, updated_at } = attributes
		const items = [subscription_item_id, quantity, action, created_at, updated_at]
		for (const item of items) expect(item).toBeDefined()
		expect(Object.keys(attributes).length).toEqual(items.length)
		expect(subscription_item_id).toEqual(Number(subscriptionItemId))
		expect(quantity).toEqual(newQuantity)
		expect(action).toEqual('set')

		const { 'subscription-item': subscriptionItem } = relationships
		expect(subscriptionItem.links).toBeDefined()

		expect(links.self).toEqual(`${API_BASE_URL}${PATH}${id}`)
	})
})

describe('List all usage records', () => {
	it('Should return a paginated list of usage records', async () => {
		const { error, statusCode, data: _data } = await listUsageRecords()
		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { meta, data, links } = _data!
		expect(meta.page).toBeDefined()
		expect(data).toBeArray()
		expect(links.first).toBeDefined()
		expect(links.last).toBeDefined()

		const { currentPage, from, to, lastPage, perPage, total } = meta.page
		const pageItems = [currentPage, from, to, lastPage, perPage, total]
		for (const item of pageItems) expect(item).toBeNumber()
		expect(Object.keys(meta.page).length).toEqual(pageItems.length)
	})

	it('Should return a paginated list of usage records with related resources', async () => {
		const { error, statusCode, data: _data } = await listUsageRecords({ include: ['subscription-item'] })
		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { meta, data, links, included } = _data!
		expect(meta.page).toBeDefined()
		expect(data).toBeArray()
		expect(links.first).toBeDefined()
		expect(links.last).toBeDefined()
		expect(included).toBeArray()
		expect(!!included?.filter((item) => item.type === 'subscription-items')).toBeTrue()

		const { currentPage, from, to, lastPage, perPage, total } = meta.page
		const pageItems = [currentPage, from, to, lastPage, perPage, total]
		for (const item of pageItems) expect(item).toBeNumber()
		expect(Object.keys(meta.page).length).toEqual(pageItems.length)
	})

	it('Should return a paginated list of usage records filtered by subscription item id', async () => {
		const { error, statusCode, data: _data } = await listUsageRecords({ filter: { subscriptionItemId } })
		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { meta, data, links } = _data!

		expect(meta.page).toBeDefined()
		expect(links.first).toBeDefined()
		expect(links.last).toBeDefined()
		expect(data.filter((item) => item.attributes.subscription_item_id === Number(subscriptionItemId)).length).toEqual(
			data.length,
		)

		const { currentPage, from, to, lastPage, perPage, total } = meta.page
		const pageItems = [currentPage, from, to, lastPage, perPage, total]
		for (const item of pageItems) expect(item).toBeNumber()
		expect(Object.keys(meta.page).length).toEqual(pageItems.length)
	})

	it('Should return a paginated list of usage records with page_number = 1 and page_size = 5', async () => {
		const {
			error,
			data: _data,
			statusCode,
		} = await listUsageRecords({
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

describe('Retrieve a usage record', () => {
	it('Throw an error about a parameter that must be provided', async () => {
		try {
			await getUsageRecord('')
		} catch (error) {
			expect((error as Error).message).toMatch('Please provide the required parameter:')
		}
	})

	it('Should return a usage record object', async () => {
		const { error, statusCode, data: _data } = await getUsageRecord(usageRecordId)
		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { data, links } = _data!
		expect(data).toBeDefined()
		expect(links.self).toEqual(`${API_BASE_URL}${PATH}${usageRecordId}`)

		const { id, type, attributes, relationships } = data
		expect(id).toEqual(usageRecordId.toString())
		expect(type).toEqual(DATA_TYPE)
		expect(attributes).toBeDefined()
		expect(relationships).toBeDefined()

		const { subscription_item_id, quantity, action, created_at, updated_at } = attributes
		const items = [subscription_item_id, quantity, action, created_at, updated_at]
		for (const item of items) expect(item).toBeDefined()
		expect(subscription_item_id).toEqual(Number(subscriptionItemId))
		expect(quantity).toBeInteger()
		expect(['increment', 'set'].includes(action)).toBeTrue()

		const { 'subscription-item': subscriptionItem } = relationships
		expect(subscriptionItem.links).toBeDefined()
	})

	it('Should return a usage record object with related resources', async () => {
		const { error, statusCode, data: _data } = await getUsageRecord(usageRecordId, { include: ['subscription-item'] })
		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { data, links, included } = _data!
		expect(data).toBeDefined()
		expect(links.self).toEqual(`${API_BASE_URL}${PATH}${usageRecordId}`)
		expect(included).toBeArray()
		expect(!!included?.filter((item) => item.type === 'subscription-items')).toBeTrue()

		const { id, type, attributes, relationships } = data
		expect(id).toEqual(usageRecordId.toString())
		expect(type).toEqual(DATA_TYPE)
		expect(attributes).toBeDefined()
		expect(relationships).toBeDefined()

		const { subscription_item_id, quantity, action, created_at, updated_at } = attributes
		const items = [subscription_item_id, quantity, action, created_at, updated_at]
		for (const item of items) expect(item).toBeDefined()
		expect(subscription_item_id).toEqual(Number(subscriptionItemId))
		expect(quantity).toBeInteger()
		expect(['increment', 'set'].includes(action)).toBeTrue()

		const { 'subscription-item': subscriptionItem } = relationships
		expect(subscriptionItem.links).toBeDefined()
	})
})

import { beforeAll, describe, expect, it } from 'bun:test'
import { getStore, lemonSqueezySetup, listStores } from '../../src'
import { API_BASE_URL } from '../../src/internal'

const DATA_TYPE = 'stores'
let storeId: number | string

beforeAll(() => {
	lemonSqueezySetup({ apiKey: import.meta.env.LEMON_SQUEEZY_API_KEY })
})

describe('List all stores', () => {
	it('Should return a paginated list of stores', async () => {
		const { error, data: _data, statusCode } = await listStores()
		expect(error).toBeNull()
		expect(statusCode).toEqual(200)
		expect(_data).toBeDefined()

		const { meta, data, links } = _data!
		expect(meta.page).toBeDefined()
		expect(data).toBeArray()
		expect(links.first).toBeDefined()
		expect(links.last).toBeDefined()

		const { currentPage, to, from, lastPage, perPage, total } = meta.page
		const items = [currentPage, to, from, lastPage, perPage, total]
		for (const item of items) expect(item).toBeDefined()
		expect(Object.keys(meta.page).length).toEqual(items.length)

		storeId = data[0].id
	})

	it('Should return a paginated list of stores with page', async () => {
		const page = { number: 1, size: 5 }
		const {
			error,
			data: _data,
			statusCode,
		} = await listStores({
			page,
		})
		expect(error).toBeNull()
		expect(statusCode).toEqual(200)
		expect(_data).toBeDefined()

		const { meta, data, links } = _data!
		expect(meta.page).toBeDefined()
		expect(data).toBeArray()
		expect(links.first).toBeDefined()
		expect(links.last).toBeDefined()

		const { currentPage, to, from, lastPage, perPage, total } = meta.page
		const items = [currentPage, to, from, lastPage, perPage, total]
		for (const item of items) expect(item).toBeDefined()
		expect(Object.keys(meta.page).length).toEqual(items.length)
		expect(currentPage).toEqual(page.number)
		expect(perPage).toEqual(page.size)
	})

	it('Should return a paginated list of stores with include', async () => {
		const {
			error,
			data: _data,
			statusCode,
		} = await listStores({
			include: ['orders'],
		})
		expect(error).toBeNull()
		expect(statusCode).toEqual(200)
		expect(_data).toBeDefined()

		const { meta, data, links, included } = _data!
		expect(meta.page).toBeDefined()
		expect(data).toBeArray()
		expect(included).toBeArray()
		expect(links.first).toBeDefined()
		expect(links.last).toBeDefined()
		expect(included?.filter((item) => item.type === 'orders').length).toBeGreaterThan(0)

		const { currentPage, to, from, lastPage, perPage, total } = meta.page
		const items = [currentPage, to, from, lastPage, perPage, total]
		for (const item of items) expect(item).toBeDefined()
		expect(Object.keys(meta.page).length).toEqual(items.length)
	})
})

describe('Retrieve a store', () => {
	it('Throw an error about a parameter that must be provided', async () => {
		try {
			await getStore('')
		} catch (error) {
			expect((error as Error).message).toMatch('Please provide the required parameter:')
		}
	})

	it('Should return the store object with the given store id', async () => {
		const { error, data: _data, statusCode } = await getStore(storeId)
		expect(error).toBeNull()
		expect(statusCode).toEqual(200)
		expect(_data).toBeDefined()

		const { data, links } = _data!
		expect(data).toBeDefined()
		expect(links).toBeDefined()

		const { type, id, attributes, relationships } = data
		expect(type).toEqual(DATA_TYPE)
		expect(id).toEqual(storeId.toString())
		expect(attributes).toBeDefined()
		expect(relationships).toBeDefined()
		expect(links.self).toBe(`${API_BASE_URL}/v1/${DATA_TYPE}/${id}`)

		const {
			name,
			slug,
			domain,
			url,
			avatar_url,
			plan,
			country,
			country_nicename,
			currency,
			total_sales,
			total_revenue,
			thirty_day_sales,
			thirty_day_revenue,
			created_at,
			updated_at,
		} = attributes
		const items = [
			name,
			slug,
			domain,
			url,
			avatar_url,
			plan,
			country,
			country_nicename,
			currency,
			total_sales,
			total_revenue,
			thirty_day_sales,
			thirty_day_revenue,
			created_at,
			updated_at,
		]
		for (const item of items) expect(item).toBeDefined()
		expect(Object.keys(attributes).length).toEqual(items.length)

		const { products, orders, subscriptions, discounts, 'license-keys': licenseKeys, webhooks } = relationships
		const relationshipItems = [products, orders, subscriptions, discounts, licenseKeys, webhooks]

		for (const item of relationshipItems) expect(item).toBeDefined()
		expect(Object.keys(relationships).length).toEqual(relationshipItems.length)
	})

	it('Should return the store object with the given store id and include', async () => {
		const { error, data: _data, statusCode } = await getStore(storeId, { include: ['orders'] })
		expect(error).toBeNull()
		expect(statusCode).toEqual(200)
		expect(_data).toBeDefined()

		const { data, links, included } = _data!
		expect(data).toBeDefined()
		expect(links).toBeDefined()
		expect(included).toBeArray()
		expect(included?.filter((item) => item.type === 'orders').length).toBeGreaterThan(0)

		const { type, id, attributes, relationships } = data
		expect(type).toEqual(DATA_TYPE)
		expect(id).toEqual(storeId.toString())
		expect(attributes).toBeDefined()
		expect(relationships).toBeDefined()
		expect(links.self).toBe(`${API_BASE_URL}/v1/${DATA_TYPE}/${id}`)

		const {
			name,
			slug,
			domain,
			url,
			avatar_url,
			plan,
			country,
			country_nicename,
			currency,
			total_sales,
			total_revenue,
			thirty_day_sales,
			thirty_day_revenue,
			created_at,
			updated_at,
		} = attributes
		const items = [
			name,
			slug,
			domain,
			url,
			avatar_url,
			plan,
			country,
			country_nicename,
			currency,
			total_sales,
			total_revenue,
			thirty_day_sales,
			thirty_day_revenue,
			created_at,
			updated_at,
		]
		for (const item of items) expect(item).toBeDefined()
		expect(Object.keys(attributes).length).toEqual(items.length)

		const { products, orders, subscriptions, discounts, 'license-keys': licenseKeys, webhooks } = relationships
		const relationshipItems = [products, orders, subscriptions, discounts, licenseKeys, webhooks]

		for (const item of relationshipItems) expect(item).toBeDefined()
		expect(Object.keys(relationships).length).toEqual(relationshipItems.length)
	})
})

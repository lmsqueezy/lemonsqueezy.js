import { beforeAll, describe, expect, it } from 'bun:test'
import { getProduct, lemonSqueezySetup, listProducts } from '../../src'
import { API_BASE_URL } from '../../src/internal'

const STORE_ID = import.meta.env.LEMON_SQUEEZY_STORE_ID
const DATA_TYPE = 'products'
let productId: number | string

beforeAll(() => {
	lemonSqueezySetup({ apiKey: import.meta.env.LEMON_SQUEEZY_API_KEY })
})

describe('List all products', () => {
	it('Should return a paginated list of products', async () => {
		const { statusCode, error, data: _data } = await listProducts()
		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { meta, data, links } = _data!
		expect(meta.page).toBeDefined()
		expect(data.length).toBeGreaterThan(0)
		expect(links).toBeDefined()

		const { currentPage, from, lastPage, perPage, to, total } = meta.page
		for (const item of [currentPage, from, lastPage, perPage, to, total]) {
			expect(item).toBeNumber()
		}

		const { first, last } = links
		expect(first).toBeString()
		expect(last).toBeString()

		productId = data[0].id
	})

	it('Should return a paginated list of products filtered by store id', async () => {
		const {
			statusCode,
			error,
			data: _data,
		} = await listProducts({
			filter: { storeId: STORE_ID },
		})
		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { meta, data, links } = _data!
		expect(meta.page).toBeDefined()
		expect(links).toBeDefined()
		expect(data.filter((item) => item.attributes.store_id === Number(STORE_ID)).length).toEqual(data.length)

		const { first, last } = links
		expect(first).toBeString()
		expect(last).toBeString()
	})

	it('Should return a paginated list of products with include', async () => {
		const {
			statusCode,
			error,
			data: _data,
		} = await listProducts({
			include: ['variants'],
		})
		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { meta, data, links, included } = _data!
		expect(meta.page).toBeDefined()
		expect(data).toBeArray()
		expect(links).toBeDefined()
		expect(included).toBeArray()
		expect(!!included?.find((item) => item.type === 'variants')).toBeTrue()

		const { first, last } = links
		expect(first).toBeString()
		expect(last).toBeString()
	})

	it('Should return a paginated list of products with page_number = 1 and page_size = 5', async () => {
		const {
			error,
			data: _data,
			statusCode,
		} = await listProducts({
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

describe('Retrieve a product', () => {
	it('Throw an error about a parameter that must be provided', async () => {
		try {
			await getProduct('')
		} catch (error) {
			expect((error as Error).message).toMatch('Please provide the required parameter:')
		}
	})

	it('Should return a product object with the given product id', async () => {
		const { statusCode, error, data: _data } = await getProduct(productId)
		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { data, links } = _data!
		expect(data).toBeDefined()
		expect(links).toBeDefined()
		expect(links.self).toEqual(`${API_BASE_URL}/v1/${DATA_TYPE}/${productId}`)

		const { id, type, attributes, relationships } = data
		expect(id).toEqual(productId.toString())
		expect(type).toEqual(DATA_TYPE)
		expect(attributes).toBeDefined
		expect(relationships).toBeDefined

		const {
			store_id,
			name,
			slug,
			description,
			status,
			status_formatted,
			thumb_url,
			large_thumb_url,
			price,
			price_formatted,
			from_price,
			to_price,
			pay_what_you_want,
			buy_now_url,
			created_at,
			updated_at,
			test_mode,
		} = attributes
		const items = [
			store_id,
			name,
			slug,
			description,
			status,
			status_formatted,
			thumb_url,
			large_thumb_url,
			price,
			price_formatted,
			from_price,
			to_price,
			pay_what_you_want,
			buy_now_url,
			created_at,
			updated_at,
			test_mode,
		]
		for (const item of items) expect(item).toBeDefined()
		expect(store_id).toEqual(Number(STORE_ID))
		expect(status).toEqual('published')
		expect(Object.keys(attributes).length).toEqual(items.length)

		const { store, variants } = relationships
		expect(store.links).toBeDefined()
		expect(variants.links).toBeDefined()
	})

	it('Should return a product object and includes related resources', async () => {
		const { statusCode, error, data: _data } = await getProduct(productId, { include: ['variants'] })
		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { data, links, included } = _data!
		expect(data).toBeDefined()
		expect(links).toBeDefined()
		expect(links.self).toEqual(`${API_BASE_URL}/v1/${DATA_TYPE}/${productId}`)
		expect(included).toBeArray()
		expect(!!included?.find((item) => item.type === 'variants')).toBeTrue()

		const { id, type, attributes, relationships } = data
		expect(id).toEqual(productId.toString())
		expect(type).toEqual(DATA_TYPE)
		expect(attributes).toBeDefined
		expect(relationships).toBeDefined

		const {
			store_id,
			name,
			slug,
			description,
			status,
			status_formatted,
			thumb_url,
			large_thumb_url,
			price,
			price_formatted,
			from_price,
			to_price,
			pay_what_you_want,
			buy_now_url,
			created_at,
			updated_at,
			test_mode,
		} = attributes
		const items = [
			store_id,
			name,
			slug,
			description,
			status,
			status_formatted,
			thumb_url,
			large_thumb_url,
			price,
			price_formatted,
			from_price,
			to_price,
			pay_what_you_want,
			buy_now_url,
			created_at,
			updated_at,
			test_mode,
		]
		for (const item of items) expect(item).toBeDefined()
		expect(store_id).toEqual(Number(STORE_ID))
		expect(status).toEqual('published')
		expect(Object.keys(attributes).length).toEqual(items.length)

		const { store, variants } = relationships
		expect(store.links).toBeDefined()
		expect(variants.links).toBeDefined()
	})
})

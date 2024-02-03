import { beforeAll, describe, expect, it } from 'bun:test'
import { getOrderItem, lemonSqueezySetup, listOrderItems } from '../../src'
import { API_BASE_URL } from '../../src/internal'

const DATA_TYPE = 'order-items'
const PATH = '/v1/order-items/'
let orderItemId: any
let orderId: any
let productId: any
let variantId: any

beforeAll(() => {
	lemonSqueezySetup({ apiKey: import.meta.env.LEMON_SQUEEZY_API_KEY })
})

describe('List all order items', () => {
	it('Should return a paginated list of order items', async () => {
		const { statusCode, error, data: _data } = await listOrderItems()
		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { meta, links, data } = _data!
		expect(meta.page).toBeDefined()
		expect(links.first).toBeDefined()
		expect(links.last).toBeDefined()
		expect(data).toBeArray()

		const { currentPage, from, lastPage, perPage, to, total } = meta.page
		for (const item of [currentPage, from, lastPage, perPage, to, total]) {
			expect(item).toBeNumber()
		}

		orderItemId = data[0].id
		orderId = data[0].attributes.order_id
		productId = data[0].attributes.product_id
		variantId = data[0].attributes.variant_id
	})

	it('Should return a paginated list of order items with related resources', async () => {
		const { statusCode, error, data: _data } = await listOrderItems({ include: ['product'] })
		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { meta, links, data, included } = _data!
		expect(meta.page).toBeDefined()
		expect(links.first).toBeDefined()
		expect(links.last).toBeDefined()
		expect(data).toBeArray()
		expect(included).toBeArray()
		expect(!!included?.filter((item) => item.type === 'products')).toBeTrue()

		const { currentPage, from, lastPage, perPage, to, total } = meta.page
		for (const item of [currentPage, from, lastPage, perPage, to, total]) {
			expect(item).toBeNumber()
		}
	})

	it('Should return a paginated list of order items filtered by order id', async () => {
		const { statusCode, error, data: _data } = await listOrderItems({ filter: { orderId } })
		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { meta, links, data } = _data!
		expect(meta.page).toBeDefined()
		expect(links.first).toBeDefined()
		expect(links.last).toBeDefined()
		expect(data.filter((item) => item.attributes.order_id === Number(orderId)).length).toEqual(data.length)

		const { currentPage, from, lastPage, perPage, to, total } = meta.page
		for (const item of [currentPage, from, lastPage, perPage, to, total]) {
			expect(item).toBeNumber()
		}
	})

	it('Should return a paginated list of order items filtered by product id', async () => {
		const { statusCode, error, data: _data } = await listOrderItems({ filter: { productId } })
		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { meta, links, data } = _data!
		expect(meta.page).toBeDefined()
		expect(links.first).toBeDefined()
		expect(links.last).toBeDefined()
		expect(data.filter((item) => item.attributes.product_id === Number(productId)).length).toEqual(data.length)

		const { currentPage, from, lastPage, perPage, to, total } = meta.page
		for (const item of [currentPage, from, lastPage, perPage, to, total]) {
			expect(item).toBeNumber()
		}
	})

	it('Should return a paginated list of order items filtered by variant id', async () => {
		const { statusCode, error, data: _data } = await listOrderItems({ filter: { variantId } })
		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { meta, links, data } = _data!
		expect(meta.page).toBeDefined()
		expect(links.first).toBeDefined()
		expect(links.last).toBeDefined()
		expect(data.filter((item) => item.attributes.variant_id === Number(variantId)).length).toEqual(data.length)

		const { currentPage, from, lastPage, perPage, to, total } = meta.page
		for (const item of [currentPage, from, lastPage, perPage, to, total]) {
			expect(item).toBeNumber()
		}
	})

	it('Should return a paginated list of order items with page_number = 1 and page_size = 5', async () => {
		const {
			error,
			data: _data,
			statusCode,
		} = await listOrderItems({
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

describe('Retrieve an order item', () => {
	it('Throw an error about a parameter that must be provided', async () => {
		try {
			await getOrderItem('')
		} catch (error) {
			expect((error as Error).message).toMatch('Please provide the required parameter:')
		}
	})

	it('Should return the order with the given order item id', async () => {
		const { statusCode, error, data: _data } = await getOrderItem(orderItemId)
		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { links, data } = _data!
		expect(links.self).toEqual(`${API_BASE_URL}${PATH}${orderItemId}`)
		expect(data).toBeDefined()

		const { id, type, attributes, relationships } = data
		expect(id).toEqual(orderItemId.toString())
		expect(type).toEqual(DATA_TYPE)
		expect(attributes).toBeDefined()
		expect(relationships).toBeDefined()

		const {
			order_id,
			product_id,
			variant_id,
			price_id,
			product_name,
			variant_name,
			price,
			quantity,
			created_at,
			updated_at,
			test_mode,
		} = attributes
		const items = [
			order_id,
			product_id,
			variant_id,
			price_id,
			product_name,
			variant_name,
			price,
			quantity,
			created_at,
			updated_at,
			test_mode,
		]
		expect(Object.keys(attributes).length).toEqual(items.length)
		for (const item of items) {
			expect(item).toBeDefined()
		}

		const { order, product, variant } = relationships
		for (const item of [order, product, variant]) {
			expect(item.links).toBeDefined()
		}
	})

	it('Should return the order with related resources', async () => {
		const { statusCode, error, data: _data } = await getOrderItem(orderItemId, { include: ['order'] })
		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { links, data, included } = _data!
		expect(links.self).toEqual(`${API_BASE_URL}${PATH}${orderItemId}`)
		expect(data).toBeDefined()
		expect(included).toBeArray()
		expect(!!included?.filter((item) => item.type === 'orders')).toBeTrue()

		const { id, type, attributes, relationships } = data
		expect(id).toEqual(orderItemId.toString())
		expect(type).toEqual(DATA_TYPE)
		expect(attributes).toBeDefined()
		expect(relationships).toBeDefined()

		const {
			order_id,
			product_id,
			variant_id,
			price_id,
			product_name,
			variant_name,
			price,
			quantity,
			created_at,
			updated_at,
			test_mode,
		} = attributes
		const items = [
			order_id,
			product_id,
			variant_id,
			price_id,
			product_name,
			variant_name,
			price,
			quantity,
			created_at,
			updated_at,
			test_mode,
		]
		expect(Object.keys(attributes).length).toEqual(items.length)
		for (const item of items) {
			expect(item).toBeDefined()
		}

		const { order, product, variant } = relationships
		for (const item of [order, product, variant]) {
			expect(item.links).toBeDefined()
		}
	})
})

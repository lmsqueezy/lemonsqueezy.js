import { beforeAll, describe, expect, it } from 'bun:test'
import { getDiscountRedemption, lemonSqueezySetup, listDiscountRedemptions } from '../../src'
import { API_BASE_URL } from '../../src/internal'

const DATA_TYPE = 'discount-redemptions'
const PATH = '/v1/discount-redemptions/'
let discountRedemptionId: number | string
let discountId: number | string
let orderId: number | string

beforeAll(() => {
	lemonSqueezySetup({ apiKey: import.meta.env.LEMON_SQUEEZY_API_KEY })
})

describe('List all discount redemptions', () => {
	it('Should return a paginated list of discount redemptions', async () => {
		const { statusCode, error, data: _data } = await listDiscountRedemptions()
		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { meta, links, data } = _data!
		expect(data).toBeArray()
		expect(data[0]).toBeDefined()
		expect(links.first).toBeDefined()
		expect(links.last).toBeDefined()

		const { currentPage, from, to, perPage, lastPage, total } = meta.page
		const items = [currentPage, from, to, perPage, lastPage, total]
		for (const item of items) expect(item).toBeInteger()
		expect(Object.keys(meta.page).length).toEqual(items.length)

		const { id, attributes } = data[0]
		const { discount_id, order_id } = attributes
		discountRedemptionId = id
		discountId = discount_id
		orderId = order_id
	})

	it('Should return a paginated list of discount redemptions with related resources', async () => {
		const { statusCode, error, data: _data } = await listDiscountRedemptions({ include: ['order'] })
		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { meta, links, data, included } = _data!
		expect(data).toBeArray()
		expect(data[0]).toBeDefined()
		expect(links.first).toBeDefined()
		expect(links.last).toBeDefined()
		expect(included).toBeArray()
		expect(!!included?.filter((item) => item.type === 'orders')).toBeTrue()

		const { currentPage, from, to, perPage, lastPage, total } = meta.page
		const items = [currentPage, from, to, perPage, lastPage, total]
		for (const item of items) expect(item).toBeInteger()
		expect(Object.keys(meta.page).length).toEqual(items.length)
	})

	it('Should return a paginated list of discount redemptions filtered by discount id', async () => {
		const {
			statusCode,
			error,
			data: _data,
		} = await listDiscountRedemptions({
			filter: { discountId },
		})
		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { meta, links, data } = _data!
		expect(data.filter((item) => item.attributes.discount_id === Number(discountId)).length).toEqual(data.length)
		expect(links.first).toBeDefined()
		expect(links.last).toBeDefined()

		const { currentPage, from, to, perPage, lastPage, total } = meta.page
		const items = [currentPage, from, to, perPage, lastPage, total]
		for (const item of items) expect(item).toBeInteger()
		expect(Object.keys(meta.page).length).toEqual(items.length)
	})

	it('Should return a paginated list of discount redemptions filtered by order id', async () => {
		const {
			statusCode,
			error,
			data: _data,
		} = await listDiscountRedemptions({
			filter: { orderId },
		})
		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { meta, links, data } = _data!
		expect(data.filter((item) => item.attributes.order_id === Number(orderId)).length).toEqual(data.length)
		expect(links.first).toBeDefined()
		expect(links.last).toBeDefined()

		const { currentPage, from, to, perPage, lastPage, total } = meta.page
		const items = [currentPage, from, to, perPage, lastPage, total]
		for (const item of items) expect(item).toBeInteger()
		expect(Object.keys(meta.page).length).toEqual(items.length)
	})

	it('Should return a paginated list of discount redemptions with page_number = 1 and page_size = 5', async () => {
		const {
			error,
			data: _data,
			statusCode,
		} = await listDiscountRedemptions({
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

describe('Retrieve a discount redemption', () => {
	it('Throw an error about a parameter that must be provided', async () => {
		try {
			await getDiscountRedemption('')
		} catch (error) {
			expect((error as Error).message).toMatch('Please provide the required parameter:')
		}
	})

	it('Should return a discount redemption object', async () => {
		const { statusCode, error, data: _data } = await getDiscountRedemption(discountRedemptionId)
		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { data, links } = _data!
		expect(data).toBeDefined()
		expect(links).toBeDefined()
		expect(links.self).toEqual(`${API_BASE_URL}${PATH}${discountRedemptionId}`)

		const { type, id, attributes, relationships } = data
		expect(type).toEqual(DATA_TYPE)
		expect(id).toEqual(discountRedemptionId.toString())
		expect(attributes).toBeDefined()
		expect(relationships).toBeDefined()

		const {
			discount_id,
			order_id,
			discount_name,
			discount_code,
			discount_amount,
			discount_amount_type,
			amount,
			created_at,
			updated_at,
		} = attributes
		const items = [
			discount_id,
			order_id,
			discount_name,
			discount_code,
			discount_amount,
			discount_amount_type,
			amount,
			created_at,
			updated_at,
		]
		for (const item of items) expect(item).toBeDefined()
		expect(Object.keys(attributes).length).toEqual(items.length)
		expect(discount_id).toEqual(Number(discountId))
		expect(order_id).toEqual(Number(orderId))

		const { discount, order } = relationships
		const relationshipItems = [discount, order]
		for (const item of relationshipItems) expect(item).toBeDefined()
		expect(Object.keys(relationships).length).toEqual(relationshipItems.length)
	})

	it('Should return a discount redemption object with related resources', async () => {
		const { statusCode, error, data: _data } = await getDiscountRedemption(discountRedemptionId, { include: ['order'] })
		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { data, links, included } = _data!
		expect(data).toBeDefined()
		expect(links).toBeDefined()
		expect(links.self).toEqual(`${API_BASE_URL}${PATH}${discountRedemptionId}`)
		expect(included).toBeArray()
		expect(!!included?.filter((item) => item.type === 'orders')).toBeTrue()

		const { type, id, attributes, relationships } = data
		expect(type).toEqual(DATA_TYPE)
		expect(id).toEqual(discountRedemptionId.toString())
		expect(attributes).toBeDefined()
		expect(relationships).toBeDefined()

		const {
			discount_id,
			order_id,
			discount_name,
			discount_code,
			discount_amount,
			discount_amount_type,
			amount,
			created_at,
			updated_at,
		} = attributes
		const items = [
			discount_id,
			order_id,
			discount_name,
			discount_code,
			discount_amount,
			discount_amount_type,
			amount,
			created_at,
			updated_at,
		]
		for (const item of items) expect(item).toBeDefined()
		expect(Object.keys(attributes).length).toEqual(items.length)
		expect(discount_id).toEqual(Number(discountId))
		expect(order_id).toEqual(Number(orderId))

		const { discount, order } = relationships
		const relationshipItems = [discount, order]
		for (const item of relationshipItems) expect(item).toBeDefined()
		expect(Object.keys(relationships).length).toEqual(relationshipItems.length)
	})
})

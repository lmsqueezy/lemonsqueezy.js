import { beforeAll, describe, expect, it } from 'bun:test'
import { createDiscount, deleteDiscount, getDiscount, lemonSqueezySetup, listDiscounts, listVariants } from '../../src'
import type { NewDiscount } from '../../src/discounts/types'
import { API_BASE_URL, generateDiscount } from '../../src/internal'

const DATA_TYPE = 'discounts'
const PATH = '/v1/discounts/'
const storeId = import.meta.env.LEMON_SQUEEZY_STORE_ID
let discountId: number | string
let variantIds: Array<number | string>

beforeAll(async () => {
	lemonSqueezySetup({ apiKey: import.meta.env.LEMON_SQUEEZY_API_KEY })
	const { data } = await listVariants()
	variantIds = data?.data.map((item) => item.id)!
})

describe('Create a discount', () => {
	it('Should return a new discount object', async () => {
		const discountInfo: NewDiscount = {
			name: generateDiscount(),
			amount: 50,
			amountType: 'percent',
			storeId,
			variantIds,
		}
		const { statusCode, error, data: _data } = await createDiscount(discountInfo)
		expect(statusCode).toEqual(201)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { links, data } = _data!
		expect(data).toBeDefined()
		expect(links).toBeDefined()

		const { type, id, attributes, relationships } = data
		expect(type).toEqual(DATA_TYPE)
		expect(attributes).toBeDefined()
		expect(relationships).toBeDefined()

		const {
			store_id,
			name,
			code,
			amount,
			amount_type,
			is_limited_to_products,
			is_limited_redemptions,
			max_redemptions,
			starts_at,
			expires_at,
			duration,
			duration_in_months,
			status,
			status_formatted,
			created_at,
			updated_at,
			test_mode,
		} = attributes
		const items = [
			store_id,
			name,
			code,
			amount,
			amount_type,
			is_limited_to_products,
			is_limited_redemptions,
			max_redemptions,
			starts_at,
			expires_at,
			duration,
			duration_in_months,
			status,
			status_formatted,
			created_at,
			updated_at,
			test_mode,
		]
		for (const item of items) expect(item).toBeDefined()
		expect(Object.keys(attributes).length).toEqual(items.length)
		expect(store_id).toEqual(Number(storeId))
		expect(name).toEqual(discountInfo.name)
		expect(amount).toEqual(discountInfo.amount)
		expect(amount_type).toEqual(discountInfo.amountType)

		const { store, variants, 'discount-redemptions': discountRedemptions } = relationships
		const relationshipItems = [store, variants, discountRedemptions]
		for (const item of relationshipItems) expect(item).toBeDefined()
		expect(Object.keys(relationships).length).toEqual(relationshipItems.length)

		expect(links.self).toEqual(`${API_BASE_URL}${PATH}${id}`)

		discountId = id
	})

	it('Should return a new discount object using the given code', async () => {
		const discountInfo: NewDiscount = {
			name: generateDiscount(),
			code: generateDiscount(),
			amount: 20,
			amountType: 'percent',
			storeId,
			variantIds,
		}
		const { statusCode, error, data: _data } = await createDiscount(discountInfo)
		expect(statusCode).toEqual(201)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { links, data } = _data!
		expect(data).toBeDefined()
		expect(links).toBeDefined()

		const { type, id, attributes, relationships } = data
		expect(type).toEqual(DATA_TYPE)
		expect(attributes).toBeDefined()
		expect(relationships).toBeDefined()

		const {
			store_id,
			name,
			code,
			amount,
			amount_type,
			is_limited_to_products,
			is_limited_redemptions,
			max_redemptions,
			starts_at,
			expires_at,
			duration,
			duration_in_months,
			status,
			status_formatted,
			created_at,
			updated_at,
			test_mode,
		} = attributes
		const items = [
			store_id,
			name,
			code,
			amount,
			amount_type,
			is_limited_to_products,
			is_limited_redemptions,
			max_redemptions,
			starts_at,
			expires_at,
			duration,
			duration_in_months,
			status,
			status_formatted,
			created_at,
			updated_at,
			test_mode,
		]
		for (const item of items) expect(item).toBeDefined()
		expect(Object.keys(attributes).length).toEqual(items.length)
		expect(store_id).toEqual(Number(storeId))
		expect(name).toEqual(discountInfo.name)
		expect(code).toEqual(discountInfo.code!)
		expect(amount).toEqual(discountInfo.amount)
		expect(amount_type).toEqual(discountInfo.amountType)

		const { store, variants, 'discount-redemptions': discountRedemptions } = relationships
		const relationshipItems = [store, variants, discountRedemptions]
		for (const item of relationshipItems) expect(item).toBeDefined()
		expect(Object.keys(relationships).length).toEqual(relationshipItems.length)

		expect(links.self).toEqual(`${API_BASE_URL}${PATH}${id}`)
	})
})

describe('Retrieve a discount', () => {
	it('Throw an error about a parameter that must be provided', async () => {
		try {
			await getDiscount('')
		} catch (error) {
			expect((error as Error).message).toMatch('Please provide the required parameter:')
		}
	})

	it('Should return a discount object', async () => {
		const { statusCode, error, data: _data } = await getDiscount(discountId)

		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { links, data } = _data!
		expect(data).toBeDefined()
		expect(links).toBeDefined()

		const { type, id, attributes, relationships } = data
		expect(id).toEqual(discountId.toString())
		expect(type).toEqual(DATA_TYPE)
		expect(attributes).toBeDefined()
		expect(relationships).toBeDefined()

		const {
			store_id,
			name,
			code,
			amount,
			amount_type,
			is_limited_to_products,
			is_limited_redemptions,
			max_redemptions,
			starts_at,
			expires_at,
			duration,
			duration_in_months,
			status,
			status_formatted,
			created_at,
			updated_at,
			test_mode,
		} = attributes
		const items = [
			store_id,
			name,
			code,
			amount,
			amount_type,
			is_limited_to_products,
			is_limited_redemptions,
			max_redemptions,
			starts_at,
			expires_at,
			duration,
			duration_in_months,
			status,
			status_formatted,
			created_at,
			updated_at,
			test_mode,
		]
		for (const item of items) expect(item).toBeDefined()
		expect(Object.keys(attributes).length).toEqual(items.length)
		expect(store_id).toEqual(Number(storeId))

		const { store, variants, 'discount-redemptions': discountRedemptions } = relationships
		const relationshipItems = [store, variants, discountRedemptions]
		for (const item of relationshipItems) expect(item).toBeDefined()
		expect(Object.keys(relationships).length).toEqual(relationshipItems.length)

		expect(links.self).toEqual(`${API_BASE_URL}${PATH}${discountId}`)
	})

	it('Should return a discount object with related resources', async () => {
		const { statusCode, error, data: _data } = await getDiscount(discountId, { include: ['variants'] })

		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { links, data, included } = _data!
		expect(data).toBeDefined()
		expect(links).toBeDefined()
		expect(included).toBeArray()
		expect(!!included?.filter((item) => item.type === 'variants'))

		const { type, id, attributes, relationships } = data
		expect(id).toEqual(discountId.toString())
		expect(type).toEqual(DATA_TYPE)
		expect(attributes).toBeDefined()
		expect(relationships).toBeDefined()

		const {
			store_id,
			name,
			code,
			amount,
			amount_type,
			is_limited_to_products,
			is_limited_redemptions,
			max_redemptions,
			starts_at,
			expires_at,
			duration,
			duration_in_months,
			status,
			status_formatted,
			created_at,
			updated_at,
			test_mode,
		} = attributes
		const items = [
			store_id,
			name,
			code,
			amount,
			amount_type,
			is_limited_to_products,
			is_limited_redemptions,
			max_redemptions,
			starts_at,
			expires_at,
			duration,
			duration_in_months,
			status,
			status_formatted,
			created_at,
			updated_at,
			test_mode,
		]
		for (const item of items) expect(item).toBeDefined()
		expect(Object.keys(attributes).length).toEqual(items.length)
		expect(store_id).toEqual(Number(storeId))

		const { store, variants, 'discount-redemptions': discountRedemptions } = relationships
		const relationshipItems = [store, variants, discountRedemptions]
		for (const item of relationshipItems) expect(item).toBeDefined()
		expect(Object.keys(relationships).length).toEqual(relationshipItems.length)

		expect(links.self).toEqual(`${API_BASE_URL}${PATH}${discountId}`)
	})
})

describe('List all discounts', () => {
	it('Should return a paginated list of discounts', async () => {
		const { statusCode, error, data: _data } = await listDiscounts()
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

	it('Should return a paginated list of discounts with related resources', async () => {
		const { statusCode, error, data: _data } = await listDiscounts({ include: ['variants'] })
		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { meta, data, links, included } = _data!
		expect(meta.page).toBeDefined()
		expect(data).toBeArray()
		expect(links.first).toBeDefined()
		expect(links.last).toBeDefined()
		expect(included).toBeArray()
		expect(!!included?.filter((item) => item.type === 'variants'))

		const { currentPage, from, to, perPage, lastPage, total } = meta.page
		const items = [currentPage, from, to, perPage, lastPage, total]
		for (const item of items) expect(item).toBeInteger()
		expect(Object.keys(meta.page).length).toEqual(items.length)
	})

	it('Should return a paginated list of discounts filtered by store id', async () => {
		const { statusCode, error, data: _data } = await listDiscounts({ filter: { storeId } })
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

	it('Should return a paginated list of discounts with page_number = 1 and page_size = 5', async () => {
		const {
			error,
			data: _data,
			statusCode,
		} = await listDiscounts({
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

describe('Delete a discount', () => {
	it('Throw an error about a parameter that must be provided', async () => {
		try {
			await deleteDiscount('')
		} catch (error) {
			expect((error as Error).message).toMatch('Please provide the required parameter:')
		}
	})

	it('Should return a `204 No Content` response on success', async () => {
		const { statusCode, error, data } = await deleteDiscount(discountId)
		expect(statusCode).toEqual(204)
		expect(error).toBeNull()
		expect(data).toBeNull()
	})
})

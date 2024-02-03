import { beforeAll, describe, expect, it } from 'bun:test'
import { getPrice, lemonSqueezySetup, listPrices } from '../../src'
import { API_BASE_URL } from '../../src/internal'

const DATA_TYPE = 'prices'
const PATH = '/v1/prices/'
let priceId: number | string
let variantId: number | string

beforeAll(() => {
	lemonSqueezySetup({ apiKey: import.meta.env.LEMON_SQUEEZY_API_KEY })
})

describe('List all prices', () => {
	it('Should return a paginated list of prices', async () => {
		const { statusCode, error, data: _data } = await listPrices()
		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { meta, links, data } = _data!
		expect(meta.page).toBeDefined()
		expect(links.first).toBeDefined()
		expect(links.last).toBeDefined()
		expect(data).toBeArray()

		const { currentPage, from, lastPage, perPage, to, total } = meta.page
		const items = [currentPage, from, lastPage, perPage, to, total]
		for (const item of items) expect(item).toBeNumber()
		expect(Object.keys(meta.page).length).toEqual(items.length)

		const { variant } = data[0].relationships
		expect(variant.links).toBeDefined()

		priceId = data[0].id
		variantId = data[0].attributes.variant_id
	})

	it('Should return a paginated list of prices with related resources', async () => {
		const { statusCode, error, data: _data } = await listPrices({ include: ['variant'] })
		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { meta, links, data, included } = _data!
		expect(meta.page).toBeDefined()
		expect(links.first).toBeDefined()
		expect(links.last).toBeDefined()
		expect(data).toBeArray()
		expect(included).toBeArray()
		expect(!!included?.filter((item) => item.type === 'variants')).toBeTrue()

		const { currentPage, from, lastPage, perPage, to, total } = meta.page
		const items = [currentPage, from, lastPage, perPage, to, total]
		for (const item of items) expect(item).toBeNumber()
		expect(Object.keys(meta.page).length).toEqual(items.length)

		const { variant } = data[0].relationships
		expect(variant.links).toBeDefined()
	})

	it('Should return a paginated list of prices filtered by variant id', async () => {
		const { statusCode, error, data: _data } = await listPrices({ filter: { variantId } })
		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { meta, links, data } = _data!
		expect(meta.page).toBeDefined()
		expect(links.first).toBeDefined()
		expect(links.last).toBeDefined()
		expect(data.filter((item) => item.attributes.variant_id === Number(variantId)).length).toEqual(data.length)

		const { currentPage, from, lastPage, perPage, to, total } = meta.page
		const items = [currentPage, from, lastPage, perPage, to, total]
		for (const item of items) expect(item).toBeNumber()
		expect(Object.keys(meta.page).length).toEqual(items.length)

		const { variant } = data[0].relationships
		expect(variant.links).toBeDefined()
	})

	it('Should return a paginated list of prices with page_number = 1 and page_size = 5', async () => {
		const {
			error,
			data: _data,
			statusCode,
		} = await listPrices({
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

describe('Retrieve a price', () => {
	it('Throw an error about a parameter that must be provided', async () => {
		try {
			await getPrice('')
		} catch (error) {
			expect((error as Error).message).toMatch('Please provide the required parameter:')
		}
	})

	it('Should return the price with the given price id', async () => {
		const { statusCode, error, data: _data } = await getPrice(priceId)
		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { links, data } = _data!
		expect(links.self).toEqual(`${API_BASE_URL}${PATH}${priceId}`)
		expect(data).toBeDefined()

		const { id, type, attributes, relationships } = data
		expect(id).toEqual(priceId.toString())
		expect(type).toEqual(DATA_TYPE)
		expect(attributes).toBeDefined()
		expect(relationships).toBeDefined()

		const {
			variant_id,
			category,
			scheme,
			usage_aggregation,
			unit_price,
			unit_price_decimal,
			setup_fee_enabled,
			setup_fee,
			package_size,
			tiers,
			renewal_interval_quantity,
			renewal_interval_unit,
			trial_interval_unit,
			trial_interval_quantity,
			min_price,
			suggested_price,
			tax_code,
			created_at,
			updated_at,
		} = attributes
		const items = [
			variant_id,
			category,
			scheme,
			usage_aggregation,
			unit_price,
			unit_price_decimal,
			setup_fee_enabled,
			setup_fee,
			package_size,
			tiers,
			renewal_interval_quantity,
			renewal_interval_unit,
			trial_interval_unit,
			trial_interval_quantity,
			min_price,
			suggested_price,
			tax_code,
			created_at,
			updated_at,
		]
		for (const item of items) expect(item).toBeDefined()
		expect(variant_id).toEqual(Number(variantId))
		expect(Object.keys(attributes).length).toEqual(items.length)

		const { variant } = relationships
		expect(variant.links).toBeDefined()
	})

	it('Should return a price object with related resources', async () => {
		const { statusCode, error, data: _data } = await getPrice(priceId, { include: ['variant'] })
		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { links, data, included } = _data!
		expect(links.self).toEqual(`${API_BASE_URL}${PATH}${priceId}`)
		expect(data).toBeDefined()
		expect(included).toBeArray()
		expect(!!included?.filter((item) => item.type === 'variants')).toBeTrue()

		const { id, type, attributes, relationships } = data
		expect(id).toEqual(priceId.toString())
		expect(type).toEqual(DATA_TYPE)
		expect(attributes).toBeDefined()
		expect(relationships).toBeDefined()

		const {
			variant_id,
			category,
			scheme,
			usage_aggregation,
			unit_price,
			unit_price_decimal,
			setup_fee_enabled,
			setup_fee,
			package_size,
			tiers,
			renewal_interval_quantity,
			renewal_interval_unit,
			trial_interval_unit,
			trial_interval_quantity,
			min_price,
			suggested_price,
			tax_code,
			created_at,
			updated_at,
		} = attributes
		const items = [
			variant_id,
			category,
			scheme,
			usage_aggregation,
			unit_price,
			unit_price_decimal,
			setup_fee_enabled,
			setup_fee,
			package_size,
			tiers,
			renewal_interval_quantity,
			renewal_interval_unit,
			trial_interval_unit,
			trial_interval_quantity,
			min_price,
			suggested_price,
			tax_code,
			created_at,
			updated_at,
		]
		for (const item of items) expect(item).toBeDefined()
		expect(variant_id).toEqual(Number(variantId))
		expect(Object.keys(attributes).length).toEqual(items.length)

		const { variant } = relationships
		expect(variant.links).toBeDefined()
	})
})

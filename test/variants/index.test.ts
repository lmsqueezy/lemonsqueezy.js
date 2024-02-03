import { beforeAll, describe, expect, it } from 'bun:test'
import { getVariant, lemonSqueezySetup, listVariants } from '../../src'
import { API_BASE_URL } from '../../src/internal'

const DATA_TYPE = 'variants'
const PATH = '/v1/variants/'
let variantId: number | string
let productId: number | string
let status: any

beforeAll(() => {
	lemonSqueezySetup({ apiKey: import.meta.env.LEMON_SQUEEZY_API_KEY })
})

describe('List all variants', () => {
	it('Should return a paginated list of variants', async () => {
		const { statusCode, error, data: _data } = await listVariants()
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

		variantId = data[0].id
		productId = data[0].attributes.product_id
		status = data[0].attributes.status
	})

	it('Should return a paginated list of variants with related resources', async () => {
		const { statusCode, error, data: _data } = await listVariants({ include: ['product'] })
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
		const items = [currentPage, from, lastPage, perPage, to, total]
		for (const item of items) expect(item).toBeNumber()
		expect(Object.keys(meta.page).length).toEqual(items.length)
	})

	it('Should return a paginated list of variants filtered by product id', async () => {
		const { statusCode, error, data: _data } = await listVariants({ filter: { productId } })
		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { meta, links, data } = _data!
		expect(meta.page).toBeDefined()
		expect(links.first).toBeDefined()
		expect(links.last).toBeDefined()
		expect(data.filter((item) => item.attributes.product_id === Number(productId)).length).toEqual(data.length)

		const { currentPage, from, lastPage, perPage, to, total } = meta.page
		const items = [currentPage, from, lastPage, perPage, to, total]
		for (const item of items) expect(item).toBeNumber()
		expect(Object.keys(meta.page).length).toEqual(items.length)
	})

	it('Should return a paginated list of orders filtered by status', async () => {
		const { statusCode, error, data: _data } = await listVariants({ filter: { status } })
		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { meta, links, data } = _data!
		expect(meta.page).toBeDefined()
		expect(links.first).toBeDefined()
		expect(links.last).toBeDefined()
		expect(data.filter((item) => item.attributes.status === status).length).toEqual(data.length)

		const { currentPage, from, lastPage, perPage, to, total } = meta.page
		const items = [currentPage, from, lastPage, perPage, to, total]
		for (const item of items) expect(item).toBeNumber()
		expect(Object.keys(meta.page).length).toEqual(items.length)
	})

	it('Should return a paginated list of orders with page_number = 1 and page_size = 5', async () => {
		const {
			error,
			data: _data,
			statusCode,
		} = await listVariants({
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

describe('Retrieve a variant', () => {
	it('Throw an error about a parameter that must be provided', async () => {
		try {
			await getVariant('')
		} catch (error) {
			expect((error as Error).message).toMatch('Please provide the required parameter:')
		}
	})

	it('Should return the variant with the given variant id', async () => {
		const { statusCode, error, data: _data } = await getVariant(variantId)
		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { links, data } = _data!
		expect(links.self).toEqual(`${API_BASE_URL}${PATH}${variantId}`)
		expect(data).toBeDefined()

		const { id, type, attributes, relationships } = data
		expect(id).toEqual(variantId.toString())
		expect(type).toEqual(DATA_TYPE)
		expect(attributes).toBeDefined()
		expect(relationships).toBeDefined()

		const {
			product_id,
			name,
			slug,
			description,
			has_license_keys,
			license_activation_limit,
			is_license_limit_unlimited,
			license_length_value,
			license_length_unit,
			is_license_length_unlimited,
			sort,
			status,
			status_formatted,
			created_at,
			updated_at,
			test_mode,
			// -> deprecated
			price,
			is_subscription,
			interval,
			interval_count,
			has_free_trial,
			trial_interval,
			trial_interval_count,
			pay_what_you_want,
			min_price,
			suggested_price,
			// <- deprecated
		} = attributes
		const items = [
			product_id,
			name,
			slug,
			description,
			has_license_keys,
			license_activation_limit,
			is_license_limit_unlimited,
			license_length_value,
			license_length_unit,
			is_license_length_unlimited,
			sort,
			status,
			status_formatted,
			created_at,
			updated_at,
			test_mode,
		]
		const deprecatedItems = [
			price,
			is_subscription,
			interval,
			interval_count,
			has_free_trial,
			trial_interval,
			trial_interval_count,
			pay_what_you_want,
			min_price,
			suggested_price,
		]
		for (const item of items) expect(item).toBeDefined()
		for (const item of deprecatedItems) expect(item).toBeDefined()
		expect(Object.keys(attributes).length).toEqual(items.length + deprecatedItems.length)
		expect(product_id).toEqual(Number(productId))
		expect(status).toEqual('pending')

		const { product } = relationships
		expect(product.links).toBeDefined()
	})

	it('Should return the variant with the given variant id with related resources', async () => {
		const { statusCode, error, data: _data } = await getVariant(variantId, { include: ['product'] })
		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { links, data, included } = _data!
		expect(links.self).toEqual(`${API_BASE_URL}${PATH}${variantId}`)
		expect(data).toBeDefined()
		expect(included).toBeArray()
		expect(!!included?.filter((item) => item.type === 'products')).toBeTrue()

		const { id, type, attributes, relationships } = data
		expect(id).toEqual(variantId.toString())
		expect(type).toEqual(DATA_TYPE)
		expect(attributes).toBeDefined()
		expect(relationships).toBeDefined()

		const {
			product_id,
			name,
			slug,
			description,
			has_license_keys,
			license_activation_limit,
			is_license_limit_unlimited,
			license_length_value,
			license_length_unit,
			is_license_length_unlimited,
			sort,
			status,
			status_formatted,
			created_at,
			updated_at,
			test_mode,
			// -> deprecated
			price,
			is_subscription,
			interval,
			interval_count,
			has_free_trial,
			trial_interval,
			trial_interval_count,
			pay_what_you_want,
			min_price,
			suggested_price,
			// <- deprecated
		} = attributes
		const items = [
			product_id,
			name,
			slug,
			description,
			has_license_keys,
			license_activation_limit,
			is_license_limit_unlimited,
			license_length_value,
			license_length_unit,
			is_license_length_unlimited,
			sort,
			status,
			status_formatted,
			created_at,
			updated_at,
			test_mode,
		]
		const deprecatedItems = [
			price,
			is_subscription,
			interval,
			interval_count,
			has_free_trial,
			trial_interval,
			trial_interval_count,
			pay_what_you_want,
			min_price,
			suggested_price,
		]
		for (const item of items) expect(item).toBeDefined()
		for (const item of deprecatedItems) expect(item).toBeDefined()
		expect(Object.keys(attributes).length).toEqual(items.length + deprecatedItems.length)
		expect(product_id).toEqual(Number(productId))
		expect(status).toEqual('pending')

		const { product } = relationships
		expect(product.links).toBeDefined()
	})
})

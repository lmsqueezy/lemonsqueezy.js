import { beforeAll, describe, expect, it } from 'bun:test'
import { getOrder, lemonSqueezySetup, listOrders } from '../../src'
import { API_BASE_URL } from '../../src/internal'

const DATA_TYPE = 'orders'
const PATH = '/v1/orders/'
let storeId: any
let orderId: any
let userEmail: any

beforeAll(() => {
	lemonSqueezySetup({ apiKey: import.meta.env.LEMON_SQUEEZY_API_KEY })
})

describe('List all orders', () => {
	it('Should return a paginated list of orders', async () => {
		const { statusCode, error, data: _data } = await listOrders()
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

		const {
			store,
			customer,
			'order-items': orderItems,
			subscriptions,
			'license-keys': licenseKeys,
			'discount-redemptions': discountRedemptions,
		} = data[0].relationships
		for (const item of [store, customer, orderItems, subscriptions, licenseKeys, discountRedemptions]) {
			expect(item.links).toBeDefined()
		}

		orderId = data[0].id
		storeId = data[0].attributes.store_id
		userEmail = data[0].attributes.user_email
	})

	it('Should return a paginated list of orders with related resources', async () => {
		const { statusCode, error, data: _data } = await listOrders({ include: ['customer'] })
		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { meta, links, data, included } = _data!
		expect(meta.page).toBeDefined()
		expect(links.first).toBeDefined()
		expect(links.last).toBeDefined()
		expect(data).toBeArray()
		expect(included).toBeArray()
		expect(!!included?.filter((item) => item.type === 'customers')).toBeTrue()

		const { currentPage, from, lastPage, perPage, to, total } = meta.page
		for (const item of [currentPage, from, lastPage, perPage, to, total]) {
			expect(item).toBeNumber()
		}

		const {
			store,
			customer,
			'order-items': orderItems,
			subscriptions,
			'license-keys': licenseKeys,
			'discount-redemptions': discountRedemptions,
		} = data[0].relationships
		for (const item of [store, customer, orderItems, subscriptions, licenseKeys, discountRedemptions]) {
			expect(item.links).toBeDefined()
		}
	})

	it('Should return a paginated list of orders filtered by store id', async () => {
		const { statusCode, error, data: _data } = await listOrders({ filter: { storeId } })
		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { meta, links, data } = _data!
		expect(meta.page).toBeDefined()
		expect(links.first).toBeDefined()
		expect(links.last).toBeDefined()
		expect(data.filter((item) => item.attributes.store_id === Number(storeId)).length).toEqual(data.length)

		const { currentPage, from, lastPage, perPage, to, total } = meta.page
		for (const item of [currentPage, from, lastPage, perPage, to, total]) {
			expect(item).toBeNumber()
		}

		const {
			store,
			customer,
			'order-items': orderItems,
			subscriptions,
			'license-keys': licenseKeys,
			'discount-redemptions': discountRedemptions,
		} = data[0].relationships
		for (const item of [store, customer, orderItems, subscriptions, licenseKeys, discountRedemptions]) {
			expect(item.links).toBeDefined()
		}
	})

	it('Should return a paginated list of orders filtered by user email', async () => {
		const { statusCode, error, data: _data } = await listOrders({ filter: { userEmail } })
		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { meta, links, data } = _data!
		expect(meta.page).toBeDefined()
		expect(links.first).toBeDefined()
		expect(links.last).toBeDefined()
		expect(data.filter((item) => item.attributes.user_email === userEmail).length).toEqual(data.length)

		const { currentPage, from, lastPage, perPage, to, total } = meta.page
		for (const item of [currentPage, from, lastPage, perPage, to, total]) {
			expect(item).toBeNumber()
		}

		const {
			store,
			customer,
			'order-items': orderItems,
			subscriptions,
			'license-keys': licenseKeys,
			'discount-redemptions': discountRedemptions,
		} = data[0].relationships
		for (const item of [store, customer, orderItems, subscriptions, licenseKeys, discountRedemptions]) {
			expect(item.links).toBeDefined()
		}
	})

	it('Should return a paginated list of orders with page_number = 1 and page_size = 5', async () => {
		const {
			error,
			data: _data,
			statusCode,
		} = await listOrders({
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

describe('Retrieve an order', () => {
	it('Throw an error about a parameter that must be provided', async () => {
		try {
			await getOrder('')
		} catch (error) {
			expect((error as Error).message).toMatch('Please provide the required parameter:')
		}
	})

	it('Should return the order with the given order id', async () => {
		const { statusCode, error, data: _data } = await getOrder(orderId)
		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { links, data } = _data!
		expect(links.self).toEqual(`${API_BASE_URL}${PATH}${orderId}`)
		expect(data).toBeDefined()

		const { id, type, attributes, relationships } = data
		expect(id).toEqual(orderId.toString())
		expect(type).toEqual(DATA_TYPE)
		expect(attributes).toBeDefined()
		expect(relationships).toBeDefined()

		const {
			store_id,
			customer_id,
			identifier,
			order_number,
			user_name,
			user_email,
			currency,
			currency_rate,
			subtotal,
			discount_total,
			tax,
			subtotal_usd,
			tax_usd,
			total_usd,
			tax_name,
			tax_rate,
			status,
			status_formatted,
			refunded,
			refunded_at,
			subtotal_formatted,
			discount_total_formatted,
			tax_formatted,
			total_formatted,
			first_order_item,
			urls,
			created_at,
			updated_at,
			test_mode,
		} = attributes
		expect(store_id).toEqual(Number(storeId))
		expect(urls.receipt).toBeDefined()
		for (const item of [
			customer_id,
			identifier,
			order_number,
			user_name,
			user_email,
			currency,
			currency_rate,
			subtotal,
			discount_total,
			tax,
			subtotal_usd,
			tax_usd,
			total_usd,
			tax_name,
			tax_rate,
			status,
			status_formatted,
			refunded,
			refunded_at,
			subtotal_formatted,
			discount_total_formatted,
			tax_formatted,
			total_formatted,
			first_order_item,
			urls,
			created_at,
			updated_at,
			test_mode,
		]) {
			expect(item).toBeDefined()
		}

		const {
			id: firstOrderItemId,
			order_id,
			product_id,
			variant_id,
			price_id,
			product_name,
			variant_name,
			price,
			quantity,
			created_at: createdAt,
			updated_at: updatedAt,
			test_mode: testMode,
		} = first_order_item
		for (const item of [
			firstOrderItemId,
			order_id,
			product_id,
			variant_id,
			price_id,
			product_name,
			variant_name,
			price,
			quantity,
			createdAt,
			updatedAt,
			testMode,
		]) {
			expect(item).toBeDefined()
		}

		const {
			store,
			customer,
			'order-items': orderItems,
			subscriptions,
			'license-keys': licenseKeys,
			'discount-redemptions': discountRedemptions,
		} = relationships
		for (const item of [store, customer, orderItems, subscriptions, licenseKeys, discountRedemptions]) {
			expect(item.links).toBeDefined()
		}
	})

	it('Should return the order with related resources', async () => {
		const { statusCode, error, data: _data } = await getOrder(orderId, { include: ['customer'] })
		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { links, data, included } = _data!
		expect(links.self).toEqual(`${API_BASE_URL}${PATH}${orderId}`)
		expect(data).toBeDefined()
		expect(included).toBeArray()
		expect(!!included?.filter((item) => item.type === 'customers')).toBeTrue()

		const { id, type, attributes, relationships } = data
		expect(id).toEqual(orderId.toString())
		expect(type).toEqual(DATA_TYPE)
		expect(attributes).toBeDefined()
		expect(relationships).toBeDefined()

		const {
			store_id,
			customer_id,
			identifier,
			order_number,
			user_name,
			user_email,
			currency,
			currency_rate,
			subtotal,
			discount_total,
			tax,
			subtotal_usd,
			tax_usd,
			total_usd,
			tax_name,
			tax_rate,
			status,
			status_formatted,
			refunded,
			refunded_at,
			subtotal_formatted,
			discount_total_formatted,
			tax_formatted,
			total_formatted,
			first_order_item,
			urls,
			created_at,
			updated_at,
			test_mode,
		} = attributes
		expect(store_id).toEqual(Number(storeId))
		expect(urls.receipt).toBeDefined()
		for (const item of [
			customer_id,
			identifier,
			order_number,
			user_name,
			user_email,
			currency,
			currency_rate,
			subtotal,
			discount_total,
			tax,
			subtotal_usd,
			tax_usd,
			total_usd,
			tax_name,
			tax_rate,
			status,
			status_formatted,
			refunded,
			refunded_at,
			subtotal_formatted,
			discount_total_formatted,
			tax_formatted,
			total_formatted,
			first_order_item,
			urls,
			created_at,
			updated_at,
			test_mode,
		]) {
			expect(item).toBeDefined()
		}

		const {
			id: firstOrderItemId,
			order_id,
			product_id,
			variant_id,
			price_id,
			product_name,
			variant_name,
			price,
			quantity,
			created_at: createdAt,
			updated_at: updatedAt,
			test_mode: testMode,
		} = first_order_item
		for (const item of [
			firstOrderItemId,
			order_id,
			product_id,
			variant_id,
			price_id,
			product_name,
			variant_name,
			price,
			quantity,
			createdAt,
			updatedAt,
			testMode,
		]) {
			expect(item).toBeDefined()
		}

		const {
			store,
			customer,
			'order-items': orderItems,
			subscriptions,
			'license-keys': licenseKeys,
			'discount-redemptions': discountRedemptions,
		} = relationships
		for (const item of [store, customer, orderItems, subscriptions, licenseKeys, discountRedemptions]) {
			expect(item.links).toBeDefined()
		}
	})
})

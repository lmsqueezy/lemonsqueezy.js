import { beforeAll, describe, expect, it } from 'bun:test'
import { getSubscriptionInvoice, lemonSqueezySetup, listSubscriptionInvoices } from '../../src'
import { API_BASE_URL } from '../../src/internal'

const DATA_TYPE = 'subscription-invoices'
const PATH = '/v1/subscription-invoices/'
let subscriptionInvoiceId: string | number
let storeId: string | number
let invoiceStatus: any
let invoiceRefunded: boolean
let subscriptionId: string | number

beforeAll(() => {
	lemonSqueezySetup({ apiKey: import.meta.env.LEMON_SQUEEZY_API_KEY })
})

describe('List all subscription invoices', () => {
	it('Should return a paginated list of subscription invoices', async () => {
		const { statusCode, error, data: _data } = await listSubscriptionInvoices()
		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { meta, data, links } = _data!
		expect(meta.page).toBeDefined()
		expect(links.first).toBeString()
		expect(links.last).toBeString()
		expect(data).toBeArray()
		expect(data[0]).toBeDefined()

		const { id, attributes } = data[0]
		const { store_id, status, refunded, subscription_id } = attributes
		subscriptionInvoiceId = id
		storeId = store_id
		invoiceStatus = status
		invoiceRefunded = refunded
		subscriptionId = subscription_id
	})

	it('Should return a paginated list of subscription invoices with related resources', async () => {
		const { statusCode, error, data: _data } = await listSubscriptionInvoices({ include: ['store'] })
		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { meta, data, links, included } = _data!
		expect(meta.page).toBeDefined()
		expect(links.first).toBeString()
		expect(links.last).toBeString()
		expect(data).toBeArray()
		expect(data[0]).toBeDefined()
		expect(included).toBeArray()
		expect(!!included?.filter((item) => item.type === 'stores')).toBeTrue()
	})

	it('Should return a paginated list of subscription invoices filtered by store id', async () => {
		const { statusCode, error, data: _data } = await listSubscriptionInvoices({ filter: { storeId } })
		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { meta, data, links } = _data!
		expect(meta.page).toBeDefined()
		expect(links.first).toBeString()
		expect(links.last).toBeString()
		expect(data.filter((item) => item.attributes.store_id === Number(storeId)).length).toEqual(data.length)
	})

	it('Should return a paginated list of subscription invoices filtered by invoice status', async () => {
		const {
			statusCode,
			error,
			data: _data,
		} = await listSubscriptionInvoices({
			filter: { status: invoiceStatus },
		})
		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { meta, data, links } = _data!
		expect(meta.page).toBeDefined()
		expect(links.first).toBeString()
		expect(links.last).toBeString()
		expect(data.filter((item) => item.attributes.status === invoiceStatus).length).toEqual(data.length)
	})

	it('Should return a paginated list of subscription invoices filtered by invoice refunded', async () => {
		const {
			statusCode,
			error,
			data: _data,
		} = await listSubscriptionInvoices({
			filter: { refunded: invoiceRefunded },
		})
		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { meta, data, links } = _data!
		expect(meta.page).toBeDefined()
		expect(links.first).toBeString()
		expect(links.last).toBeString()
		expect(data.filter((item) => item.attributes.refunded === invoiceRefunded).length).toEqual(data.length)
	})

	it('Should return a paginated list of subscription invoices filtered by subscription id', async () => {
		const { statusCode, error, data: _data } = await listSubscriptionInvoices({ filter: { subscriptionId } })
		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { meta, data, links } = _data!
		expect(meta.page).toBeDefined()
		expect(links.first).toBeString()
		expect(links.last).toBeString()
		expect(data.filter((item) => item.attributes.subscription_id === Number(subscriptionId)).length).toEqual(
			data.length,
		)
	})

	it('Should return a paginated list of subscription invoices  with page_number = 1 and page_size = 5', async () => {
		const {
			error,
			data: _data,
			statusCode,
		} = await listSubscriptionInvoices({
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

describe('Retrieve a subscription invoice', () => {
	it('Throw an error about a parameter that must be provided', async () => {
		try {
			await getSubscriptionInvoice('')
		} catch (error) {
			expect((error as Error).message).toMatch('Please provide the required parameter:')
		}
	})

	it('Should return the subscription invoice with the given subscription invoice id', async () => {
		const { statusCode, error, data: _data } = await getSubscriptionInvoice(subscriptionInvoiceId)
		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { data, links } = _data!
		expect(data).toBeDefined()
		expect(links.self).toEqual(`${API_BASE_URL}${PATH}${subscriptionInvoiceId}`)

		const { type, id, attributes, relationships } = data
		expect(type).toEqual(DATA_TYPE)
		expect(id).toEqual(subscriptionInvoiceId.toString())
		expect(attributes).toBeDefined()
		expect(relationships).toBeDefined()

		const {
			store_id,
			subscription_id,
			customer_id,
			user_name,
			user_email,
			billing_reason,
			card_brand,
			card_last_four,
			currency,
			currency_rate,
			status,
			status_formatted,
			refunded,
			refunded_at,
			subtotal,
			discount_total,
			tax,
			total,
			subtotal_usd,
			discount_total_usd,
			tax_usd,
			total_usd,
			subtotal_formatted,
			discount_total_formatted,
			tax_formatted,
			total_formatted,
			urls,
			created_at,
			updated_at,
			test_mode,
		} = attributes
		const items = [
			store_id,
			subscription_id,
			customer_id,
			user_name,
			user_email,
			billing_reason,
			card_brand,
			card_last_four,
			currency,
			currency_rate,
			status,
			status_formatted,
			refunded,
			refunded_at,
			subtotal,
			discount_total,
			tax,
			total,
			subtotal_usd,
			discount_total_usd,
			tax_usd,
			total_usd,
			subtotal_formatted,
			discount_total_formatted,
			tax_formatted,
			total_formatted,
			urls,
			created_at,
			updated_at,
			test_mode,
		]
		expect(subscription_id).toEqual(Number(subscriptionId))
		expect(Object.keys(attributes).length).toEqual(items.length)
		for (const item of items) expect(item).toBeDefined()
		expect(urls.invoice_url).toBeDefined()

		const { store, subscription, customer } = relationships
		const relationshipItems = [store, subscription, customer]
		expect(Object.keys(relationshipItems).length).toEqual(relationshipItems.length)
		for (const item of relationshipItems) expect(item.links).toBeDefined()
	})

	it('Should return the subscription invoice with related resources', async () => {
		const {
			statusCode,
			error,
			data: _data,
		} = await getSubscriptionInvoice(subscriptionInvoiceId, { include: ['subscription'] })
		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { data, links, included } = _data!
		expect(data).toBeDefined()
		expect(links.self).toEqual(`${API_BASE_URL}${PATH}${subscriptionInvoiceId}`)
		expect(included).toBeArray()
		expect(!!included?.filter((item) => item.type === 'subscriptions')).toBeTrue()

		const { type, id, attributes, relationships } = data
		expect(type).toEqual(DATA_TYPE)
		expect(id).toEqual(subscriptionInvoiceId.toString())
		expect(attributes).toBeDefined()
		expect(relationships).toBeDefined()

		const {
			store_id,
			subscription_id,
			customer_id,
			user_name,
			user_email,
			billing_reason,
			card_brand,
			card_last_four,
			currency,
			currency_rate,
			status,
			status_formatted,
			refunded,
			refunded_at,
			subtotal,
			discount_total,
			tax,
			total,
			subtotal_usd,
			discount_total_usd,
			tax_usd,
			total_usd,
			subtotal_formatted,
			discount_total_formatted,
			tax_formatted,
			total_formatted,
			urls,
			created_at,
			updated_at,
			test_mode,
		} = attributes
		const items = [
			store_id,
			subscription_id,
			customer_id,
			user_name,
			user_email,
			billing_reason,
			card_brand,
			card_last_four,
			currency,
			currency_rate,
			status,
			status_formatted,
			refunded,
			refunded_at,
			subtotal,
			discount_total,
			tax,
			total,
			subtotal_usd,
			discount_total_usd,
			tax_usd,
			total_usd,
			subtotal_formatted,
			discount_total_formatted,
			tax_formatted,
			total_formatted,
			urls,
			created_at,
			updated_at,
			test_mode,
		]
		expect(subscription_id).toEqual(Number(subscriptionId))
		expect(Object.keys(attributes).length).toEqual(items.length)
		for (const item of items) expect(item).toBeDefined()
		expect(urls.invoice_url).toBeDefined()

		const { store, subscription, customer } = relationships
		const relationshipItems = [store, subscription, customer]
		expect(Object.keys(relationshipItems).length).toEqual(relationshipItems.length)
		for (const item of relationshipItems) expect(item.links).toBeDefined()
	})
})

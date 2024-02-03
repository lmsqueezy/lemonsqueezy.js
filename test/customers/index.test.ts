import { beforeAll, describe, expect, it } from 'bun:test'
import {
	archiveCustomer,
	createCustomer,
	getCustomer,
	lemonSqueezySetup,
	listCustomers,
	updateCustomer,
} from '../../src'
import { API_BASE_URL } from '../../src/internal'

const _getRandomString = (length: number) => [...Array(length)].map(() => Math.random().toString(36).charAt(2)).join('')

const DATA_TYPE = 'customers'
const storeId = import.meta.env.LEMON_SQUEEZY_STORE_ID
let newCustomerId: number | string
let newCustomerEmail: string

beforeAll(() => {
	lemonSqueezySetup({ apiKey: import.meta.env.LEMON_SQUEEZY_API_KEY })
})

describe('Create a customer', () => {
	it('Throw an error about a parameter that must be provided', async () => {
		try {
			await createCustomer('', { name: '', email: '' })
		} catch (error) {
			expect((error as Error).message).toMatch('Please provide the required parameter:')
		}
	})

	it('A new customer should be created with the given store id', async () => {
		const name = _getRandomString(6)
		const email = `${name}@example.com`

		const {
			error,
			data: _data,
			statusCode,
		} = await createCustomer(storeId, {
			name,
			email,
		})
		expect(error).toBeNull()
		expect(statusCode).toEqual(201)
		expect(_data).toBeDefined()

		const { data, links } = _data!
		expect(data).toBeDefined()
		expect(links).toBeDefined()

		const { id, type, attributes, relationships } = data
		expect(id).toBeDefined()
		expect(type).toEqual(DATA_TYPE)
		expect(attributes).toBeDefined()
		expect(relationships).toBeDefined()

		// attributes
		const {
			store_id,
			name: newName,
			email: newEmail,
			status,
			city,
			region,
			country,
			total_revenue_currency,
			mrr,
			status_formatted,
			country_formatted,
			total_revenue_currency_formatted,
			mrr_formatted,
			urls,
			created_at,
			updated_at,
			test_mode,
		} = attributes
		const items = [
			store_id,
			newName,
			newEmail,
			status,
			city,
			region,
			country,
			total_revenue_currency,
			mrr,
			status_formatted,
			country_formatted,
			total_revenue_currency_formatted,
			mrr_formatted,
			urls,
			created_at,
			updated_at,
			test_mode,
		]
		for (const item of items) expect(item).toBeDefined()
		expect(Object.keys(attributes).length).toEqual(items.length)
		expect(store_id).toEqual(Number(storeId))
		expect(newName).toEqual(name)
		expect(newEmail).toEqual(email)
		expect(status).toEqual('subscribed')

		// relationships
		const { orders, 'license-keys': licenseKeys, subscriptions, store } = relationships
		const relationshipItems = [orders, licenseKeys, subscriptions, store]
		for (const item of relationshipItems) expect(item.links).toBeDefined()

		const { self } = links
		expect(self).toEqual(`${API_BASE_URL}/v1/customers/${id}`)

		newCustomerId = Number(id)
		newCustomerEmail = email
	})
})

describe('Update a customer', () => {
	it('Throw an error about a parameter that must be provided', async () => {
		try {
			await updateCustomer('', { name: '', email: '' })
		} catch (error) {
			expect((error as Error).message).toMatch('Please provide the required parameter:')
		}
	})

	it('Should return new name and new email with the given customerId', async () => {
		const name = _getRandomString(6)
		const email = `${name}@example.com`
		const {
			error,
			data: _data,
			statusCode,
		} = await updateCustomer(newCustomerId, {
			name,
			email,
		})
		expect(error).toBeNull()
		expect(statusCode).toEqual(200)
		expect(_data).toBeDefined()

		const { data, links } = _data!
		expect(data).toBeDefined()
		expect(links).toBeDefined()

		const { id, type, attributes, relationships } = data
		expect(id).toEqual(newCustomerId.toString())
		expect(type).toEqual(DATA_TYPE)
		expect(attributes).toBeDefined()
		expect(relationships).toBeDefined()

		// attributes
		const {
			store_id,
			name: newName,
			email: newEmail,
			status,
			city,
			region,
			country,
			total_revenue_currency,
			mrr,
			status_formatted,
			country_formatted,
			total_revenue_currency_formatted,
			mrr_formatted,
			urls,
			created_at,
			updated_at,
			test_mode,
		} = attributes
		const items = [
			store_id,
			newName,
			newEmail,
			status,
			city,
			region,
			country,
			total_revenue_currency,
			mrr,
			status_formatted,
			country_formatted,
			total_revenue_currency_formatted,
			mrr_formatted,
			urls,
			created_at,
			updated_at,
			test_mode,
		]
		for (const item of items) expect(item).toBeDefined()
		expect(Object.keys(attributes).length).toEqual(items.length)
		expect(newName).toEqual(name)
		expect(newEmail).toEqual(email)

		// relationships
		const { orders, 'license-keys': licenseKeys, subscriptions, store } = relationships
		const relationshipItems = [orders, licenseKeys, subscriptions, store]
		for (const item of relationshipItems) expect(item.links).toBeDefined()

		const { self } = links
		expect(self).toEqual(`${API_BASE_URL}/v1/customers/${id}`)
	})

	it('Should return new city, new region and new country with the given customer id', async () => {
		const {
			error,
			data: _data,
			statusCode,
		} = await updateCustomer(newCustomerId, {
			city: 'Piggotts',
			region: 'SG',
			country: 'AG',
		})

		expect(error).toBeNull()
		expect(statusCode).toEqual(200)
		expect(_data).toBeDefined()

		const { data, links } = _data!
		expect(data).toBeDefined()
		expect(links).toBeDefined()

		const { id, type, attributes, relationships } = data
		expect(id).toEqual(newCustomerId.toString())
		expect(type).toEqual(DATA_TYPE)
		expect(attributes).toBeDefined()
		expect(relationships).toBeDefined()

		// attributes
		const {
			store_id,
			name: newName,
			email: newEmail,
			status,
			city,
			region,
			country,
			total_revenue_currency,
			mrr,
			status_formatted,
			country_formatted,
			total_revenue_currency_formatted,
			mrr_formatted,
			urls,
			created_at,
			updated_at,
			test_mode,
		} = attributes
		const items = [
			store_id,
			newName,
			newEmail,
			status,
			city,
			region,
			country,
			total_revenue_currency,
			mrr,
			status_formatted,
			country_formatted,
			total_revenue_currency_formatted,
			mrr_formatted,
			urls,
			created_at,
			updated_at,
			test_mode,
		]
		for (const item of items) expect(item).toBeDefined()
		expect(Object.keys(attributes).length).toEqual(items.length)
		expect(city).toEqual('Piggotts')
		expect(region).toEqual('SG')
		expect(country).toEqual('AG')

		// relationships
		const { orders, 'license-keys': licenseKeys, subscriptions, store } = relationships
		const relationshipItems = [orders, licenseKeys, subscriptions, store]
		for (const item of relationshipItems) expect(item.links).toBeDefined()

		const { self } = links
		expect(self).toEqual(`${API_BASE_URL}/v1/customers/${id}`)
	})

	it('Should return the status of `archived` with the given customer id', async () => {
		const { error, data: _data, statusCode } = await archiveCustomer(newCustomerId)

		expect(error).toBeNull()
		expect(statusCode).toEqual(200)
		expect(_data).toBeDefined()

		const { data, links } = _data!
		expect(data).toBeDefined()
		expect(links).toBeDefined()

		const { id, type, attributes, relationships } = data
		expect(id).toEqual(newCustomerId.toString())
		expect(type).toEqual(DATA_TYPE)
		expect(attributes).toBeDefined()
		expect(relationships).toBeDefined()

		// attributes
		const {
			store_id,
			name: newName,
			email: newEmail,
			status,
			city,
			region,
			country,
			total_revenue_currency,
			mrr,
			status_formatted,
			country_formatted,
			total_revenue_currency_formatted,
			mrr_formatted,
			urls,
			created_at,
			updated_at,
			test_mode,
		} = attributes
		const items = [
			store_id,
			newName,
			newEmail,
			status,
			city,
			region,
			country,
			total_revenue_currency,
			mrr,
			status_formatted,
			country_formatted,
			total_revenue_currency_formatted,
			mrr_formatted,
			urls,
			created_at,
			updated_at,
			test_mode,
		]
		for (const item of items) expect(item).toBeDefined()
		expect(Object.keys(attributes).length).toEqual(items.length)
		expect(status).toEqual('archived')

		// relationships
		const { orders, 'license-keys': licenseKeys, subscriptions, store } = relationships
		const relationshipItems = [orders, licenseKeys, subscriptions, store]
		for (const item of relationshipItems) expect(item.links).toBeDefined()

		const { self } = links
		expect(self).toEqual(`${API_BASE_URL}/v1/customers/${id}`)
	})

	it('An error and a statusCode of 422 should be returned', async () => {
		const {
			error,
			data: _data,
			statusCode,
		} = await updateCustomer(newCustomerId, {
			status: 'unsubscribed' as any,
		})

		expect(error).toBeDefined()
		expect(error?.message).toMatch('Unprocessable Entity')
		expect(error?.cause).toBeArray()
		expect(statusCode).toEqual(422)
		expect(_data).toBeNull()
	})
})

describe('Retrieve a customer', () => {
	it('Throw an error about a parameter that must be provided', async () => {
		try {
			await getCustomer('')
		} catch (error) {
			expect((error as Error).message).toMatch('Please provide the required parameter:')
		}
	})

	it('Should return the customer with the given customer id', async () => {
		const { error, data: _data, statusCode } = await getCustomer(newCustomerId)
		expect(error).toBeNull()
		expect(statusCode).toEqual(200)
		expect(_data).toBeDefined()

		const { data, links } = _data!
		expect(data).toBeDefined()
		expect(links).toBeDefined()

		const { type, attributes, id, relationships } = data
		expect(type).toEqual(DATA_TYPE)
		expect(id).toEqual(newCustomerId.toString())
		expect(attributes).toBeDefined()
		expect(relationships).toBeDefined()

		// attributes
		const {
			store_id,
			name: newName,
			email: newEmail,
			status,
			city,
			region,
			country,
			total_revenue_currency,
			mrr,
			status_formatted,
			country_formatted,
			total_revenue_currency_formatted,
			mrr_formatted,
			urls,
			created_at,
			updated_at,
			test_mode,
		} = attributes
		const items = [
			store_id,
			newName,
			newEmail,
			status,
			city,
			region,
			country,
			total_revenue_currency,
			mrr,
			status_formatted,
			country_formatted,
			total_revenue_currency_formatted,
			mrr_formatted,
			urls,
			created_at,
			updated_at,
			test_mode,
		]
		for (const item of items) expect(item).toBeDefined()
		expect(Object.keys(attributes).length).toEqual(items.length)
		expect(status).toEqual('archived')
		expect(urls.customer_portal).toBeNull()

		// relationships
		const { orders, 'license-keys': licenseKeys, subscriptions, store } = relationships
		const relationshipItems = [orders, licenseKeys, subscriptions, store]
		for (const item of relationshipItems) expect(item.links).toBeDefined()

		const { self } = links
		expect(self).toEqual(`${API_BASE_URL}/v1/customers/${id}`)
	})

	it('Should return the customer with the given customer id and include', async () => {
		const { error, data: _data, statusCode } = await getCustomer(newCustomerId, { include: ['store'] })
		expect(error).toBeNull()
		expect(statusCode).toEqual(200)
		expect(_data).toBeDefined()

		const { data, links, included } = _data!
		expect(data).toBeDefined()
		expect(links).toBeDefined()
		expect(included).toBeArray()
		expect(!!included?.find((item) => item.type === 'stores')).toBeTrue()

		const { type, attributes, id, relationships } = data
		expect(type).toEqual(DATA_TYPE)
		expect(id).toEqual(newCustomerId.toString())
		expect(attributes).toBeDefined()
		expect(relationships).toBeDefined()

		// attributes
		const {
			store_id,
			name: newName,
			email: newEmail,
			status,
			city,
			region,
			country,
			total_revenue_currency,
			mrr,
			status_formatted,
			country_formatted,
			total_revenue_currency_formatted,
			mrr_formatted,
			urls,
			created_at,
			updated_at,
			test_mode,
		} = attributes
		const items = [
			store_id,
			newName,
			newEmail,
			status,
			city,
			region,
			country,
			total_revenue_currency,
			mrr,
			status_formatted,
			country_formatted,
			total_revenue_currency_formatted,
			mrr_formatted,
			urls,
			created_at,
			updated_at,
			test_mode,
		]
		for (const item of items) expect(item).toBeDefined()
		expect(Object.keys(attributes).length).toEqual(items.length)
		expect(status).toEqual('archived')
		expect(urls.customer_portal).toBeNull()

		// relationships
		const { orders, 'license-keys': licenseKeys, subscriptions, store } = relationships
		const relationshipItems = [orders, licenseKeys, subscriptions, store]
		for (const item of relationshipItems) expect(item.links).toBeDefined()

		const { self } = links
		expect(self).toEqual(`${API_BASE_URL}/v1/customers/${id}`)
	})
})

describe('List all customers', () => {
	it('Should return a paginated list of customers', async () => {
		const { statusCode, error, data: _data } = await listCustomers()
		expect(error).toBeNull()
		expect(statusCode).toEqual(200)
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

	it('Should return a paginated list of customers filtered by store id', async () => {
		const {
			statusCode,
			error,
			data: _data,
		} = await listCustomers({
			filter: { storeId },
		})
		expect(error).toBeNull()
		expect(statusCode).toEqual(200)
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

	it('Should return a paginated list of customers filtered by email', async () => {
		const {
			statusCode,
			error,
			data: _data,
		} = await listCustomers({
			filter: { email: newCustomerEmail },
		})
		expect(error).toBeNull()
		expect(statusCode).toEqual(200)
		expect(_data).toBeDefined()

		const { meta, data, links } = _data!
		expect(meta.page).toBeDefined()
		expect(data.filter((item) => item.attributes.email === newCustomerEmail).length).toEqual(data.length)
		expect(links.first).toBeDefined()
		expect(links.last).toBeDefined()

		const { currentPage, from, to, perPage, lastPage, total } = meta.page
		const items = [currentPage, from, to, perPage, lastPage, total]
		for (const item of items) expect(item).toBeInteger()
		expect(Object.keys(meta.page).length).toEqual(items.length)
	})

	it('Should return a paginated list of customers with include', async () => {
		const {
			statusCode,
			error,
			data: _data,
		} = await listCustomers({
			include: ['store'],
		})
		expect(error).toBeNull()
		expect(statusCode).toEqual(200)
		expect(_data).toBeDefined()

		const { meta, data, links, included } = _data!
		expect(meta.page).toBeDefined()
		expect(data).toBeArray()
		expect(links.first).toBeDefined()
		expect(links.last).toBeDefined()
		expect(included).toBeArray()
		expect(!!included?.find((item) => item.type === 'stores')).toBeTrue()

		const { currentPage, from, to, perPage, lastPage, total } = meta.page
		const items = [currentPage, from, to, perPage, lastPage, total]
		for (const item of items) expect(item).toBeInteger()
		expect(Object.keys(meta.page).length).toEqual(items.length)
	})

	it('Should return a paginated list of customers with page_number = 1 and page_size = 5', async () => {
		const {
			error,
			data: _data,
			statusCode,
		} = await listCustomers({
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

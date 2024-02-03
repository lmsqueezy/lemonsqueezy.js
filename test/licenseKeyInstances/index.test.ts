import { beforeAll, describe, expect, it } from 'bun:test'
import { getLicenseKeyInstance, lemonSqueezySetup, listLicenseKeyInstances } from '../../src'
import { API_BASE_URL } from '../../src/internal'

const DATA_TYPE = 'license-key-instances'
const PATH = `/v1/${DATA_TYPE}/`
let licenseKeyInstanceId: number | string
let licenseKeyId: number | string

beforeAll(async () => {
	lemonSqueezySetup({ apiKey: import.meta.env.LEMON_SQUEEZY_API_KEY })
	await fetch('https://api.lemonsqueezy.com/v1/licenses/activate', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			license_key: import.meta.env.LEMON_SQUEEZY_LICENSE_KEY,
			instance_name: 'Test',
		}),
	})
})

describe('List all license key instances', () => {
	it('Should return all license key instances', async () => {
		const { statusCode, error, data: _data } = await listLicenseKeyInstances()
		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { meta, data, links } = _data!
		expect(meta.page).toBeDefined()
		expect(data).toBeArray()
		expect(data[0]).toBeDefined()
		expect(links.first).toBeDefined()
		expect(links.last).toBeDefined()

		const { currentPage, from, to, perPage, lastPage, total } = meta.page
		const items = [currentPage, from, to, perPage, lastPage, total]
		for (const item of items) expect(item).toBeInteger()
		expect(Object.keys(meta.page).length).toEqual(items.length)

		const { id, attributes } = data[0]
		const { license_key_id } = attributes
		licenseKeyInstanceId = id
		licenseKeyId = license_key_id
	})

	it('Should return all license key instances with related resources', async () => {
		const { statusCode, error, data: _data } = await listLicenseKeyInstances({ include: ['license-key'] })
		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { meta, data, links, included } = _data!
		expect(meta.page).toBeDefined()
		expect(data).toBeArray()
		expect(data[0]).toBeDefined()
		expect(links.first).toBeDefined()
		expect(links.last).toBeDefined()
		expect(included).toBeArray()
		expect(!!included?.filter((item) => item.type === 'license-keys')).toBeTrue()

		const { currentPage, from, to, perPage, lastPage, total } = meta.page
		const items = [currentPage, from, to, perPage, lastPage, total]
		for (const item of items) expect(item).toBeInteger()
		expect(Object.keys(meta.page).length).toEqual(items.length)
	})

	it('Should return license key instances filtered by license key id', async () => {
		const { statusCode, error, data: _data } = await listLicenseKeyInstances({ filter: { licenseKeyId } })
		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { meta, data, links } = _data!
		expect(meta.page).toBeDefined()
		expect(data.filter((item) => item.attributes.license_key_id === Number(licenseKeyId))).toBeArray()
		expect(links.first).toBeDefined()
		expect(links.last).toBeDefined()

		const { currentPage, from, to, perPage, lastPage, total } = meta.page
		const items = [currentPage, from, to, perPage, lastPage, total]
		for (const item of items) expect(item).toBeInteger()
		expect(Object.keys(meta.page).length).toEqual(items.length)
	})

	it('Should return license key instances with page_number = 1 and page_size = 5', async () => {
		const {
			error,
			data: _data,
			statusCode,
		} = await listLicenseKeyInstances({
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

describe('Retrieve a license key instance', () => {
	it('Throw an error about a parameter that must be provided', async () => {
		try {
			await getLicenseKeyInstance('')
		} catch (error) {
			expect((error as Error).message).toMatch('Please provide the required parameter:')
		}
	})

	it('Should return a license key instance', async () => {
		const { statusCode, error, data: _data } = await getLicenseKeyInstance(licenseKeyInstanceId)

		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { links, data } = _data!
		expect(data).toBeDefined()
		expect(links).toBeDefined()
		expect(links.self).toEqual(`${API_BASE_URL}${PATH}${licenseKeyInstanceId}`)

		const { type, id, attributes, relationships } = data
		expect(id).toEqual(licenseKeyInstanceId.toString())
		expect(type).toEqual(DATA_TYPE)
		expect(attributes).toBeDefined()
		expect(relationships).toBeDefined()

		const { license_key_id, identifier, name, created_at, updated_at } = attributes
		const items = [license_key_id, identifier, name, created_at, updated_at]
		for (const item of items) expect(item).toBeDefined()
		expect(Object.keys(attributes).length).toEqual(items.length)
		expect(license_key_id).toEqual(Number(licenseKeyId))

		const { 'license-key': licenseKey } = relationships
		const relationshipItems = [licenseKey]
		for (const item of relationshipItems) expect(item.links).toBeDefined()
		expect(Object.keys(relationships).length).toEqual(relationshipItems.length)
	})

	it('Should return a license key instance with related resources', async () => {
		const {
			statusCode,
			error,
			data: _data,
		} = await getLicenseKeyInstance(licenseKeyInstanceId, { include: ['license-key'] })

		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { links, data, included } = _data!
		expect(data).toBeDefined()
		expect(links).toBeDefined()
		expect(links.self).toEqual(`${API_BASE_URL}${PATH}${licenseKeyInstanceId}`)
		expect(included).toBeArray()
		expect(!!included?.filter((item) => item.type === 'license-keys')).toBeTrue()

		const { type, id, attributes, relationships } = data
		expect(id).toEqual(licenseKeyInstanceId.toString())
		expect(type).toEqual(DATA_TYPE)
		expect(attributes).toBeDefined()
		expect(relationships).toBeDefined()

		const { license_key_id, identifier, name, created_at, updated_at } = attributes
		const items = [license_key_id, identifier, name, created_at, updated_at]
		for (const item of items) expect(item).toBeDefined()
		expect(Object.keys(attributes).length).toEqual(items.length)
		expect(license_key_id).toEqual(Number(licenseKeyId))

		const { 'license-key': licenseKey } = relationships
		const relationshipItems = [licenseKey]
		for (const item of relationshipItems) expect(item.links).toBeDefined()
		expect(Object.keys(relationships).length).toEqual(relationshipItems.length)
	})
})

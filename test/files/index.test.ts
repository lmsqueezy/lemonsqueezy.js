import { beforeAll, describe, expect, it } from 'bun:test'
import { getFile, lemonSqueezySetup, listFiles } from '../../src'
import { API_BASE_URL } from '../../src/internal'

const DATA_TYPE = 'files'
const PATH = '/v1/files/'
let fileId: any
let variantId: any

beforeAll(() => {
	lemonSqueezySetup({ apiKey: import.meta.env.LEMON_SQUEEZY_API_KEY })
})

describe('List all files', () => {
	it('Should return a paginated list of files', async () => {
		const { statusCode, error, data: _data } = await listFiles()
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

		const { variant } = data[0].relationships
		expect(variant.links).toBeDefined()

		fileId = data[0].id
		variantId = data[0].attributes.variant_id
	})

	it('Should return a paginated list of files with related resources', async () => {
		const { statusCode, error, data: _data } = await listFiles({ include: ['variant'] })
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
		for (const item of [currentPage, from, lastPage, perPage, to, total]) {
			expect(item).toBeNumber()
		}

		const { variant } = data[0].relationships
		expect(variant.links).toBeDefined()
	})

	it('Should return a paginated list of files filtered by variant id', async () => {
		const {
			statusCode,
			error,
			data: _data,
		} = await listFiles({
			filter: {
				variantId,
			},
		})
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

		const { variant } = data[0].relationships
		expect(variant.links).toBeDefined()
	})

	it('Should return a paginated list of files with page_number = 1 and page_size = 5', async () => {
		const {
			error,
			data: _data,
			statusCode,
		} = await listFiles({
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

describe('Retrieve a file', () => {
	it('Throw an error about a parameter that must be provided', async () => {
		try {
			await getFile('')
		} catch (error) {
			expect((error as Error).message).toMatch('Please provide the required parameter:')
		}
	})

	it('Retrieves the file with the given id', async () => {
		const { statusCode, error, data: _data } = await getFile(fileId)
		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { links, data } = _data!
		expect(links.self).toEqual(`${API_BASE_URL}${PATH}${fileId}`)
		expect(data).toBeDefined()

		const { id, type, attributes, relationships } = data
		expect(id).toEqual(fileId.toString())
		expect(type).toEqual(DATA_TYPE)
		expect(attributes).toBeDefined()
		expect(relationships).toBeDefined()

		const {
			variant_id,
			identifier,
			name,
			extension,
			download_url,
			size,
			size_formatted,
			version,
			sort,
			status,
			createdAt,
			updatedAt,
			test_mode,
		} = attributes
		const items = [
			variant_id,
			identifier,
			name,
			extension,
			download_url,
			size,
			size_formatted,
			version,
			sort,
			status,
			createdAt,
			updatedAt,
			test_mode,
		]
		for (const item of items) expect(item).toBeDefined()
		expect(Object.keys(attributes).length).toEqual(items.length)
		expect(variant_id).toEqual(Number(variantId))

		const { variant } = relationships
		expect(variant.links).toBeDefined()
	})

	it('Retrieves the file with the given id and related resources', async () => {
		const { statusCode, error, data: _data } = await getFile(fileId, { include: ['variant'] })
		expect(statusCode).toEqual(200)
		expect(error).toBeNull()
		expect(_data).toBeDefined()

		const { links, data, included } = _data!
		expect(links.self).toEqual(`${API_BASE_URL}${PATH}${fileId}`)
		expect(data).toBeDefined()
		expect(included).toBeArray()
		expect(!!included?.filter((item) => item.type === 'variants')).toBeTrue()

		const { id, type, attributes, relationships } = data
		expect(id).toEqual(fileId.toString())
		expect(type).toEqual(DATA_TYPE)
		expect(attributes).toBeDefined()
		expect(relationships).toBeDefined()

		const {
			variant_id,
			identifier,
			name,
			extension,
			download_url,
			size,
			size_formatted,
			version,
			sort,
			status,
			createdAt,
			updatedAt,
			test_mode,
		} = attributes
		const items = [
			variant_id,
			identifier,
			name,
			extension,
			download_url,
			size,
			size_formatted,
			version,
			sort,
			status,
			createdAt,
			updatedAt,
			test_mode,
		]
		for (const item of items) expect(item).toBeDefined()
		expect(Object.keys(attributes).length).toEqual(items.length)
		expect(variant_id).toEqual(Number(variantId))

		const { variant } = relationships
		expect(variant.links).toBeDefined()
	})
})

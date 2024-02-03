import type { Data, LemonSqueezyResponse, Links, Meta, Params, Relationships } from '../types'

type Attributes = {
	/**
	 * The ID of the variant this file belongs to.
	 */
	variant_id: number
	/**
	 * The unique identifier (UUID) for this file.
	 */
	identifier: string
	/**
	 * The name of the file (e.g. `example.pdf`).
	 */
	name: string
	/**
	 * The file extension of the file (e.g. `pdf`).
	 */
	extension: string
	/**
	 * The unique URL to download the file.
	 *
	 * Note: for security reasons, download URLs are signed, expire after 1 hour and are rate-limited to 10 downloads per day per IP address.
	 */
	download_url: string
	/**
	 * A positive integer in bytes representing the size of the file.
	 */
	size: number
	/**
	 * The human-readable size of the file (e.g. `5.5 MB`).
	 */
	size_formatted: string
	/**
	 * The software version of this file (if one exists, e.g. `1.0.0`).
	 */
	version: string
	/**
	 * An integer representing the order of this file when displayed.
	 */
	sort: number
	/**
	 * The status of the file. Either `draft` or `published`.
	 */
	status: 'draft' | 'published'
	/**
	 * An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) formatted date-time string indicating when the object was created.
	 */
	createdAt: string
	/**
	 * An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) formatted date-time string indicating when the object was last updated.
	 */
	updatedAt: string
	/**
	 * A boolean indicating if the object was created within test mode.
	 */
	test_mode: boolean
}
type FileData = Data<Attributes, Pick<Relationships, 'variant'>>

export type GetFileParams = Pick<Params<(keyof FileData['relationships'])[]>, 'include'>
export type ListFilesParams = Params<GetFileParams['include'], { variantId?: string | number }>
export type File = Omit<LemonSqueezyResponse<FileData, unknown, Pick<Links, 'self'>>, 'meta'>
export type ListFiles = LemonSqueezyResponse<FileData[], Pick<Meta, 'page'>, Pick<Links, 'first' | 'last'>>

import { $fetch, convertIncludeToQueryString, convertListParamsToQueryString, requiredCheck } from '../internal'
import type { File, GetFileParams, ListFiles, ListFilesParams } from './types'

/**
 * Retrieve a file.
 *
 * @param fileId The given file id
 * @param [params] (Optional) Additional parameters.
 * @param [params.include] (Optional) Related resources.
 * @returns A file object.
 */
export function getFile(fileId: number | string, params: GetFileParams = {}) {
	requiredCheck({ fileId })
	return $fetch<File>({
		path: `/v1/files/${fileId}${convertIncludeToQueryString(params.include)}`,
	})
}

/**
 * List all files.
 *
 * @param [params] (Optional) Additional parameters.
 * @param [params.filter] (Optional) Filter parameters.
 * @param [params.filter.variantId] (Optional) Only return files belonging to the variant with this ID.
 * @param [params.page] (Optional) Custom paginated queries.
 * @param [params.page.number] (Optional) The parameter determine which page to retrieve.
 * @param [params.page.size] (Optional) The parameter to determine how many results to return per page.
 * @param [params.include] (Optional) Related resources.
 * @returns A paginated list of file objects ordered by `sort`.
 */
export function listFiles(params: ListFilesParams = {}) {
	return $fetch<ListFiles>({
		path: `/v1/files${convertListParamsToQueryString(params)}`,
	})
}

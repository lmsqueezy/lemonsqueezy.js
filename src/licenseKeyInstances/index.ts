import { $fetch, convertIncludeToQueryString, convertListParamsToQueryString, requiredCheck } from '../internal'
import type {
	GetLicenseKeyInstanceParams,
	LicenseKeyInstance,
	ListLicenseKeyInstances,
	ListLicenseKeyInstancesParams,
} from './types'

/**
 * Retrieve a license key instance.
 *
 * @param licenseKeyInstanceId The given license key instance id.
 * @param [params] (Optional) Additional parameters.
 * @param [params.include] (Optional) Related resources.
 * @returns A license key instance object.
 */
export function getLicenseKeyInstance(licenseKeyInstanceId: number | string, params: GetLicenseKeyInstanceParams = {}) {
	requiredCheck({ licenseKeyInstanceId })
	return $fetch<LicenseKeyInstance>({
		path: `/v1/license-key-instances/${licenseKeyInstanceId}${convertIncludeToQueryString(params.include)}`,
	})
}

/**
 * List all license key instances.
 *
 * @param [params] (Optional) Additional parameters.
 * @param [params.filter] (Optional) Filter parameters.
 * @param [params.filter.licenseKeyId] (Optional) The license key ID.
 * @param [params.page] (Optional) Custom paginated queries.
 * @param [params.page.number] (Optional) The parameter determine which page to retrieve.
 * @param [params.page.size] (Optional) The parameter to determine how many results to return per page.
 * @param [params.include] (Optional) Related resources.
 * @returns A paginated list of license key instance objects ordered by `id`.
 */
export function listLicenseKeyInstances(params: ListLicenseKeyInstancesParams = {}) {
	return $fetch<ListLicenseKeyInstances>({
		path: `/v1/license-key-instances${convertListParamsToQueryString(params)}`,
	})
}

import {
  $fetch,
  convertIncludeToQueryString,
  convertKeys,
  convertListParamsToQueryString,
  requiredCheck,
} from "../internal";
import type {
  GetLicenseKeyParams,
  LicenseKey,
  ListLicenseKeys,
  ListLicenseKeysParams,
  UpdateLicenseKey,
} from "./types";

/**
 * Retrieve a license key.
 *
 * @param licenseKeyId The license key id.
 * @param [params] (Optional) Additional parameters.
 * @param [params.include] (Optional) Related resources.
 * @returns A license key object.
 */
export function getLicenseKey(
  licenseKeyId: number | string,
  params: GetLicenseKeyParams = {}
) {
  requiredCheck({ licenseKeyId });
  return $fetch<LicenseKey>({
    path: `/v1/license-keys/${licenseKeyId}${convertIncludeToQueryString(params.include)}`,
  });
}

/**
 * List all license keys.
 *
 * @param [params] (Optional) Additional parameters.
 * @param [params.filter] (Optional) Filter parameters.
 * @param [params.filter.storeId] (Optional) Only return license keys belonging to the store with this ID.
 * @param [params.filter.orderId] (Optional) (Optional) Only return license keys belonging to the order with this ID.
 * @param [params.filter.orderItemId] (Optional) Only return license keys belonging to the order item with this ID.
 * @param [params.filter.productId] (Optional) Only return license keys belonging to the product with this ID.
 * @param [params.page] (Optional) Custom paginated queries.
 * @param [params.page.number] (Optional) The parameter determine which page to retrieve.
 * @param [params.page.size] (Optional) The parameter to determine how many results to return per page.
 * @param [params.include] (Optional) Related resources.
 * @returns A paginated list of license key objects ordered by `id`.
 */
export function listLicenseKeys(params: ListLicenseKeysParams = {}) {
  return $fetch<ListLicenseKeys>({
    path: `/v1/license-keys${convertListParamsToQueryString(params)}`,
  });
}

/**
 * Update a license key.
 *
 * @param licenseKeyId The license key id.
 * @param licenseKey (Optional) Values to be updated.
 * @param [licenseKey.activationLimit] (Optional) The activation limit of this license key. Assign `null` to set the activation limit to "unlimited".
 * @param [licenseKey.expiresAt] (Optional) An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) formatted date-time string indicating when the license key expires. Can be `null` if the license key is perpetual.
 * @param [licenseKey.disabled] (Optional) If `true`, the license key will have "disabled" status.
 * @returns A license key object.
 */
export function updateLicenseKey(
  licenseKeyId: string | number,
  licenseKey: UpdateLicenseKey
) {
  requiredCheck({ licenseKeyId });

  const { activationLimit, disabled = false, expiresAt } = licenseKey;
  const attributes = convertKeys({ activationLimit, disabled, expiresAt });

  return $fetch<LicenseKey>({
    path: `/v1/license-keys/${licenseKeyId}`,
    method: "PATCH",
    body: {
      data: {
        type: "license-keys",
        id: licenseKeyId.toString(),
        attributes,
      },
    },
  });
}

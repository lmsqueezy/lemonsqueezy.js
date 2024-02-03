import { $fetch, convertKeys, requiredCheck } from '../internal'
import type { ActivateLicense, DeactivateLicense, ValidateLicense } from './types'

/**
 * Activate a license key.
 *
 * @param licenseKey The license key.
 * @param instanceName A label for the new instance to identify it in Lemon Squeezy.
 * @returns A response object containing `activated`, `error`, `license_key`, `instance`, `meta`.
 */
export async function activateLicense(licenseKey: string, instanceName: string) {
	requiredCheck({ licenseKey, instanceName })
	return $fetch<ActivateLicense>(
		{
			path: '/v1/licenses/activate',
			method: 'POST',
			body: convertKeys({ licenseKey, instanceName }),
		},
		false,
	)
}

/**
 * Validate a license key or license key instance.
 *
 * @param licenseKey The license key.
 * @param [instanceId] (Optional) If included, validate a license key instance, otherwise a license key. If no `instance_id` is provided, the response will contain "instance": `null`.
 * @returns A response object containing `valid`, `error`, `license_key`, `instance`, `meta`.
 */
export async function validateLicense(licenseKey: string, instanceId?: string) {
	requiredCheck({ licenseKey })
	return $fetch<ValidateLicense>(
		{
			path: '/v1/licenses/validate',
			method: 'POST',
			body: convertKeys({
				licenseKey,
				instanceId,
			}),
		},
		false,
	)
}

/**
 * Deactivate a license key instance.
 *
 * @param licenseKey The license key.
 * @param instanceId The instance ID returned when activating a license key.
 * @returns A response object containing `deactivated`, `error`, `license_key`, `meta`.
 */
export async function deactivateLicense(licenseKey: string, instanceId: string) {
	requiredCheck({ licenseKey, instanceId })
	return $fetch<DeactivateLicense>(
		{
			path: '/v1/licenses/deactivate',
			method: 'POST',
			body: convertKeys({
				licenseKey,
				instanceId,
			}),
		},
		false,
	)
}

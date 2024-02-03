import type { Data, LemonSqueezyResponse, Links, Meta, Params, Relationships } from '../types'

type Attributes = {
	/**
	 * The ID of the license key this instance belongs to.
	 */
	license_key_id: number
	/**
	 * The unique identifier (UUID) for this instance. This is the `instance_id` returned when [activating a license key](https://docs.lemonsqueezy.com/help/licensing/license-api#post-v1-licenses-activate).
	 */
	identifier: string
	/**
	 * The name of the license key instance.
	 */
	name: string
	/**
	 * An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) formatted date-time string indicating when the object was created.
	 */
	created_at: string
	/**
	 * An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) formatted date-time string indicating when the object was last updated.
	 */
	updated_at: string
}
type LicenseKeyInstanceData = Data<Attributes, Pick<Relationships, 'license-key'>>

export type GetLicenseKeyInstanceParams = Pick<Params<(keyof LicenseKeyInstanceData['relationships'])[]>, 'include'>
export type ListLicenseKeyInstancesParams = Params<
	GetLicenseKeyInstanceParams['include'],
	{ licenseKeyId?: number | string }
>
export type LicenseKeyInstance = Omit<
	LemonSqueezyResponse<LicenseKeyInstanceData, unknown, Pick<Links, 'self'>>,
	'meta'
>
export type ListLicenseKeyInstances = LemonSqueezyResponse<
	LicenseKeyInstanceData[],
	Pick<Meta, 'page'>,
	Pick<Links, 'first' | 'last'>
>

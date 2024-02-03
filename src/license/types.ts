type Meta = {
	store_id: number
	order_id: number
	order_item_id: number
	product_id: number
	product_name: string
	variant_id: number
	variant_name: string
	customer_id: number
	customer_name: string
	customer_email: string
}
type LicenseKeyStatus = 'inactive' | 'active' | 'expired' | 'disabled'
type LicenseKey = {
	id: number
	status: LicenseKeyStatus
	key: string
	activation_limit: number
	activation_usage: number
	created_at: string
	expires_at: string | null
	test_mode: boolean
}
type Instance = {
	id: string
	name: string
	created_at: string
}
type LicenseResponse = {
	error: string | null
	license_key: LicenseKey
	instance?: Instance | null
	meta: Meta
}

export type ActivateLicense = {
	activated: boolean
} & LicenseResponse
export type ValidateLicense = {
	valid: boolean
} & LicenseResponse
export type DeactivateLicense = {
	deactivated: boolean
} & Omit<LicenseResponse, 'instance'>

import { $fetch, convertIncludeToQueryString, convertListParamsToQueryString, requiredCheck } from '../internal'
import type {
	Customer,
	GetCustomerParams,
	ListCustomers,
	ListCustomersParams,
	NewCustomer,
	UpdateCustomer,
} from './types'

/**
 * Create a customer.
 *
 * @param storeId (Required)The Store ID.
 * @param customer (Required) The new customer information.
 * @param customer.name (Required) The name of the customer.
 * @param customer.email (Required) The email of the customer.
 * @param customer.city (Optional) The city of the customer.
 * @param customer.region (Optional) The region of the customer.
 * @param customer.country (Optional) The [ISO 3166-1](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) two-letter country code for the customer (e.g. `US`, `GB`, etc).
 * @returns A customer object.
 */
export function createCustomer(storeId: number | string, customer: NewCustomer) {
	requiredCheck({ storeId })
	return $fetch<Customer>({
		path: '/v1/customers',
		method: 'POST',
		body: {
			data: {
				type: 'customers',
				attributes: customer,
				relationships: {
					store: {
						data: {
							type: 'stores',
							id: storeId.toString(),
						},
					},
				},
			},
		},
	})
}

/**
 * Update a customer.
 *
 * @param customerId The customer id.
 * @param customer The customer information that needs to be updated.
 * @param customer.name (Optional) The name of the customer.
 * @param customer.email (Optional) The email of the customer.
 * @param customer.city (Optional) The city of the customer.
 * @param customer.region (Optional) The region of the customer.
 * @param customer.country (Optional) The [ISO 3166-1](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) two-letter country code for the customer (e.g. `US`, `GB`, etc).
 * @param customer.status (Optional) The email marketing status of the customer. Only one value: `archived`.
 * @returns A customer object.
 */
export function updateCustomer(customerId: string | number, customer: UpdateCustomer) {
	requiredCheck({ customerId })
	return $fetch<Customer>({
		path: `/v1/customers/${customerId}`,
		method: 'PATCH',
		body: {
			data: {
				type: 'customers',
				id: customerId.toString(),
				attributes: customer,
			},
		},
	})
}

/**
 * Archive a customer.
 *
 * @param customerId The customer id.
 * @returns A customer object.
 */
export function archiveCustomer(customerId: string | number) {
	requiredCheck({ customerId })
	return $fetch<Customer>({
		path: `/v1/customers/${customerId}`,
		method: 'PATCH',
		body: {
			data: {
				type: 'customers',
				id: customerId.toString(),
				attributes: {
					status: 'archived',
				},
			},
		},
	})
}

/**
 * Retrieve a customer.
 *
 * @param customerId The given customer id.
 * @param [params] (Optional) Additional parameters.
 * @param [params.include] (Optional) Related resources.
 * @returns A customer object.
 */
export function getCustomer(customerId: string | number, params: GetCustomerParams = {}) {
	requiredCheck({ customerId })
	return $fetch<Customer>({
		path: `/v1/customers/${customerId}${convertIncludeToQueryString(params.include)}`,
	})
}

/**
 * List all customers.
 *
 * @param [params] (Optional) Additional parameters.
 * @param [params.filter] (Optional) Filter parameters.
 * @param [params.filter.storeId] (Optional) Only return customers belonging to the store with this ID.
 * @param [params.filter.email] (Optional) Only return customers where the email field is equal to this email address.
 * @param [params.page] (Optional) Custom paginated queries.
 * @param [params.page.number] (Optional) The parameter determine which page to retrieve.
 * @param [params.page.size] (Optional) The parameter to determine how many results to return per page.
 * @param [params.include] (Optional) Related resources.
 * @returns A paginated list of customer objects ordered by `created_at` (descending).
 */
export function listCustomers(params: ListCustomersParams = {}) {
	return $fetch<ListCustomers>({
		path: `/v1/customers${convertListParamsToQueryString(params)}`,
	})
}

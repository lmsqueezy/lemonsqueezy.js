import { $fetch, convertIncludeToQueryString, convertListParamsToQueryString, requiredCheck } from '../internal'
import type {
	GetUsageRecordParams,
	ListUsageRecords,
	ListUsageRecordsParams,
	NewUsageRecord,
	UsageRecord,
} from './types'

/**
 * Retrieve a usage record.
 *
 * @param usageRecordId The usage record id.
 * @param [params] (Optional) Additional parameters.
 * @param [params.include] (Optional) Related resources.
 * @returns A usage record object.
 */
export function getUsageRecord(usageRecordId: number | string, params: GetUsageRecordParams = {}) {
	requiredCheck({ usageRecordId })
	return $fetch<UsageRecord>({
		path: `/v1/usage-records/${usageRecordId}${convertIncludeToQueryString(params.include)}`,
	})
}

/**
 * List all usage records.
 *
 * @param [params] (Optional) Additional parameters.
 * @param [params.filter] (Optional) Filter parameters.
 * @param [params.filter.subscriptionItemId] (Optional) Only return usage records belonging to the subscription item with this ID.
 * @param [params.page] (Optional) Custom paginated queries.
 * @param [params.page.number] (Optional) The parameter determine which page to retrieve.
 * @param [params.page.size] (Optional) The parameter to determine how many results to return per page.
 * @param [params.include] (Optional) Related resources.
 * @returns A paginated list of usage record objects ordered by `created_at` (descending).
 */
export function listUsageRecords(params: ListUsageRecordsParams = {}) {
	return $fetch<ListUsageRecords>({
		path: `/v1/usage-records${convertListParamsToQueryString(params)}`,
	})
}

/**
 * Create a usage record.
 *
 * @param usageRecord (Required) New usage record info.
 * @param usageRecord.quantity (Required) A positive integer representing the usage to be reported.
 * @param usageRecord.action (Optional) The type of record. `increment` or `set`. Defaults to `increment` if omitted.
 * @param usageRecord.subscriptionItemId (Required) The subscription item this usage record belongs to.
 * @returns A usage record object.
 */
export function createUsageRecord(usageRecord: NewUsageRecord) {
	const { quantity, action = 'increment', subscriptionItemId } = usageRecord
	return $fetch<UsageRecord>({
		path: '/v1/usage-records',
		method: 'POST',
		body: {
			data: {
				type: 'usage-records',
				attributes: {
					quantity,
					action,
				},
				relationships: {
					'subscription-item': {
						data: {
							type: 'subscription-items',
							id: subscriptionItemId.toString(),
						},
					},
				},
			},
		},
	})
}

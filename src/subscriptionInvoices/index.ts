import {
  $fetch,
  convertIncludeToQueryString,
  convertListParamsToQueryString,
  requiredCheck,
  convertKeys,
} from "../internal";
import type {
  GetSubscriptionInvoiceParams,
  ListSubscriptionInvoices,
  ListSubscriptionInvoicesParams,
  SubscriptionInvoice,
  GenerateSubscriptionInvoiceParams,
  GenerateSubscriptionInvoice,
} from "./types";

/**
 * Retrieve a subscription invoice.
 *
 * @param subscriptionInvoiceId The given subscription invoice id.
 * @param [params] (Optional) Additional parameters.
 * @param [params.include] (Optional) Related resources.
 * @returns A subscription invoice object.
 */
export function getSubscriptionInvoice(
  subscriptionInvoiceId: number | string,
  params: GetSubscriptionInvoiceParams = {}
) {
  requiredCheck({ subscriptionInvoiceId });
  return $fetch<SubscriptionInvoice>({
    path: `/v1/subscription-invoices/${subscriptionInvoiceId}${convertIncludeToQueryString(params.include)}`,
  });
}

/**
 * List all subscription invoices.
 *
 * @param [params] (Optional) Additional parameters.
 * @param [params.filter] (Optional) Filter parameters.
 * @param [params.filter.storeId] (Optional) Only return subscription invoices belonging to the store with this ID.
 * @param [params.filter.status] (Optional) Only return subscription invoices with this status.
 * @param [params.filter.refunded] (Optional) Only return subscription invoices that are `refunded` (the value should be `true` or `false`).
 * @param [params.filter.subscriptionId] (Optional) Only return subscription invoices belonging to a subscription with this ID.
 * @param [params.page] (Optional) Custom paginated queries.
 * @param [params.page.number] (Optional) The parameter determine which page to retrieve.
 * @param [params.page.size] (Optional) The parameter to determine how many results to return per page.
 * @param [params.include] (Optional) Related resources.
 * @returns A paginated list of subscription invoice objects ordered by `created_at` (descending).
 */
export function listSubscriptionInvoices(
  params: ListSubscriptionInvoicesParams = {}
) {
  return $fetch<ListSubscriptionInvoices>({
    path: `/v1/subscription-invoices${convertListParamsToQueryString(params)}`,
  });
}

/**
 * Generate subscription invoice.
 *
 * @param subscriptionInvoiceId The given subscription invoice id.
 * @param [params] (Optional) Then given parameters.
 * @param [params.name] (Optional) The full name of the customer.
 * @param [params.address] (Optional) The street address of the customer.
 * @param [params.city] (Optional) The city of the customer.
 * @param [params.state] (Optional) The state of the customer.
 * @param [params.zipCode] (Optional) The ZIP code of the customer.
 * @param [params.country] (Optional) The country of the customer.
 * @param [params.notes] (Optional) Any additional notes to include on the invoice.
 * @returns A link to download the generated invoice.
 */
export function generateSubscriptionInvoice(
  subscriptionInvoiceId: number | string,
  params: GenerateSubscriptionInvoiceParams = {}
) {
  requiredCheck({ subscriptionInvoiceId });
  const searchParams = convertKeys(params);
  const queryString = new URLSearchParams(
    searchParams as Record<string, any>
  ).toString();
  const query = queryString ? `?${queryString}` : "";

  return $fetch<GenerateSubscriptionInvoice>({
    path: `/v1/subscription-invoices/${subscriptionInvoiceId}/generate-invoice${query}`,
    method: "POST",
  });
}

import {
  $fetch,
  convertIncludeToQueryString,
  convertListParamsToQueryString,
  requiredCheck,
  convertKeys,
} from "../internal";
import type {
  GetOrderParams,
  GenerateOrderInvoiceParams,
  ListOrders,
  ListOrdersParams,
  Order,
  OrderInvoice,
} from "./types";

/**
 * Retrieve an order.
 *
 * @param orderId The given order id.
 * @param [params] (Optional) Additional parameters.
 * @param [params.include] (Optional) Related resources.
 * @returns An order object.
 */
export function getOrder(
  orderId: number | string,
  params: GetOrderParams = {}
) {
  requiredCheck({ orderId });
  return $fetch<Order>({
    path: `/v1/orders/${orderId}${convertIncludeToQueryString(params.include)}`,
  });
}

/**
 * List all orders.
 *
 * @param [params] (Optional) Additional parameters.
 * @param [params.filter] (Optional) Filter parameters.
 * @param [params.filter.storeId] (Optional) Only return orders belonging to the store with this ID.
 * @param [params.filter.userEmail] (Optional) Only return orders where the `user_email` field is equal to this email address.
 * @param [params.page] (Optional) Custom paginated queries.
 * @param [params.page.number] (Optional) The parameter determine which page to retrieve.
 * @param [params.page.size] (Optional) The parameter to determine how many results to return per page.
 * @param [params.include] (Optional) Related resources.
 * @returns A paginated list of order objects ordered by `created_at` (descending).
 */
export function listOrders(params: ListOrdersParams = {}) {
  return $fetch<ListOrders>({
    path: `/v1/orders${convertListParamsToQueryString(params)}`,
  });
}

/**
 * Generate order invoice.
 *
 * @param orderId The given order id.
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
export function generateOrderInvoice(
  orderId: number | string,
  params: GenerateOrderInvoiceParams = {}
) {
  requiredCheck({ orderId });
  const searchParams = convertKeys(params);
  const queryString = new URLSearchParams(
    searchParams as Record<string, any>
  ).toString();
  const query = queryString ? `?${queryString}` : "";

  return $fetch<OrderInvoice>({
    path: `/v1/orders/${orderId}/generate-invoice${query}`,
    method: "POST",
  });
}

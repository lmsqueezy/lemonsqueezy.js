import {
  $fetch,
  convertIncludeToQueryString,
  convertKeys,
  convertListParamsToQueryString,
  requiredCheck,
} from "../internal";
import type {
  GetSubscriptionParams,
  ListSubscriptions,
  ListSubscriptionsParams,
  Subscription,
  UpdateSubscription,
} from "./types";

/**
 * Retrieve a subscription.
 *
 * @param subscriptionId The given subscription id.
 * @param [params] (Optional) Additional parameters.
 * @param [params.include] (Optional) Related resources.
 * @returns A subscription object.
 */
export function getSubscription(
  subscriptionId: number | string,
  params: GetSubscriptionParams = {}
) {
  requiredCheck({ subscriptionId });
  return $fetch<Subscription>({
    path: `/v1/subscriptions/${subscriptionId}${convertIncludeToQueryString(params.include)}`,
  });
}

/**
 * Update a subscription.
 *
 * @param subscriptionId The given subscription id.
 * @param subscription Subscription information that needs to be updated.
 * @returns A subscription object.
 */
export function updateSubscription(
  subscriptionId: string | number,
  updateSubscription: UpdateSubscription
) {
  requiredCheck({ subscriptionId });
  const {
    variantId,
    cancelled,
    billingAnchor,
    invoiceImmediately,
    disableProrations,
    pause,
    trialEndsAt,
  } = updateSubscription;

  const attributes = convertKeys({
    variantId,
    cancelled,
    billingAnchor,
    invoiceImmediately,
    disableProrations,
    pause,
    trialEndsAt,
  });

  return $fetch<Subscription>({
    path: `/v1/subscriptions/${subscriptionId}`,
    method: "PATCH",
    body: {
      data: {
        type: "subscriptions",
        id: subscriptionId.toString(),
        attributes,
      },
    },
  });
}

/**
 * Cancel a subscription.
 *
 * @param subscriptionId The given subscription id
 * @returns The Subscription object in a cancelled state.
 */
export function cancelSubscription(subscriptionId: string | number) {
  requiredCheck({ subscriptionId });

  return $fetch<Subscription>({
    path: `/v1/subscriptions/${subscriptionId}`,
    method: "DELETE",
  });
}

/**
 * List all subscriptions.
 *
 * @param [params] (Optional) Additional parameters.
 * @param [params.filter.storeId] (Optional) Only return subscriptions belonging to the store with this ID.
 * @param [params.filter.orderId] (Optional) Only return subscriptions belonging to the order with this ID.
 * @param [params.filter.orderItemId] (Optional) Only return subscriptions belonging to the order item with this ID.
 * @param [params.filter.productId] (Optional) Only return subscriptions belonging to the product with this ID.
 * @param [params.filter.variantId] (Optional) Only return subscriptions belonging to the variant with this ID.
 * @param [params.filter.userEmail] (Optional) Only return subscriptions where the `user_email` field is equal to this email address.
 * @param [params.filter.status] (Optional) Only return subscriptions with this status.
 * @param [params.page] (Optional) Custom paginated queries.
 * @param [params.page.number] (Optional) The parameter determine which page to retrieve.
 * @param [params.page.size] (Optional) The parameter to determine how many results to return per page.
 * @param [params.include] (Optional) Related resources.
 * @returns A paginated list of subscription objects ordered by `created_at` (descending).
 */
export function listSubscriptions(params: ListSubscriptionsParams = {}) {
  return $fetch<ListSubscriptions>({
    path: `/v1/subscriptions${convertListParamsToQueryString(params)}`,
  });
}

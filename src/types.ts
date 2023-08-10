/**
 * A union of all possible API versions available.
 */
type ApiVersion = "v1";

export interface QueryApiOptions {
  /**
   * The path to the API endpoint.
   */
  path: `${ApiVersion}/${string}`;
  /**
   * The HTTP method to use.
   *
   * @default "GET"
   */
  method?: "POST" | "GET" | "PATCH" | "DELETE";
  /**
   * Any query parameters to add to the request.
   */
  params?: unknown;
  /**
   * Any data to send in the request body.
   */
  payload?: object;
}

interface PaginatedOptions {
  /**
   * Number of records to return (between 1 and 100)
   */
  perPage?: number;
  /**
   * Page of records to return
   */
  page?: number;
}

export interface GetStoresOptions extends PaginatedOptions {
  /**
   * List of record types to include
   */
  include?: Array<
    "products" | "discounts" | "license-keys" | "subscriptions" | "webhooks"
  >;
}

export interface GetStoreOptions {
  /**
   * The ID of the store to retrieve.§
   */
  id: string;
  /**
   * List of record types to include
   */
  include?: Array<
    "products" | "discounts" | "license-keys" | "subscriptions" | "webhooks"
  >;
}

export interface GetProductsOptions extends PaginatedOptions {
  /**
   * List of record types to include
   */
  include?: Array<"store" | "variants">;
  /**
   * Filter products by store ID.
   */
  storeId?: number;
}

export interface GetProductOptions {
  /**
   * The ID of the store to retrieve.§
   */
  id: string;
  /**
   * List of record types to include
   */
  include?: Array<"store" | "variants">;
}

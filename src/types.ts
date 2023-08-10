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
   * The ID of the store to retrieve
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
   * Filter products by store
   */
  storeId?: number;
}

export interface GetProductOptions {
  /**
   * The ID of the store to retrieve
   */
  id: string;
  /**
   * List of record types to include
   */
  include?: Array<"store" | "variants">;
}

export interface GetVariantsOptions extends PaginatedOptions {
  /**
   * List of record types to include
   */
  include?: Array<"product" | "files">;
  /**
   * Filter variants by product
   */
  productId?: number;
}

export interface GetVariantOptions {
  /**
   * The ID of the variant to retrieve
   */
  id: number;
  /**
   * List of record types to include
   */
  include?: Array<"product" | "files">;
}

export interface GetCheckoutsOptions extends PaginatedOptions {
  /**
   * List of record types to include
   */
  include?: Array<"store" | "variant">;
  /**
   * Filter variants by store
   */
  storeId?: number;
  /**
   * Filter checkouts by variant
   */
  variantId?: number;
}

export interface GetCheckoutOptions {
  /**
   * The ID of the checkout to retrieve
   */
  id: string;
  /**
   * List of record types to include
   */
  include?: Array<"store" | "variant">;
}

export interface CreateCheckoutOptions {
  /**
   * An object of values used to configure the checkout
   *
   * @see https://docs.lemonsqueezy.com/api/checkouts#create-a-checkout
   */
  attributes?: object;
  storeId: number;
  variantId: number;
}

export interface GetCustomersOptions extends PaginatedOptions {
  /**
   * Filter customers by email address
   */
  email?: number;
  /**
   * List of record types to include
   */
  include?: Array<"license-keys" | "orders" | "store" | "subscriptions">;
  /**
   * Filter customers by store
   */
  storeId?: number;
}

export interface GetCustomerOptions {
  /**
   * The ID of the customer to retrieve
   */
  id: number;
  /**
   * List of record types to include
   */
  include?: Array<"license-keys" | "orders" | "store" | "subscriptions">;
}

import type {
  Data,
  LemonSqueezyResponse,
  Links,
  Meta,
  Params,
  Relationships,
} from "../types";

type LicenseKeyStatus = "inactive" | "active" | "expired" | "disabled";
type Attributes = {
  /**
   * The ID of the store this license key belongs to.
   */
  store_id: number;
  /**
   * The ID of the customer this license key belongs to.
   */
  customer_id: number;
  /**
   * The ID of the order associated with this license key.
   */
  order_id: number;
  /**
   * The ID of the order item associated with this license key.
   */
  order_item_id: number;
  /**
   * The ID of the product associated with this license key.
   */
  product_id: number;
  /**
   * The full name of the customer.
   */
  user_name: string;
  /**
   * The email address of the customer.
   */
  user_email: string;
  /**
   * The full license key.
   */
  key: string;
  /**
   * A “short” representation of the license key, made up of the string “XXXX-” followed by the last 12 characters of the license key.
   */
  key_short: string;
  /**
   * The activation limit of this license key.
   */
  activation_limit: number;
  /**
   * A count of the number of instances this license key has been activated on.
   */
  instances_count: number;
  /**
   * Has the value `true` if this license key has been disabled.
   */
  disabled: number;
  /**
   * The status of the license key. One of
   *
   * - `inactive`
   * - `active`
   * - `expired`
   * - `disabled`
   */
  status: LicenseKeyStatus;
  /**
   * The formatted status of the license key.
   */
  status_formatted: string;
  /**
   * An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) formatted date-time string indicating when the license key expires. Can be `null` if the license key is perpetual.
   */
  expires_at: string | null;
  /**
   * An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) formatted date-time string indicating when the object was created.
   */
  created_at: string;
  /**
   * An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) formatted date-time string indicating when the object was last updated.
   */
  updated_at: string;
  /**
   * A boolean indicating if the object was created within test mode.
   */
  test_mode: boolean;
};
type LicenseKeyData = Data<
  Attributes,
  Pick<
    Relationships,
    | "store"
    | "customer"
    | "order"
    | "order-item"
    | "product"
    | "license-key-instances"
  >
>;

export type GetLicenseKeyParams = Pick<
  Params<(keyof LicenseKeyData["relationships"])[]>,
  "include"
>;
export type ListLicenseKeysParams = Params<
  GetLicenseKeyParams["include"],
  {
    /**
     * Only return license keys belonging to the store with this ID.
     */
    storeId?: number | string;
    /**
     * Only return license keys belonging to the order with this ID.
     */
    orderId?: number | string;
    /**
     * Only return license keys belonging to the order item with this ID.
     */
    orderItemId?: number | string;
    /**
     * Only return license keys belonging to the product with this ID.
     */
    productId?: number | string;
    /**
     * Only return license keys with this status.
     */
    status?: LicenseKeyStatus;
  }
>;
export type UpdateLicenseKey = {
  /**
   * The activation limit of this license key. Assign `null` to set the activation limit to "unlimited".
   */
  activationLimit?: number | null;
  /**
   * An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) formatted date-time string indicating when the license key expires. Can be `null` if the license key is perpetual.
   */
  expiresAt?: string | null;
  /**
   * If `true`, the license key will have "disabled" status.
   */
  disabled?: boolean;
};

export type LicenseKey = Omit<
  LemonSqueezyResponse<LicenseKeyData, unknown, Pick<Links, "self">>,
  "meta"
>;
export type ListLicenseKeys = LemonSqueezyResponse<
  LicenseKeyData[],
  Pick<Meta, "page">,
  Pick<Links, "first" | "last">
>;

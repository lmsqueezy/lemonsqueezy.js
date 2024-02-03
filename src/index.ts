// Setup
export { lemonSqueezySetup } from './internal'
export type { Flatten } from './types'

// User
export type { User } from './users/types'
export { getAuthenticatedUser } from './users'

// Stores
export type { Store, ListStores, GetStoreParams, ListStoresParams } from './stores/types'
export { getStore, listStores } from './stores'

// Customers
export type {
	Customer,
	ListCustomers,
	NewCustomer,
	UpdateCustomer,
	GetCustomerParams,
	ListCustomersParams,
} from './customers/types'
export { listCustomers, getCustomer, createCustomer, archiveCustomer, updateCustomer } from './customers'

// Products
export type { Product, ListProducts, GetProductParams, ListProductsParams } from './products/types'
export { getProduct, listProducts } from './products'

// Variants
export type { Variant, ListVariants, GetVariantParams, ListVariantsParams } from './variants/types'
export { getVariant, listVariants } from './variants'

// Prices
export type { Price, ListPrices, GetPriceParams, ListPricesParams } from './prices/types'
export { getPrice, listPrices } from './prices'

// Files
export type { File, ListFiles, GetFileParams, ListFilesParams } from './files/types'
export { getFile, listFiles } from './files'

// Orders
export type { Order, ListOrders, GetOrderParams, ListOrdersParams } from './orders/types'
export { getOrder, listOrders } from './orders'

// Order Items
export type { OrderItem, ListOrderItems, GetOrderItemParams, ListOrderItemsParams } from './orderItems/types'
export { getOrderItem, listOrderItems } from './orderItems'

// Subscriptions
export type {
	Subscription,
	ListSubscriptions,
	GetSubscriptionParams,
	ListSubscriptionsParams,
	UpdateSubscription,
} from './subscriptions/types'
export { getSubscription, listSubscriptions, updateSubscription, cancelSubscription } from './subscriptions'

// Subscription Invoices
export type {
	SubscriptionInvoice,
	ListSubscriptionInvoices,
	GetSubscriptionInvoiceParams,
	ListSubscriptionInvoicesParams,
} from './subscriptionInvoices/types'
export { getSubscriptionInvoice, listSubscriptionInvoices } from './subscriptionInvoices'

// Subscription Items
export type {
	SubscriptionItem,
	SubscriptionItemCurrentUsage,
	ListSubscriptionItems,
	GetSubscriptionItemParams,
	ListSubscriptionItemsParams,
} from './subscriptionItems/types'
export {
	getSubscriptionItem,
	listSubscriptionItems,
	getSubscriptionItemCurrentUsage,
	updateSubscriptionItem,
} from './subscriptionItems'

// Usage Records
export type {
	NewUsageRecord,
	UsageRecord,
	ListUsageRecords,
	GetUsageRecordParams,
	ListUsageRecordsParams,
} from './usageRecords/types'
export { listUsageRecords, getUsageRecord, createUsageRecord } from './usageRecords'

// Discounts
export type { Discount, ListDiscounts, GetDiscountParams, ListDiscountsParams, NewDiscount } from './discounts/types'
export { listDiscounts, getDiscount, createDiscount, deleteDiscount } from './discounts'

// Discount Redemptions
export type {
	DiscountRedemption,
	ListDiscountRedemptions,
	GetDiscountRedemptionParams,
	ListDiscountRedemptionsParams,
} from './discountRedemptions/types'
export { listDiscountRedemptions, getDiscountRedemption } from './discountRedemptions'

// License Keys
export type {
	LicenseKey,
	ListLicenseKeys,
	GetLicenseKeyParams,
	ListLicenseKeysParams,
	UpdateLicenseKey,
} from './licenseKeys/types'
export { listLicenseKeys, getLicenseKey, updateLicenseKey } from './licenseKeys'

// License Key Instances
export type {
	GetLicenseKeyInstanceParams,
	ListLicenseKeyInstancesParams,
	LicenseKeyInstance,
	ListLicenseKeyInstances,
} from './licenseKeyInstances/types'
export { listLicenseKeyInstances, getLicenseKeyInstance } from './licenseKeyInstances'

// Checkouts
export type { Checkout, ListCheckouts, GetCheckoutParams, ListCheckoutsParams, NewCheckout } from './checkouts/types'
export { listCheckouts, getCheckout, createCheckout } from './checkouts'

// Webhooks
export type {
	Webhook,
	ListWebhooks,
	GetWebhookParams,
	ListWebhooksParams,
	NewWebhook,
	UpdateWebhook,
} from './webhooks/types'
export { listWebhooks, getWebhook, createWebhook, updateWebhook, deleteWebhook } from './webhooks'

// License API
export type { ActivateLicense, ValidateLicense, DeactivateLicense } from './license/types'
export { activateLicense, validateLicense, deactivateLicense } from './license'

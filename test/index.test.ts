import { describe, expect, it } from 'bun:test'
import * as exports from '../src'

describe('Export', () => {
	it('Should return all exported', () => {
		const shouldBeExports = [
			// Setup
			'lemonSqueezySetup',

			// Users
			'getAuthenticatedUser',

			// Stores
			'getStoreById',
			'getAllStores',

			// Customers
			'listCustomers',
			'getCustomer',
			'createCustomer',
			'archiveCustomer',
			'updateCustomer',

			// Products
			'getProduct',
			'listProducts',

			// Variants
			'getVariant',
			'listVariants',

			// Prices
			'getPrice',
			'listPrices',

			// Files
			'getFile',
			'listFiles',

			// Orders
			'getOrder',
			'listOrders',

			// Order Items
			'getOrderItem',
			'listOrderItems',

			// Subscriptions
			'getSubscription',
			'listSubscriptions',
			'updateSubscription',
			'cancelSubscription',

			// Subscriptions Invoices
			'getSubscriptionInvoice',
			'listSubscriptionInvoices',

			// Subscriptions Items
			'getSubscriptionItem',
			'listSubscriptionItems',
			'getSubscriptionItemCurrentUsage',
			'updateSubscriptionItem',

			// Usage Records
			'listUsageRecords',
			'getUsageRecord',
			'createUsageRecord',

			// Discounts
			'listDiscounts',
			'getDiscount',
			'createDiscount',
			'deleteDiscount',

			// Discount Redemptions
			'listDiscountRedemptions',
			'getDiscountRedemption',

			// License keys
			'listLicenseKeys',
			'getLicenseKey',
			'updateLicenseKey',

			// License Key Instances
			'listLicenseKeyInstances',
			'getLicenseKeyInstance',

			// Checkouts
			'listCheckouts',
			'getCheckout',
			'createCheckout',

			// Webhooks
			'listWebhooks',
			'getWebhook',
			'createWebhook',
			'updateWebhook',
			'deleteWebhook',

			// License
			'activateLicense',
			'validateLicense',
			'deactivateLicense',
		]
		expect(Object.keys(exports).length).toBe(shouldBeExports.length)
	})
})

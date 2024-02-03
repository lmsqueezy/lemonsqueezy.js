type Types =
	| 'stores'
	| 'customers'
	| 'products'
	| 'variants'
	| 'prices'
	| 'files'
	| 'orders'
	| 'order-items'
	| 'subscriptions'
	| 'subscription-invoices'
	| 'subscription-items'
	| 'usage-records'
	| 'discounts'
	| 'discount-redemptions'
	| 'license-keys'
	| 'license-key-instances'
	| 'checkouts'
	| 'webhooks'

type RelationshipKeys =
	| 'store'
	| 'product'
	| 'variant'
	| 'customer'
	| 'order'
	| 'order-item'
	| 'subscription'
	| 'price'
	| 'price-model'
	| 'subscription-item'
	| 'discount'
	| 'license-key'
	| Types
// Data Type
// | 'stores'
// | 'customers'
// | 'products'
// | 'variants'
// | 'prices'
// | 'files'
// | 'orders'
// | 'order-items'
// | 'subscriptions'
// | 'subscription-invoices'
// | 'subscription-items'
// | 'usage-records'
// | 'discounts'
// | 'discount-redemptions'
// | 'license-keys'
// | 'license-key-instances'
// | 'checkouts'
// | 'webhooks'

type RelationshipLinks = {
	links: {
		related: string
		self: string
	}
	data?: { id: string; type: Types }[]
}
export type Relationships = Record<RelationshipKeys, RelationshipLinks>

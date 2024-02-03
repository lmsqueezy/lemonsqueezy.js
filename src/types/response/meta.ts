import type { IntervalUnit } from '../index'

type MetaPage = {
	currentPage: number
	from: number
	lastPage: number
	perPage: number
	to: number
	total: number
}

export type Meta = {
	test_mode: boolean
	page: MetaPage
	// Here is the response meta to retrieve a subscription item's current usage
	period_start: string
	period_end: string
	quantity: number
	interval_unit: IntervalUnit
	interval_quantity: number
}

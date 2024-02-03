export type Flatten<T> = T extends object
	? T extends Array<infer U>
		? Flatten<U>[]
		: { [P in keyof T]: Flatten<T[P]> }
	: T
export type IntervalUnit = 'day' | 'week' | 'month' | 'year'

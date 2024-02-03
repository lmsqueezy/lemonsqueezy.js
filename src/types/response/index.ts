import type { Data } from './data'

export type LemonSqueezyResponse<D, M = unknown, L = unknown, I = Data<Record<string, unknown>>[]> = {
	jsonapi: { version: string }
	links: L
	meta: M
	data: D
	included?: I
}

export type { Links } from './links'
export type { Meta } from './meta'
export type { Data } from './data'
export type { Params } from './params'
export type { Relationships } from './relationships'

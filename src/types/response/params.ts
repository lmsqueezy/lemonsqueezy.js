type Page = {
	number?: number
	size?: number
}
export type Params<I = string[], F = Record<string, unknown>> = Partial<{
	include: I
	filter: F
	page: Page
}>

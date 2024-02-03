import type { Data, LemonSqueezyResponse, Links, Meta } from '../types'

type Attributes = {
	/**
	 * The name of the user.
	 */
	name: string
	/**
	 * The email address of the user.
	 */
	email: string
	/**
	 * A randomly generated hex color code for the user. We use this internally as the background color of an avatar if the user has not uploaded a custom avatar.
	 */
	color: string
	/**
	 * A URL to the avatar image for this user. If the user has not uploaded a custom avatar, this will point to their Gravatar URL.
	 */
	avatar_url: string
	/**
	 * Has the value `true` if the user has uploaded a custom avatar image.
	 */
	has_custom_avatar: boolean
	/**
	 * An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) formatted date-time string indicating when the object was created.
	 * e.g. "2021-05-24T14:08:31.000000Z"
	 */
	createdAt: string
	/**
	 * An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) formatted date-time string indicating when the object was last updated.
	 * e.g. "2021-08-26T13:24:54.000000Z"
	 */
	updatedAt: string
}

export type User = LemonSqueezyResponse<
	Omit<Data<Attributes>, 'relationships'>,
	Pick<Meta, 'test_mode'>,
	Pick<Links, 'self'>
>

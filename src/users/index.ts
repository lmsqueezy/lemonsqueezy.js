import { $fetch } from '../internal'
import type { User } from './types'

/**
 * Retrieve the authenticated user.
 *
 * @returns A user object.
 */
export function getAuthenticatedUser() {
	return $fetch<User>({ path: '/v1/users/me' })
}

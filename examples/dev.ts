import { getAuthenticatedUser, lemonSqueezySetup } from '../src'

lemonSqueezySetup({ apiKey: import.meta.env.LEMON_SQUEEZY_API_KEY })

// Users
getAuthenticatedUser().then(({ statusCode, error, data }) => {
	console.log(statusCode)
	console.log(error)
	console.log(data)
})

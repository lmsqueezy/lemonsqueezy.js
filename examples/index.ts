import { getAuthenticatedUser, lemonSqueezySetup } from "../src/index.js";

const apiKey = import.meta.env.LEMON_SQUEEZY_API_KEY;

// Setup
lemonSqueezySetup({
  apiKey,
  onError: (error) => console.error("Error!", error),
});

// Get authenticated user
const { data, error, statusCode } = await getAuthenticatedUser();

if (error) {
  console.log(error.cause);
} else {
  console.log({ data, error, statusCode });
  console.log(data.data.attributes.email);
}

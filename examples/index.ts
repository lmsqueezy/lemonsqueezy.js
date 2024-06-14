import { getAuthenticatedUser, lemonSqueezySetup } from "../src/index.js";

const apiKey = import.meta.env.LEMON_SQUEEZY_API_KEY;

// Setup
lemonSqueezySetup({
  apiKey,
  onError: (error) => console.error("Error!", error),
});

// Get authenticated user
const { data, error } = await getAuthenticatedUser();

if (error) {
  console.log(error.message);
} else {
  console.log(data);
}

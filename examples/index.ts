import { lemonSqueezySetup, listVariants } from "../src/index.js";

const apiKey = import.meta.env.LEMON_SQUEEZY_API_KEY;

// Setup
lemonSqueezySetup({
  apiKey,
  onError: (error) => console.error("Error!", error),
});

// Get authenticated user
const { data, error } = await listVariants();

if (error) {
  console.log(error.cause);
} else {
  console.log(JSON.stringify({ data: data.data }, null, 2));
}

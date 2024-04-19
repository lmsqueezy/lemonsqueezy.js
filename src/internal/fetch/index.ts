import type { Config } from "../setup/types";
import { API_BASE_URL, CONFIG_KEY, getKV } from "../utils";
import type {
  FetchOptions,
  FetchResponse,
  FetchDataWithError,
  JSONAPIError,
} from "./types";

/**
 * Internal customization of fetch.
 *
 * @param {FetchOptions} options Fetch options.
 * @param {boolean} [needApiKey] (Optional) Whether `apiKey` is required. Default `true`.
 *
 * @returns Fetch response. Includes `statusCode`, `error` and `data`.
 */
export async function $fetch<T>(options: FetchOptions, needApiKey = true) {
  const response = {
    statusCode: null,
    data: null,
    error: Error(),
  };
  const { apiKey, onError } = getKV<Config>(CONFIG_KEY) || {};

  try {
    if (needApiKey && !apiKey) {
      response.error = createLemonError(
        "Please provide your Lemon Squeezy API key. Create a new API key: https://app.lemonsqueezy.com/settings/api",
        "Missing API key"
      );
      onError?.(response.error);
      return response as FetchResponse<T>;
    }

    const { path, method = "GET", query, body } = options;
    const _options: FetchRequestInit = {
      method,
    };

    // url
    const url = new URL(`${API_BASE_URL}${path}`);
    for (const key in query) {
      url.searchParams.append(key, query[key]);
    }

    // headers
    _options.headers = new Headers();
    _options.headers.set("Accept", "application/vnd.api+json");
    _options.headers.set("Content-Type", "application/vnd.api+json");

    // authorization
    if (needApiKey) {
      _options.headers.set("Authorization", `Bearer ${apiKey}`);
    }

    // If payload method, serialize body
    if (["PATCH", "POST"].includes(method)) {
      _options.body = body ? JSON.stringify(body) : null;
    }

    const fetchResponse = await fetch(url.href, _options);
    const data = await fetchResponse.json();
    const fetchOk = fetchResponse.ok;
    const fetchStatus = fetchResponse.status;

    if (fetchOk) {
      Object.assign(response, {
        statusCode: fetchStatus,
        data: data as T,
        error: null,
      });
    } else {
      const { errors, error, message } = data as FetchDataWithError;
      const _error = errors || error || message || "unknown cause";

      Object.assign(response, {
        statusCode: fetchStatus,
        data: null,
        error: createLemonError(fetchResponse.statusText, _error),
      });
    }
  } catch (error) {
    Object.assign(response, { error: error as Error });
  }

  response.error && onError?.(response.error);
  return response as FetchResponse<T>;
}

function createLemonError(
  message: string,
  cause: string | JSONAPIError[] = "unknown"
) {
  const error = new Error(message);
  error.name = "Lemon Squeezy Error";
  error.cause = cause;
  return error;
}

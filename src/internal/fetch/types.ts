/* eslint-disable @typescript-eslint/no-explicit-any */
type ApiVersion = "v1";

export type FetchResponse<T> =
  | {
      statusCode: number;
      data: T;
      error: null;
    }
  | {
      statusCode: number | null;
      data: null;
      error: Error;
    };

export type FetchOptions = {
  /**
   * The path to the API endpoint.
   */
  path: `/${ApiVersion}/${string}`;
  /**
   * The HTTP method to use.
   * @default "GET"
   */
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  /**
   * Query parameters.
   */
  query?: Record<string, any>;
  /**
   * Request body.
   */
  body?: Record<string, any>;
};

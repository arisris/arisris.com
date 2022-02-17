export const REST_API_ERROR_TYPE = {
  INTERNAL_SERVER_ERROR: 500,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_SUPPORTED: 405,
  TIMEOUT: 408,
  PRECODITION_FAILED: 412,
  PAYLOAD_TO_LARGE: 413,
  CLIENT_CLOSED_REQUEST: 499
} as const;

type ValueOf<T> = T[keyof T];

export class RestApiError extends Error {
  readonly code: ValueOf<typeof REST_API_ERROR_TYPE> = 500;
  constructor(code: keyof typeof REST_API_ERROR_TYPE, message?: string) {
    super(message);
    this.code = REST_API_ERROR_TYPE[code];
  }
}

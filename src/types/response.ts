export interface SuccessfulResponse<Data extends Record<string, unknown>> {
    ok: true
    data: Data
    error: undefined
}

export interface ErrorResponse {
    ok: false
    data: undefined
    error: unknown
}

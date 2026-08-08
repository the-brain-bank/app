import type { Result } from "neverthrow";

export type TypedResponse<TSuccess, TError> = Result<TSuccess, TError>;
export type TypedPromiseResponse<TData, TError> = Promise<TypedResponse<TData, TError>>;
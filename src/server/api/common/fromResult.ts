import { TRPCClientError } from '@trpc/client'
import type Result from './result'

export function fromResult<T>(result: Result<T>): T {
  if (result.IsFailure) {
    throw new TRPCClientError(result.Error)
  }
  return result.Value
}

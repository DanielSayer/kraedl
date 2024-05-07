import { TRPCClientError } from "@trpc/client";
import type Result from "./result";

export function fromResult<T>(result: Result<T>): T {
  if (result.isFailure()) {
    throw new TRPCClientError(result.GetError());
  }
  return result.GetValue();
}

import { TRPCError } from '@trpc/server'

class Result<T> {
  private isSuccess: boolean
  private value: T | undefined
  private error: string | undefined

  private constructor(isSuccess: boolean, value?: T, error?: string) {
    this.isSuccess = isSuccess
    this.value = value
    this.error = error
  }

  public static Success<T>(obj: T): Result<T> {
    return new Result(true, obj)
  }

  public static Failure<T>(error: string): Result<T> {
    return new Result<T>(false, undefined, error)
  }

  get IsSuccess(): boolean {
    return this.isSuccess
  }

  get IsFailure(): boolean {
    return !this.isSuccess
  }

  get Value(): T {
    if (!this.isSuccess) {
      throw new TRPCError({
        message: 'Cannot access value on failure',
        code: 'INTERNAL_SERVER_ERROR',
      })
    }
    return this.value!
  }

  get Error(): string {
    if (this.isSuccess) {
      throw new TRPCError({
        message: 'Cannot access error on success',
        code: 'INTERNAL_SERVER_ERROR',
      })
    }
    return this.error!
  }
}

export default Result

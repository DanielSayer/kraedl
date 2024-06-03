import { TRPCError } from '@trpc/server'

class Result<T> {
  private IsSuccess: boolean
  private Value: T | undefined
  private Error: string | undefined

  private constructor(isSuccess: boolean, value?: T, error?: string) {
    this.IsSuccess = isSuccess
    this.Value = value
    this.Error = error
  }

  public static Success<T>(obj: T): Result<T> {
    return new Result(true, obj)
  }

  public static Failure<T>(error: string): Result<T> {
    return new Result<T>(false, undefined, error)
  }

  public isSuccess(): boolean {
    return this.IsSuccess
  }

  public isFailure(): boolean {
    return !this.IsSuccess
  }

  public GetValue(): T {
    if (!this.IsSuccess) {
      throw new TRPCError({
        message: 'Cannot access value on failure',
        code: 'INTERNAL_SERVER_ERROR',
      })
    }
    return this.Value!
  }

  public GetError(): string {
    if (this.IsSuccess) {
      throw new TRPCError({
        message: 'Cannot access error on success',
        code: 'INTERNAL_SERVER_ERROR',
      })
    }
    return this.Error!
  }
}

export default Result

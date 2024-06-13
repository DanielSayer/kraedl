import { convertDateAndTimeToDate } from '../common/helperMethods/dateHelpers'
import Result from '../common/result'
import DateRange from '../common/valueObjects/DateRange'

export const dateRangeValidatorService = (
  startTime: string,
  endTime: string,
  date: string,
  timezone: string,
): Result<DateRange> => {
  const startDate = convertDateAndTimeToDate(startTime, date, timezone)
  const endDate = convertDateAndTimeToDate(endTime, date, timezone)

  const dateRangeResult = DateRange.NewResult(startDate, endDate)
  if (dateRangeResult.IsFailure) {
    return Result.Failure(dateRangeResult.Error)
  }

  return Result.Success(dateRangeResult.Value)
}

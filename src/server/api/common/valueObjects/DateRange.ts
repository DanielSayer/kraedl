import Result from "../result";

class DateRange {
  public Start: Date;
  public End: Date;

  private constructor(start: Date, end: Date) {
    this.Start = start;
    this.End = end;
  }

  public static NewResult(start: Date, end: Date): Result<DateRange> {
    if (start.getTime() > end.getTime()) {
      return Result.Failure<DateRange>("End time is after start time.");
    }

    const dateRange = new DateRange(start, end);
    return Result.Success(dateRange);
  }
}

export default DateRange;

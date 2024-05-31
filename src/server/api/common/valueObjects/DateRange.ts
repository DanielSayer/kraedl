import type { Recurrence as RecurrenceDto, RecurrenceEnd, RecurrenceFrequency} from "@/types/recurrence";
import Result from "../result";
import { generateRecurrenceRule, getRecurrenceEnd, rruleToRecurrence } from "@/lib/recurrenceUtils";

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


class Recurrence {
  public RecurrenceRule: string;
  public Frequency: RecurrenceFrequency;
  public Interval: number | undefined;
  public RecurrenceEnd: RecurrenceEnd | undefined;
  public EndOn: Date | undefined;
  public EndAfter: number | undefined;
  private constructor(
    recurrenceRule: string | undefined,
    recurrenceDto: RecurrenceDto | undefined
  ) {
    if (recurrenceRule && !recurrenceDto) {
      const recurrenceResult = rruleToRecurrence(recurrenceRule);
      this.RecurrenceRule = recurrenceRule;
      this.Frequency = recurrenceResult.freq;
      this.Interval = recurrenceResult.interval;
      this.EndAfter = recurrenceResult.count;
      this.EndOn = recurrenceResult.until;
      this.RecurrenceEnd = getRecurrenceEnd(recurrenceResult.count, recurrenceResult.until)
    }

    if (recurrenceDto && !recurrenceRule) {
      this.Frequency = recurrenceDto.freq;
      this.Interval = recurrenceDto.interval;
      this.EndAfter = recurrenceDto.count;
      this.EndOn = recurrenceDto.until;
      this.RecurrenceEnd = getRecurrenceEnd(recurrenceDto.count, recurrenceDto.until);
      this.RecurrenceRule = generateRecurrenceRule(recurrenceDto);
    }

    throw new Error("Could not get recurrence");
  }
}
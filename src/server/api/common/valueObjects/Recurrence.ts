import {
  generateRecurrenceRule,
  getRecurrenceEnd,
  rruleToRecurrence,
} from "@/lib/recurrenceUtils";
import type {
  RecurrenceEnd,
  RecurrenceFrequency,
  Recurrence as RecurrenceDto,
} from "@/types/recurrence";
import Result from "../result";

export class Recurrence {
  public RecurrenceRule: string;
  public Frequency: RecurrenceFrequency;
  public Interval: number | undefined;
  public EndType: RecurrenceEnd | undefined;
  public EndAfter: number | undefined;
  public EndOn: string | undefined;

  private constructor(recurrenceRule?: string, recurrence?: RecurrenceDto) {
    if (recurrence && !recurrenceRule) {
      this.Frequency = recurrence.freq;
      this.Interval = recurrence.interval;
      this.EndType = recurrence.endType;
      this.EndAfter = recurrence.count;
      this.EndOn = recurrence.until;
      this.RecurrenceRule = generateRecurrenceRule(recurrence);
    }

    if (recurrenceRule && !recurrence) {
      this.RecurrenceRule = recurrenceRule;
      const recurrenceRes = rruleToRecurrence(recurrenceRule);
      this.Frequency = recurrenceRes.freq;
      this.Interval = recurrenceRes.interval;
      this.EndAfter = recurrenceRes.count;
      this.EndOn = recurrenceRes.until;
      this.EndType = getRecurrenceEnd(recurrenceRes.count, recurrenceRes.until);
    }

    throw new Error("Cannot create recurrence");
  }

  static TryCreate(
    request: RecurrenceDto | string,
    eventDate: string,
  ): Result<Recurrence> {
    if (typeof request === "string") {
      const recurrence = new Recurrence(request, undefined);
      return Result.Success(recurrence);
    }

    if (request.freq === "NONE") {
      const cleanedRequest: RecurrenceDto = { freq: request.freq };
      const recurrence = new Recurrence(undefined, cleanedRequest);
      return Result.Success(recurrence);
    }

    if (!request.interval || request.interval < 1) {
      return Result.Failure("Interval is required.");
    }

    if (!request.endType) {
      return Result.Failure("End type is required.");
    }

    if (request.endType === "AFTER") {
      if (!request.until) {
        return Result.Failure("End date is required.");
      }

      if (new Date(request.until).getTime() < new Date(eventDate).getTime()) {
        return Result.Failure("End date must be event begins.");
      }

      const cleanedRequest: RecurrenceDto = { ...request, count: undefined };
      const recurrence = new Recurrence(undefined, cleanedRequest);
      return Result.Success(recurrence);
    }

    if (!request.count) {
      return Result.Failure("Number of events is required.");
    }

    const cleanedRequest: RecurrenceDto = { ...request, until: undefined };
    const recurrence = new Recurrence(undefined, cleanedRequest);
    return Result.Success(recurrence);
  }
}

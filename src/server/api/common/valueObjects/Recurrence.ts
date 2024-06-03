import {
  generateRecurrenceRule,
  rruleToRecurrence,
} from "@/lib/recurrenceUtils";
import type {
  RecurrenceEnd,
  RecurrenceFrequency,
  Recurrence as RecurrenceDto,
} from "@/types/recurrence";

class Recurrence {
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
      this.EndType = recurrenceRes.count ? "AFTER" : "ON";
    }

    throw new Error("Cannot create recurrence");
  }
}

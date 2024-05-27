const recurrenceFrequencies = ["DAILY", "WEEKLY", "MONTHLY"] as const;
export type RecurrenceFrequency = (typeof recurrenceFrequencies)[number];

export type Recurrence = {
  freq: RecurrenceFrequency;
  count?: number;
  until?: Date;
  interval?: number;
};

import type { DropdownOption } from "./components/dropdownItem";

export const recurrenceFrequencies = [
  "NONE",
  "DAILY",
  "WEEKLY",
  "MONTHLY",
] as const;
export type RecurrenceFrequency = (typeof recurrenceFrequencies)[number];

export type Recurrence = {
  freq: RecurrenceFrequency;
  interval?: number;
  endType?: RecurrenceEnd;
  count?: number;
  until?: string;
};

export const recurrenceEnds = ["AFTER", "ON"] as const;
export type RecurrenceEnd = (typeof recurrenceEnds)[number];

export const recurrenceFrequencyOptions: DropdownOption[] = [
  { label: "None", value: "NONE" },
  { label: "Daily", value: "DAILY" },
  { label: "Weekly", value: "WEEKLY" },
  { label: "Monthly", value: "MONTHLY" },
];

export const getPlural = (freq: RecurrenceFrequency) => {
  if (freq === "DAILY") {
    return "days";
  }
  if (freq === "WEEKLY") {
    return "weeks";
  }
  if (freq === "MONTHLY") {
    return "months";
  }
  return "";
};

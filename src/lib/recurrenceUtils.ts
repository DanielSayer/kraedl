import type { Recurrence, RecurrenceFrequency } from "@/types/recurrence";
import { format } from "date-fns";

export const recurrenceToICal = (recurrence: Recurrence): string => {
  const rules: string[] = [`FREQ=${recurrence.freq}`];

  for (const [key, value] of Object.entries(recurrence)) {
    if (key === "freq") continue;
    let formattedValue: string | number = value as string | number;

    if (key === "until" && value instanceof Date) {
      formattedValue = format(value, "YYYYMMDDTHHmmssZ");
    }

    const capitalizedKey = key.toUpperCase();
    rules.push(`${capitalizedKey}=${formattedValue}`);
  }

  return rules.join(";");
};

export const rruleToRecurrence = (rrule: string): Recurrence => {
  const rec: Partial<Recurrence> = {};

  const rules = rrule.split(";");
  rules.forEach((rule) => {
    const [key, value] = rule.split("=");
    if (!key || !value) return;
    const lowercaseKey = key.toLowerCase();

    switch (lowercaseKey) {
      case "freq":
        rec.freq = value as RecurrenceFrequency;
        break;
      case "count":
        rec.count = parseInt(value, 10);
        break;
      case "until":
        rec.until = new Date(format(value, "YYYY-mm-dd"));
        break;
      case "interval":
        rec.interval = parseInt(value, 10);
        break;
      default:
        break;
    }
  });

  return rec as Recurrence;
};

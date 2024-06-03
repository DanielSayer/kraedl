import type {
  Recurrence,
  RecurrenceEnd,
  RecurrenceFrequency,
} from '@/types/recurrence'
import { endOfDay, format } from 'date-fns'

export const generateRecurrenceRule = (recurrence: Recurrence): string => {
  const rules: string[] = [`FREQ=${recurrence.frequency}`]

  for (const [key, value] of Object.entries(recurrence)) {
    if (!value) continue
    if (key === 'frequency' || key === 'endType') continue
    let formattedValue = value

    if (key === 'until') {
      const until = endOfDay(value)
      formattedValue = format(until, "yyyyMMdd'T'HHmmss")
    }

    const capitalizedKey = key.toUpperCase()
    rules.push(`${capitalizedKey}=${formattedValue}`)
  }

  return rules.join(';')
}

export const rruleToRecurrence = (rrule: string): Recurrence => {
  const rec: Partial<Recurrence> = {}

  const rules = rrule.split(';')
  rules.forEach((rule) => {
    const [key, value] = rule.split('=')
    if (!key || !value) return
    const lowercaseKey = key.toLowerCase()

    switch (lowercaseKey) {
      case 'frequency':
        rec.frequency = value as RecurrenceFrequency
        break
      case 'count':
      case 'interval':
      case 'until':
        rec.count = value
        break
      default:
        break
    }
  })

  return rec as Recurrence
}

export const getRecurrenceEnd = (
  count: number | undefined,
  until: string | undefined,
): RecurrenceEnd | undefined => {
  if (!count && !until) {
    return
  }

  return count ? 'AFTER' : 'ON'
}

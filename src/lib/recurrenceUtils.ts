import type {
  Recurrence,
  RecurrenceEnd,
  RecurrenceFrequency,
} from '@/types/recurrence'
import { format } from 'date-fns'

export const generateRecurrenceRule = (recurrence: Recurrence): string => {
  const rules: string[] = [`FREQ=${recurrence.freq}`]

  for (const [key, value] of Object.entries(recurrence)) {
    if (key === 'freq' || key === 'endType') continue
    let formattedValue = value

    if (key === 'until') {
      formattedValue = format(value, 'YYYYMMDDTHHmmssZ')
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
      case 'freq':
        rec.freq = value as RecurrenceFrequency
        break
      case 'count':
        rec.count = parseInt(value, 10)
        break
      case 'until':
        rec.until = format(value, 'YYYY-mm-dd')
        break
      case 'interval':
        rec.interval = parseInt(value, 10)
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

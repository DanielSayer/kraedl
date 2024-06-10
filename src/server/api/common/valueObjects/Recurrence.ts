import {
  generateRecurrenceRule,
  getRecurrenceEnd,
  rruleToRecurrence,
} from '@/lib/recurrenceUtils'
import type {
  RecurrenceEnd,
  RecurrenceFrequency,
  Recurrence as RecurrenceDto,
} from '@/types/recurrence'
import Result from '../result'
import { addDays, addMonths, addWeeks, endOfDay } from 'date-fns'

export class Recurrence {
  public RecurrenceRule: string
  public Frequency: RecurrenceFrequency
  public Interval: number | undefined
  public EndType: RecurrenceEnd | undefined
  public Count: number | undefined
  public Until: string | undefined

  private constructor(recurrenceRule?: string, recurrence?: RecurrenceDto) {
    if (recurrence && !recurrenceRule) {
      this.Frequency = recurrence.frequency
      this.Interval = Number(recurrence.interval)
      this.EndType = recurrence.endType
      this.Count = Number(recurrence.count)
      this.Until = recurrence.until
      this.RecurrenceRule = generateRecurrenceRule(recurrence)
      return
    }

    if (recurrenceRule && !recurrence) {
      this.RecurrenceRule = recurrenceRule
      const recurrenceRes = rruleToRecurrence(recurrenceRule)
      this.Frequency = recurrenceRes.frequency
      this.Interval = recurrenceRes.interval
        ? Number(recurrenceRes.interval)
        : undefined
      this.Count = recurrenceRes.count ? Number(recurrenceRes.count) : undefined
      this.Until = recurrenceRes.until
      this.EndType = getRecurrenceEnd(
        Number(recurrenceRes.count),
        recurrenceRes.until,
      )
      return
    }

    throw new Error('Cannot create recurrence')
  }

  static TryCreate(
    request: RecurrenceDto | string,
    eventDate: string,
  ): Result<Recurrence> {
    if (typeof request === 'string') {
      const recurrence = new Recurrence(request, undefined)
      return Result.Success(recurrence)
    }

    if (request.frequency === 'NONE') {
      const cleanedRequest: RecurrenceDto = { frequency: request.frequency }
      const recurrence = new Recurrence(undefined, cleanedRequest)
      return Result.Success(recurrence)
    }

    const interval = parseFloat(request.interval ?? '0')
    if (isNaN(interval) || !Number.isInteger(interval) || interval < 1) {
      return Result.Failure('Interval is required.')
    }

    if (!request.endType) {
      return Result.Failure('End type is required.')
    }

    if (request.endType === 'ON') {
      if (!request.until) {
        return Result.Failure('End date is required.')
      }

      if (new Date(request.until).getTime() < new Date(eventDate).getTime()) {
        return Result.Failure('End date must be event begins.')
      }

      const cleanedRequest: RecurrenceDto = { ...request, count: undefined }
      const recurrence = new Recurrence(undefined, cleanedRequest)
      return Result.Success(recurrence)
    }

    const count = parseFloat(request.count ?? '0')
    if (isNaN(count) || !Number.isInteger(count) || count < 1) {
      return Result.Failure('Number of events is required.')
    }

    const cleanedRequest: RecurrenceDto = { ...request, until: undefined }
    const recurrence = new Recurrence(undefined, cleanedRequest)
    return Result.Success(recurrence)
  }

  getRecurrenceEnd(eventEnd: Date) {
    if (this.Frequency === 'NONE') {
      return eventEnd
    }

    if (!this.Interval || !this.EndType) {
      throw new Error()
    }

    if (this.EndType === 'AFTER') {
      if (!this.Count) {
        throw new Error()
      }
      const lengthOfRecurrence = this.Count * this.Interval - 1
      return addTime(this.Frequency, eventEnd, lengthOfRecurrence)
    }

    if (!this.Until) {
      throw new Error()
    }
    return endOfDay(this.Until)
  }

  getNextEventDates(startTime: Date, endTime: Date) {
    return {
      start: addTime(this.Frequency, startTime, 1),
      end: addTime(this.Frequency, endTime, 1),
    }
  }

  hasNextEvent(endTime: Date) {
    if (this.Frequency === 'NONE') {
      return false
    }
    const nextEventDate = this.getNextEventDates(new Date(), endTime)
    return (
      nextEventDate.end.getTime() <=
      new Date(this.getRecurrenceEnd(endTime)).getTime()
    )
  }
}

export function addTime(
  frequency: RecurrenceFrequency,
  time: Date,
  amount: number,
) {
  if (frequency === 'NONE') return time

  if (frequency === 'DAILY') {
    return addDays(time, amount)
  }

  if (frequency === 'WEEKLY') {
    return addWeeks(time, amount)
  }

  return addMonths(time, amount)
}

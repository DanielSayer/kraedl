'use client'

import { Icons } from '@/components/Icons'
import {
  Fieldset,
  FieldsetContent,
  FieldsetHeader,
  FieldsetLegend,
  FieldsetTitle,
} from '@/components/ui/fieldset'
import { Form } from '@/components/ui/form'
import { formatDateRange } from '@/lib/dateRangeUtils'
import { quoteBuilderSchema, type QuoteBuilder } from '@/lib/validations/events'
import { api } from '@/trpc/react'
import type { QuoteEvent } from '@/types/events'
import type { PricingLine } from '@/types/pricingLines'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { PricingBuilder } from './PricingBuilder'
import { Recurrence } from './Recurrence'
import { ErrorMessage } from '@/components/ui/errorMessage'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import SaveRecurrenceDialog from './SaveRecurrenceDialog'

type EventFormProps = {
  isReadOnly: boolean
  event: QuoteEvent
  pricingLines: PricingLine[]
}

export const EventForm = ({
  isReadOnly,
  event,
  pricingLines,
}: EventFormProps) => {
  const form = useForm<QuoteBuilder>({
    defaultValues: {
      eventId: event.id,
      eventPricings: pricingLines,
      recurrence: {
        frequency: event.recurrence.frequency,
        interval: event.recurrence.interval ?? '1',
        endType: event.recurrence.endType ?? 'AFTER',
        count: event.recurrence.count ?? '3',
        until: event.recurrence.until,
      },
    },
    resolver: zodResolver(quoteBuilderSchema),
  })

  const { isPending, mutateAsync } = api.eventPricing.save.useMutation({
    onError: (e) => form.setError('root', { message: e.message }),
    onSuccess: () => toast.success('Successfully saved'),
  })

  const handleSubmit = async (data: QuoteBuilder) => {
    await mutateAsync(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} id="quote-builder">
        <div className="space-y-4">
          <div className="grid grid-cols-8 gap-4">
            <Fieldset className="col-span-5">
              <FieldsetLegend>
                <Icons.calendar /> Event
              </FieldsetLegend>
              <FieldsetHeader className="font-semibold">
                <FieldsetTitle>
                  {event.name ? event.name : event.clientName}
                </FieldsetTitle>
                <p className="font-normal text-muted-foreground">
                  {formatDateRange(event.startTime, event.endTime)}
                </p>
              </FieldsetHeader>
              {event.name && (
                <FieldsetContent>
                  <p className="font-semibold">Client</p>
                  <p>{event.clientName}</p>
                </FieldsetContent>
              )}
            </Fieldset>
            <div className="col-span-3 h-full">
              <Recurrence />
            </div>
          </div>
          <PricingBuilder isReadOnly={isReadOnly} />
          <ErrorMessage>{form.formState.errors.root?.message}</ErrorMessage>
          <div className="flex justify-end gap-2">
            <Link
              href="/scheduler"
              className={buttonVariants({ variant: 'secondary' })}
            >
              Go back
            </Link>
            <SaveRecurrenceDialog
              isPending={isPending}
              isReadOnly={isReadOnly}
            />
          </div>
        </div>
      </form>
    </Form>
  )
}

import { Icons } from '@/components/Icons'
import {
  Fieldset,
  FieldsetContent,
  FieldsetHeader,
  FieldsetLegend,
  FieldsetTitle,
} from '@/components/ui/fieldset'
import { formatDateAndTimeRange } from '@/lib/dateRangeUtils'
import type { QuoteBuilder } from '@/lib/validations/events'
import { useFormContext } from 'react-hook-form'

type EventInfoProps = {
  eventName: string | null
  clientName: string
}

export const EventInfo = ({ eventName, clientName }: EventInfoProps) => {
  const { watch } = useFormContext<QuoteBuilder>()
  const date = watch('date')
  const startTime = watch('startTime')
  const endTime = watch('endTime')
  return (
    <Fieldset className="col-span-5">
      <FieldsetLegend>
        <Icons.calendar /> Event
      </FieldsetLegend>
      <FieldsetHeader className="font-semibold">
        <FieldsetTitle>{eventName ? eventName : clientName}</FieldsetTitle>
        <p className="font-normal text-muted-foreground">
          {formatDateAndTimeRange(date, startTime, endTime)}
        </p>
      </FieldsetHeader>
      {eventName && (
        <FieldsetContent>
          <p className="font-semibold">Client</p>
          <p>{clientName}</p>
        </FieldsetContent>
      )}
    </Fieldset>
  )
}

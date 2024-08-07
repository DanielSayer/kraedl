import { Icons } from '@/components/Icons'
import { Button } from '@/components/ui/button'
import Combobox from '@/components/ui/combobox'
import { DatePicker } from '@/components/ui/datepicker'
import {
  Fieldset,
  FieldsetContent,
  FieldsetHeader,
  FieldsetLegend,
  FieldsetTitle,
} from '@/components/ui/fieldset'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import useLoadClientsOptions from '@/hooks/useLoadClientOptions'
import { formatDateAndTimeRange } from '@/lib/dateRangeUtils'
import type { QuoteBuilder } from '@/lib/validations/events'
import type { DropdownOption } from '@/types/components/dropdownItem'
import { useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'

export const EventInfo = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const { watch } = useFormContext<QuoteBuilder>()
  const { clients } = useLoadClientsOptions()
  const { name, startTime, endTime, date, clientId } = watch()

  const clientName = useMemo(() => {
    const client = clients.find((c) => c.value === clientId)
    return client?.label ?? ''
  }, [clients, clientId])

  const handleClickReadOnly = () => {
    setIsEditing(false)
  }

  return (
    <Fieldset className="col-span-5">
      <FieldsetLegend>
        <Icons.calendar /> Event
      </FieldsetLegend>
      {isEditing ? (
        <div className="pt-5">
          <EditEventInfo
            clients={clients}
            handleClickReadOnly={handleClickReadOnly}
          />
        </div>
      ) : (
        <>
          <FieldsetHeader className="relative mb-2 font-semibold">
            <Button
              type="button"
              variant="outline"
              className="absolute right-4 flex rounded-3xl"
              onClick={() => setIsEditing(true)}
            >
              <Icons.edit className="me-2 h-4 w-4" />
              Edit
            </Button>
            <FieldsetTitle>{name ? name : clientName}</FieldsetTitle>
            <p className="font-normal text-muted-foreground">
              {formatDateAndTimeRange(date, startTime, endTime)}
            </p>
          </FieldsetHeader>
          {name && (
            <FieldsetContent>
              <p className="font-semibold">Client</p>
              <p>{clientName}</p>
            </FieldsetContent>
          )}
        </>
      )}
    </Fieldset>
  )
}

type EditEventInfoProps = {
  clients: DropdownOption[]
  handleClickReadOnly: () => void
}
const EditEventInfo = ({
  clients,
  handleClickReadOnly,
}: EditEventInfoProps) => {
  const { control } = useFormContext<QuoteBuilder>()

  return (
    <FieldsetContent>
      <div className="flex items-end justify-between gap-4">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="sr-only">Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="button"
          variant="outline"
          className="flex rounded-3xl"
          onClick={handleClickReadOnly}
        >
          <Icons.view className="me-2 h-4 w-4" />
          View
        </Button>
      </div>
      <div className="flex w-full gap-2">
        <FormField
          control={control}
          name="clientId"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="sr-only">Client</FormLabel>
              <FormControl>
                <Combobox
                  options={clients}
                  value={field.value}
                  onChange={(value) => field.onChange(value.value)}
                  placeholder="Client"
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      <div className="flex w-full gap-2">
        <FormField
          control={control}
          name="date"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="sr-only">Date</FormLabel>
              <FormControl>
                <DatePicker date={field.value} onChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="startTime"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="sr-only">Start Time</FormLabel>
              <FormControl>
                <Input {...field} type="time" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="endTime"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="sr-only">End Time</FormLabel>
              <FormControl>
                <Input {...field} type="time" />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </FieldsetContent>
  )
}

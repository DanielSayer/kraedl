'use client'

import { Icons } from '@/components/Icons'
import Combobox from '@/components/ui/combobox'
import { DatePicker } from '@/components/ui/datepicker'
import {
  Fieldset,
  FieldsetContent,
  FieldsetLegend,
} from '@/components/ui/fieldset'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import type { QuoteBuilder } from '@/lib/validations/events'
import { getPlural, recurrenceFrequencyOptions } from '@/types/recurrence'
import { useFormContext } from 'react-hook-form'

export const Recurrence = () => {
  const { watch, control } = useFormContext<QuoteBuilder>()
  const frequency = watch('recurrence.frequency')
  const end = watch('recurrence.endType')
  return (
    <Fieldset className="h-full">
      <FieldsetLegend>
        <Icons.recurrence /> Recurrence
      </FieldsetLegend>
      <FieldsetContent className="p-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            name="recurrence.frequency"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Frequency</FormLabel>
                <Combobox
                  options={recurrenceFrequencyOptions}
                  onChange={(opt) => field.onChange(opt.value)}
                  value={field.value}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          {frequency !== 'NONE' && (
            <>
              <FormField
                name="recurrence.interval"
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Every</FormLabel>
                    <FormControl>
                      <div className="flex w-full items-center space-x-2">
                        <Input {...field} type="number" min={0} step={1} />
                        <span>{getPlural(frequency)}</span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="col-span-2">
                <FormField
                  name="recurrence.endType"
                  control={control}
                  render={({ field }) => (
                    <FormItem className="space-y-0">
                      <FormLabel>End</FormLabel>
                      <FormControl>
                        <div className="flex gap-4">
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormItem className="flex items-center space-x-2 space-y-0 pt-2">
                              <RadioGroupItem value="AFTER" />
                              <FormLabel>After</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <RadioGroupItem value="ON" />
                              <FormLabel>On</FormLabel>
                            </FormItem>
                          </RadioGroup>
                          <div className="w-full">
                            <FormField
                              control={control}
                              name="recurrence.count"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="sr-only">
                                    After
                                  </FormLabel>
                                  <FormControl>
                                    <div className="flex w-full items-center space-x-2">
                                      <Input
                                        type="number"
                                        min={0}
                                        step={1}
                                        disabled={end !== 'AFTER'}
                                        {...field}
                                      />
                                      <span>occurrences</span>
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={control}
                              name="recurrence.until"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="sr-only">
                                    Ends On
                                  </FormLabel>
                                  <FormControl>
                                    <DatePicker
                                      onChange={(date) => field.onChange(date)}
                                      date={field.value}
                                      disabled={end !== 'ON'}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </>
          )}
        </div>
      </FieldsetContent>
    </Fieldset>
  )
}

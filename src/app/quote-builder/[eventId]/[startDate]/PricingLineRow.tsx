import { Icons } from '@/components/Icons'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Combobox from '@/components/ui/combobox'
import { FormField, FormItem, FormLabel } from '@/components/ui/form'
import { IconInput } from '@/components/ui/icon-input'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { formatCurrency, getTotalPrice } from '@/lib/currencyUtils'
import type { QuoteBuilder } from '@/lib/validations/events'
import type { DropdownOption } from '@/types/components/dropdownItem'
import type { PricingLine } from '@/types/pricingLines'
import { useFieldArray, useFormContext } from 'react-hook-form'

type PricingLineProps = {
  index: number
  pricingOptions: DropdownOption[]
  isPricingLoading: boolean
  getPriceForItem: (seclectedPriceId: string) => string
}

export const PricingLineRow = ({
  index,
  pricingOptions,
  isPricingLoading,
  getPriceForItem,
}: PricingLineProps) => {
  const { control, setValue, watch } = useFormContext<QuoteBuilder>()
  const { remove } = useFieldArray<QuoteBuilder>({ name: 'eventPricings' })
  const currentPricingLine = watch(`eventPricings.${index}`)

  const removePricingLine = () => {
    const pricingLines = watch('eventPricings')
    const index = pricingLines.findIndex((p) => p.id === currentPricingLine.id)
    remove(index)
  }

  const updatePricingLine = <T extends keyof Omit<PricingLine, 'totalPrice'>>(
    key: T,
    value: PricingLine[T],
  ) => {
    const newPricingLine = {
      ...currentPricingLine,
      [key]: value,
    }
    const pricePer = getPriceForItem(newPricingLine.pricingId)
    const newLineItemPrice = getTotalPrice(pricePer, newPricingLine.quantity, {
      format: true,
      removeSign: true,
    })

    setValue(`eventPricings.${index}`, {
      ...newPricingLine,
      totalPrice: newLineItemPrice,
    })
  }

  return (
    <Card>
      <CardContent className="flex items-end justify-between p-6 pt-4">
        <div className="grid w-11/12 grid-cols-6 gap-4">
          <FormField
            control={control}
            name={`eventPricings.${index}.pricingId`}
            render={({ field }) => (
              <FormItem className="col-span-3 space-y-1">
                <FormLabel>Pricing Name</FormLabel>
                <Combobox
                  onChange={(opt) => updatePricingLine('pricingId', opt.value)}
                  options={pricingOptions}
                  isLoading={isPricingLoading}
                  value={field.value}
                />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`eventPricings.${index}.quantity`}
            render={({ field }) => {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const { onChange: _, ...rest } = field
              return (
                <FormItem className="space-y-1">
                  <FormLabel>Quantity</FormLabel>
                  <Input
                    type="number"
                    step={0.5}
                    min={0}
                    onChange={(e) =>
                      updatePricingLine('quantity', e.target.value)
                    }
                    {...rest}
                  />
                </FormItem>
              )
            }}
          />
          <div className="space-y-1">
            <Label htmlFor="price_per">Price per</Label>
            <IconInput
              startIcon={Icons.money}
              id="price_per"
              readOnly
              disabled
              value={formatCurrency(
                getPriceForItem(currentPricingLine.pricingId),
                {
                  removeSign: true,
                },
              )}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="total">Total Price</Label>
            <IconInput
              startIcon={Icons.money}
              id="total"
              readOnly
              disabled
              value={currentPricingLine.totalPrice}
            />
          </div>
        </div>
        <div className="me-4">
          <Button
            className="hover:bg-destructive hover:text-background"
            variant="outline"
            size="icon"
            type="button"
            onClick={() => removePricingLine()}
          >
            <Icons.delete className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

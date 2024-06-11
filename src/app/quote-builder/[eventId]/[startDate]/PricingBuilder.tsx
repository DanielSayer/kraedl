'use client'

import { Icons } from '@/components/Icons'
import { Button } from '@/components/ui/button'
import {
  Fieldset,
  FieldsetContent,
  FieldsetLegend,
} from '@/components/ui/fieldset'
import { Separator } from '@/components/ui/separator'
import { formatCurrency, getTotalPrice } from '@/lib/currencyUtils'
import { cn } from '@/lib/utils'
import type { QuoteBuilder } from '@/lib/validations/events'
import { api } from '@/trpc/react'
import { getNewPricingLine } from '@/types/pricingLines'
import { useMemo } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { PricingLineRow } from './PricingLineRow'

type PricingBuilderProps = {
  isReadOnly: boolean
}

export const PricingBuilder = ({ isReadOnly }: PricingBuilderProps) => {
  const { watch } = useFormContext<QuoteBuilder>()
  const { append } = useFieldArray<QuoteBuilder>({ name: 'eventPricings' })
  const { data: pricings, isLoading } = api.pricing.getPricings.useQuery()
  const pricingLines = watch('eventPricings')

  const getPriceForItem = (selectedPriceId: string) => {
    return pricings?.find((x) => x.id === selectedPriceId)?.price ?? '0'
  }

  const getQuotePrice = () => {
    const prices = pricingLines.map((x) => {
      if (x.quantity === '') return 0
      const priceForItem = getPriceForItem(x.pricingId)
      const totalPrice = getTotalPrice(x.quantity, priceForItem, {
        format: false,
      })
      return parseFloat(totalPrice)
    })

    if (prices.some((x) => isNaN(x))) {
      return 'Something went wrong'
    }

    const grandTotal = prices.reduce((c, curr) => c + curr, 0)
    return formatCurrency(grandTotal.toString())
  }

  const pricingOptions = useMemo(() => {
    return (
      pricings?.map((p) => {
        return { value: p.id, label: p.label }
      }) ?? []
    )
  }, [pricings])
  return (
    <Fieldset>
      <FieldsetLegend>
        <Icons.invoice /> Pricing Builder
      </FieldsetLegend>
      <FieldsetContent className={cn('grid', { 'pt-6': isReadOnly })}>
        <Button
          type="button"
          className={cn('my-4 ml-auto', { hidden: isReadOnly })}
          onClick={() => append(getNewPricingLine())}
        >
          <Icons.add className="mr-2 h-4 w-4" /> Pricing line
        </Button>
        <div className="flex flex-col gap-4">
          {pricingLines.map((line, index) => (
            <PricingLineRow
              key={line.id}
              index={index}
              pricingOptions={pricingOptions}
              isPricingLoading={isLoading}
              getPriceForItem={getPriceForItem}
            />
          ))}
        </div>
        <Separator className="my-4" />
        <div className="flex items-center justify-between">
          <p className="font-semibold text-muted-foreground">Grand Total</p>
          <p className="font-bold">{getQuotePrice()}</p>
        </div>
      </FieldsetContent>
    </Fieldset>
  )
}

"use client";

import { Icons } from "@/components/Icons";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import {
  Fieldset,
  FieldsetContent,
  FieldsetLegend,
} from "@/components/ui/fieldset";
import { Separator } from "@/components/ui/separator";
import { formatCurrency, getTotalPrice } from "@/lib/currencyUtils";
import type { Pricing } from "@/types/pricings";
import { useMemo } from "react";
import { PricingLineRow } from "./PricingLineRow";
import usePricingLines from "./usePricingLines";
import { ErrorMessage } from "@/components/ui/errorMessage";
import { useRouter } from "next/navigation";

type PricingBuilderProps = {
  eventId: string;
  pricings: Pricing[];
  pricingLines: PricingLine[];
};

export type PricingLine = {
  id: string;
  pricingId: string;
  quantity: string;
};

export const PricingBuilder = ({
  eventId,
  pricings,
  pricingLines: savedPricingLines,
}: PricingBuilderProps) => {
  const {
    error,
    isSaving,
    pricingLines,
    handleSave,
    addPricingLine,
    updatePricingLines,
    removePricingLine,
  } = usePricingLines(eventId, savedPricingLines);
  const router = useRouter();

  const pricingOptions = useMemo(() => {
    return pricings.map((p) => {
      return { value: p.id, label: p.label };
    });
  }, [pricings]);

  const getPriceForItem = (selectedPriceId: string) => {
    return pricings.find((x) => x.id === selectedPriceId)?.price ?? "0";
  };

  const getQuotePrice = () => {
    const prices = pricingLines.map((x) => {
      const priceForItem = getPriceForItem(x.pricingId);
      const totalPrice = getTotalPrice(x.quantity, priceForItem, {
        format: false,
      });
      return parseFloat(totalPrice);
    });

    if (prices.some((x) => isNaN(x))) {
      return "Something went wrong";
    }

    const grandTotal = prices.reduce((c, curr) => c + curr, 0);
    return formatCurrency(grandTotal.toString());
  };
  return (
    <>
      <Fieldset>
        <FieldsetLegend>
          <Icons.invoice /> Pricing Builder
        </FieldsetLegend>
        <FieldsetContent className="grid">
          <Button className="my-4 ml-auto" onClick={addPricingLine}>
            <Icons.add className="mr-2 h-4 w-4" /> Pricing line
          </Button>
          <div className="flex flex-col gap-4">
            {pricingLines.map((line) => {
              const priceForItem = getPriceForItem(line.pricingId);
              return (
                <PricingLineRow
                  pricingLine={line}
                  priceForItem={priceForItem}
                  pricingOptions={pricingOptions}
                  removePricingLine={removePricingLine}
                  updatePricingLines={updatePricingLines}
                  key={line.id}
                />
              );
            })}
          </div>
          <Separator className="my-4" />
          <div className="flex items-center justify-between">
            <p className="font-semibold text-muted-foreground">Grand Total</p>
            <p className="font-bold">{getQuotePrice()}</p>
          </div>
        </FieldsetContent>
      </Fieldset>
      <ErrorMessage>{error}</ErrorMessage>
      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={() => router.push("/scheduler")}>
          Go back
        </Button>
        <LoadingButton isLoading={isSaving} onClick={handleSave}>
          Save
        </LoadingButton>
      </div>
    </>
  );
};

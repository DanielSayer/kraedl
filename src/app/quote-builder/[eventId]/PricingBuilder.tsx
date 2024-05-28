"use client";

import { Icons } from "@/components/Icons";
import LoadingButton from "@/components/LoadingButton";
import { Button, buttonVariants } from "@/components/ui/button";
import { ErrorMessage } from "@/components/ui/errorMessage";
import {
  Fieldset,
  FieldsetContent,
  FieldsetLegend,
} from "@/components/ui/fieldset";
import { Separator } from "@/components/ui/separator";
import { formatCurrency, getTotalPrice } from "@/lib/currencyUtils";
import Link from "next/link";
import { useMemo } from "react";
import { PricingLineRow } from "./PricingLineRow";
import usePricingLines from "./usePricingLines";

import { cn } from "@/lib/utils";
import type { Pricing } from "@/types/pricings";
import { Recurrence } from "../Recurrence";

type PricingBuilderProps = {
  isReadOnly: boolean;
  eventId: string;
  pricings: Pricing[];
  pricingLines: PricingLine[];
};

export type PricingLine = {
  id: string;
  pricingId: string;
  quantity: string;
  totalPrice: string;
};

export const PricingBuilder = ({
  isReadOnly,
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
    getPriceForItem,
  } = usePricingLines(eventId, savedPricingLines, pricings);

  const pricingOptions = useMemo(() => {
    return pricings.map((p) => {
      return { value: p.id, label: p.label };
    });
  }, [pricings]);

  const getQuotePrice = () => {
    const prices = pricingLines.map((x) => {
      if (x.quantity === "") return 0;
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
      <Recurrence />
      <Fieldset>
        <FieldsetLegend>
          <Icons.invoice /> Pricing Builder
        </FieldsetLegend>
        <FieldsetContent className={cn("grid", { "pt-6": isReadOnly })}>
          <Button
            className={cn("my-4 ml-auto", { hidden: isReadOnly })}
            onClick={addPricingLine}
          >
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
        <Link
          href="/scheduler"
          className={buttonVariants({ variant: "secondary" })}
        >
          Go back
        </Link>
        <LoadingButton
          isLoading={isSaving}
          onClick={handleSave}
          disabled={isReadOnly}
        >
          Save
        </LoadingButton>
      </div>
    </>
  );
};

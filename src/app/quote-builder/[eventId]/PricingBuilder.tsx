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
import { formatCurrency } from "@/lib/currencyUtils";
import type { Pricing } from "@/types/pricings";
import { useMemo, useState } from "react";
import { PricingLineRow } from "./PricingLineRow";

type PricingBuilderProps = {
  pricings: Pricing[];
};
export type PricingLine = {
  id: string;
  pricingNameId: string;
  quantity: string;
};

export const PricingBuilder = ({ pricings }: PricingBuilderProps) => {
  const [pricingLines, setPricingLines] = useState<PricingLine[]>([]);

  const pricingOptions = useMemo(() => {
    return pricings.map((p) => {
      return { value: p.id, label: p.label };
    });
  }, [pricings]);

  const addPricingLine = () => {
    setPricingLines((lines) => [...lines, getNewPricingLine()]);
  };

  const removePricingLine = (id: string) => {
    const updatedPricingLines = pricingLines.filter((x) => x.id !== id);
    setPricingLines(updatedPricingLines);
  };

  const updatePricingLines = <T extends keyof PricingLine>(
    id: string,
    key: T,
    value: PricingLine[T],
  ) => {
    const newPricingLines = pricingLines.map((l) =>
      l.id === id ? { ...l, [key]: value } : l,
    );
    setPricingLines(newPricingLines);
  };

  const getPriceForItem = (selectedPriceId: string) => {
    return pricings.find((x) => x.id === selectedPriceId)?.price ?? "0";
  };

  const getQuotePrice = () => {
    const prices = pricingLines.map((x) =>
      parseFloat(getPriceForItem(x.pricingNameId)),
    );

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
              const priceForItem = getPriceForItem(line.pricingNameId);
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
      <div className="flex justify-end">
        <LoadingButton isLoading={false}>Save</LoadingButton>
      </div>
    </>
  );
};

const getNewPricingLine = (): PricingLine => {
  return {
    id: crypto.randomUUID(),
    pricingNameId: "",
    quantity: "1",
  };
};

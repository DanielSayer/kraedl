"use client";

import { FieldsetContent } from "@/components/ui/fieldset";
import type { Pricing } from "@/types/pricings";

type PricingBuilderProps = {
  pricings: Pricing[];
};

export const PricingBuilder = ({}: PricingBuilderProps) => {
  return (
    <FieldsetContent className="pt-6">Pricing builder is here</FieldsetContent>
  );
};

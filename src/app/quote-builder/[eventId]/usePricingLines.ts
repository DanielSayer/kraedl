import { useState } from "react";

export type PricingLine = {
  id: string;
  pricingNameId: string;
  quantity: string;
};

const getNewPricingLine = (): PricingLine => {
  return {
    id: crypto.randomUUID(),
    pricingNameId: "",
    quantity: "1",
  };
};

const usePricingLines = () => {
  const [pricingLines, setPricingLines] = useState<PricingLine[]>([]);

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

  return {
    pricingLines,
    addPricingLine,
    updatePricingLines,
    removePricingLine,
  };
};

export default usePricingLines;

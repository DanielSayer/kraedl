import { useState } from "react";
import type { PricingLine } from "./PricingBuilder";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import type { Pricing } from "@/types/pricings";
import { getTotalPrice } from "@/lib/currencyUtils";

const getNewPricingLine = (): PricingLine => {
  return {
    id: crypto.randomUUID(),
    pricingId: "",
    quantity: "1",
    totalPrice: "0",
  };
};

const usePricingLines = (
  eventId: string,
  savedPricingLines: PricingLine[],
  pricings: Pricing[],
) => {
  const [pricingLines, setPricingLines] =
    useState<PricingLine[]>(savedPricingLines);
  const [error, setError] = useState<string>("");

  const save = api.eventPricing.save.useMutation({
    onError: (e) => {
      let errorMessage = e.message;

      const isZodError = !!e.shape?.data.zodError;
      if (isZodError) {
        errorMessage =
          "Something went wrong, maybe you forgot to select a pricing name";
      }
      setError(errorMessage);
    },
  });

  const getPriceForItem = (selectedPriceId: string) => {
    return pricings.find((x) => x.id === selectedPriceId)?.price ?? "0";
  };

  const addPricingLine = () => {
    setPricingLines((lines) => [...lines, getNewPricingLine()]);
  };

  const removePricingLine = (id: string) => {
    const updatedPricingLines = pricingLines.filter((x) => x.id !== id);
    setPricingLines(updatedPricingLines);
  };

  const updatePricingLines = <T extends keyof Omit<PricingLine, "totalPrice">>(
    id: string,
    key: T,
    value: PricingLine[T],
  ) => {
    const newPricingLines = pricingLines.map((line) => {
      if (line.id !== id) {
        return line;
      }

      const newLineItem: PricingLine = {
        ...line,
        [key]: value,
      };

      const pricePer = getPriceForItem(newLineItem.pricingId);
      const newLineItemPrice = getTotalPrice(pricePer, newLineItem.quantity, {
        format: true,
        removeSign: true,
      });

      return {
        ...newLineItem,
        totalPrice: newLineItemPrice,
      };
    });
    setPricingLines(newPricingLines);
  };

  const handleSave = async () => {
    await save.mutateAsync({ eventId: eventId, eventPricings: pricingLines });
    toast.success("Successfully saved");
  };

  return {
    error,
    isSaving: save.isPending,
    pricingLines,
    handleSave,
    addPricingLine,
    updatePricingLines,
    removePricingLine,
    getPriceForItem,
  };
};

export default usePricingLines;

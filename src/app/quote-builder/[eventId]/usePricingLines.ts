import { useState } from "react";
import type { PricingLine } from "./PricingBuilder";
import { api } from "@/trpc/react";
import { toast } from "sonner";

const getNewPricingLine = (): PricingLine => {
  return {
    id: crypto.randomUUID(),
    pricingId: "",
    quantity: "1",
  };
};

const usePricingLines = (eventId: string, savedPricingLines: PricingLine[]) => {
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
  };
};

export default usePricingLines;

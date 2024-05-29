export type PricingLine = {
  id: string;
  pricingId: string;
  quantity: string;
  totalPrice: string;
};

export const getNewPricingLine = (): PricingLine => {
  return {
    id: crypto.randomUUID(),
    pricingId: "",
    quantity: "1",
    totalPrice: "0",
  };
};

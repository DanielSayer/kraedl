export function formatCurrency(amount: number) {
  const formatter = new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
  });
  return formatter.format(amount);
}

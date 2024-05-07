export function formatCurrency(amount: string) {
  const formatter = new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
  });

  const currency = parseFloat(amount);
  if (isNaN(currency)) {
    return "---";
  }
  return formatter.format(currency);
}

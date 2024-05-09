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

export function getTotalPrice(price: string, quantity: string) {
  const priceFloat = parseFloat(price);
  const quantityFloat = parseFloat(quantity);

  if (isNaN(priceFloat) || isNaN(quantityFloat)) {
    return "---";
  }

  const totalPrice = priceFloat * quantityFloat;
  return formatCurrency(totalPrice.toString());
}

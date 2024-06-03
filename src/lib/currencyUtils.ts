export function formatCurrency(
  amount: string,
  config?: { removeSign?: boolean },
) {
  const formatter = new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
  })

  const currency = parseFloat(amount)
  if (isNaN(currency)) {
    return '---'
  }
  const result = formatter.format(currency)

  if (config?.removeSign) {
    return result.substring(1)
  }
  return result
}

export function getTotalPrice(
  price: string,
  quantity: string,
  config?: { format: boolean; removeSign?: boolean },
) {
  const priceFloat = parseFloat(price)
  const quantityFloat = parseFloat(quantity)

  if (isNaN(priceFloat) || isNaN(quantityFloat)) {
    return '---'
  }

  const totalPrice = priceFloat * quantityFloat

  if (!config || config.format) {
    return formatCurrency(totalPrice.toString(), {
      removeSign: config?.removeSign,
    })
  }
  return totalPrice.toString()
}

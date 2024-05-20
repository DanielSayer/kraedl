type Invoice = {
  id: string;
  clientId: string;
  invoiceNumber: number;
  total: string;
  issueDate: Date | null;
  dueDate: string;
  pricingId: string;
  pricingLine: string;
  quantity: string;
  pricePer: string;
};

type LineItem = {
  id: string;
  name: string;
  quantity: string;
  pricePer: string;
};

export function mapInvoiceToLineItems(res: Invoice[]) {
  if (res.length === 0 || !res[0]) {
    return null;
  }
  const invoice = {
    id: res[0].id,
    clientId: res[0].clientId,
    invoiceNumber: res[0].invoiceNumber,
    total: res[0].total,
    issueDate: res[0].issueDate,
    dueDate: res[0].dueDate,
    lineItems: [] as LineItem[],
  };

  for (const row of res) {
    invoice.lineItems.push({
      id: row.pricingId,
      name: row.pricingLine,
      quantity: row.quantity,
      pricePer: row.pricePer,
    });
  }

  return invoice;
}

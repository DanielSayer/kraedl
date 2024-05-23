type Invoice = {
  id: string;
  clientId: string;
  invoiceNumber: number;
  total: string;
  issueDate: string | null;
  invoicedAt: Date | null;
  dueDate: string;
  paidAt: Date | null;
  pricingId: string | null;
  pricingLine: string | null;
  quantity: string | null;
  pricePer: string | null;
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
    invoicedAt: res[0].invoicedAt,
    total: res[0].total,
    issueDate: res[0].issueDate,
    dueDate: res[0].dueDate,
    paidAt: res[0].paidAt,
    lineItems: [] as LineItem[],
  };

  for (const row of res) {
    if (!row.pricingId || !row.pricingLine || !row.quantity || !row.pricePer) {
      continue;
    }
    invoice.lineItems.push({
      id: row.pricingId,
      name: row.pricingLine,
      quantity: row.quantity,
      pricePer: row.pricePer,
    });
  }

  return invoice;
}

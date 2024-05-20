export function formatInvoiceNumber(invoiceNumber: number) {
  const numberPadded = invoiceNumber.toString().padStart(3, "0");
  return `INV-${numberPadded}`;
}

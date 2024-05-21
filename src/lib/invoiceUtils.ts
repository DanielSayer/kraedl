export function formatInvoiceNumber(invoiceNumber: number) {
  const numberPadded = invoiceNumber.toString().padStart(3, "0");
  return `INV-${numberPadded}`;
}

export function getDefaultInvoiceName(
  invoiceNumber: number,
  clientName: string,
  issueDate: string,
) {
  const invoiceNumberPadded = invoiceNumber.toString().padStart(3, "0");
  const invoiceName = `${invoiceNumberPadded}_${clientName}_${issueDate}`;
  return invoiceName.replaceAll(" ", "");
}

export function isDefaultInvoiceName(invoiceName: string) {
  if (invoiceName === "") {
    return true;
  }
  const sections = invoiceName.split("_");
  if (sections.length !== 3) {
    return false;
  }

  const dateSections = sections[2]?.split("-");
  if (dateSections?.length !== 3) {
    return false;
  }

  return true;
}

export function sanitizeFileName(input: string): string {
  const invoiceNameMaxLength = 50;

  const nameWithoutExtension = input.replace(/\.[^/.]+$/, "");
  const sanitized = nameWithoutExtension.replace(/[^a-zA-Z0-9-_]/g, "_");
  const trimmed = sanitized.slice(0, invoiceNameMaxLength);
  const safeFileName = trimmed.replace(/_+$/, "");

  return safeFileName;
}

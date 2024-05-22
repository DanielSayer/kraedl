"use client";

import { useCreatePdf } from "@/hooks/useCreatePdf";
import type { Invoice } from "@/types/invoices";
import { format } from "date-fns";
import { useState } from "react";
import { InvoicePreview } from "./Invoice";
import { InvoiceControls } from "./InvoiceControls";
import type { InvoiceFromApi } from "./page";

type InvoiceProps = {
  invoice: InvoiceFromApi;
};

export const InvoiceWithControls = ({ invoice }: InvoiceProps) => {
  const { printRef, handleDownloadPdf } = useCreatePdf();
  const [invoiceFields, setInvoiceFields] = useState<Invoice>(
    mapInvoice(invoice),
  );

  const handleChangeDate = (key: keyof Invoice, date: Date) => {
    const updatedInvoiceFields: Invoice = {
      ...invoiceFields,
      [key]: format(date, "yyyy-MM-dd"),
    };
    setInvoiceFields(updatedInvoiceFields);
  };

  return (
    <div className="flex justify-center gap-4">
      {!invoiceFields.invoicedAt && (
        <div className="w-1/3">
          <InvoiceControls
            invoiceFields={invoiceFields}
            clientName={invoice.client.name}
            handleChangeDate={handleChangeDate}
            handleDownloadPdf={handleDownloadPdf}
          />
        </div>
      )}
      <div className="w-2/3">
        <InvoicePreview
          printRef={printRef}
          invoice={invoiceFields}
          business={invoice.business}
          client={invoice.client}
        />
      </div>
    </div>
  );
};

function mapInvoice(invoice: InvoiceFromApi): Invoice {
  return {
    id: invoice.id,
    invoiceNumber: invoice.invoiceNumber,
    clientId: invoice.clientId,
    invoicedAt: invoice.invoicedAt,
    dueDate: invoice.dueDate,
    issueDate: invoice.issueDate ?? format(new Date(), "yyyy-MM-dd"),
    lineItems: invoice.lineItems,
    total: invoice.total,
  };
}

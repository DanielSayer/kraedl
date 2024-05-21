"use client";

import LoadingButton from "@/components/LoadingButton";
import { DatePicker } from "@/components/ui/datepicker";
import { ErrorMessage } from "@/components/ui/errorMessage";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreatePdf } from "@/hooks/useCreatePdf";
import {
  getDefaultInvoiceName,
  isDefaultInvoiceName,
} from "@/lib/invoiceUtils";
import { api } from "@/trpc/react";
import type { Invoice } from "@/types/invoices";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../../../components/ui/card";
import { InvoicePreview } from "./Invoice";
import type { InvoiceFromApi } from "./page";

type InvoiceProps = {
  invoice: InvoiceFromApi;
};

export const InvoiceWithControls = ({ invoice }: InvoiceProps) => {
  const { printRef, handleDownloadPdf } = useCreatePdf();
  const [invoiceName, setInvoiceName] = useState<string>("");
  const [invoiceFields, setInvoiceFields] = useState<Invoice>(
    mapInvoice(invoice),
  );

  useEffect(() => {
    if (!isDefaultInvoiceName(invoiceName)) return;
    const defaultInvoiceName = getDefaultInvoiceName(
      invoice.invoiceNumber,
      invoice.client.name,
      invoiceFields.issueDate,
    );
    setInvoiceName(defaultInvoiceName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoice.invoiceNumber, invoice.client.name, invoiceFields.issueDate]);

  const handleChangeIssueDate = (date: Date) => {
    const updatedInvoiceFields: Invoice = {
      ...invoiceFields,
      issueDate: format(date, "yyyy-MM-dd"),
    };
    setInvoiceFields(updatedInvoiceFields);
  };

  const handleChangeDueDate = (date: Date) => {
    const updatedInvoiceFields: Invoice = {
      ...invoiceFields,
      dueDate: format(date, "yyyy-MM-dd"),
    };
    setInvoiceFields(updatedInvoiceFields);
  };

  const issueInvoice = api.invoices.invoice.useMutation({
    onSuccess: async () => {
      toast.success("Invoiced, downloading...");
      await handleDownloadPdf(invoiceName);
    },
  });

  const onIssueInvoice = async () => {
    await issueInvoice.mutateAsync({
      invoiceId: invoiceFields.id,
      dueDate: invoiceFields.dueDate,
      issueDate: invoiceFields.issueDate,
    });
  };

  return (
    <div className="flex gap-4">
      <Card className="w-1/3">
        <CardHeader>
          <h2 className="text-lg font-semibold tracking-tight">Controls</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Issue Date</Label>
            <DatePicker
              date={invoiceFields.issueDate}
              onChange={handleChangeIssueDate}
            />
          </div>
          <div>
            <Label>Due Date</Label>
            <DatePicker
              date={invoiceFields.dueDate}
              onChange={handleChangeDueDate}
            />
          </div>
          <div>
            <Label>Invoice Name</Label>
            <Input
              value={invoiceName}
              onChange={(e) => setInvoiceName(e.currentTarget.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="block space-y-2">
          <p className="text-sm text-muted-foreground">
            Note: Once you click issue invoice, we will generate a PDF invoice
            for you to send to your client, the invoice, once generated cannot
            be changed
          </p>
          <div className="flex justify-end">
            <LoadingButton
              isLoading={issueInvoice.isPending}
              onClick={onIssueInvoice}
            >
              Issue Invoice
            </LoadingButton>
          </div>
          <ErrorMessage>{issueInvoice.error?.message}</ErrorMessage>
        </CardFooter>
      </Card>
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
    dueDate: invoice.dueDate,
    issueDate: invoice.issueDate ?? format(new Date(), "yyyy-MM-dd"),
    lineItems: invoice.lineItems,
    total: invoice.total,
  };
}

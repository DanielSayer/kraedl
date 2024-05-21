"use client";

import { DatePicker } from "@/components/ui/datepicker";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../../../components/ui/card";
import { InvoicePreview } from "./Invoice";
import { useState } from "react";
import type { Invoice } from "@/types/invoices";
import LoadingButton from "@/components/LoadingButton";
import type { InvoiceFromApi } from "./page";
import { api } from "@/trpc/react";
import { ErrorMessage } from "@/components/ui/errorMessage";
import { format } from "date-fns";

type InvoiceProps = {
  invoice: InvoiceFromApi;
};

export const InvoiceWithControls = ({ invoice }: InvoiceProps) => {
  const [invoiceFields, setInvoiceFields] = useState<Invoice>(
    mapInvoice(invoice),
  );

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

  const issueInvoice = api.invoices.invoice.useMutation();

  const onIssueInvoice = async () => {
    console.log(invoiceFields.dueDate);
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

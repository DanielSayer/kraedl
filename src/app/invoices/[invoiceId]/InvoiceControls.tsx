import LoadingButton from "@/components/LoadingButton";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { DatePicker } from "@/components/ui/datepicker";
import { ErrorMessage } from "@/components/ui/errorMessage";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/trpc/react";
import type { Invoice } from "@/types/invoices";
import Link from "next/link";
import { toast } from "sonner";
import useInvoiceName from "./useInvoiceName";

type InvoiceControlsProps = {
  clientName: string;
  invoiceFields: Invoice;
  handleChangeDate: (key: keyof Invoice, date: Date) => void;
  handleDownloadPdf: (name: string) => Promise<void>;
};

export const InvoiceControls = ({
  clientName,
  invoiceFields,
  handleChangeDate,
  handleDownloadPdf,
}: InvoiceControlsProps) => {
  const { invoiceName, handleChangeInvoiceName } = useInvoiceName({
    invoiceNumber: invoiceFields.invoiceNumber,
    clientName: clientName,
    issueDate: invoiceFields.issueDate,
  });

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
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold tracking-tight">Controls</h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Issue Date</Label>
          <DatePicker
            date={invoiceFields.issueDate}
            onChange={(date) => handleChangeDate("issueDate", date)}
          />
        </div>
        <div>
          <Label>Due Date</Label>
          <DatePicker
            date={invoiceFields.dueDate}
            onChange={(date) => handleChangeDate("dueDate", date)}
          />
        </div>
        <div>
          <Label>Invoice Name</Label>
          <Input
            value={invoiceName}
            onChange={(e) => handleChangeInvoiceName(e.currentTarget.value)}
          />
        </div>
      </CardContent>
      <CardFooter className="block space-y-2">
        <p className="text-sm text-muted-foreground">
          Note: Once you click issue invoice, we will generate a PDF invoice for
          you to send to your client, the invoice, once generated cannot be
          changed
        </p>
        <div className="flex justify-end gap-2">
          <Link
            href="/invoices"
            className={buttonVariants({ variant: "secondary" })}
          >
            Back
          </Link>
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
  );
};

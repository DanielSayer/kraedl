"use client";

import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/currencyUtils";
import { formatInvoiceNumber } from "@/lib/invoiceUtils";
import type { InvoiceStatus } from "@/types/invoices";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export type InvoicesTableRow = {
  id: string;
  invoiceNumber: number;
  clientName: string;
  clientEmail: string;
  dueDate: string;
  status: InvoiceStatus;
  total: string;
};

export const invoiceTableColumns: ColumnDef<InvoicesTableRow>[] = [
  {
    accessorKey: "clientName",
    header: "Client",
    cell: ({ row }) => {
      const clientName = row.getValue<string>("clientName");
      return (
        <>
          <div className="font-medium">{clientName}</div>
          <div className="text-sm text-muted-foreground">
            {row.original.clientEmail}
          </div>
        </>
      );
    },
  },
  {
    accessorKey: "invoiceNumber",
    header: "Invoice Number",
    cell: ({ row }) => {
      const invoiceNumber = row.getValue<number>("invoiceNumber");
      return formatInvoiceNumber(invoiceNumber);
    },
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: ({ row }) => {
      const dueDate = row.getValue<string>("dueDate");
      return format(dueDate, "dd MMM yyyy");
    },
  },
  {
    accessorKey: "total",
    header: "Invoice Total",
    cell: ({ row }) => {
      const total = row.getValue<string>("total");
      return formatCurrency(total);
    },
  },
  {
    accessorKey: "status",
    header: "Invoice Status",
    cell: ({ row }) => {
      const status = row.getValue<InvoiceStatus>("status");
      if (status === "DRAFT") {
        return <Badge variant="outline">{status}</Badge>;
      }

      if (status === "OVERDUE") {
        return <Badge variant="destructive">{status}</Badge>;
      }

      if (status === "PAID") {
        return <Badge variant="success">{status}</Badge>;
      }

      return <Badge variant="secondary">{status}</Badge>;
    },
  },
];

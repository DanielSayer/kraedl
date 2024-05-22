"use client";

import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/currencyUtils";
import { formatInvoiceNumber } from "@/lib/invoiceUtils";
import type { InvoiceStatus } from "@/types/invoices";
import type { ColumnDef } from "@tanstack/react-table";

export type InvoicesTableRow = {
  id: string;
  invoiceNumber: number;
  clientName: string;
  status: InvoiceStatus;
  total: string;
};

export const columns: ColumnDef<InvoicesTableRow>[] = [
  {
    accessorKey: "clientName",
    header: "Client Name",
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
      return <Badge>{status}</Badge>;
    },
  },
];

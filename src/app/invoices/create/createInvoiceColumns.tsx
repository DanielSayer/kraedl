"use client";

import type { ColumnDef } from "@tanstack/react-table";

export type CreateEventTableRow = {
  id: string;
  startDate: string;
  endDate: string;
  eventName: string;
  clientName: string;
};

export const columns: ColumnDef<CreateEventTableRow>[] = [
  {
    accessorKey: "startDate",
    header: "Start Date",
  },
  {
    accessorKey: "endDate",
    header: "End Date",
  },
  {
    accessorKey: "eventName",
    header: "Event Name",
  },
  { accessorKey: "clientName", header: "Client Name" },
];

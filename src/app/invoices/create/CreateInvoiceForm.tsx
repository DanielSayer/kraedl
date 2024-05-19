"use client";

import { DataTable } from "@/components/data-table";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { columns, type CreateEventTableRow } from "./createInvoiceColumns";
import { api } from "@/trpc/react";
import { useMemo, useState } from "react";
import { format } from "date-fns";
import type { PaginationState } from "@tanstack/react-table";

export function CreateInvoiceForm() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const { isLoading, data } = api.events.getPastEvents.useQuery({
    currentTime: new Date().toString(),
    pageSize: pagination.pageSize,
    pageIndex: pagination.pageIndex,
  });

  const tableData: CreateEventTableRow[] = useMemo(() => {
    return (
      data?.events.map((x) => ({
        id: x.id,
        startDate: format(x.startTime, "dd MMM yy - hh:mm a"),
        endDate: format(x.endTime, "dd MMM yy - hh:mm a"),
        clientName: x.clientName,
        eventName: x.name ?? "---",
      })) ?? []
    );
  }, [data]);
  return (
    <div>
      <h2 className="text-lg font-semibold">For...</h2>
      <RadioGroup
        defaultValue="single"
        className="mt-4 flex items-center gap-16"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="single" id="single" />
          <Label htmlFor="single">Single Event</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="multi" id="multi" />
          <Label htmlFor="multi">Multiple Events</Label>
        </div>
      </RadioGroup>
      <Separator className="my-4" />
      <h2 className="mb-2 text-lg font-semibold tracking-tight">Past Events</h2>
      <DataTable
        columns={columns}
        data={tableData}
        isLoading={isLoading}
        paginationConfig={{
          pagination,
          setPagination,
          rowCount: data?.count ?? 1,
        }}
      />
    </div>
  );
}

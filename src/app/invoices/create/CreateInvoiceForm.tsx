"use client";

import { DataTable } from "@/components/data-table";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { api } from "@/trpc/react";
import type { PaginationState } from "@tanstack/react-table";
import { format } from "date-fns";
import { useMemo, useState } from "react";
import CreateInvoiceCard from "./CreateInvoiceCard";
import { columns, type CreateEventTableRow } from "./createInvoiceColumns";

export function CreateInvoiceForm() {
  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const { isLoading, data } = api.events.getPastEvents.useQuery({
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
        eventName: x.name || "---",
      })) ?? []
    );
  }, [data]);

  const selectedEvent = data?.events.find((x) => x.id === selectedEventId);

  const handleRowSelect = (id: string) => {
    setSelectedEventId(id);
  };

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
      <div className="mb-2 space-y-0.5">
        <h2 className=" text-lg font-semibold tracking-tight">Past Events</h2>
        <p className="text-sm text-muted-foreground">
          Below are a list of past events that are yet to be invoiced
        </p>
        <p className="text-sm text-muted-foreground">
          Select an event to begin the invoicing process
        </p>
      </div>
      <DataTable
        columns={columns}
        data={tableData}
        isLoading={isLoading}
        onRowSelect={handleRowSelect}
        paginationConfig={{
          pagination,
          setPagination,
          rowCount: data?.count ?? 1,
        }}
      />
      <CreateInvoiceCard event={selectedEvent} />
    </div>
  );
}

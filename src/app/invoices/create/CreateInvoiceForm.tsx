"use client";

import { Icons } from "@/components/Icons";
import { DataTable } from "@/components/data-table";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { formatDateRange } from "@/lib/dateRangeUtils";
import { api } from "@/trpc/react";
import type { PaginationState } from "@tanstack/react-table";
import { format } from "date-fns";
import { useMemo, useState } from "react";
import { columns, type CreateEventTableRow } from "./createInvoiceColumns";
import LoadingButton from "@/components/LoadingButton";

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
      {selectedEventId && selectedEvent && (
        <Card className="mt-4 w-fit">
          <CardHeader className="pb-2 font-semibold">
            {selectedEvent.name || selectedEvent.clientName}
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              {formatDateRange(selectedEvent.startTime, selectedEvent.endTime)}
            </div>
            <p>Client: {selectedEvent.clientName}</p>
          </CardContent>
          <CardFooter className="flex justify-end">
            <LoadingButton isLoading={false}>
              <Icons.add className="me-2 h-4 w-4" /> Create Invoice
            </LoadingButton>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}

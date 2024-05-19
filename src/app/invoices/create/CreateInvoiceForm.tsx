"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function CreateInvoiceForm() {
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
      <h2 className="text-lg font-semibold tracking-tight">Past Events</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Event Name</TableHead>
            <TableHead>Client</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    </div>
  );
}

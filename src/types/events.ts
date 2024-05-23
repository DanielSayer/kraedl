import type { InvoiceStatus } from "./invoices";

export type Event = {
  id: string;
  name: string | null;
  clientName: string;
  startTime: Date;
  endTime: Date;
  status: InvoiceStatus;
};

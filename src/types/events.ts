export type Event = {
  id: string;
  name: string | null;
  clientName: string;
  startTime: Date;
  endTime: Date;
  status: EventStatus;
};

export type EventStatus = "DRAFT" | "READY";

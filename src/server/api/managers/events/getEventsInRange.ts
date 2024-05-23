import type { getEventsInRangeSchema } from "@/lib/validations/events";
import eventsRepository from "../../repositories/eventsRepository";
import type { z } from "zod";
import { getInvoiceStatus } from "../../common/helperMethods/invoiceHelpers";

type GetEventsInRangeRequest = z.infer<typeof getEventsInRangeSchema>;

export async function getEventsInRange(
  range: GetEventsInRangeRequest,
  businessId: string,
) {
  const start = new Date(range.startTime);
  const end = new Date(range.endTime);

  const events = await eventsRepository.getEventsInDateRange(
    start.toISOString(),
    end.toISOString(),
    businessId,
  );

  return events.map((event) => ({
    id: event.id,
    name: event.name,
    clientName: event.clientName,
    startTime: event.startTime,
    endTime: event.endTime,
    status: getInvoiceStatus(event.invoicedAt, event.dueDate, event.paidAt),
  }));
}

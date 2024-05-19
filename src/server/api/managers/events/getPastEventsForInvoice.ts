import { TRPCClientError } from "@trpc/client";
import eventsRepository from "../../repositories/eventsRepository";

export async function getPastEventsForInvoice(
  currentTime: Date,
  businessId: string,
  pageNumber: number,
) {
  if (pageNumber <= 0) {
    throw new TRPCClientError("Invalid page number");
  }
  //Will need to return total pages

  return await eventsRepository.getPastEvents(
    currentTime,
    businessId,
    pageNumber,
  );
}

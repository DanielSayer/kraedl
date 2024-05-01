import { TRPCClientError } from "@trpc/client";
import { convertDateAndTimeToDate } from "../../common/helperMethods/dateHelpers";
import DateRange from "../../common/valueObjects/DateRange";
import eventsRepository from "../../repositories/eventsRepository";
import type { EventRequest } from "../../routers/events/eventsSchemas";

export async function createEventCommand(
  request: EventRequest,
  businessId: string,
  timezone: string,
) {
  const startDate = convertDateAndTimeToDate(
    request.startTime,
    request.date,
    timezone,
  );
  const endDate = convertDateAndTimeToDate(
    request.endTime,
    request.date,
    timezone,
  );

  const dateRangeResult = DateRange.NewResult(startDate, endDate);
  if (dateRangeResult.isFailure()) {
    throw new TRPCClientError(
      `${dateRangeResult.GetError()} If this is intentional and multi-day events are required, please contact support`,
    );
  }
  const dateRange = dateRangeResult.GetValue();
  return await eventsRepository.create({
    clientId: request.clientId,
    name: request.name,
    startTime: dateRange.Start,
    endTime: dateRange.End,
    businessId: businessId,
  });
}

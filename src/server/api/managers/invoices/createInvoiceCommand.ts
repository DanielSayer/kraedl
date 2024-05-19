import type { CreateInvoiceRequest } from "@/lib/validations/invoices";
import eventPricingRepository from "../../repositories/eventPricingRepository";
import { invoicesRepository } from "../../repositories/invoicesRepository";

export async function createInvoiceCommand(
  request: CreateInvoiceRequest,
  businessId: string,
) {
  const pricings = await eventPricingRepository.getEventPricingsByEventIds(
    request.eventIds,
  );

  const costPerEvent = pricings.map((x) => {
    const price = parseFloat(x.pricing.price);
    const quantity = parseFloat(x.quantity);
    return price * quantity;
  });
  const totalInvoicePrice = costPerEvent
    .reduce((c, curr) => c + curr, 0)
    .toFixed(2);

  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 1);

  const invoiceNumber =
    await invoicesRepository.getNextInvoiceNumber(businessId);

  return await invoicesRepository.create(
    {
      clientId: request.clientId,
      dueDate: dueDate.toDateString(),
      invoiceAmount: totalInvoicePrice,
      invoiceNumber,
      businessId,
    },
    request.eventIds,
  );
}

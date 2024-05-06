import { db } from "@/server/db";
import { pricing } from "@/server/db/schema";
import { single } from "../common/helperMethods/arrayHelpers";

type PricingDto = {
  label: string;
  price: string;
  businessId: string;
};

class PricingRepository {
  async create(req: PricingDto) {
    const id = await db
      .insert(pricing)
      .values({
        label: req.label,
        price: req.price,
        businessId: req.businessId,
      })
      .returning({ id: pricing.id });

    return single(id);
  }
}

const eventsRepository = new PricingRepository();
export default eventsRepository;

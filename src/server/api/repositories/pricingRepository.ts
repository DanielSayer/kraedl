import { db } from "@/server/db";
import { pricing } from "@/server/db/schema";
import { single } from "../common/helperMethods/arrayHelpers";
import { eq } from "drizzle-orm";

type PricingDto = {
  label: string;
  price: string;
  businessId: string;
};

class PricingRepository {
  async getByBusinessId(businessId: string) {
    return await db.query.pricing.findMany({
      where: eq(pricing.businessId, businessId),
    });
  }
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

const pricingRepository = new PricingRepository();
export default pricingRepository;

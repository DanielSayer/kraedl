import { db } from "@/server/db/index";
import { businesses, users } from "@/server/db/schema";
import { and, eq } from "drizzle-orm";
import { single } from "../common/helperMethods/arrayHelpers";
import type { State } from "../common/valueObjects/state";

type BusinessDto = {
  name: string;
  phoneNumber: string;
  streetAddress: string;
  suburb: string;
  postcode: string;
  city: string;
  state: State;
};

class BusinessesRepository {
  async create(business: BusinessDto) {
    const id = await db
      .insert(businesses)
      .values({
        name: business.name,
        phoneNumber: business.phoneNumber,
        streetAddress: business.streetAddress,
        suburb: business.suburb,
        postcode: business.postcode,
        city: business.city,
        state: business.state,
      })
      .returning({ id: businesses.id });

    return single(id);
  }
  async getNameById(userId: string, businessId: string) {
    const businessInfo = await db
      .select({ id: businesses.id, name: businesses.name })
      .from(businesses)
      .innerJoin(users, eq(users.businessId, businesses.id))
      .where(and(eq(businesses.id, businessId), eq(users.id, userId)));

    return single(businessInfo);
  }
}

const businessRepository = new BusinessesRepository();
export default businessRepository;

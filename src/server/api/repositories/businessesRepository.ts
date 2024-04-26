import { db } from "@/server/db/index";
import { businesses, users } from "@/server/db/schema";
import { count, eq } from "drizzle-orm";
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
  async getNameById(businessId: string) {
    const businessInfo = await db
      .select({ id: businesses.id, name: businesses.name })
      .from(businesses)
      .where(eq(businesses.id, businessId));

    return single(businessInfo);
  }
  async getNumberOfStaff(businessId: string) {
    const numberOfStaff = await db
      .select({ count: count() })
      .from(users)
      .where(eq(users.businessId, businessId));

    return single(numberOfStaff).count;
  }
}

const businessRepository = new BusinessesRepository();
export default businessRepository;

import { db } from "@/server/db/index";
import { businesses } from "@/server/db/schema";
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

    if (!id[0]) {
      throw new Error("Failed to create business");
    }
    return id[0];
  }
}

const businessRepository = new BusinessesRepository();
export default businessRepository;

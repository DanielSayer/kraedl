import { type State, state } from "../../common/valueObjects/state";
import businessRepository from "../../repositories/businessesRepository";
import type { BusinessRequest } from "../../routers/business/businessSchemas";

class BusinessManager {
  async create(business: BusinessRequest): Promise<{ id: string }> {
    const isStateValid = state.validate(business.state);
    if (!isStateValid) {
      throw new Error("Something went wrong");
    }

    const id = await businessRepository.create({
      ...business,
      state: business.state as State,
    });
    return id;
  }
}

const businessManager = new BusinessManager();
export default businessManager;

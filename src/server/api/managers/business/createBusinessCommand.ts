import type { z } from "zod";
import { type State, state } from "../../common/valueObjects/state";
import businessRepository from "../../repositories/businessesRepository";
import type { businessRegisterSchema } from "@/lib/validations/businesses";

type BusinessRequest = z.infer<typeof businessRegisterSchema>;

class CreateBusinessCommand {
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

const createBusinessCommand = new CreateBusinessCommand();
export default createBusinessCommand;

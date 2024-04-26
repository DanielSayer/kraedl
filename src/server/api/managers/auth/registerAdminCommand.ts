import { TRPCClientError } from "@trpc/client";
import businessRepository from "../../repositories/businessesRepository";
import type { AdminRequest } from "../../routers/auth/authSchemas";
import { usersRepository } from "../../repositories/userRepository";
import { hash } from "bcryptjs";

class RegisterAdminCommand {
  async register(user: AdminRequest): Promise<void> {
    const userBusiness = await businessRepository.getBusinessWithUserIds(
      user.businessId,
    );

    if (!userBusiness || userBusiness.users.length !== 0) {
      throw new TRPCClientError(
        "Something went wrong, please contact support for help.",
      );
    }

    const existingUser = await usersRepository.getByEmail(user.email);

    if (existingUser) {
      throw new TRPCClientError("Email already in use");
    }

    const hashedPassword = await hash(user.password, 10);

    await usersRepository.register({
      name: user.name,
      email: user.email,
      password: hashedPassword,
      businessId: user.businessId,
      role: "ADMIN",
    });
  }
}

const registerAdminCommand = new RegisterAdminCommand();
export default registerAdminCommand;

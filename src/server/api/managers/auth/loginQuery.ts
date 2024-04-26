import type { LoginRequest } from "../../routers/auth/authSchemas";
import { usersRepository } from "../../repositories/userRepository";
import { compare } from "bcryptjs";

const error = "Email or password is incorrect";

class LoginQuery {
  async login(request: LoginRequest) {
    const user = await usersRepository.getByEmail(request.email);

    if (!user) {
      throw new Error(error);
    }

    const doPasswordsMatch = await compare(request.password, user.password);

    if (!doPasswordsMatch) {
      throw new Error(error);
    }

    return user;
  }
}

export const loginQuery = new LoginQuery();

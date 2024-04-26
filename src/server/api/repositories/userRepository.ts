import { db } from "@/server/db";
import { singleOrDefault } from "../common/helperMethods/arrayHelpers";
import { users } from "@/server/db/schema";

type UserDto = {
  name: string;
  email: string;
  password: string;
  businessId: string;
  role: "ADMIN" | "USER";
};

class UsersRepository {
  async getByEmail(email: string) {
    const user = await db.query.users.findMany({
      where: (users, { eq }) => eq(users.email, email),
    });
    return singleOrDefault(user);
  }
  async register(user: UserDto) {
    await db.insert(users).values({
      name: user.name,
      email: user.email,
      password: user.password,
      businessId: user.businessId,
      role: user.role,
    });
  }
}

export const usersRepository = new UsersRepository();

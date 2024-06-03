import { compare } from 'bcryptjs'
import { usersRepository } from '../../repositories/userRepository'

import type { loginSchema } from '@/lib/validations/auth'
import type { z } from 'zod'

const error = 'Email or password is incorrect'

type LoginRequest = z.infer<typeof loginSchema>

class LoginQuery {
  async login(request: LoginRequest) {
    const user = await usersRepository.getByEmail(request.email)

    if (!user) {
      throw new Error(error)
    }

    const doPasswordsMatch = await compare(request.password, user.password)

    if (!doPasswordsMatch) {
      throw new Error(error)
    }

    return user
  }
}

export const loginQuery = new LoginQuery()

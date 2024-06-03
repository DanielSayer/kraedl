import type { DefaultSession, User } from 'next-auth'
import type { UserRole } from './users'

type UserId = string

interface User {
  role: UserRole
  businessId: string
}

interface AdapterUser {
  role: UserRole
  businessId: string
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: UserId
    userBusinessId: string
    userRole: UserRole
  }
}

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: User & {
      id: UserId
      role: UserRole
      businessId: string
      timezone: string
    }
  }
}

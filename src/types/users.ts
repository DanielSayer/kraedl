export type UserRole = 'ADMIN' | 'USER'

export type User = {
  role: UserRole
  id: string
  name: string | null
  businessId: string
  email: string
  emailVerified: Date | null
  password: string
  image: string | null
}

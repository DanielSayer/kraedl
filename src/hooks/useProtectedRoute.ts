import { getServerAuthSession } from '@/server/auth'
import { redirect } from 'next/navigation'

const useProtectedRoute = async () => {
  const session = await getServerAuthSession()

  if (!session) {
    redirect('/sign-in')
  }

  return { session, user: session.user }
}

export default useProtectedRoute

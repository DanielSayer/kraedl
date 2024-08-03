import Link from 'next/link'
import { Icons } from '@/components/Icons'
import RegisterBusinessForm from './register-business-form'

const Page = async () => {
  return (
    <div className="container grid h-[calc(100vh-56px)] w-screen flex-col items-center justify-center px-0 lg:max-w-none lg:grid-cols-2">
      <div className="hidden h-full bg-muted lg:block" />
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <Icons.sun className="mx-auto h-8 w-8" />
            <h1 className="text-2xl font-semibold tracking-tight">
              Register your business
            </h1>
            <p className="text-sm text-muted-foreground">
              We&apos;ll just need a few details to continue
            </p>
          </div>
          <RegisterBusinessForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            Already have an accout?{' '}
            <Link href={'/sign-in'} className="underline underline-offset-4">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Page

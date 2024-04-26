import { Icons } from "@/components/Icons";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import SignInForm from "./SignInForm";

const Page = async () => {
  const session = await getServerAuthSession();
  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="container flex h-[calc(100vh-56px)] w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Icons.sun className="mx-auto h-6 w-6" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email to sign in to your account
          </p>
        </div>
        <SignInForm />
      </div>
    </div>
  );
};

export default Page;

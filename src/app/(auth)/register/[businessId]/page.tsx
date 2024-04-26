import { Icons } from "@/components/Icons";
import { api } from "@/trpc/server";
import { notFound } from "next/navigation";
import RegisterForm from "./RegisterForm";

interface RegisterAdminPageProps {
  params: {
    businessId: string;
  };
}

const Page = async ({ params }: RegisterAdminPageProps) => {
  const { businessId } = params;
  const staffInBusiness = await api.business.getNumberOfStaff({ businessId });
  const business = await api.business.getById({ businessId });

  if (staffInBusiness !== 0 || !business) {
    notFound();
  }

  return (
    <div className="container grid h-[calc(100vh-56px)] w-screen flex-col items-center justify-center px-0 lg:max-w-none lg:grid-cols-2">
      <div className="hidden h-full bg-muted lg:block" />
      <div className="lg:p-8">
        <Icons.sun className="mx-auto h-8 w-8" />
        <h1 className="my-2 text-center text-2xl font-semibold tracking-tight text-accent-foreground">
          Thank you for registering{" "}
        </h1>
        <h1 className="mb-6 text-center text-4xl font-semibold tracking-tight">
          {business.name}
        </h1>
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-xl text-muted-foreground">
              But enough about your business, let&apos;s get to know you!{" "}
            </h1>
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account below
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to create your account
            </p>
          </div>
          <RegisterForm businessId={businessId} />
        </div>
      </div>
    </div>
  );
};

export default Page;

import { Icons } from "@/components/Icons";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const Page = () => {
  return (
    <div className="container p-10 pb-16">
      <div className="flex justify-between">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Invoices</h2>
          <p className="text-muted-foreground">
            Create or manage your client invoices.
          </p>
        </div>
        <Link href={"/invoices/create"} className={buttonVariants()}>
          <Icons.add className="me-2 h-4 w-4" />
          Create
        </Link>
      </div>
      <hr className="my-6" />
    </div>
  );
};

export default Page;

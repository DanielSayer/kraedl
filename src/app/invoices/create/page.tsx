import { Icons } from "@/components/Icons";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { CreateInvoiceForm } from "./CreateInvoiceForm";

const Page = () => {
  return (
    <div className="container p-10 pb-16">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Create Invoice</h2>
        <Link href={"/invoices"} className={buttonVariants()}>
          Manage
          <Icons.arrowUpRight className="ms-2 h-4 w-4" />
        </Link>
      </div>
      <hr className="my-6" />
      <CreateInvoiceForm />
    </div>
  );
};

export default Page;

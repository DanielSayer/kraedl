import { InvoiceWithControls } from "@/app/invoices/[invoiceId]/InvoiceWithControls";
import { buttonVariants } from "@/components/ui/button";
import { api } from "@/trpc/server";
import Link from "next/link";

interface InvoicePageProps {
  params: {
    invoiceId: string;
  };
}

export type InvoiceFromApi = Awaited<ReturnType<typeof api.invoices.getById>>;

export default async function Page({ params }: InvoicePageProps) {
  const { invoiceId } = params;

  const invoice = await api.invoices.getById({ invoiceId });
  return (
    <div className="container pt-10">
      {!!invoice.invoicedAt && (
        <div className="mb-4 space-x-6 text-center text-sm uppercase text-muted-foreground">
          <Link
            href="/invoices"
            className={buttonVariants({
              variant: "secondary",
            })}
          >
            Go back
          </Link>
          <span>This invoice has been invoiced and is in read only mode</span>
        </div>
      )}
      <InvoiceWithControls invoice={invoice} />
    </div>
  );
}

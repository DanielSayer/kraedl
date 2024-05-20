import { InvoiceWithControls } from "@/app/invoices/[invoiceId]/InvoiceWithControls";
import { api } from "@/trpc/server";

interface InvoicePageProps {
  params: {
    invoiceId: string;
  };
}

export default async function Page({ params }: InvoicePageProps) {
  const { invoiceId } = params;

  const invoice = await api.invoices.getById({ invoiceId });
  return (
    <div className="container pt-10">
      <InvoiceWithControls invoice={invoice} />
    </div>
  );
}

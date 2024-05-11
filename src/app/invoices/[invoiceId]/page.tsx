import { Invoice } from "@/components/Invoice";

interface InvoicePageProps {
  params: {
    invoiceId: string;
  };
}

export default function Page({}: InvoicePageProps) {
  return (
    <div className="container pt-10">
      <Invoice />
    </div>
  );
}

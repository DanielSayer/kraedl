import { Separator } from "@/components/ui/separator";
import { BankDetailsForm } from "./BankDetailsForm";

export default function Page() {
  return (
    <div>
      <div className="text-xl">Banking Details</div>
      <p className="text-sm text-muted-foreground">
        Bank details are encrypted and only used for displaying on invoices
      </p>
      <Separator className="mb-4 mt-2" />
      <BankDetailsForm />
    </div>
  );
}

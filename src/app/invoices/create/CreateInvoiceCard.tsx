import { Icons } from "@/components/Icons";
import LoadingButton from "@/components/LoadingButton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { formatDateRange } from "@/lib/dateRangeUtils";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type CreateInvoiceCardProps = {
  event:
    | {
        name: string;
        id: string;
        clientName: string;
        clientId: string;
        startTime: Date;
        endTime: Date;
      }
    | undefined;
};

const CreateInvoiceCard = ({ event }: CreateInvoiceCardProps) => {
  const router = useRouter();

  const { mutateAsync: createInvoice, isPending } =
    api.invoices.create.useMutation({
      onError: () => {
        toast.error("Something went wrong, please try again later");
      },
    });

  const handleCreate = async () => {
    if (!event) return;
    const id = await createInvoice({
      clientId: event.clientId,
      eventIds: [event.id],
    });
    router.push(`/invoices/${id}`);
  };

  if (!event) {
    return;
  }

  return (
    <Card className="mt-4 w-fit">
      <CardHeader className="pb-2 font-semibold">
        {event.name || event.clientName}
      </CardHeader>
      <CardContent className="space-y-2">
        <div>{formatDateRange(event.startTime, event.endTime)}</div>
        <p>Client: {event.clientName}</p>
      </CardContent>
      <CardFooter className="flex justify-end">
        <LoadingButton isLoading={isPending} onClick={handleCreate}>
          <Icons.add className="me-2 h-4 w-4" /> Create Invoice
        </LoadingButton>
      </CardFooter>
    </Card>
  );
};

export default CreateInvoiceCard;

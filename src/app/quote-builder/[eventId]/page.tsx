import { Separator } from "@/components/ui/separator";
import useProtectedRoute from "@/hooks/useProtectedRoute";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";
import { EventForm } from "./EventForm";

interface QuoteBuilderPageProps {
  params: {
    eventId: string;
  };
}

export default async function Page({ params }: QuoteBuilderPageProps) {
  await useProtectedRoute();

  const event = await api.events.getById({ id: params.eventId });
  if (!event) {
    redirect("/scheduler");
  }

  const pricingLines = await api.eventPricing.getById({ id: event.id });
  const isInvoiced = () => {
    return !!event.invoicedAt;
  };

  return (
    <div className="container mb-20 pt-6">
      <h2 className="text-2xl font-bold tracking-tight">Quote Builder</h2>
      {isInvoiced() ? (
        <p className="text-muted-foreground">
          Event has been invoiced. This is now read only
        </p>
      ) : (
        <p className="text-muted-foreground">Manage your event here.</p>
      )}
      <Separator className="my-2" />
      <EventForm
        event={event}
        isReadOnly={isInvoiced()}
        pricingLines={pricingLines}
      />
    </div>
  );
}

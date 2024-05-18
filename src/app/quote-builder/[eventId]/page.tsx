import { Icons } from "@/components/Icons";
import {
  Fieldset,
  FieldsetContent,
  FieldsetHeader,
  FieldsetLegend,
  FieldsetTitle,
} from "@/components/ui/fieldset";
import { Separator } from "@/components/ui/separator";
import useProtectedRoute from "@/hooks/useProtectedRoute";
import { formatDateRange } from "@/lib/dateRangeUtils";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";
import { PricingBuilder } from "./PricingBuilder";

interface QuoteBuilderPageProps {
  params: {
    eventId: string;
  };
}

export default async function Page({ params }: QuoteBuilderPageProps) {
  await useProtectedRoute();

  const event = await api.events.getById({ id: params.eventId });
  const pricings = await api.pricing.getPricings();

  if (!event) {
    redirect("/scheduler");
  }

  const pricingLines = await api.eventPricing.getById({ id: event.id });

  return (
    <div className="container mb-20 pt-6">
      <h2 className="text-2xl font-bold tracking-tight">Quote Builder</h2>
      <p className="text-muted-foreground">Manage your event here.</p>
      <Separator className="my-2" />
      <div className="grid gap-4">
        <Fieldset>
          <FieldsetLegend>
            <Icons.calendar /> Event
          </FieldsetLegend>
          <FieldsetHeader className="font-semibold">
            <FieldsetTitle>
              {event.name ? event.name : event.clients.name}
            </FieldsetTitle>
            <p className="font-normal text-muted-foreground">
              {formatDateRange(event.startTime, event.endTime)}
            </p>
          </FieldsetHeader>
          {event.name && (
            <FieldsetContent>
              <p className="font-semibold">Client</p>
              <p>{event.clients.name}</p>
            </FieldsetContent>
          )}
        </Fieldset>
        <PricingBuilder
          pricings={pricings}
          pricingLines={pricingLines}
          eventId={event.id}
        />
      </div>
    </div>
  );
}

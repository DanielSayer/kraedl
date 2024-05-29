"use client";

import { Icons } from "@/components/Icons";
import {
  Fieldset,
  FieldsetContent,
  FieldsetHeader,
  FieldsetLegend,
  FieldsetTitle,
} from "@/components/ui/fieldset";
import { Form } from "@/components/ui/form";
import { formatDateRange } from "@/lib/dateRangeUtils";
import {
  quoteBuilderSchema,
  type QuoteBuilder,
} from "@/lib/validations/events";
import { api } from "@/trpc/react";
import type { QuoteEvent } from "@/types/events";
import type { PricingLine } from "@/types/pricingLines";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { PricingBuilder } from "./PricingBuilder";
import { Recurrence } from "./Recurrence";

type EventFormProps = {
  isReadOnly: boolean;
  event: QuoteEvent;
  pricingLines: PricingLine[];
};

export const EventForm = ({
  isReadOnly,
  event,
  pricingLines,
}: EventFormProps) => {
  const form = useForm<QuoteBuilder>({
    defaultValues: {
      eventId: event.id,
      eventPricings: pricingLines,
      recurrence: {
        frequency: "NONE",
        interval: 1,
        endType: "AFTER",
        after: 3,
      },
    },
    resolver: zodResolver(quoteBuilderSchema),
  });

  const { isPending, mutateAsync } = api.eventPricing.save.useMutation({
    onError: (e) => form.setError("root", { message: e.message }),
    onSuccess: () => toast.success("Successfully saved"),
  });

  const handleSubmit = async (data: QuoteBuilder) => {
    await mutateAsync({
      eventId: data.eventId,
      eventPricings: data.eventPricings,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="space-y-4">
          <div className="grid grid-cols-8 gap-4">
            <Fieldset className="col-span-5">
              <FieldsetLegend>
                <Icons.calendar /> Event
              </FieldsetLegend>
              <FieldsetHeader className="font-semibold">
                <FieldsetTitle>
                  {event.name ? event.name : event.clientName}
                </FieldsetTitle>
                <p className="font-normal text-muted-foreground">
                  {formatDateRange(event.startTime, event.endTime)}
                </p>
              </FieldsetHeader>
              {event.name && (
                <FieldsetContent>
                  <p className="font-semibold">Client</p>
                  <p>{event.clientName}</p>
                </FieldsetContent>
              )}
            </Fieldset>
            <div className="col-span-3 h-full">
              <Recurrence />
            </div>
          </div>
          <PricingBuilder isReadOnly={isReadOnly} isPending={isPending} />
        </div>
      </form>
    </Form>
  );
};

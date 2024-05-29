"use client";

import { Icons } from "@/components/Icons";
import {
  Fieldset,
  FieldsetContent,
  FieldsetHeader,
  FieldsetLegend,
  FieldsetTitle,
} from "@/components/ui/fieldset";
import { formatDateRange } from "@/lib/dateRangeUtils";
import type { QuoteEvent } from "@/types/events";
import { Recurrence } from "./Recurrence";
import { PricingBuilder, type PricingLine } from "./PricingBuilder";
import { useForm } from "react-hook-form";
import {
  quoteBuilderSchema,
  type QuoteBuilder,
} from "@/lib/validations/events";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { api } from "@/trpc/react";
import { toast } from "sonner";

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
        on: undefined,
      },
    },
    resolver: zodResolver(quoteBuilderSchema),
  });

  const { isPending, mutateAsync } = api.eventPricing.save.useMutation({
    onError: (e) => form.setError("root", { message: e.message }),
    onSuccess: () => toast.success("Successfully saved"),
  });

  const handleSubmit = async (data: QuoteBuilder) => {
    console.log("here");
    console.log(form.formState.errors);
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

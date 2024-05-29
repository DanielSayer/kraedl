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
import { Recurrence } from "../Recurrence";
import { PricingBuilder, type PricingLine } from "./PricingBuilder";

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
  return (
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
      <PricingBuilder
        isReadOnly={isReadOnly}
        pricingLines={pricingLines}
        eventId={event.id}
      />
    </div>
  );
};

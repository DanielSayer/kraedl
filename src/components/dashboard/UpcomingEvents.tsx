"use client";

import { formatTimeRange } from "@/lib/dateRangeUtils";
import { api } from "@/trpc/react";
import type { TPRCReturnType } from "@/types/trpc";
import { format } from "date-fns";
import { Icons } from "../Icons";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export const UpcomingEvents = () => {
  const { data, isLoading } = api.dashboard.getUpcomingEvents.useQuery();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Events</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2">
        <UpcomingEventsContent data={data} isLoading={isLoading} />
      </CardContent>
    </Card>
  );
};

type UpcomingEventsContentProps = {
  data: TPRCReturnType<typeof api.dashboard.getUpcomingEvents.useQuery>;
  isLoading: boolean;
};

const UpcomingEventsContent = ({
  data,
  isLoading,
}: UpcomingEventsContentProps) => {
  if (isLoading || !data) {
    return <EventSkeleton />;
  }

  if (data.length === 0) {
    return (
      <div className="grid place-items-center pt-6">
        <div className="flex flex-col items-center gap-4">
          <Icons.ghost className="h-6 w-6 text-muted-foreground" />
          No upcoming events, create some!
        </div>
      </div>
    );
  }
  return data.map((event) => (
    <div
      key={event.id}
      className="flex items-center gap-4 rounded border px-4 py-3"
    >
      <div className="grid gap-1">
        <p className="text-md font-medium  leading-none">
          {event.name ? event.name : event.clients.name}
        </p>
        <p className="text-sm text-muted-foreground">
          {event.name ? event.clients.name : ""}
        </p>
      </div>
      <div className="ml-auto grid gap-1">
        <p className="text-sm font-medium leading-none">
          {formatTimeRange(event.startTime, event.endTime)}
        </p>
        <p className="text-sm text-muted-foreground">
          {format(event.startTime, "dd MMM yyyy")}
        </p>
      </div>
    </div>
  ));
};

const EventSkeleton = () => {
  return (
    <>
      {Array.from({ length: 3 }, (_, i) => i + 1).map((row) => (
        <div className="flex w-full rounded border px-4 py-3" key={row}>
          <div className="grid w-full gap-1">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/3" />
          </div>
          <div className="grid w-full place-items-end gap-1">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      ))}
    </>
  );
};

// {isLoading || !data ? (
//   <EventSkeleton />
// ) : (
//   data.map((event) => (
//     <div
//       key={event.id}
//       className="flex items-center gap-4 rounded border px-4 py-3"
//     >
//       <div className="grid gap-1">
//         <p className="text-md font-medium  leading-none">
//           {event.name ? event.name : event.clients.name}
//         </p>
//         <p className="text-sm text-muted-foreground">
//           {event.name ? event.clients.name : ""}
//         </p>
//       </div>
//       <div className="ml-auto grid gap-1">
//         <p className="text-sm font-medium leading-none">
//           {formatTimeRange(event.startTime, event.endTime)}
//         </p>
//         <p className="text-sm text-muted-foreground">
//           {format(event.startTime, "dd MMM yyyy")}
//         </p>
//       </div>
//     </div>
//   ))
// )}

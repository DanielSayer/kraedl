import { formatTimeRange } from "@/lib/dateRangeUtils";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { api } from "@/trpc/server";

export const UpcomingEvents = async () => {
  const data = await api.dashboard.getUpcomingEvents();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Events</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2">
        {data.map((event) => (
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
        ))}
      </CardContent>
    </Card>
  );
};

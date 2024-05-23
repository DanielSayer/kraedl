import { Icons } from "@/components/Icons";
import { BusinessQuickStats } from "@/components/dashboard/BusinessQuickStats";
import { InvoicePreview } from "@/components/dashboard/InvoicePreview";
import { UpcomingEvents } from "@/components/dashboard/UpcomingEvents";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useProtectedRoute from "@/hooks/useProtectedRoute";
import { getGreeting } from "@/lib/greetings";
import Link from "next/link";

export default async function Page() {
  const { user } = await useProtectedRoute();
  return (
    <main className="grid grid-cols-3 gap-6 px-48 pt-6">
      <div className="col-span-2">
        <h3 className="mt-2 text-4xl font-medium leading-none tracking-tight">
          {getGreeting()}, {user.name}
        </h3>
        <Card className="mt-24">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Recent Invoices</CardTitle>
              <CardDescription>Last 5 invoices at a glace.</CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link href="/invoices">
                View All
                <Icons.arrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <InvoicePreview />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4">
        <BusinessQuickStats />
        <UpcomingEvents />
      </div>
    </main>
  );
}

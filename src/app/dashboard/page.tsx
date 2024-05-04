import { BusinessQuickStats } from "@/components/dashboard/BusinessQuickStats";
import { UpcomingEvents } from "@/components/dashboard/UpcomingEvents";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useProtectedRoute from "@/hooks/useProtectedRoute";
import { getGreeting } from "@/lib/greetings";
import { ArrowUpRight } from "lucide-react";
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
              <CardDescription>Invoices at a glace.</CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link href="/invoices">
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoiceData.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell>
                      <div className="font-medium">{invoice.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {invoice.email}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className="text-xs" variant="outline">
                        {invoice.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{invoice.date}</TableCell>
                    <TableCell>{invoice.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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

const invoiceData = [
  {
    id: 1,
    name: "Liam Johnson",
    email: "liam@example.com",
    status: "Approved",
    date: "27 June 2023",
    amount: "$250.00",
  },
  {
    id: 2,
    name: "Olivia Smith",
    email: "olivia@example.com",
    status: "Declined",
    date: "27 June 2023",
    amount: "$150.00",
  },
  {
    id: 3,
    name: "Noah Williams",
    email: "noah@example.com",
    status: "Approved",
    date: "26 June 2023",
    amount: "$350.00",
  },
  {
    id: 4,
    name: "Emma Brown",
    email: "emma@example.com",
    status: "Approved",
    date: "26 June 2023",
    amount: "$450.00",
  },
  {
    id: 5,
    name: "Liam Johnson",
    email: "liam@example.com",
    status: "Approved",
    date: "25 June 2023",
    amount: "$420.00",
  },
];

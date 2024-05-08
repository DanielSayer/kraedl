"use client";

import { Activity, CreditCard } from "lucide-react";
import { Icons } from "../Icons";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import { api } from "@/trpc/react";

export const BusinessQuickStats = () => {
  const numberOfClients =
    api.dashboard.getNumberOfClientsForBusiness.useQuery();
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">
              +201 since last hour (TODO)
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,234</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month (TODO)
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Link href="/dashboard/clients">
          <Card className="h-full hover:bg-violet-500 hover:bg-opacity-5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
              <CardTitle className="text-sm font-medium">Clients</CardTitle>
              <Icons.users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{numberOfClients.data}</div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/scheduler">
          <Card className="h-full hover:bg-violet-500 hover:bg-opacity-5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
              <CardTitle className="text-sm font-medium">Scheduler</CardTitle>
              <Icons.calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">10</div>
              <p className="text-xs text-muted-foreground">
                events this week (TODO)
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/invoices">
          <Card className="h-full hover:bg-violet-500 hover:bg-opacity-5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
              <CardTitle className="text-sm font-medium">Invoices</CardTitle>
              <Icons.invoice className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">10</div>
              <p className="text-xs text-muted-foreground">(TODO)</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </>
  );
};
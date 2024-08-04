'use client'

import { Activity, CreditCard } from 'lucide-react'
import { Icons } from '../Icons'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import Link from 'next/link'
import { api } from '@/trpc/react'
import { formatCurrency } from '@/lib/currencyUtils'

export const BusinessQuickStats = () => {
  const numberOfClients = api.dashboard.getNumberOfClientsForBusiness.useQuery()

  const sales = api.dashboard.getMonthlyIncome.useQuery()
  const monthsEvents = api.dashboard.getNumberOfEventsThisMonth.useQuery()
  const numberOfEvents = api.dashboard.getNumberOfEventsLeftInWeek.useQuery()
  const numberOfUnpaidInvoices =
    api.dashboard.getNumberOfUnpaidInvoices.useQuery()
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Number of Events
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{monthsEvents.data?.total}</div>
            <div className="text-xs text-muted-foreground">
              <p>completed this month</p>
              {monthsEvents.data?.comparison}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(sales.data?.total.toString() ?? '')}
            </div>
            <div className="text-xs text-muted-foreground">
              <p>this month</p>
              {sales.data?.comparison}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Link href="/dashboard/clients">
          <Card className="h-full hover:bg-violet-500 hover:bg-opacity-5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
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
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Scheduler</CardTitle>
              <Icons.calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{numberOfEvents.data}</div>
              <p className="text-xs text-muted-foreground">
                events remaining this week
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/invoices">
          <Card className="h-full hover:bg-violet-500 hover:bg-opacity-5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Invoices</CardTitle>
              <Icons.invoice className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {numberOfUnpaidInvoices.data}
              </div>
              <p className="text-xs text-muted-foreground">
                that needs to be paid
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </>
  )
}

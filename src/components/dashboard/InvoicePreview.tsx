'use client'

import { api } from '@/trpc/react'
import { DataTable } from '../data-table'
import { Card } from '../ui/card'
import { Icons } from '../Icons'
import { invoiceTableColumns } from './invoicesTableComuns'

export const InvoicePreview = () => {
  const { isLoading, data } = api.invoices.getInvoices.useQuery({
    pageIndex: 0,
    pageSize: 5,
  })

  if (!isLoading && data && data.invoices.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center gap-4 border-dashed p-24">
        <Icons.ghost className="h-6 w-6 text-muted-foreground" />
        <p>You have no invoices. Be sure to create some!</p>
      </Card>
    )
  }
  return (
    <DataTable
      columns={invoiceTableColumns}
      data={data?.invoices ?? []}
      isLoading={isLoading}
    />
  )
}

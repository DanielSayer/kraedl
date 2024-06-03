'use client'

import { DataTable } from '@/components/data-table'
import { api } from '@/trpc/react'
import type { PaginationState } from '@tanstack/react-table'
import { useState } from 'react'
import { columns } from './invoicesColumns'
import { useRouter } from 'next/navigation'

export const InvoicesTable = () => {
  const router = useRouter()
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const { isLoading, data } = api.invoices.getInvoices.useQuery(pagination)

  return (
    <DataTable
      columns={columns}
      data={data?.invoices ?? []}
      isLoading={isLoading}
      paginationConfig={{
        pagination,
        setPagination,
        rowCount: data?.count ?? 1,
      }}
      onRowClick={(id) => router.push(`/invoices/${id}`)}
    />
  )
}

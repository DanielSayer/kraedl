'use client'
import { InvoiceWithControls } from '@/app/invoices/[invoiceId]/InvoiceWithControls'
import { Skeleton } from '@/components/ui/skeleton'
import { api } from '@/trpc/react'

interface InvoicePageProps {
  params: {
    invoiceId: string
  }
}

export default function Page({ params }: InvoicePageProps) {
  const { invoiceId } = params
  const { data, isLoading } = api.invoices.getById.useQuery({ invoiceId })

  if (isLoading || !data) {
    return (
      <div className="container mt-20 space-y-6">
        {Array.from({ length: 5 }, (_, i) => i + 1).map((row) => (
          <Skeleton key={row} className="h-10 w-full" />
        ))}
      </div>
    )
  }

  return <InvoiceWithControls invoice={data} />
}

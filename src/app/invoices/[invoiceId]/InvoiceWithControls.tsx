'use client'

import LoadingButton from '@/components/LoadingButton'
import { buttonVariants } from '@/components/ui/button'
import { useCreatePdf } from '@/hooks/useCreatePdf'
import { api } from '@/trpc/react'
import type { Invoice, InvoiceFromApi } from '@/types/invoices'
import { format } from 'date-fns'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { InvoicePreview } from './Invoice'
import { InvoiceControls } from './InvoiceControls'

type InvoiceProps = {
  invoice: InvoiceFromApi
}

export const InvoiceWithControls = ({ invoice }: InvoiceProps) => {
  const router = useRouter()
  const { printRef, handleDownloadPdf } = useCreatePdf()
  const [invoiceFields, setInvoiceFields] = useState<Invoice>(
    mapInvoice(invoice),
  )

  const handleChangeDate = (key: keyof Invoice, date: string) => {
    const updatedInvoiceFields: Invoice = {
      ...invoiceFields,
      [key]: date,
    }
    setInvoiceFields(updatedInvoiceFields)
  }

  const { isPending, mutateAsync } = api.invoices.markAsPaid.useMutation({
    onSuccess: () => {
      toast.success('Invoice paid!')
      router.push('/invoices')
    },
    onError: () => {
      toast.error('Something went wrong please contact support')
    },
  })

  return (
    <div className="container pt-10">
      {!!invoice.invoicedAt && (
        <div className="mb-4 flex flex-col items-center gap-4">
          <div className="text-sm uppercase text-muted-foreground">
            This invoice has been invoiced and is in read only mode
          </div>
          <div className="flex gap-20">
            <Link
              href="/invoices"
              className={buttonVariants({ variant: 'secondary' })}
            >
              Go back
            </Link>
            <LoadingButton
              isLoading={isPending}
              disabled={!!invoice.paidAt}
              onClick={() => mutateAsync({ invoiceId: invoice.id })}
            >
              Mark as paid
            </LoadingButton>
          </div>
        </div>
      )}
      <div className="flex justify-center gap-4">
        {!invoiceFields.invoicedAt && (
          <div className="w-1/3">
            <InvoiceControls
              invoiceFields={invoiceFields}
              clientName={invoice.client.name}
              handleChangeDate={handleChangeDate}
              handleDownloadPdf={handleDownloadPdf}
            />
          </div>
        )}
        <div className="w-2/3 pb-4">
          <InvoicePreview
            printRef={printRef}
            invoice={invoiceFields}
            business={invoice.business}
            client={invoice.client}
          />
        </div>
      </div>
    </div>
  )
}

function mapInvoice(invoice: InvoiceFromApi): Invoice {
  return {
    id: invoice.id,
    invoiceNumber: invoice.invoiceNumber,
    clientId: invoice.clientId,
    invoicedAt: invoice.invoicedAt,
    dueDate: invoice.dueDate,
    issueDate: invoice.issueDate ?? format(new Date(), 'yyyy-MM-dd'),
    lineItems: invoice.lineItems,
    total: invoice.total,
  }
}

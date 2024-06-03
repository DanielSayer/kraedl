'use client'

import { Checkbox } from '@/components/ui/checkbox'
import type { ColumnDef } from '@tanstack/react-table'

export type CreateEventTableRow = {
  id: string
  startDate: string
  endDate: string
  eventName: string
  clientName: string
}

export const columns: ColumnDef<CreateEventTableRow>[] = [
  {
    id: 'select',
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: 'startDate',
    header: 'Start Date',
  },
  {
    accessorKey: 'endDate',
    header: 'End Date',
  },
  {
    accessorKey: 'eventName',
    header: 'Event Name',
  },
  { accessorKey: 'clientName', header: 'Client Name' },
]

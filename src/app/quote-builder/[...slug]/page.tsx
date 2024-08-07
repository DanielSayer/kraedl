import { Separator } from '@/components/ui/separator'
import useProtectedRoute from '@/hooks/useProtectedRoute'
import { api } from '@/trpc/server'
import { redirect } from 'next/navigation'
import { EventForm } from './EventForm'
import { z } from 'zod'

interface QuoteBuilderPageProps {
  params: {
    slug: string[]
  }
}

const getPageDescription = (isInvoiced: boolean) => {
  return isInvoiced
    ? 'Event has been invoiced. This is now read only.'
    : 'Manage your event here.'
}

const validateSlug = (slug: string[]) => {
  try {
    const eventId = z.string().uuid().parse(slug[0])
    const startDate = z
      .string()
      .datetime()
      .parse(decodeURIComponent(slug[1] ?? ''))
    const exceptionId = z.string().uuid().optional().parse(slug[2])
    return { eventId, startDate, exceptionId }
  } catch (e) {
    redirect('/scheduler')
  }
}

export default async function Page({ params }: QuoteBuilderPageProps) {
  await useProtectedRoute()
  const { eventId, startDate } = validateSlug(params.slug)

  const event = await api.events.getById({
    id: eventId,
    startDate,
  })
  if (!event) {
    redirect('/scheduler')
  }

  const isInvoiced = () => {
    return !!event.invoicedAt
  }

  return (
    <div className="container mb-20 pt-6">
      <h2 className="text-2xl font-bold tracking-tight">Quote Builder</h2>
      <p className="text-muted-foreground">
        {getPageDescription(isInvoiced())}
      </p>
      <Separator className="my-2" />
      <EventForm
        event={event}
        isReadOnly={isInvoiced()}
        eventStart={startDate}
      />
    </div>
  )
}

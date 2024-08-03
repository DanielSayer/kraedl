import { Icons } from '@/components/Icons'
import { EditAddressDialog } from '@/components/clients/EditAddressDialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import useProtectedRoute from '@/hooks/useProtectedRoute'
import { formatPhoneNumber } from '@/lib/phoneNumberUtils'
import { api } from '@/trpc/server'
import { ClientHeader } from './client-header'

interface ClientPageProps {
  params: {
    clientId: string
  }
}

export default async function Page({ params }: ClientPageProps) {
  await useProtectedRoute()
  const client = await api.clients.getById({ id: params.clientId })
  const clientAddress = await api.clients.getClientAddress({
    id: params.clientId,
  })

  return (
    <div className="mt-4 px-2 md:p-0">
      <ClientHeader id={client.id} title={`${client.name}'s Profile`} />
      <Card className="mt-4">
        <CardHeader>
          <div className="flex items-center justify-between font-semibold">
            Personal Information
            <Button variant="outline" className="flex rounded-3xl">
              <Icons.edit className="me-2 h-4 w-4" />
              Edit
            </Button>
          </div>
        </CardHeader>
        <CardContent className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-sm text-muted-foreground">Name</p>
            <p className="mt-2">{client.name}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="mt-2">{client.email}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Phone Number</p>
            <p className="mt-2">{formatPhoneNumber(client.phoneNumber)}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardHeader>
          <div className="flex items-center justify-between font-semibold">
            Address Information
            <EditAddressDialog
              clientId={client.id}
              clientAddress={clientAddress}
            />
          </div>
        </CardHeader>
        <CardContent>
          <ClientAddressBlock clientAddress={clientAddress} />
        </CardContent>
      </Card>
    </div>
  )
}

type ClientAddressBlock = {
  clientAddress: Awaited<ReturnType<typeof api.clients.getClientAddress>>
}

const ClientAddressBlock = ({ clientAddress }: ClientAddressBlock) => {
  if (!clientAddress) {
    return (
      <div>
        <p className="text-sm text-muted-foreground">Address</p>
        <p className="text-sm text-muted-foreground">
          This client does not have an address set up, once they do: it will
          appear below, here is an example address!
        </p>
        <p className="mt-2">3 Generic St, Samplecity</p>
        <p className="mt-2">QuietSuburb, SA, 1234</p>
      </div>
    )
  }

  return (
    <div>
      <p className="text-sm text-muted-foreground">Address</p>
      <p className="mt-2">
        {clientAddress.streetAddress}, {clientAddress.city}
      </p>
      <p className="mt-2">
        {clientAddress.suburb}, {clientAddress.state}, {clientAddress.postcode}
      </p>
    </div>
  )
}

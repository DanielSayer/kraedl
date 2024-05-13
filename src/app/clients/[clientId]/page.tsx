import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import useProtectedRoute from "@/hooks/useProtectedRoute";
import { formatPhoneNumber } from "@/lib/phoneNumberUtils";
import { api } from "@/trpc/server";
import { ClientHeader } from "./ClientHeader";
import { EditAddressDialog } from "@/components/clients/EditAddressDialog";

interface ClientPageProps {
  params: {
    clientId: string;
  };
}

export default async function Page({ params }: ClientPageProps) {
  await useProtectedRoute();
  const client = await api.clients.getById({ id: params.clientId });

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
            <EditAddressDialog />
          </div>
        </CardHeader>
        <CardContent>
          <div>
            <p className="text-sm text-muted-foreground">Address</p>
            <p className="mt-2">5 Very Awesome St, Testville</p>
            <p className="mt-2">Testburb, QLD, 4000</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

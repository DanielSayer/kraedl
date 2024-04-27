import DialogButton from "@/components/DialogButton";
import { Icons } from "@/components/Icons";
import useProtectedRoute from "@/hooks/useProtectedRoute";
import { api } from "@/trpc/server";
import AddClientModalContent from "./AddClientModal";
import ClientView from "./ClientView";

export default async function Page() {
  await useProtectedRoute();
  const clients = await api.clients.getByBusiness();

  return (
    <div className="mt-4 flex min-h-[calc(100vh-100px)] flex-col">
      <div className="mx-40 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Clients</h1>
        <DialogButton
          buttonContent={
            <>
              <Icons.add className="me-2 h-4 w-4" /> Add Client
            </>
          }
        >
          <AddClientModalContent />
        </DialogButton>
      </div>
      {clients.length === 0 ? (
        <div className="mt-20 flex flex-col items-center gap-4 border border-dashed py-20">
          <Icons.ghost className="text-muted-foreground" />
          <p>You have no clients, be sure to create some!</p>
        </div>
      ) : (
        <ClientView clients={clients} />
      )}
    </div>
  );
}

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { api } from "@/trpc/server";
import SideNav from "./SideNav";
import { Icons } from "@/components/Icons";
import Link from "next/link";

export default async function ClientLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    clientId: string;
  };
}) {
  const client = await api.clients.getById({ id: params.clientId });

  return (
    <>
      <div className="md:hidden">{children}</div>
      <div className="container hidden h-[calc(100vh-56px)] md:grid">
        <div className="md:grid md:grid-cols-3 lg:grid-cols-4">
          <aside className="flex flex-col border-r">
            <Link className="mt-6 flex" href="/dashboard/clients">
              <Icons.back className="me-2" />
              <span className="text-muted-foreground">All Clients</span>
            </Link>
            <div className="mt-14 flex flex-col items-center gap-4 text-center">
              <Avatar className="h-20 w-20">
                <AvatarFallback />
              </Avatar>
              <p className="font-bold">{client.name.toLocaleUpperCase()}</p>
            </div>
            <hr className="mx-6 mt-4" />
            <SideNav clientId={client.id} />
          </aside>
          <div className="p-5 md:col-span-2 lg:col-span-3">{children}</div>
        </div>
      </div>
    </>
  );
}

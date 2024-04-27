import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { api } from "@/trpc/server";
import SideNav from "./SideNav";

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
    <div className="container grid h-[calc(100vh-56px)]">
      <div className="lg:grid lg:grid-cols-4">
        <aside className="flex flex-col border-r lg:col-span-1">
          <div className="mt-20 flex flex-col items-center gap-4 text-center">
            <Avatar className="h-20 w-20">
              <AvatarFallback />
            </Avatar>
            <p className="font-bold">{client.name.toLocaleUpperCase()}</p>
          </div>
          <hr className="mx-6 mt-4" />
          <SideNav />
        </aside>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

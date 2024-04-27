import { api } from "@/trpc/server";

interface ClientPageProps {
  params: {
    clientId: string;
  };
}

export default async function Page({ params }: ClientPageProps) {
  const client = await api.clients.getById({ id: params.clientId });

  return <div>clients page</div>;
}

import useProtectedRoute from "@/hooks/useProtectedRoute";
import { api } from "@/trpc/server";

interface QuoteBuilderPageProps {
  params: {
    eventId: string;
  };
}

export default async function Page({ params }: QuoteBuilderPageProps) {
  await useProtectedRoute();

  const event = await api.events.getById({ id: params.eventId });
  const pricings = await api.pricing.getPricings();
  return <div>Build a quote here</div>;
}

import { api } from "@/trpc/react";
import type { DropdownOption } from "@/types/components/dropdownItem";
import { useMemo } from "react";

const useLoadClientsOptions = () => {
  const { data: clients, isLoading } = api.clients.getByBusiness.useQuery();
  const dropdownClients: DropdownOption[] = useMemo(() => {
    if (!clients) return [];
    return clients.map((c) => ({
      value: c.id,
      label: c.name,
    }));
  }, [clients]);

  return {
    clients: dropdownClients,
    isLoading,
  };
};

export default useLoadClientsOptions;

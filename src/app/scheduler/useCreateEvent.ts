import { createEventSchema } from "@/lib/validations/events";
import { api } from "@/trpc/react";
import type { DropdownOption } from "@/types/components/dropdownItem";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

type FormData = z.infer<typeof createEventSchema>;

const useCreateEvent = () => {
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const form = useForm<FormData>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      name: "",
      clientId: "",
      date: "",
      endTime: "",
      startTime: "",
    },
  });

  const { data: clients, isLoading } = api.clients.getByBusiness.useQuery();
  const mutation = api.events.create.useMutation();

  const dropdownClients: DropdownOption[] = useMemo(() => {
    if (!clients) return [];
    return clients.map((c) => ({
      value: c.id,
      label: c.name,
    }));
  }, [clients]);

  const onSubmit = async (data: FormData) => {
    setIsCreating(true);
    await mutation.mutateAsync({ ...data });
    setIsCreating(false);
  };

  return {
    isLoading,
    isCreating,
    form,
    clients: dropdownClients,
    onSubmit,
  };
};

export default useCreateEvent;

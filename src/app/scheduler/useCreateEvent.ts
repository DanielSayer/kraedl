import { createEventSchema } from "@/lib/validations/events";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

type FormData = z.infer<typeof createEventSchema>;

type UseCreateEventProps = {
  toggle: () => void;
};

const useCreateEvent = ({ toggle }: UseCreateEventProps) => {
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

  const mutation = api.events.create.useMutation({
    onError: (error) => {
      form.setError("root", { message: error.message });
      setIsCreating(false);
    },
    onSuccess: () => {
      toast.success("Event created");
      toggle();
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsCreating(true);
    await mutation.mutateAsync({ ...data });
    setIsCreating(false);
  };

  return {
    isCreating,
    form,
    onSubmit,
  };
};

export default useCreateEvent;

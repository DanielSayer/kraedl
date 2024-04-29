"use client";

import {
  EmailField,
  NameField,
  PhoneNumberField,
} from "@/components/FormFields";
import LoadingButton from "@/components/LoadingButton";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormField, FormMessage } from "@/components/ui/form";
import { registerClientSchema } from "@/lib/validations/clients";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type * as z from "zod";

type FormData = z.infer<typeof registerClientSchema>;

const AddClientModalContent = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<FormData>({
    resolver: zodResolver(registerClientSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
    },
  });

  const mutation = api.clients.create.useMutation({
    onError: (e) => {
      form.setError("root", { message: e.message });
      setIsLoading(false);
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    const { id } = await mutation.mutateAsync(data);
    setIsLoading(false);
    router.push(`/clients/${id}`);
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Create Client</DialogTitle>
        <DialogDescription>
          Quickly add a client to your business
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <NameField field={field} isLoading={isLoading} />
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <EmailField field={field} isLoading={isLoading} />
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <PhoneNumberField field={field} isLoading={isLoading} />
                )}
              />
              <FormMessage>{form.formState.errors?.root?.message}</FormMessage>
            </div>
          </div>

          <DialogFooter className="mt-3">
            <LoadingButton isLoading={isLoading} loadingText="Creating...">
              Create Client
            </LoadingButton>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
};

export default AddClientModalContent;
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { EmailField, NameField, PasswordField } from "@/components/FormFields";
import LoadingButton from "@/components/LoadingButton";
import { Form, FormField, FormMessage } from "@/components/ui/form";
import { userRegisterSchema } from "@/lib/validations/auth";
import { api } from "@/trpc/react";
import { signIn } from "next-auth/react";
import { useState } from "react";

type FormData = z.infer<typeof userRegisterSchema>;

const RegisterForm = (props: { businessId: string }) => {
  const form = useForm<FormData>({
    resolver: zodResolver(userRegisterSchema),
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const mutation = api.auth.registerAdmin.useMutation({
    onError: (e) => {
      form.setError("root", { message: e.message });
      setIsLoading(false);
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    await mutation.mutateAsync({ ...data, businessId: props.businessId });
    const signInResult = await signIn("credentials", {
      ...data,
      redirect: false,
    });
    if (!signInResult?.ok || signInResult?.error) {
      form.setError("root", {
        message: "Something went wrong, please contact support",
      });
      setIsLoading(false);
      return;
    }
    router.push("/dashboard");
  };

  return (
    <div className="grid gap-6">
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
                name="password"
                render={({ field }) => (
                  <PasswordField field={field} isLoading={isLoading} />
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <PasswordField
                    field={field}
                    isLoading={isLoading}
                    isConfirm
                  />
                )}
              />
            </div>
            <LoadingButton
              isLoading={isLoading}
              loadingText="Creating account..."
            >
              Create Account
            </LoadingButton>
            <FormMessage>{form.formState.errors?.root?.message}</FormMessage>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;

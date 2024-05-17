"use client";

import { EmailField, NameField, PasswordField } from "@/components/FormFields";
import LoadingButton from "@/components/LoadingButton";
import { Form, FormField, FormMessage } from "@/components/ui/form";
import { userRegisterSchema } from "@/lib/validations/auth";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import type { z } from "zod";

type FormData = z.infer<typeof userRegisterSchema>;

const RegisterForm = (props: { businessId: string }) => {
  const form = useForm<FormData>({
    resolver: zodResolver(userRegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      businessId: props.businessId,
    },
  });
  const router = useRouter();

  const { mutateAsync, isPending } = api.auth.registerAdmin.useMutation({
    onError: (e) => {
      form.setError("root", { message: e.message });
    },
  });

  const onSubmit = async (data: FormData) => {
    await mutateAsync(data);
    const signInResult = await signIn("credentials", {
      ...data,
      redirect: false,
    });
    if (!signInResult?.ok || signInResult?.error) {
      form.setError("root", {
        message: "Something went wrong, please contact support",
      });
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
                  <NameField field={field} isLoading={isPending} />
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <EmailField field={field} isLoading={isPending} />
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <PasswordField field={field} isLoading={isPending} />
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <PasswordField
                    field={field}
                    isLoading={isPending}
                    isConfirm
                  />
                )}
              />
            </div>
            <LoadingButton
              isLoading={isPending}
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

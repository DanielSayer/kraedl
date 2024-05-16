"use client";

import { useRouter } from "next/navigation";
import * as React from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { EmailField, PasswordField } from "@/components/FormFields";
import LoadingButton from "@/components/LoadingButton";
import { Form, FormField, FormMessage } from "@/components/ui/form";
import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validations/auth";

type FormData = z.infer<typeof loginSchema>;

const SignInForm = () => {
  const router = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    const signInResult = await signIn("credentials", {
      ...data,
      redirect: false,
    });
    if (!signInResult?.ok || signInResult?.error) {
      form.setError("root", {
        message: signInResult?.error ?? "Something went wrong",
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
            </div>
            <LoadingButton
              isLoading={isLoading}
              loadingText="Signing you in..."
            >
              Sign In
            </LoadingButton>
            <FormMessage>{form.formState.errors.root?.message}</FormMessage>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SignInForm;

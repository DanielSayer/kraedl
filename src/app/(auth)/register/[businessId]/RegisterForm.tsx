"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import type * as z from "zod";

import LoadingButton from "@/components/LoadingButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
                  <FormItem>
                    <FormLabel className="sr-only" htmlFor="name">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        placeholder="John Smith"
                        type="text"
                        autoCapitalize="none"
                        autoCorrect="off"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only" htmlFor="email">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        placeholder="name@example.com"
                        type="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only" htmlFor="password">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="password"
                        placeholder="password"
                        type="password"
                        autoCapitalize="none"
                        autoComplete="new-password"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only" htmlFor="confirmPassword">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="confirmPassword"
                        placeholder="password"
                        type="password"
                        autoCapitalize="none"
                        autoComplete="current-password"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
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

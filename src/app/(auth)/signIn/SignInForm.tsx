"use client";

import { useRouter } from "next/navigation";
import * as React from "react";
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
import type { userSignInSchema } from "@/lib/validations/auth";
import { signIn } from "next-auth/react";

type FormData = z.infer<typeof userSignInSchema>;

const SignInForm = () => {
  const router = useRouter();
  const form = useForm<FormData>();
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

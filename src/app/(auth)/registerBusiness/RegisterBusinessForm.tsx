"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type * as z from "zod";

import { Button } from "@/components/ui/button";
import Combobox from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { states } from "@/lib/constants/states";
import { businessRegisterSchema } from "@/lib/validations/businesses";
import { useRouter } from "next/navigation";
import { Icons } from "../../../components/Icons";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { api } from "@/trpc/react";

type FormData = z.infer<typeof businessRegisterSchema>;

const RegisterBusinessForm = () => {
  const router = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(businessRegisterSchema),
    defaultValues: {
      name: "",
      streetAddress: "",
      suburb: "",
      city: "",
      state: "",
      postcode: "",
      phoneNumber: "",
    },
  });
  const { errors } = form.formState;
  const mutation = api.business.register.useMutation({
    onError: (e) => {
      form.setError("root", { message: e.message });
      setIsLoading(false);
    },
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    const { id } = await mutation.mutateAsync(data);
    setIsLoading(false);
    router.push(`/register/${id}`);
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
                      Business Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        placeholder="My Epic Company Name"
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
                name="streetAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only" htmlFor="address">
                      Business street address
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="address"
                        placeholder="street address"
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
                name="suburb"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only" htmlFor="suburb">
                      Business Suburb
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="suburb"
                        placeholder="suburb"
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
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only" htmlFor="city">
                      Business city
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="city"
                        placeholder="city"
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
              <div className="flex gap-2">
                <FormField
                  control={form.control}
                  name="postcode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only" htmlFor="postcode">
                        Business postcode
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="postcode"
                          placeholder="postcode"
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
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only" htmlFor="state">
                        Business state
                      </FormLabel>
                      <FormControl>
                        <Combobox
                          description="state"
                          options={states}
                          value={field.value}
                          handleSelect={(value) =>
                            form.setValue("state", value)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only" htmlFor="phoneNumber">
                      Business phone number
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="phoneNumber"
                        placeholder="0412 345 678"
                        type="tel"
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
            </div>
            <Button disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Register Business
            </Button>
            <FormMessage>{errors?.root?.message}</FormMessage>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RegisterBusinessForm;

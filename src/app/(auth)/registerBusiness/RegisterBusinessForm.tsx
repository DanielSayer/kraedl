"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import {
  AddressField,
  CityField,
  NameField,
  PhoneNumberField,
  PostcodeField,
  SuburbField,
} from "@/components/FormFields";
import LoadingButton from "@/components/LoadingButton";
import Combobox from "@/components/ui/combobox";
import { states } from "@/lib/constants/states";
import { businessRegisterSchema } from "@/lib/validations/businesses";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import type { DropdownOption } from "@/types/components/dropdownItem";

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
                  <NameField
                    isLoading={isLoading}
                    field={field}
                    label="Business name"
                    placeholder="My Epic Company"
                  />
                )}
              />

              <FormField
                control={form.control}
                name="streetAddress"
                render={({ field }) => (
                  <AddressField
                    field={field}
                    isLoading={isLoading}
                    label="Business street address"
                  />
                )}
              />
              <FormField
                control={form.control}
                name="suburb"
                render={({ field }) => (
                  <SuburbField
                    field={field}
                    isLoading={isLoading}
                    label="Business suburb"
                  />
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <CityField
                    field={field}
                    isLoading={isLoading}
                    label="Business city"
                  />
                )}
              />
              <div className="flex gap-2">
                <FormField
                  control={form.control}
                  name="postcode"
                  render={({ field }) => (
                    <PostcodeField
                      field={field}
                      isLoading={isLoading}
                      label="Business postcode"
                    />
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
                          placeholder="state"
                          options={states}
                          value={field.value}
                          onChange={(value: DropdownOption) =>
                            form.setValue("state", value.value)
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
                  <PhoneNumberField
                    field={field}
                    isLoading={isLoading}
                    label="Business phone number"
                  />
                )}
              />
            </div>
            <LoadingButton isLoading={isLoading} loadingText="Registering...">
              RegisterBusiness
            </LoadingButton>
            <FormMessage>{errors?.root?.message}</FormMessage>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RegisterBusinessForm;

"use client";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";

import type { DropdownOption } from "@/types/components/dropdownItem";
import type { z } from "zod";

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
  const { mutateAsync, isPending } = api.business.register.useMutation({
    onError: (e) => {
      form.setError("root", { message: e.message });
    },
  });

  const onSubmit = async (data: FormData) => {
    const { id } = await mutateAsync(data);
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
                    isLoading={isPending}
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
                    isLoading={isPending}
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
                    isLoading={isPending}
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
                    isLoading={isPending}
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
                      isLoading={isPending}
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
                    isLoading={isPending}
                    label="Business phone number"
                  />
                )}
              />
            </div>
            <LoadingButton isLoading={isPending} loadingText="Registering...">
              RegisterBusiness
            </LoadingButton>
            <FormMessage>{form.formState.errors?.root?.message}</FormMessage>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RegisterBusinessForm;

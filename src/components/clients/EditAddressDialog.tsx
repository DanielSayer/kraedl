"use client";

import { states } from "@/lib/constants/states";
import { editClientAddressSchema } from "@/lib/validations/clients";
import type { DropdownOption } from "@/types/components/dropdownItem";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import {
  AddressField,
  CityField,
  PostcodeField,
  SuburbField,
} from "../FormFields";
import { Icons } from "../Icons";
import LoadingButton from "../LoadingButton";
import { Button } from "../ui/button";
import Combobox from "../ui/combobox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Separator } from "../ui/separator";

type FormData = z.infer<typeof editClientAddressSchema>;

export const EditAddressDialog = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<FormData>({
    resolver: zodResolver(editClientAddressSchema),
    defaultValues: {
      streetAddress: "",
      suburb: "",
      city: "",
      postcode: "",
      state: "",
    },
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex rounded-3xl">
          <Icons.edit className="me-2 h-4 w-4" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form>
            <DialogHeader>Edit Client Address</DialogHeader>
            <div className="mt-2 grid gap-2">
              <FormField
                control={form.control}
                name="streetAddress"
                render={({ field }) => (
                  <AddressField
                    field={field}
                    isLoading={isLoading}
                    label="Customer street address"
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
                    label="Suburb"
                  />
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <CityField field={field} isLoading={isLoading} label="City" />
                )}
              />
              <FormField
                control={form.control}
                name="postcode"
                render={({ field }) => (
                  <PostcodeField
                    field={field}
                    isLoading={isLoading}
                    label="Postcode"
                  />
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only" htmlFor="state">
                      State
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
            <Separator className="my-2" />
            <DialogFooter className="gap-2">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
              <LoadingButton
                type="submit"
                isLoading={false}
                loadingText="Updating..."
              >
                Update
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

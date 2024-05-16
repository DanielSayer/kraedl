"use client";

import { NameField } from "@/components/FormFields";
import { Icons } from "@/components/Icons";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { createPricingPackageSchema } from "@/lib/validations/pricing";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import type { z } from "zod";

type NewPricingPackageButtonProps = {
  refetch: () => void;
};

type FormData = z.infer<typeof createPricingPackageSchema>;
const NewPricingPackageButton = ({ refetch }: NewPricingPackageButtonProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggle = () => setIsOpen(!isOpen);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const mutation = api.pricing.createPricing.useMutation({
    onError: (e) => {
      form.setError("root", { message: e.message });
      setIsLoading(false);
    },
  });

  const form = useForm<FormData>({
    defaultValues: { name: "", price: "0.0" },
    resolver: zodResolver(createPricingPackageSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    await mutation.mutateAsync(data);
    toast.success(`Sucessfully created ${data.name}`);
    setIsLoading(false);
    refetch();
    toggle();
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={toggle}>
      <DialogTrigger asChild>
        <Button>
          <Icons.add className="me-2 h-4 w-4" /> Pricing Package
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader className="font-semibold">
              Create Pricing Package
            </DialogHeader>
            <Separator className="my-2" />
            <div className="mt-4 space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <NameField
                    field={field}
                    isLoading={isLoading}
                    placeholder="Package Name"
                  />
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only" htmlFor="price">
                      Price
                    </FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <Icons.money className="mr-2 text-muted-foreground" />
                        <Input
                          id="price"
                          type="number"
                          step={0.01}
                          {...field}
                          defaultValue={0.0}
                          min={0}
                          disabled={isLoading}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Separator className="mb-2 mt-4" />
            <FormMessage>{form.formState.errors?.root?.message}</FormMessage>
            <DialogFooter className="gap-2">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
              <LoadingButton
                type="submit"
                isLoading={isLoading}
                loadingText="Creating..."
              >
                Create
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewPricingPackageButton;

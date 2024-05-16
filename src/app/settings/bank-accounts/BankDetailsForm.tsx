"use client";

import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Separator } from "@/components/ui/separator";
import { bankDetailsSchema } from "@/lib/validations/bankAccounts";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import type { BankAccount } from "@/types/bankAccounts";
import type { z } from "zod";

type BankDetailsFormProps = {
  bankAccount: BankAccount | undefined;
};

type FormData = z.infer<typeof bankDetailsSchema>;
export const BankDetailsForm = ({ bankAccount }: BankDetailsFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<FormData>({
    resolver: zodResolver(bankDetailsSchema),
    defaultValues: {
      accountName: bankAccount?.accountName ?? "",
      accountNumber: bankAccount?.accountNumber ?? "",
      bsb: bankAccount?.bsb ?? "",
    },
  });

  const mutation = api.bankAccounts.updateBankAccountDetails.useMutation({
    onSuccess: () => {
      toast.success("Successfully updated bank account");
    },
    onError: (e) => {
      form.setError("root", { message: e.message });
      setIsLoading(false);
    },
  });

  const saveBankDetails = async (data: FormData) => {
    setIsLoading(true);
    await mutation.mutateAsync(data);
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(saveBankDetails)}>
        <FormField
          name="accountName"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="name">Account Name</FormLabel>
              <FormControl>
                <Input
                  id="name"
                  placeholder="Company Pty Ltd"
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
          name="bsb"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="bsb">BSB</FormLabel>
              <FormControl>
                <InputOTP
                  maxLength={6}
                  {...field}
                  id="bsb"
                  disabled={isLoading}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="accountNumber"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="accountNumber">Account Number</FormLabel>
              <FormControl>
                <Input
                  id="accountNumber"
                  placeholder="123456789"
                  type="text"
                  maxLength={9}
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator className="my-4" />
        <FormMessage>{form.formState.errors?.root?.message}</FormMessage>
        <div className="flex items-center justify-end gap-2">
          <Button variant="secondary">Cancel</Button>
          <LoadingButton
            isLoading={isLoading}
            loadingText="Saving..."
            type="submit"
          >
            Save
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};

import { NameField } from "@/components/FormFields";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import Combobox from "@/components/ui/combobox";
import { DatePicker } from "@/components/ui/datepicker";
import {
  DialogClose,
  DialogFooter,
  DialogHeader,
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
import { createEventSchema } from "@/lib/validations/events";
import { api } from "@/trpc/react";
import type { DropdownOption } from "@/types/components/dropdownItem";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

type FormData = z.infer<typeof createEventSchema>;
type CreateEventDialogProps = {
  isLoading: boolean;
  clients: DropdownOption[];
  toggle: () => void;
  refetch: () => void;
};

const CreateEventDialog = ({
  isLoading,
  clients,
  toggle,
  refetch,
}: CreateEventDialogProps) => {
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const form = useForm<FormData>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      name: "",
      clientId: "",
      date: "",
      endTime: "",
      startTime: "",
    },
  });

  const mutation = api.events.create.useMutation({
    onError: (error) => {
      form.setError("root", { message: error.message });
      setIsCreating(false);
    },
    onSuccess: () => {
      refetch();
      toast.success("Event created");
      toggle();
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsCreating(true);
    await mutation.mutateAsync({ ...data });
    setIsCreating(false);
  };

  return (
    <>
      <DialogHeader className="font-semibold">
        Create Event
        <hr className="mt-2" />
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-3  ">
            <div className="w-full">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <NameField
                    field={field}
                    isLoading={false}
                    placeholder="Event Name"
                  />
                )}
              />
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="clientId"
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <FormLabel className="sr-only" htmlFor="client">
                      Client
                    </FormLabel>
                    <FormControl>
                      <Combobox
                        isLoading={isLoading}
                        options={clients}
                        value={field.value}
                        onChange={(value: DropdownOption) =>
                          form.setValue("clientId", value.value)
                        }
                        placeholder="Client"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex w-full gap-2">
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem className="w-full space-y-1">
                    <FormLabel htmlFor="startTime">Start Time</FormLabel>
                    <FormControl>
                      <Input id="startTime" type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem className="w-full space-y-1">
                    <FormLabel htmlFor="endTime">End Time</FormLabel>
                    <FormControl>
                      <Input id="startTime" type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only" htmlFor="date">
                    Date
                  </FormLabel>
                  <FormControl>
                    <DatePicker
                      date={field.value}
                      onChange={(date) =>
                        form.setValue("date", format(date, "yyyy-MM-dd"))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormMessage className="mt-2">
            {form.formState.errors?.root?.message}
          </FormMessage>
          <hr className="my-2" />
          <DialogFooter className="gap-2">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <LoadingButton
              type="submit"
              isLoading={isCreating}
              loadingText="Creating..."
            >
              Create
            </LoadingButton>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
};

export default CreateEventDialog;

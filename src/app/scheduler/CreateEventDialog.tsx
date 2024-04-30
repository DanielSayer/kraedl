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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createEventSchema } from "@/lib/validations/events";
import { api } from "@/trpc/react";
import type { DropdownOption } from "@/types/components/dropdownItem";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

type FormData = z.infer<typeof createEventSchema>;
const CreateEventDialog = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      clientId: "",
      date: "",
      endTime: "",
      startTime: "",
    },
  });

  const { data: clients, isLoading } = api.clients.getByBusiness.useQuery();

  const dropdownClients: DropdownOption[] = useMemo(() => {
    if (!clients) return [];
    return clients.map((c) => ({
      value: c.id,
      label: c.name,
    }));
  }, [clients]);

  return (
    <>
      <DialogHeader className="font-semibold">Create Event</DialogHeader>
      <Form {...form}>
        <form>
          <div className="grid gap-4">
            <div className="w-full">
              <FormField
                control={form.control}
                name="clientId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only" htmlFor="client">
                      Client
                    </FormLabel>
                    <FormControl>
                      <Combobox
                        isLoading={isLoading}
                        options={dropdownClients}
                        value={field.value}
                        onChange={(value: DropdownOption) =>
                          form.setValue("clientId", value.value)
                        }
                      />
                    </FormControl>
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
                        form.setValue("date", date.toString())
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <hr className="my-2" />
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <Button>Submit</Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
};

export default CreateEventDialog;

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
import type { DropdownOption } from "@/types/components/dropdownItem";
import { format } from "date-fns";
import useCreateEvent from "./useCreateEvent";

const CreateEventDialog = () => {
  const { isLoading, isCreating, form, clients, onSubmit } = useCreateEvent();

  return (
    <>
      <DialogHeader className="font-semibold">Create Event</DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4">
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
                  <FormItem>
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

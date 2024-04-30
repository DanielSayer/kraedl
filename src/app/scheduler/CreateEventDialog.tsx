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
import { useForm } from "react-hook-form";

const CreateEventDialog = () => {
  const form = useForm();
  return (
    <>
      <DialogHeader className="font-semibold">Create Event</DialogHeader>
      <Form {...form}>
        <form>
          <div className="grid gap-4">
            <div className="w-full">
              <FormField
                control={form.control}
                name="client"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only" htmlFor="client">
                      Client
                    </FormLabel>
                    <FormControl>
                      <Combobox
                        description="client"
                        options={[]}
                        value={field.value}
                        handleSelect={(value) => form.setValue("client", value)}
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
                      onChange={(date) => form.setValue("date", date)}
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

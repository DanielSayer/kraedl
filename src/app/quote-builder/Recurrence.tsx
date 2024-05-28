import { Icons } from "@/components/Icons";
import Combobox from "@/components/ui/combobox";
import { DatePicker } from "@/components/ui/datepicker";
import {
  Fieldset,
  FieldsetContent,
  FieldsetLegend,
} from "@/components/ui/fieldset";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  getPlural,
  recurrenceFrequencyOptions,
  type RecurrenceFrequency,
} from "@/types/recurrence";
import { useState } from "react";

export const Recurrence = () => {
  const [frequency, setFrequency] = useState<RecurrenceFrequency>("NONE");
  const [end, setEnd] = useState<"after" | "on">("after");
  return (
    <Fieldset>
      <FieldsetLegend>
        <Icons.calendar /> Recurrence
      </FieldsetLegend>
      <FieldsetContent className="p-6">
        <div className="grid grid-cols-3 gap-6">
          <div>
            <Label>Frequency</Label>
            <Combobox
              options={recurrenceFrequencyOptions}
              onChange={(opt) => setFrequency(opt.value as RecurrenceFrequency)}
              value={frequency}
            />
          </div>
          {frequency !== "NONE" && (
            <>
              <div>
                <Label>Every</Label>
                <div className="flex w-full items-center space-x-2">
                  <Input type="number" step={1} min={0} defaultValue={1} />
                  <span>{getPlural(frequency)}</span>
                </div>
              </div>
              <div>
                <Label>End</Label>
                <div className="flex space-x-2">
                  <RadioGroup
                    defaultValue="after"
                    onValueChange={(val) => {
                      setEnd(val as "after" | "on");
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="after" id="after" />
                      <Label htmlFor="after">After</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="on" id="on" />
                      <Label htmlFor="on">On</Label>
                    </div>
                  </RadioGroup>
                  <div className="w-full space-y-2">
                    <div className="flex w-full items-center space-x-2">
                      <Input
                        type="number"
                        step={1}
                        defaultValue={3}
                        disabled={end !== "after"}
                      />
                      <span>occurrences</span>
                    </div>
                    <DatePicker onChange={() => {}} disabled={end !== "on"} />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </FieldsetContent>
    </Fieldset>
  );
};

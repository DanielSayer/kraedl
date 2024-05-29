"use client";

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
  type RecurrenceEnd,
  type RecurrenceFrequency,
} from "@/types/recurrence";
import { useState } from "react";

export const Recurrence = () => {
  const [frequency, setFrequency] = useState<RecurrenceFrequency>("NONE");
  const [end, setEnd] = useState<RecurrenceEnd>("AFTER");
  return (
    <Fieldset className="h-full">
      <FieldsetLegend>
        <Icons.recurrence /> Recurrence
      </FieldsetLegend>
      <FieldsetContent className="p-4">
        <div className="grid grid-cols-2 gap-4">
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
              <div className="col-span-2">
                <Label>End</Label>
                <div className="flex space-x-2">
                  <RadioGroup
                    defaultValue="AFTER"
                    onValueChange={(val) => {
                      setEnd(val as RecurrenceEnd);
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="AFTER" id="after" />
                      <Label htmlFor="after">After</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="ON" id="on" />
                      <Label htmlFor="on">On</Label>
                    </div>
                  </RadioGroup>
                  <div className="w-full space-y-2">
                    <div className="flex w-full items-center space-x-2">
                      <Input
                        type="number"
                        step={1}
                        defaultValue={3}
                        disabled={end !== "AFTER"}
                      />
                      <span>occurrences</span>
                    </div>
                    <DatePicker onChange={() => {}} disabled={end !== "ON"} />
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

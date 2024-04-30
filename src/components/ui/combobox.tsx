"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { FormControl } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { DropDownItem } from "@/types/components/dropdownItem";
import { Icons } from "../Icons";

type ComboboxProps = {
  description: string;
  options: DropDownItem[];
  value: string;
  handleSelect: (value: string) => void;
};

const Combobox = ({
  description,
  options,
  value,
  handleSelect,
}: ComboboxProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "w-full justify-between",
              !value && "text-muted-foreground",
            )}
          >
            {value
              ? options.find(
                  (option) =>
                    option.value.toLowerCase() === value.toLowerCase(),
                )?.label
              : `Select ${description}`}
            <Icons.arrowDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="min-w-1 p-0">
        <Command>
          <CommandInput
            placeholder={`Search ${description}...`}
            className="h-9"
          />
          <CommandEmpty>No {description} found.</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                value={option.label}
                key={option.value}
                onSelect={() => handleSelect(option.value)}
              >
                {option.label}
                <Icons.check
                  className={cn(
                    "ml-auto h-4 w-4",
                    option.value === value ? "opacity-100" : "opacity-0",
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
export default Combobox;

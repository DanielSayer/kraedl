import Select from "react-select";

import type { DropdownOption } from "@/types/components/dropdownItem";
import type { SingleValue } from "react-select";

type ComboboxProps = {
  id: string;
  className: string;
  placeholder: string;
  value: string;
  isClearable: boolean;
  isLoading: boolean;
  isDisabled: boolean;
  options: DropdownOption[];
  onChange: (option: DropdownOption) => void;
};

const Combobox = ({
  onChange,
  options,
  value,
  ...props
}: Partial<ComboboxProps>) => {
  const handleChange = (option: SingleValue<DropdownOption>) => {
    if (!onChange) return;
    if (!option) return;

    onChange(option);
  };

  const selectedOption = options?.filter((x) => x.value === value);

  return (
    <Select
      onChange={(option: SingleValue<DropdownOption>) => handleChange(option)}
      options={options}
      components={{
        IndicatorSeparator: () => null,
      }}
      {...props}
      value={selectedOption}
      styles={{
        menu: (base) => ({
          ...base,
          zIndex: 1000,
          backgroundColor: "hsl(var(--background))",
        }),
      }}
      classNames={{
        menu: () => "border",
        valueContainer: () => "p-0 !px-3 !py-2 !h-10",
        singleValue: () => "!text-foreground !text-sm",
        placeholder: () => "!text-muted-foreground !text-sm",
        input: () => "!text-foreground !text-sm !m-0",
        control: ({ isFocused }) =>
          isFocused
            ? "!border-input !outline-none !ring-2 !ring-ring !ring-offset-2 !ring-offset-background !rounded-md"
            : "!border-input !rounded-md",
        option: ({ isSelected, isFocused }) =>
          isSelected
            ? "!bg-primary"
            : isFocused
              ? "!bg-violet-100 dark:!bg-violet-500"
              : "active:!bg-violet-200 hover:!bg-violet-100 dark:hover:!bg-violet-500 dark:active:!bg-violet-500",
      }}
    />
  );
};

export default Combobox;

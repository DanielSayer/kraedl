import { DropdownOption } from "@/types/components/dropdownItem";
import Select, { SingleValue } from "react-select";

type SelectProps = {
  id: string;
  placeholder: string;
  value: string;
  isClearable: boolean;
  isLoading: boolean;
  isDisabled: boolean;
  options: DropdownOption[];
};

type ComboboxProps = Partial<SelectProps> & {
  onChange: (option: DropdownOption) => void;
};

const Combobox = ({ onChange, options, value, ...props }: ComboboxProps) => {
  const handleChange = (option: SingleValue<DropdownOption>) => {
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
    />
  );
};

export default Combobox;

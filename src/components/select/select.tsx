import { useCallback, useMemo } from "react";

export type SelectOption<T> = {
  value: T;
  label: string;
};

type SelectProps<T = string> = Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  "value" | "onChange"
> & {
  value: T;
  onChange?(newValue: T): void;
  options: SelectOption<T>[];
};

export function Select<T = string>({
  onChange,
  value,
  options,
  ...rest
}: SelectProps<T>) {
  const indexOption = useMemo(
    () => options.findIndex((option) => option.value === value),
    [options, value]
  );

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const indexOptionItem = Number(e.target.value);
      if (
        !onChange ||
        indexOptionItem === -1 ||
        indexOptionItem >= options.length
      )
        return;

      const valueOptionItem = options[indexOptionItem].value;
      onChange(valueOptionItem);
    },
    [onChange, options]
  );

  return (
    <select value={indexOption!} onChange={handleOnChange} {...rest}>
      {indexOption === -1 && <option value={-1}></option>}
      {options.map((optionItem, index) => (
        <option key={index} value={index}>
          {optionItem.label}
        </option>
      ))}
    </select>
  );
}

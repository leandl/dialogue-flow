import { useCallback, useMemo } from "react";

export type DialogueNodeFlowSelectOption<T> = {
  value: T;
  label: string;
};

type DialogueNodeFlowSelectProps<T = string> = {
  value: T;
  onChange?(newValue: T): void;
  options: DialogueNodeFlowSelectOption<T>[];
  clasName?: string;
};

export function DialogueNodeFlowSelect<T = string>({
  onChange,
  value,
  options,
  clasName = "",
}: DialogueNodeFlowSelectProps<T>) {
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
    <div className="dialogue-node-flow-select">
      <select
        className={clasName}
        value={indexOption!}
        onChange={handleOnChange}
      >
        {indexOption === -1 && <option value={-1}></option>}
        {options.map((optionItem, index) => (
          <option key={index} value={index}>
            {optionItem.label}
          </option>
        ))}
      </select>
    </div>
  );
}

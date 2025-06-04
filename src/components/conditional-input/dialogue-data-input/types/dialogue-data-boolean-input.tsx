import { useCallback } from "react";
import {
  DialogueDataType,
  type DialogueDataValue,
} from "../../../../entities/dialogue-logic";
import { Select, type SelectOption } from "../../../select/select";

type DialogueDataBooleanInputProps = {
  value: DialogueDataValue<DialogueDataType.BOOLEAN>;
  onChange(val: DialogueDataValue<DialogueDataType.BOOLEAN>): void;
};

const dialogueDataBooleanInputOptions: SelectOption<boolean>[] = [
  {
    value: true,
    label: "TRUE",
  },
  {
    value: false,
    label: "FALSE",
  },
];

export function DialogueDataBooleanInput({
  value,
  onChange,
}: DialogueDataBooleanInputProps) {
  const handleOnChange = useCallback(
    (newValue: boolean) => onChange([DialogueDataType.BOOLEAN, newValue]),
    [onChange]
  );

  return (
    <Select
      value={value[1]}
      onChange={handleOnChange}
      options={dialogueDataBooleanInputOptions}
    />
  );
}

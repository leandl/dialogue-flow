import {
  DialogueDataType,
  type DialogueDataValue,
} from "../../../../entities/dialogue-logic";

type DialogueDataStringInputProps = {
  value: DialogueDataValue<DialogueDataType.STRING>;
  onChange(val: DialogueDataValue<DialogueDataType.STRING>): void;
};

export function DialogueDataStringInput({
  value,
  onChange,
}: DialogueDataStringInputProps) {
  return (
    <input
      type="text"
      value={value[1]}
      onChange={(e) => onChange([DialogueDataType.STRING, e.target.value])}
    />
  );
}

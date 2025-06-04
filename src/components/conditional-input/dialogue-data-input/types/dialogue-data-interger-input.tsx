import {
  DialogueDataType,
  type DialogueDataValue,
} from "../../../../entities/dialogue-logic";

type DialogueDataIntergerInputProps = {
  value: DialogueDataValue<DialogueDataType.INTERGER>;
  onChange(val: DialogueDataValue<DialogueDataType.INTERGER>): void;
};

export function DialogueDataIntergerInput({
  value,
  onChange,
}: DialogueDataIntergerInputProps) {
  return (
    <input
      type="number"
      value={value[1]}
      onChange={(e) =>
        onChange([DialogueDataType.INTERGER, parseInt(e.target.value) || 0])
      }
    />
  );
}

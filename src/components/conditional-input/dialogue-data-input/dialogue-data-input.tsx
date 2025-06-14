import {
  DialogueDataType,
  type DialogueDataValue,
} from "../../../entities/dialogue-logic";
import { Select, type SelectOption } from "../../select/select";
import { DialogueDataBooleanInput } from "./types/dialogue-data-boolean-input";
import { DialogueDataIntergerInput } from "./types/dialogue-data-interger-input";
import { DialogueDataStringInput } from "./types/dialogue-data-string-input";

const dialogueDataValueDefault: {
  [T in DialogueDataType]: () => DialogueDataValue<T>;
} = {
  [DialogueDataType.INTERGER]: () => [DialogueDataType.INTERGER, 0],
  [DialogueDataType.STRING]: () => [DialogueDataType.STRING, ""],
  [DialogueDataType.BOOLEAN]: () => [DialogueDataType.BOOLEAN, true],
};

type ComponentDialogueDataInputProps<
  T extends DialogueDataType = DialogueDataType
> = {
  value: DialogueDataValue<T>;
  onChange(newValue: DialogueDataValue<T>): void;
};

type FunctionComponentDialogueDataInput<
  T extends DialogueDataType = DialogueDataType
> = (props: ComponentDialogueDataInputProps<T>) => React.JSX.Element;

const allComponentDialogueDataInput: {
  [T in DialogueDataType]: FunctionComponentDialogueDataInput<T>;
} = {
  [DialogueDataType.INTERGER]: DialogueDataIntergerInput,
  [DialogueDataType.STRING]: DialogueDataStringInput,
  [DialogueDataType.BOOLEAN]: DialogueDataBooleanInput,
};

const allDialogueDataTypeOptions = [
  DialogueDataType.INTERGER,
  DialogueDataType.STRING,
  DialogueDataType.BOOLEAN,
];

const selectDialogueDataTypeOptions: SelectOption<DialogueDataType>[] =
  allDialogueDataTypeOptions.map((record) => ({
    value: record,
    label: record,
  }));

type DialogueDataInputProps<T extends DialogueDataType = DialogueDataType> = {
  value: DialogueDataValue<T>;
  onChange: (newValue: DialogueDataValue) => void;
};

export function DialogueDataInput<
  T extends DialogueDataType = DialogueDataType
>({ value, onChange }: DialogueDataInputProps<T>) {
  const dataType = value[0];
  const ComponentDialogueDataInput = allComponentDialogueDataInput[
    dataType
  ] as FunctionComponentDialogueDataInput<T>;

  const handleTypeChange = (newType: DialogueDataType) => {
    const getValueDefault = dialogueDataValueDefault[newType];
    const newValue = getValueDefault();
    onChange(newValue);
  };

  return (
    <div>
      <Select
        value={dataType}
        onChange={handleTypeChange}
        options={selectDialogueDataTypeOptions}
      />
      <ComponentDialogueDataInput value={value} onChange={onChange} />
    </div>
  );
}

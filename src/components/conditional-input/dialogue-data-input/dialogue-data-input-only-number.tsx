import {
  DialogueDataType,
  type DialogueDataValue,
} from "../../../entities/dialogue-logic";
import { Select, type SelectOption } from "../../select/select";
import { DialogueDataIntergerInput } from "./types/dialogue-data-interger-input";

const dialogueDataValueDefault: {
  [T in DialogueDataType.INTERGER]: () => DialogueDataValue<T>;
} = {
  [DialogueDataType.INTERGER]: () => [DialogueDataType.INTERGER, 0],
};

type ComponentDialogueDataInputProps<
  T extends DialogueDataType = DialogueDataType,
> = {
  value: DialogueDataValue<T>;
  onChange(newValue: DialogueDataValue<T>): void;
};

type FunctionComponentDialogueDataInput<
  T extends DialogueDataType = DialogueDataType,
> = (props: ComponentDialogueDataInputProps<T>) => React.JSX.Element;

const allComponentDialogueDataInput: {
  [T in DialogueDataType.INTERGER]: FunctionComponentDialogueDataInput<T>;
} = {
  [DialogueDataType.INTERGER]: DialogueDataIntergerInput,
};

const allDialogueDataTypeOptions = [DialogueDataType.INTERGER];

const selectDialogueDataTypeOptions: SelectOption<DialogueDataType>[] =
  allDialogueDataTypeOptions.map((record) => ({
    value: record,
    label: record,
  }));

type DialogueDataInputProps<T extends DialogueDataType = DialogueDataType> = {
  value: DialogueDataValue<T>;
  onChange: (newValue: DialogueDataValue) => void;
};

export function DialogueDataInputOnlyNumber({
  value,
  onChange,
}: DialogueDataInputProps<DialogueDataType.INTERGER>) {
  const dataType = value[0];
  const ComponentDialogueDataInput = allComponentDialogueDataInput[
    dataType
  ] as FunctionComponentDialogueDataInput<DialogueDataType.INTERGER>;

  const handleTypeChange = (newType: DialogueDataType.INTERGER) => {
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

import {
  DialogueDataType,
  DialogueVarType,
  type DialogueSourceData,
  type DialogueSourceDataType,
} from "../../../entities/dialogue-logic";
import { Select, type SelectOption } from "../../select/select";
import { DialogueVarCharacterInput } from "../dialogue-var-input/types/dialogue-var-character-input";
import { DialogueVarGameInput } from "../dialogue-var-input/types/dialogue-var-game-input";
import { DialogueDataBooleanInput } from "../dialogue-data-input/types/dialogue-data-boolean-input";
import { DialogueDataIntergerInput } from "../dialogue-data-input/types/dialogue-data-interger-input";
import { DialogueDataStringInput } from "../dialogue-data-input/types/dialogue-data-string-input";

const dialogueSourceDataValueDefault: {
  [T in DialogueSourceDataType]: () => DialogueSourceData<T>;
} = {
  [DialogueDataType.INTERGER]: () => [DialogueDataType.INTERGER, 0],
  [DialogueDataType.STRING]: () => [DialogueDataType.STRING, ""],
  [DialogueDataType.BOOLEAN]: () => [DialogueDataType.BOOLEAN, true],

  [DialogueVarType.VAR_CHARACTER]: () => [
    DialogueVarType.VAR_CHARACTER,
    null,
    null,
  ],
  [DialogueVarType.VAR_GAME]: () => [DialogueVarType.VAR_GAME, null],
};

type ComponentDialogueSourceDataInputProps<
  T extends DialogueSourceDataType = DialogueSourceDataType
> = {
  value: DialogueSourceData<T>;
  onChange(newValue: DialogueSourceData<T>): void;
};

type FunctionComponentDialogueSourceDataInput<
  T extends DialogueSourceDataType = DialogueSourceDataType
> = (props: ComponentDialogueSourceDataInputProps<T>) => React.JSX.Element;

const allComponentDialogueSourceDataInput: {
  [T in DialogueSourceDataType]: FunctionComponentDialogueSourceDataInput<T>;
} = {
  [DialogueDataType.INTERGER]: DialogueDataIntergerInput,
  [DialogueDataType.STRING]: DialogueDataStringInput,
  [DialogueDataType.BOOLEAN]: DialogueDataBooleanInput,

  [DialogueVarType.VAR_CHARACTER]: DialogueVarCharacterInput,
  [DialogueVarType.VAR_GAME]: DialogueVarGameInput,
};

const allDialogueSourceDataTypeOptions = [
  /// DialogueDataType
  DialogueDataType.INTERGER,
  DialogueDataType.STRING,
  DialogueDataType.BOOLEAN,

  /// DialogueVarType
  DialogueVarType.VAR_CHARACTER,
  DialogueVarType.VAR_GAME,
];

const selectDialogueSourceDataTypeOptions: SelectOption<DialogueSourceDataType>[] =
  allDialogueSourceDataTypeOptions.map((record) => ({
    value: record,
    label: record,
  }));

type DialogueSourceDataInputProps<
  T extends DialogueSourceDataType = DialogueSourceDataType
> = {
  value: DialogueSourceData<T>;
  onChange: (newValue: DialogueSourceData) => void;
};

export function DialogueSourceDataInput<
  T extends DialogueSourceDataType = DialogueSourceDataType
>({ value, onChange }: DialogueSourceDataInputProps<T>) {
  const dataType = value[0];
  const ComponentDialogueSourceDataInput = allComponentDialogueSourceDataInput[
    dataType
  ] as FunctionComponentDialogueSourceDataInput<T>;

  const handleTypeChange = (newType: DialogueSourceDataType) => {
    const getValueDefault = dialogueSourceDataValueDefault[newType];
    const newValue = getValueDefault();
    onChange(newValue);
  };

  return (
    <div>
      <Select
        value={dataType}
        onChange={handleTypeChange}
        options={selectDialogueSourceDataTypeOptions}
      />

      <ComponentDialogueSourceDataInput value={value} onChange={onChange} />
    </div>
  );
}

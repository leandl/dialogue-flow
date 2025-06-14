import {
  DialogueVarType,
  type DialogueVarValue,
} from "../../../entities/dialogue-logic";
import { Select, type SelectOption } from "../../select/select";
import { DialogueVarCharacterInput } from "../dialogue-var-input/types/dialogue-var-character-input";
import { DialogueVarGameInput } from "./types/dialogue-var-game-input";

const dialogueVarValueDefault: {
  [T in DialogueVarType]: () => DialogueVarValue<T>;
} = {
  [DialogueVarType.VAR_CHARACTER]: () => [
    DialogueVarType.VAR_CHARACTER,
    null,
    null,
  ],
  [DialogueVarType.VAR_GAME]: () => [DialogueVarType.VAR_GAME, null],
};

type ComponentDialogueVarInputProps<
  T extends DialogueVarType = DialogueVarType
> = {
  value: DialogueVarValue<T>;
  onChange(newValue: DialogueVarValue<T>): void;
};

type FunctionComponentDialogueVarInput<
  T extends DialogueVarType = DialogueVarType
> = (props: ComponentDialogueVarInputProps<T>) => React.JSX.Element;

const allComponentDialogueVarInput: {
  [T in DialogueVarType]: FunctionComponentDialogueVarInput<T>;
} = {
  [DialogueVarType.VAR_CHARACTER]: DialogueVarCharacterInput,
  [DialogueVarType.VAR_GAME]: DialogueVarGameInput,
};

const allDialogueVarTypeOptions = [
  DialogueVarType.VAR_CHARACTER,
  DialogueVarType.VAR_GAME,
];

const selectDialogueVarTypeOptions: SelectOption<DialogueVarType>[] =
  allDialogueVarTypeOptions.map((record) => ({
    value: record,
    label: record,
  }));

type DialogueVarInputProps<T extends DialogueVarType = DialogueVarType> = {
  value: DialogueVarValue<T>;
  onChange: (newValue: DialogueVarValue) => void;
};

export function DialogueVarInput<T extends DialogueVarType = DialogueVarType>({
  value,
  onChange,
}: DialogueVarInputProps<T>) {
  const dataType = value[0];
  const ComponentDialogueVarInput = allComponentDialogueVarInput[
    dataType
  ] as FunctionComponentDialogueVarInput<T>;

  const handleTypeChange = (newType: DialogueVarType) => {
    const getValueDefault = dialogueVarValueDefault[newType];
    const newValue = getValueDefault();
    onChange(newValue);
  };

  return (
    <div>
      <Select
        value={dataType}
        onChange={handleTypeChange}
        options={selectDialogueVarTypeOptions}
      />
      <ComponentDialogueVarInput value={value} onChange={onChange} />
    </div>
  );
}

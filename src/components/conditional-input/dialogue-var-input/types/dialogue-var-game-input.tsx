import { useCallback } from "react";
import {
  DialogueVarType,
  type DialogueVarValue,
} from "../../../../entities/dialogue-logic";
import { Select } from "../../../select/select";
import { useDialogueFlow } from "../../../../hooks/useDialogueFlow";

type DialogueVarGameInputProps = {
  value: DialogueVarValue<DialogueVarType.VAR_GAME>;
  onChange(val: DialogueVarValue<DialogueVarType.VAR_GAME>): void;
};

export function DialogueVarGameInput({
  value,
  onChange,
}: DialogueVarGameInputProps) {
  const { selectVarGameOptions } = useDialogueFlow();

  const handleOnChange = useCallback(
    (newValue: string) => onChange([DialogueVarType.VAR_GAME, newValue]),
    [onChange],
  );

  return (
    <Select
      value={value[1]}
      onChange={handleOnChange}
      options={selectVarGameOptions}
    />
  );
}

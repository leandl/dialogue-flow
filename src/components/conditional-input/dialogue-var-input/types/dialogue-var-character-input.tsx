import { useCallback } from "react";
import {
  DialogueVarType,
  type DialogueVarValue,
} from "../../../../entities/dialogue-logic";
import { Select } from "../../../select/select";
import { useDialogueFlow } from "../../../../hooks/useDialogueFlow";

type DialogueVarCharacterInputProps = {
  value: DialogueVarValue<DialogueVarType.VAR_CHARACTER>;
  onChange(val: DialogueVarValue<DialogueVarType.VAR_CHARACTER>): void;
};

export function DialogueVarCharacterInput({
  value,
  onChange,
}: DialogueVarCharacterInputProps) {
  const [, character, varName] = value;
  const { selectVarCharacterOptions, selectCharacterOptions } =
    useDialogueFlow();

  const handleOnChangeCharacter = useCallback(
    (newValueCharacter: string) =>
      onChange([DialogueVarType.VAR_CHARACTER, newValueCharacter, varName]),
    [onChange, varName]
  );

  const handleOnChangeVarName = useCallback(
    (newValueVarName: string) =>
      onChange([DialogueVarType.VAR_CHARACTER, character, newValueVarName]),
    [onChange, character]
  );

  return (
    <>
      <Select
        value={character}
        onChange={handleOnChangeCharacter}
        options={selectCharacterOptions}
      />

      <Select
        value={varName}
        onChange={handleOnChangeVarName}
        options={selectVarCharacterOptions}
      />
    </>
  );
}

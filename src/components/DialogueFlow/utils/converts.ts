import type { DialogueNodeFlowType } from "../../../entities/dialogue-node-flow";
import type { DialogueNodeFlowSelectOption } from "../dialogue-node-flow/dialogue-node-flow-select";

export function convertCharacterToSelectOption(
  value: string,
): DialogueNodeFlowSelectOption<string> {
  return {
    label: value,
    value: value,
  };
}

export function convertDialogueTypeToSelectOption<
  T extends DialogueNodeFlowType,
>(value: T): DialogueNodeFlowSelectOption<T> {
  return {
    label: value,
    value: value,
  };
}

export function convertVarGameToSelectOption<T extends string>(
  value: T,
): DialogueNodeFlowSelectOption<T> {
  return {
    label: value.toUpperCase(),
    value: value,
  };
}

export function convertVarCharacterToSelectOption<T extends string>(
  value: T,
): DialogueNodeFlowSelectOption<T> {
  return {
    label: value.toUpperCase(),
    value: value,
  };
}

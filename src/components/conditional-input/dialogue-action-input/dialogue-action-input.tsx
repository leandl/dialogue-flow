import { useCallback } from "react";
import {
  DialogueActionType,
  type DialogueAction,
  DialogueDataType,
  type DialogueVarValue,
  type DialogueDataValue,
} from "../../../entities/dialogue-logic";
import { Select, type SelectOption } from "../../select/select";
import { DialogueVarInput } from "../dialogue-var-input/dialogue-var-input";
import { DialogueDataInput } from "../dialogue-data-input/dialogue-data-input";
import { DialogueDataInputOnlyNumber } from "../dialogue-data-input/dialogue-data-input-only-number";

type DialogueActionInputProps = {
  value: DialogueAction;
  onChange: (val: DialogueAction) => void;
};

const actions: Record<DialogueActionType, string> = {
  [DialogueActionType.SET]: "=",
  [DialogueActionType.INCREMENT]: "+=",
  [DialogueActionType.DECREMENT]: "-=",
};

const selectActionOptions: SelectOption<DialogueActionType>[] = Object.entries(
  actions
).map(([action, label]) => ({
  value: action as DialogueActionType,
  label: label,
}));

export function DialogueActionInput({
  value,
  onChange,
}: DialogueActionInputProps) {
  const [action, varAction, valueAction] = value;

  const handleActionChange = useCallback(
    (newAction: DialogueActionType) => {
      if (newAction === DialogueActionType.SET) {
        onChange([DialogueActionType.SET, varAction, valueAction]);
      } else {
        onChange([newAction, varAction, [DialogueDataType.INTERGER, 0]]);
      }
    },
    [onChange, varAction, valueAction]
  );

  const handleVarActionChange = useCallback(
    (newVarAction: DialogueVarValue) => {
      if (action === DialogueActionType.SET) {
        onChange([action, newVarAction, valueAction]);
      } else {
        onChange([action, newVarAction, valueAction]);
      }
    },
    [onChange, action, valueAction]
  );

  const handleValueActionChange = useCallback(
    (newValueAction: DialogueDataValue) => {
      if (action === DialogueActionType.SET) {
        onChange([action, varAction, newValueAction]);
      } else {
        if (newValueAction[0] === DialogueDataType.INTERGER) {
          onChange([action, varAction, newValueAction]);
        }
      }
    },
    [onChange, action, varAction]
  );

  return (
    <div>
      <DialogueVarInput value={varAction} onChange={handleVarActionChange} />
      <Select
        value={action}
        onChange={handleActionChange}
        options={selectActionOptions}
      />
      {action === DialogueActionType.SET ? (
        <DialogueDataInput
          value={valueAction}
          onChange={handleValueActionChange}
        />
      ) : (
        <DialogueDataInputOnlyNumber
          value={valueAction}
          onChange={handleValueActionChange}
        />
      )}
    </div>
  );
}

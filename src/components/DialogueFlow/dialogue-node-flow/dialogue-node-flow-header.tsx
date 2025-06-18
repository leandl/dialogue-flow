import { useCallback, type ReactNode } from "react";
import { DialogueNodeFlowSelect } from "./dialogue-node-flow-select";
import { useDialogueFlow } from "../../../hooks/useDialogueFlow";
import type { DialogueNodeFlowType } from "../../../entities/dialogue-node-flow";
import { DialogueNodeFlowEventType } from "../../../entities/dialogue-node-flow-event";

type DialogueNodeFlowHeaderProps = {
  dialogId: string;
  dialogueType: string;

  children?: ReactNode;
};

export function DialogueNodeFlowHeader({
  dialogId,
  dialogueType,
  children,
}: DialogueNodeFlowHeaderProps) {
  const { notifyNodeDialogueFlowEvent, selectDialogueTypeOptions } =
    useDialogueFlow();

  const handleChangeType = useCallback(
    (dialogueType: DialogueNodeFlowType) =>
      notifyNodeDialogueFlowEvent({
        dialogueId: dialogId,
        type: DialogueNodeFlowEventType.CHANGE_DIALOGUE_TYPE,
        dialogueType: dialogueType,
      }),
    [notifyNodeDialogueFlowEvent, dialogId],
  );

  return (
    <div className="dialogue-node-flow-header">
      <DialogueNodeFlowSelect
        value={dialogueType}
        onChange={handleChangeType}
        options={selectDialogueTypeOptions}
      />
      {children}
    </div>
  );
}

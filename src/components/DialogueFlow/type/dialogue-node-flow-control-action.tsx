import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { DialogueNodeFlowControlAction as DialogueNodeFlowControlActionEntity } from "../../../entities/dialogue-node-flow";
import { DialogueNodeFlow } from "../dialogue-node-flow";
import { DialogueActionInput } from "../../conditional-input/dialogue-action-input/dialogue-action-input";
import { useDialogueFlow } from "../../../hooks/useDialogueFlow";
import { useCallback } from "react";
import {
  DialogueNodeFlowEventType,
  UniqueDataType,
} from "../../../entities/dialogue-node-flow-event";
import type { DialogueAction } from "../../../entities/dialogue-logic";

type DialogueNodeFlowControlAction = NodeProps & {
  data: DialogueNodeFlowControlActionEntity;
};

export function DialogueNodeFlowControlAction({
  data,
  isConnectable,
}: DialogueNodeFlowControlAction) {
  const { notifyNodeDialogueFlowEvent } = useDialogueFlow();

  const handleChangeAction = useCallback(
    (action: DialogueAction) =>
      notifyNodeDialogueFlowEvent({
        dialogueId: data.id,
        type: DialogueNodeFlowEventType.CHANGE_DIALOGUE_UNIQUE_DATA,
        uniqueDataType: UniqueDataType.ACTION,
        data: {
          action,
        },
      }),
    [notifyNodeDialogueFlowEvent, data.id]
  );

  return (
    <DialogueNodeFlow.Container id={data.id} targetId={data.targetId}>
      <DialogueNodeFlow.Header dialogId={data.id} dialogueType={data.type} />
      <DialogueActionInput value={data.action} onChange={handleChangeAction} />
      <Handle
        id={data.sourceId}
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </DialogueNodeFlow.Container>
  );
}

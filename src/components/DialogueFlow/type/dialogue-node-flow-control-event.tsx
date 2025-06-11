import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { DialogueNodeFlowControlEvent as DialogueNodeFlowControlEventEntity } from "../../../entities/dialogue-node-flow";
import { DialogueNodeFlow } from "../dialogue-node-flow";
import { useDialogueFlow } from "../../../hooks/useDialogueFlow";
import { useCallback } from "react";
import { DialogueNodeFlowEventType } from "../../../entities/dialogue-node-flow-event";

type DialogueNodeFlowControlEvent = NodeProps & {
  data: DialogueNodeFlowControlEventEntity;
};

export function DialogueNodeFlowControlEvent({
  data,
  isConnectable,
}: DialogueNodeFlowControlEvent) {
  const { notifyNodeDialogueFlowEvent } = useDialogueFlow();

  const handleChangeEventName = useCallback(
    (eventName: string) =>
      notifyNodeDialogueFlowEvent({
        dialogueId: data.id,
        type: DialogueNodeFlowEventType.CHANGE_DIALOGUE_EVENT_NAME,
        eventName,
      }),
    [notifyNodeDialogueFlowEvent, data.id]
  );

  return (
    <DialogueNodeFlow.Container id={data.id} targetId={data.targetId}>
      <DialogueNodeFlow.Header dialogId={data.id} dialogueType={data.type} />
      <DialogueNodeFlow.Input
        type="INPUT"
        value={data.eventName}
        onChange={handleChangeEventName}
      />
      <Handle
        id={data.sourceId}
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </DialogueNodeFlow.Container>
  );
}

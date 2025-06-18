import { Handle, Position, type NodeProps } from "@xyflow/react";
import type {
  DialogueNodeFlowControlRandom as DialogueNodeFlowControlRandomEntity,
  NodeFlowSubSourceId,
} from "../../../entities/dialogue-node-flow";
import { DialogueNodeFlow } from "../dialogue-node-flow";
import { useCallback } from "react";
import { useDialogueFlow } from "../../../hooks/useDialogueFlow";
import { DialogueNodeFlowEventType } from "../../../entities/dialogue-node-flow-event";

type DialogueNodeFlowControlRandom = NodeProps & {
  data: DialogueNodeFlowControlRandomEntity;
};

export function DialogueNodeFlowControlRandom({
  data,
}: DialogueNodeFlowControlRandom) {
  const { notifyNodeDialogueFlowEvent } = useDialogueFlow();

  const handleAddOption = useCallback(
    () =>
      notifyNodeDialogueFlowEvent({
        dialogueId: data.id,
        type: DialogueNodeFlowEventType.ADD_OPTION_IN_DIALOGUE_CARD,
      }),
    [notifyNodeDialogueFlowEvent, data.id],
  );

  const handleRemoveOption = useCallback(
    (sourceId: NodeFlowSubSourceId, index: number) =>
      notifyNodeDialogueFlowEvent({
        dialogueId: data.id,
        type: DialogueNodeFlowEventType.REMOVE_OPTION_IN_DIALOGUE_CARD,
        sourceId,
        index,
      }),
    [notifyNodeDialogueFlowEvent, data.id],
  );

  return (
    <DialogueNodeFlow.Container id={data.id} targetId={data.targetId}>
      <DialogueNodeFlow.Header dialogId={data.id} dialogueType={data.type} />

      <div className="dialogue-node-flow-control-random-add-option">
        <button onClick={handleAddOption}>Add Option</button>
      </div>
      <div className="dialogue-node-flow-control-random-content">
        {data.nexts.map((nextOption, index) => (
          <div
            className="dialogue-node-flow-control-random-option"
            key={nextOption.sourceId}
          >
            Option {index + 1}
            <div className="dialogue-node-flow-control-random-option-remove">
              <button
                onClick={() => handleRemoveOption(nextOption.sourceId, index)}
              >
                x
              </button>
            </div>
            <Handle
              id={nextOption.sourceId}
              type="source"
              position={Position.Right}
            />
          </div>
        ))}
      </div>
    </DialogueNodeFlow.Container>
  );
}

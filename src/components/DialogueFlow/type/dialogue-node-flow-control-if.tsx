import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { DialogueNodeFlowControlIF as DialogueNodeFlowControlIFEntity } from "../../../entities/dialogue-node-flow";
import { DialogueNodeFlow } from "../dialogue-node-flow";
import { DialogueOperatorComparatorInput } from "../../conditional-input/dialogue-operator-input/types/dialogue-operator-comparator-input";
import { useDialogueFlow } from "../../../hooks/useDialogueFlow";
import { useCallback } from "react";
import type { DialogueOperator } from "../../../entities/dialogue-logic";
import {
  DialogueNodeFlowEventType,
  UniqueDataType,
} from "../../../entities/dialogue-node-flow-event";

type DialogueNodeFlowControlIF = NodeProps & {
  data: DialogueNodeFlowControlIFEntity;
};

export function DialogueNodeFlowControlIF({ data }: DialogueNodeFlowControlIF) {
  const { notifyNodeDialogueFlowEvent } = useDialogueFlow();

  const handleChangeCondition = useCallback(
    (condition: DialogueOperator) =>
      notifyNodeDialogueFlowEvent({
        type: DialogueNodeFlowEventType.CHANGE_DIALOGUE_UNIQUE_DATA,
        dialogueId: data.id,
        uniqueDataType: UniqueDataType.CONDITION,
        data: {
          condition,
        },
      }),
    [data.id, notifyNodeDialogueFlowEvent]
  );

  return (
    <DialogueNodeFlow.Container id={data.id} targetId={data.targetId}>
      <DialogueNodeFlow.Header dialogId={data.id} dialogueType={data.type} />
      <DialogueOperatorComparatorInput
        value={data.condition}
        onChange={handleChangeCondition}
      />

      <div className="dialogue-node-flow-control-random-content">
        <div className="dialogue-node-flow-control-random-option">
          TRUE
          <Handle
            id={data.next.sourceTrueId}
            type="source"
            position={Position.Right}
          />
        </div>
        <div className="dialogue-node-flow-control-random-option">
          FALSE
          <Handle
            id={data.next.sourceFalseId}
            type="source"
            position={Position.Right}
          />
        </div>
      </div>
    </DialogueNodeFlow.Container>
  );
}

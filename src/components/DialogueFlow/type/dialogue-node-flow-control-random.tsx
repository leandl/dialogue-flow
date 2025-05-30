import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { DialogueNodeFlowControlRandom as DialogueNodeFlowControlRandomEntity } from "../../../entities/dialogue-node-flow";
import { DialogueNodeFlow } from "../dialogue-node-flow";

type DialogueNodeFlowControlRandom = NodeProps & {
  data: DialogueNodeFlowControlRandomEntity;
};

export function DialogueNodeFlowControlRandom({
  data,
}: DialogueNodeFlowControlRandom) {
  return (
    <DialogueNodeFlow.Container id={data.id} targetId={data.targetId}>
      <DialogueNodeFlow.Header dialogId={data.id} dialogueType={data.type} />

      <div className="dialogue-node-flow-control-random-content">
        {data.nexts.map((nextOption, index) => (
          <div
            className="dialogue-node-flow-control-random-option"
            key={nextOption.sourceId}
          >
            Option {index + 1}
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

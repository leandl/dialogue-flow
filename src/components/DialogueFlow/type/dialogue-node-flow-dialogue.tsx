import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { DialogueNodeFlowDialogue as DialogueNodeFlowDialogueEntity } from "../../../entities/dialogue-node-flow";
import { DialogueNodeFlow } from "../dialogue-node-flow";

type DialogueNodeFlowDialogue = NodeProps & {
  data: DialogueNodeFlowDialogueEntity;
};

export function DialogueNodeFlowDialogue({
  data,
  isConnectable,
}: DialogueNodeFlowDialogue) {
  return (
    <DialogueNodeFlow.Container id={data.id} targetId={data.targetId}>
      <DialogueNodeFlow.Header
        dialogueType={data.type}
        characterName={data.character}
      />

      <div>
        <div>{data.text}</div>
      </div>
      <Handle
        id={data.sourceId}
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </DialogueNodeFlow.Container>
  );
}

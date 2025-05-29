import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { DialogueNodeFlowChoice as DialogueNodeFlowChoiceEntity } from "../../../entities/dialogue-node-flow";
import { DialogueNodeFlow } from "../dialogue-node-flow";

type DialogueNodeFlowChoice = NodeProps & {
  data: DialogueNodeFlowChoiceEntity;
};

export function DialogueNodeFlowChoice({
  data,
  isConnectable,
}: DialogueNodeFlowChoice) {
  return (
    <DialogueNodeFlow.Container id={data.id} targetId={data.targetId}>
      <DialogueNodeFlow.Header
        dialogueType={data.type}
        characterName={data.character}
      />

      <div className="dialogue-node-flow-choice-content-message">
        {data.text}
      </div>
      <div className="dialogue-node-flow-choice-content-options">
        {data.choices.map((choice) => (
          <div
            className="dialogue-node-flow-choice-option"
            key={choice.sourceId}
          >
            {choice.text}
            <Handle
              id={choice.sourceId}
              type="source"
              position={Position.Right}
              isConnectable={isConnectable}
            />
          </div>
        ))}
      </div>
    </DialogueNodeFlow.Container>
  );
}

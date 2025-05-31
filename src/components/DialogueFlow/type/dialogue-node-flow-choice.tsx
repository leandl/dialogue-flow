import { Handle, Position, type NodeProps } from "@xyflow/react";
import type {
  DialogueNodeFlowChoice as DialogueNodeFlowChoiceEntity,
  NodeFlowSubSourceId,
} from "../../../entities/dialogue-node-flow";
import { DialogueNodeFlow } from "../dialogue-node-flow";
import { useCallback } from "react";
import { useDialogueFlow } from "../../../hooks/useDialogueFlow";
import { DialogueNodeFlowEventType } from "../../../entities/dialogue-node-flow-event";

type DialogueNodeFlowChoice = NodeProps & {
  data: DialogueNodeFlowChoiceEntity;
};

export function DialogueNodeFlowChoice({
  data,
  isConnectable,
}: DialogueNodeFlowChoice) {
  const { notifyNodeDialogueFlowEvent, allCharacters } = useDialogueFlow();

  const handleChangeText = useCallback(
    (text: string) =>
      notifyNodeDialogueFlowEvent({
        dialogueId: data.id,
        type: DialogueNodeFlowEventType.CHANGE_DIALOGUE_TEXT,
        text,
      }),
    [notifyNodeDialogueFlowEvent, data.id]
  );

  const handleChangeCharacter = useCallback(
    (character: string) =>
      notifyNodeDialogueFlowEvent({
        dialogueId: data.id,
        type: DialogueNodeFlowEventType.CHANGE_DIALOGUE_CHARACTER,
        character,
      }),
    [notifyNodeDialogueFlowEvent, data.id]
  );

  const handleAddOption = useCallback(
    () =>
      notifyNodeDialogueFlowEvent({
        dialogueId: data.id,
        type: DialogueNodeFlowEventType.ADD_OPTION_IN_DIALOGUE_CARD,
      }),
    [notifyNodeDialogueFlowEvent, data.id]
  );

  const handleRemoveOption = useCallback(
    (sourceId: NodeFlowSubSourceId, index: number) =>
      notifyNodeDialogueFlowEvent({
        dialogueId: data.id,
        type: DialogueNodeFlowEventType.REMOVE_OPTION_IN_DIALOGUE_CARD,
        sourceId,
        index,
      }),
    [notifyNodeDialogueFlowEvent, data.id]
  );

  return (
    <DialogueNodeFlow.Container id={data.id} targetId={data.targetId}>
      <DialogueNodeFlow.Header dialogId={data.id} dialogueType={data.type}>
        <DialogueNodeFlow.Select
          clasName="right"
          value={data.character}
          onChange={handleChangeCharacter}
          options={allCharacters}
        />
      </DialogueNodeFlow.Header>

      <div className="dialogue-node-flow-choice-content-message">
        <DialogueNodeFlow.Input value={data.text} onChange={handleChangeText} />
      </div>
      <div className="dialogue-node-flow-choice-content-options">
        <button onClick={handleAddOption}>Add Choice</button>
        {data.choices.map((choice, index) => (
          <div
            className="dialogue-node-flow-choice-option"
            key={choice.sourceId}
          >
            <textarea value={choice.text} />
            <button onClick={() => handleRemoveOption(choice.sourceId, index)}>
              remove
            </button>
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

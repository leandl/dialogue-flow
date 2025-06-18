import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { DialogueNodeFlowDialogue as DialogueNodeFlowDialogueEntity } from "../../../entities/dialogue-node-flow";
import { DialogueNodeFlow } from "../dialogue-node-flow";
import { useDialogueFlow } from "../../../hooks/useDialogueFlow";
import { useCallback } from "react";
import { DialogueNodeFlowEventType } from "../../../entities/dialogue-node-flow-event";

type DialogueNodeFlowDialogue = NodeProps & {
  data: DialogueNodeFlowDialogueEntity;
};

export function DialogueNodeFlowDialogue({
  data,
  isConnectable,
}: DialogueNodeFlowDialogue) {
  const { notifyNodeDialogueFlowEvent, selectCharacterOptions } =
    useDialogueFlow();

  const handleChangeText = useCallback(
    (text: string) =>
      notifyNodeDialogueFlowEvent({
        dialogueId: data.id,
        type: DialogueNodeFlowEventType.CHANGE_DIALOGUE_TEXT,
        text,
      }),
    [notifyNodeDialogueFlowEvent, data.id],
  );

  const handleChangeCharacter = useCallback(
    (character: string) =>
      notifyNodeDialogueFlowEvent({
        dialogueId: data.id,
        type: DialogueNodeFlowEventType.CHANGE_DIALOGUE_CHARACTER,
        character,
      }),
    [notifyNodeDialogueFlowEvent, data.id],
  );

  return (
    <DialogueNodeFlow.Container id={data.id} targetId={data.targetId}>
      <DialogueNodeFlow.Header dialogId={data.id} dialogueType={data.type}>
        <DialogueNodeFlow.Select
          className="right"
          value={data.character}
          onChange={handleChangeCharacter}
          options={selectCharacterOptions}
        />
      </DialogueNodeFlow.Header>

      <DialogueNodeFlow.Input
        type="TEXTAREA"
        value={data.text}
        onChange={handleChangeText}
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

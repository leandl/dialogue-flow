import type { NodeProps } from "@xyflow/react";
import type { DialogueNodeFlowVoiceOver as DialogueNodeFlowVoiceOverEntity } from "../../../entities/dialogue-node-flow";
import { DialogueNodeFlow } from "../dialogue-node-flow";
import { useCallback } from "react";
import { useDialogueFlow } from "../../../hooks/useDialogueFlow";
import { DialogueNodeFlowEventType } from "../../../entities/dialogue-node-flow-event";

type DialogueNodeFlowVoiceOver = NodeProps & {
  data: DialogueNodeFlowVoiceOverEntity;
};

export function DialogueNodeFlowVoiceOver({ data }: DialogueNodeFlowVoiceOver) {
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
          value={data.content.character}
          onChange={handleChangeCharacter}
          options={selectCharacterOptions}
        />
      </DialogueNodeFlow.Header>

      <DialogueNodeFlow.Input
        type="TEXTAREA"
        value={data.content.text}
        onChange={handleChangeText}
      />
    </DialogueNodeFlow.Container>
  );
}

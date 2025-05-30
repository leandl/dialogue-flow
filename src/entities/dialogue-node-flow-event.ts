import type { DialogueNodeFlowType } from "./dialogue-node-flow";

export enum DialogueNodeFlowEventType {
  MOVE_DIALOGUE_CARD = "MOVE_DIALOGUE_CARD",
  DIMENSION_DIALOGUE_CARD = "DIMENSION_DIALOGUE_CARD",
  CHANGE_DIALOGUE_TEXT = "CHANGE_DIALOGUE_TEXT",
  CHANGE_DIALOGUE_CHARACTER = "CHANGE_DIALOGUE_CHARACTER",
  CHANGE_DIALOGUE_TYPE = "CHANGE_DIALOGUE_TYPE",
}

type DialogueNodeFlowEventMoveDialogueCard = {
  dialogueId: string;
  type: DialogueNodeFlowEventType.MOVE_DIALOGUE_CARD;
  dragging?: boolean;
  position: {
    x: number;
    y: number;
  };
};

type DialogueNodeFlowEventDimensionDialogueCard = {
  dialogueId: string;
  type: DialogueNodeFlowEventType.DIMENSION_DIALOGUE_CARD;
  dimensions: { width: number; height: number };
};

type DialogueNodeFlowEventChangeDialogueText = {
  dialogueId: string;
  type: DialogueNodeFlowEventType.CHANGE_DIALOGUE_TEXT;
  text: string;
};

type DialogueNodeFlowEventChangeDialogueCharacter = {
  dialogueId: string;
  type: DialogueNodeFlowEventType.CHANGE_DIALOGUE_CHARACTER;
  character: string;
};

type DialogueNodeFlowEventChangeDialogueType = {
  dialogueId: string;
  type: DialogueNodeFlowEventType.CHANGE_DIALOGUE_TYPE;
  dialogueType: DialogueNodeFlowType;
};

type DialogueNodeFlowEventByType = {
  /// ReactFlow
  [DialogueNodeFlowEventType.MOVE_DIALOGUE_CARD]: DialogueNodeFlowEventMoveDialogueCard;
  [DialogueNodeFlowEventType.DIMENSION_DIALOGUE_CARD]: DialogueNodeFlowEventDimensionDialogueCard;

  // Dialogue
  [DialogueNodeFlowEventType.CHANGE_DIALOGUE_CHARACTER]: DialogueNodeFlowEventChangeDialogueCharacter;
  [DialogueNodeFlowEventType.CHANGE_DIALOGUE_TEXT]: DialogueNodeFlowEventChangeDialogueText;
  [DialogueNodeFlowEventType.CHANGE_DIALOGUE_TYPE]: DialogueNodeFlowEventChangeDialogueType;
};

export type DialogueNodeFlowEvent<
  T extends DialogueNodeFlowEventType = DialogueNodeFlowEventType
> = DialogueNodeFlowEventByType[T];

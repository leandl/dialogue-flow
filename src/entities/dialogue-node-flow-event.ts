import type {
  DialogueNodeFlowType,
  NodeFlowSourceId,
  NodeFlowSubSourceId,
  NodeFlowTargetId,
} from "./dialogue-node-flow";

export enum DialogueNodeFlowEventType {
  // ReactFlow
  MOVE_DIALOGUE_CARD = "MOVE_DIALOGUE_CARD",
  DIMENSION_DIALOGUE_CARD = "DIMENSION_DIALOGUE_CARD",
  CONNECTION_DIALOGUE_CARD = "CONNECTION_DIALOGUE_CARD",

  CHANGE_DIALOGUE_TEXT = "CHANGE_DIALOGUE_TEXT",
  CHANGE_DIALOGUE_CHARACTER = "CHANGE_DIALOGUE_CHARACTER",
  CHANGE_DIALOGUE_TYPE = "CHANGE_DIALOGUE_TYPE",
}

type DialogueNodeFlowEventMoveDialogueCard = {
  type: DialogueNodeFlowEventType.MOVE_DIALOGUE_CARD;
  dialogueId: string;
  dragging?: boolean;
  position: {
    x: number;
    y: number;
  };
};

type DialogueNodeFlowEventDimensionDialogueCard = {
  type: DialogueNodeFlowEventType.DIMENSION_DIALOGUE_CARD;
  dialogueId: string;
  dimensions: { width: number; height: number };
};

type DialogueNodeFlowEventConnectionDialogueCard = {
  type: DialogueNodeFlowEventType.CONNECTION_DIALOGUE_CARD;
  from: string;
  sourceId: NodeFlowSourceId | NodeFlowSubSourceId;

  to: string;
  targetId: NodeFlowTargetId;
};

type DialogueNodeFlowEventChangeDialogueText = {
  dialogueId: string;
  type: DialogueNodeFlowEventType.CHANGE_DIALOGUE_TEXT;
  text: string;
};

type DialogueNodeFlowEventChangeDialogueCharacter = {
  type: DialogueNodeFlowEventType.CHANGE_DIALOGUE_CHARACTER;
  dialogueId: string;
  character: string;
};

type DialogueNodeFlowEventChangeDialogueType = {
  type: DialogueNodeFlowEventType.CHANGE_DIALOGUE_TYPE;
  dialogueId: string;
  dialogueType: DialogueNodeFlowType;
};

type DialogueNodeFlowEventByType = {
  /// ReactFlow
  [DialogueNodeFlowEventType.MOVE_DIALOGUE_CARD]: DialogueNodeFlowEventMoveDialogueCard;
  [DialogueNodeFlowEventType.DIMENSION_DIALOGUE_CARD]: DialogueNodeFlowEventDimensionDialogueCard;
  [DialogueNodeFlowEventType.CONNECTION_DIALOGUE_CARD]: DialogueNodeFlowEventConnectionDialogueCard;

  // Dialogue
  [DialogueNodeFlowEventType.CHANGE_DIALOGUE_CHARACTER]: DialogueNodeFlowEventChangeDialogueCharacter;
  [DialogueNodeFlowEventType.CHANGE_DIALOGUE_TEXT]: DialogueNodeFlowEventChangeDialogueText;
  [DialogueNodeFlowEventType.CHANGE_DIALOGUE_TYPE]: DialogueNodeFlowEventChangeDialogueType;
};

export type DialogueNodeFlowEvent<
  T extends DialogueNodeFlowEventType = DialogueNodeFlowEventType
> = DialogueNodeFlowEventByType[T];

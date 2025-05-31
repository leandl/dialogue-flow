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

  ADD_DIALOGUE_CARD = "ADD_DIALOGUE_CARD",
  CHANGE_DIALOGUE_TEXT = "CHANGE_DIALOGUE_TEXT",
  CHANGE_DIALOGUE_CHARACTER = "CHANGE_DIALOGUE_CHARACTER",
  CHANGE_DIALOGUE_TYPE = "CHANGE_DIALOGUE_TYPE",

  ADD_OPTION_IN_DIALOGUE_CARD = "ADD_OPTION_IN_DIALOGUE_CARD",
  REMOVE_OPTION_IN_DIALOGUE_CARD = "REMOVE_OPTION_IN_DIALOGUE_CARD",
  CHANGE_OPTION_TEXT_IN_DIALOGUE_CARD = "CHANGE_OPTION_TEXT_IN_DIALOGUE_CARD",
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

type DialogueNodeFlowEventAddDialogueCard = {
  type: DialogueNodeFlowEventType.ADD_DIALOGUE_CARD;
  position: {
    x: number;
    y: number;
  };
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

type DialogueNodeFlowEventAddOptionInDialogueCard = {
  type: DialogueNodeFlowEventType.ADD_OPTION_IN_DIALOGUE_CARD;
  dialogueId: string;
};

type DialogueNodeFlowEventRemoveOptionInDialogueCard = {
  type: DialogueNodeFlowEventType.REMOVE_OPTION_IN_DIALOGUE_CARD;
  dialogueId: string;
  sourceId: NodeFlowSubSourceId;
  index: number;
};

type DialogueNodeFlowEventChangeOptionTextInDialogueCard = {
  dialogueId: string;
  type: DialogueNodeFlowEventType.CHANGE_OPTION_TEXT_IN_DIALOGUE_CARD;
  sourceId: NodeFlowSubSourceId;
  index: number;
  text: string;
};

type DialogueNodeFlowEventByType = {
  /// ReactFlow
  [DialogueNodeFlowEventType.MOVE_DIALOGUE_CARD]: DialogueNodeFlowEventMoveDialogueCard;
  [DialogueNodeFlowEventType.DIMENSION_DIALOGUE_CARD]: DialogueNodeFlowEventDimensionDialogueCard;
  [DialogueNodeFlowEventType.CONNECTION_DIALOGUE_CARD]: DialogueNodeFlowEventConnectionDialogueCard;

  // Dialogue
  [DialogueNodeFlowEventType.ADD_DIALOGUE_CARD]: DialogueNodeFlowEventAddDialogueCard;
  [DialogueNodeFlowEventType.CHANGE_DIALOGUE_TYPE]: DialogueNodeFlowEventChangeDialogueType;
  [DialogueNodeFlowEventType.CHANGE_DIALOGUE_TEXT]: DialogueNodeFlowEventChangeDialogueText;
  [DialogueNodeFlowEventType.CHANGE_DIALOGUE_CHARACTER]: DialogueNodeFlowEventChangeDialogueCharacter;

  [DialogueNodeFlowEventType.ADD_OPTION_IN_DIALOGUE_CARD]: DialogueNodeFlowEventAddOptionInDialogueCard;
  [DialogueNodeFlowEventType.REMOVE_OPTION_IN_DIALOGUE_CARD]: DialogueNodeFlowEventRemoveOptionInDialogueCard;
  [DialogueNodeFlowEventType.CHANGE_OPTION_TEXT_IN_DIALOGUE_CARD]: DialogueNodeFlowEventChangeOptionTextInDialogueCard;
};

export type DialogueNodeFlowEvent<
  T extends DialogueNodeFlowEventType = DialogueNodeFlowEventType
> = DialogueNodeFlowEventByType[T];

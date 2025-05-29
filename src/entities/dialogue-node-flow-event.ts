type DialogueNodeFlowEventMoveDialogueCard = {
  dialogueId: string;
  type: "MOVE_DIALOGUE_CARD";
  dragging?: boolean;
  position: {
    x: number;
    y: number;
  };
};

type DialogueNodeFlowEventDimensionDialogueCard = {
  dialogueId: string;
  type: "DIMENSION_DIALOGUE_CARD";
  dimensions: { width: number; height: number };
};

export type DialogueNodeFlowEvent =
  | DialogueNodeFlowEventMoveDialogueCard
  | DialogueNodeFlowEventDimensionDialogueCard;

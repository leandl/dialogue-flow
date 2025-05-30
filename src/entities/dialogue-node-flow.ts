export const allDialogueNodeFlowTypes = [
  "CONTROL.RANDOM",
  "DIALOGUE",
  "CHOICE",
] as const;

export type DialogueNodeFlowType = (typeof allDialogueNodeFlowTypes)[number];

export type NodeFlowTargetId = `target-${string}`;
export type NodeFlowSourceId = `source-${string}`;
export type NodeFlowSubSourceId = `sub-source-${string}-${number}`;
export type NodeFlowEdgeId = `edge-${
  | NodeFlowSourceId
  | NodeFlowSubSourceId}-${NodeFlowTargetId}`;

export type DialogueNodeFlowControlRandomOption = {
  sourceId: NodeFlowSubSourceId;
  next: string | null;
};

export type DialogueNodeFlowControlRandom = {
  id: string;
  targetId: NodeFlowTargetId;
  type: "CONTROL.RANDOM";
  nexts: DialogueNodeFlowControlRandomOption[];
};

export type DialogueNodeFlowDialogue = {
  id: string;
  targetId: NodeFlowTargetId;
  type: "DIALOGUE";
  character: string;
  text: string;
  sourceId: NodeFlowSourceId;
  next: string | null;
};

export type DialogueNodeFlowChoiceOption = {
  text: string;
  sourceId: NodeFlowSubSourceId;
  next: string | null;
};

export type DialogueNodeFlowChoice = {
  id: string;
  targetId: NodeFlowTargetId;
  type: "CHOICE";
  character: string;
  text: string;
  choices: DialogueNodeFlowChoiceOption[];
};

type DialogueNodeFlowByType = {
  CHOICE: DialogueNodeFlowChoice;
  DIALOGUE: DialogueNodeFlowDialogue;
  "CONTROL.RANDOM": DialogueNodeFlowControlRandom;
};

export type NodeFlow<T extends DialogueNodeFlowType = DialogueNodeFlowType> = {
  id: string;
  type: T;
  data: DialogueNodeFlowByType[T];
  dragging?: boolean;
  dragHandle: ".dialogue-node-flow-drag-handle";
  measured?: {
    width: number;
    height: number;
  };
  position: {
    x: number;
    y: number;
  };
};

export type EdgeFlow = {
  id: NodeFlowEdgeId;
  source: string;
  sourceHandle: NodeFlowSourceId | NodeFlowSubSourceId;
  target: string;
  targetHandle: NodeFlowTargetId;
};

export type DialogueNodeFlow<
  T extends DialogueNodeFlowType = DialogueNodeFlowType
> = NodeFlow<T>;

export type NodeFlowTargetId = `target-${string}`;
export type NodeFlowSourceId = `source-${string}`;
export type NodeFlowSubSourceId = `sub-source-${string}-${number}`;

export type NodeFlow<D> = {
  id: string;
  type: string;
  data: D;
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

export type NodeFlowEdgeId = `edge-${
  | NodeFlowSourceId
  | NodeFlowSubSourceId}-${NodeFlowTargetId}`;

export type EdgeFlow = {
  id: NodeFlowEdgeId;
  source: string;
  sourceHandle: NodeFlowSourceId | NodeFlowSubSourceId;
  target: string;
  targetHandle: NodeFlowTargetId;
};

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

export type DialogueNodeFlow = NodeFlow<
  | DialogueNodeFlowControlRandom
  | DialogueNodeFlowDialogue
  | DialogueNodeFlowChoice
>;

export type DialogueNodeFlowType = DialogueNodeFlow["type"];

import type {
  DialogueNodeFlow,
  DialogueNodeFlowType,
  NodeFlowSourceId,
  NodeFlowSubSourceId,
  NodeFlowTargetId,
} from "../../../entities/dialogue-node-flow";

export function createNodeFlowTargetId(
  dialogueNodeId: string
): NodeFlowTargetId {
  return `target-${dialogueNodeId}`;
}

export function createNodeFlowSourceId(
  dialogueNodeId: string
): NodeFlowSourceId {
  return `source-${dialogueNodeId}`;
}

export function createNodeFlowSubSourceId(
  dialogueNodeId: string,
  index: number
): NodeFlowSubSourceId {
  return `sub-source-${dialogueNodeId}-${index}`;
}

export function isDialogueNodeFlow<T extends DialogueNodeFlowType>(
  type: T,
  node: DialogueNodeFlow<DialogueNodeFlowType>
): node is DialogueNodeFlow<T> {
  return node.data.type === type;
}

export function updateDialogueNodeFlowData<T extends DialogueNodeFlowType>(
  node: DialogueNodeFlow<T>,
  newData: Partial<DialogueNodeFlow<T>["data"]>
): DialogueNodeFlow<T> {
  return {
    ...node,
    data: {
      ...node.data,
      ...newData,
    },
  };
}

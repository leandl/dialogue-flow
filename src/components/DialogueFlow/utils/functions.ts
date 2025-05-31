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
  id: number
): NodeFlowSubSourceId {
  console.log(dialogueNodeId);
  return `sub-source-${dialogueNodeId}-${id}`;
}

export function isDialogueNodeFlow<T extends DialogueNodeFlowType>(
  type: T,
  node: DialogueNodeFlow<DialogueNodeFlowType>
): node is DialogueNodeFlow<T> {
  return node.data.type === type;
}

export function updateData<T extends Record<string, unknown>>(
  data: T,
  newData: Partial<T>
): T {
  return {
    ...data,
    ...newData,
  };
}

export function updateDialogueNodeFlowData<T extends DialogueNodeFlowType>(
  node: DialogueNodeFlow<T>,
  newData: Partial<DialogueNodeFlow<T>["data"]>
): DialogueNodeFlow<T> {
  return updateData(node, {
    data: updateData(node.data, newData),
  });
}

export function convertNodeFlowSubSourceIdToIndex(
  sourceId: NodeFlowSubSourceId
): number {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_sub, _source, _id, indexInString] = sourceId.split("-") as [
    "sub",
    "source",
    string,
    string
  ];
  return Number(indexInString);
}

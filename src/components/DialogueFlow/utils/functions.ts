import type {
  DialogueNodeFlow,
  DialogueNodeFlowType,
  DialogueNodeFlowVoiceOver,
  NodeFlowSourceId,
  NodeFlowSubSourceId,
  NodeFlowTargetId,
} from "../../../entities/dialogue-node-flow";
import {
  UniqueDataType,
  type DialogueNodeFlowEventChangeDialogueUniqueData,
} from "../../../entities/dialogue-node-flow-event";
import { VoiceOverType } from "../../../entities/voice-over";

export function createNodeFlowTargetId(
  dialogueNodeId: string,
): NodeFlowTargetId {
  return `target-${dialogueNodeId}`;
}

export function createNodeFlowSourceId(
  dialogueNodeId: string,
): NodeFlowSourceId {
  return `source-${dialogueNodeId}`;
}

export function createNodeFlowSubSourceId(
  dialogueNodeId: string,
  id: number | string,
): NodeFlowSubSourceId {
  return `sub-source-${dialogueNodeId}-${id}`;
}

export function isDialogueNodeFlow<T extends DialogueNodeFlowType>(
  type: T,
  node: DialogueNodeFlow<DialogueNodeFlowType>,
): node is DialogueNodeFlow<T> {
  return node.data.type === type;
}

export function isDialogueNodeFlowVoiceOver<T extends VoiceOverType>(
  type: T,
  node: DialogueNodeFlow<DialogueNodeFlowType>,
): node is DialogueNodeFlow<"VOICE-OVER"> & {
  data: DialogueNodeFlowVoiceOver<T>;
} {
  return (
    isDialogueNodeFlow("VOICE-OVER", node) && node.data.voiceOverType === type
  );
}

export function isUniqueData<T extends UniqueDataType>(
  type: T,
  event: DialogueNodeFlowEventChangeDialogueUniqueData,
): event is DialogueNodeFlowEventChangeDialogueUniqueData<T> {
  return event.uniqueDataType === type;
}

export function updateData<T extends Record<string, unknown>>(
  data: T,
  newData: Partial<T>,
): T {
  return {
    ...data,
    ...newData,
  };
}

export function updateDialogueNodeFlowData<T extends DialogueNodeFlowType>(
  node: DialogueNodeFlow<T>,
  newData: Partial<DialogueNodeFlow<T>["data"]>,
): DialogueNodeFlow<T> {
  return updateData(node, {
    data: updateData(node.data, newData),
  });
}

export function convertNodeFlowSubSourceIdToIndex(
  sourceId: NodeFlowSubSourceId,
): number {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_sub, _source, _id, indexInString] = sourceId.split("-") as [
    "sub",
    "source",
    string,
    string,
  ];
  return Number(indexInString);
}

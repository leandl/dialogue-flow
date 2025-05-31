import type {
  DialogueNodeFlow,
  DialogueNodeFlowType,
} from "../../../../entities/dialogue-node-flow";
import type {
  DialogueNodeFlowEvent,
  DialogueNodeFlowEventType,
} from "../../../../entities/dialogue-node-flow-event";
import { createNodeFlowSourceId, createNodeFlowTargetId } from "../functions";

export function applyDialogueNodeFlowEventAddDialogueCard(
  event: DialogueNodeFlowEvent<DialogueNodeFlowEventType.ADD_DIALOGUE_CARD>,
  nodes: DialogueNodeFlow[]
): DialogueNodeFlow[] {
  const dateNow = Date.now();
  const nodeId = nodes.length === 0 ? "MAIN" : `node-${dateNow}`;

  const newNode: DialogueNodeFlow<DialogueNodeFlowType> = {
    id: nodeId,
    position: event.position,
    dragHandle: ".dialogue-node-flow-drag-handle",
    type: "DIALOGUE",
    data: {
      id: nodeId,
      type: "DIALOGUE",
      text: "",
      character: "",
      targetId: createNodeFlowTargetId(nodeId),
      sourceId: createNodeFlowSourceId(nodeId),
      next: null,
    },
  };

  return [...nodes, newNode];
}

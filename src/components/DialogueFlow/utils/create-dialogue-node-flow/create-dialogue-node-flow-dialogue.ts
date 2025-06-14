import type { DialogueNodeFlow } from "../../../../entities/dialogue-node-flow";
import { createNodeFlowSourceId, createNodeFlowTargetId } from "../functions";
import type { DialogueNodeFlowOptions } from "../types";

export function createDialogueNodeFlowDialogue(
  nodeId: string,
  options?: DialogueNodeFlowOptions
): DialogueNodeFlow<"DIALOGUE"> {
  return {
    id: nodeId,
    dragging: options?.dragging,
    measured: options?.measured,
    position: {
      x: options?.position?.x || 0,
      y: options?.position?.y || 0,
    },
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
}

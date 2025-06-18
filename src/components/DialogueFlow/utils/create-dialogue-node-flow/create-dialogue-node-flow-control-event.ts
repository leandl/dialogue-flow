import type { DialogueNodeFlow } from "../../../../entities/dialogue-node-flow";
import { createNodeFlowSourceId, createNodeFlowTargetId } from "../functions";
import type { DialogueNodeFlowOptions } from "../types";

export function createDialogueNodeFlowControlEvent(
  nodeId: string,
  options?: DialogueNodeFlowOptions,
): DialogueNodeFlow<"CONTROL.EVENT"> {
  return {
    id: nodeId,
    dragging: options?.dragging,
    measured: options?.measured,
    position: {
      x: options?.position?.x || 0,
      y: options?.position?.y || 0,
    },
    dragHandle: ".dialogue-node-flow-drag-handle",
    type: "CONTROL.EVENT",
    data: {
      id: nodeId,
      type: "CONTROL.EVENT",
      targetId: createNodeFlowTargetId(nodeId),
      eventName: "",
      sourceId: createNodeFlowSourceId(nodeId),
      next: null,
    },
  };
}

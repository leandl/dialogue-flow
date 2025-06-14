import type { DialogueNodeFlow } from "../../../../entities/dialogue-node-flow";
import { createNodeFlowTargetId } from "../functions";
import type { DialogueNodeFlowOptions } from "../types";

export function createDialogueNodeFlowControlRandom(
  nodeId: string,
  options?: DialogueNodeFlowOptions
): DialogueNodeFlow<"CONTROL.RANDOM"> {
  return {
    id: nodeId,
    dragging: options?.dragging,
    measured: options?.measured,
    position: {
      x: options?.position?.x || 0,
      y: options?.position?.y || 0,
    },
    dragHandle: ".dialogue-node-flow-drag-handle",
    type: "CONTROL.RANDOM",
    data: {
      id: nodeId,
      type: "CONTROL.RANDOM",
      targetId: createNodeFlowTargetId(nodeId),
      nexts: [],
    },
  };
}

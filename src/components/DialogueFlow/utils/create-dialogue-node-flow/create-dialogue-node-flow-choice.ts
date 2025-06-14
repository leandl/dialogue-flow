import type { DialogueNodeFlow } from "../../../../entities/dialogue-node-flow";
import { createNodeFlowTargetId } from "../functions";
import type { DialogueNodeFlowOptions } from "../types";

export function createDialogueNodeFlowChoice(
  nodeId: string,
  options?: DialogueNodeFlowOptions
): DialogueNodeFlow<"CHOICE"> {
  return {
    id: nodeId,
    dragging: options?.dragging,
    measured: options?.measured,
    position: {
      x: options?.position?.x || 0,
      y: options?.position?.y || 0,
    },
    dragHandle: ".dialogue-node-flow-drag-handle",
    type: "CHOICE",
    data: {
      id: nodeId,
      type: "CHOICE",
      text: "",
      character: "",
      targetId: createNodeFlowTargetId(nodeId),
      choices: [],
    },
  };
}

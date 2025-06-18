import {
  DialogueActionType,
  DialogueDataType,
  DialogueVarType,
} from "../../../../entities/dialogue-logic";
import type { DialogueNodeFlow } from "../../../../entities/dialogue-node-flow";
import { createNodeFlowSourceId, createNodeFlowTargetId } from "../functions";
import type { DialogueNodeFlowOptions } from "../types";

export function createDialogueNodeFlowControlAction(
  nodeId: string,
  options?: DialogueNodeFlowOptions,
): DialogueNodeFlow<"CONTROL.ACTION"> {
  return {
    id: nodeId,
    dragging: options?.dragging,
    measured: options?.measured,
    position: {
      x: options?.position?.x || 0,
      y: options?.position?.y || 0,
    },
    dragHandle: ".dialogue-node-flow-drag-handle",
    type: "CONTROL.ACTION",
    data: {
      id: nodeId,
      type: "CONTROL.ACTION",
      targetId: createNodeFlowTargetId(nodeId),
      action: [
        DialogueActionType.SET,
        [DialogueVarType.VAR_CHARACTER, "", ""],
        [DialogueDataType.STRING, ""],
      ],
      sourceId: createNodeFlowSourceId(nodeId),
      next: null,
    },
  };
}

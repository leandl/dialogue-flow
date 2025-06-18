import {
  DialogueDataType,
  DialogueOperatorType,
} from "../../../../entities/dialogue-logic";
import type { DialogueNodeFlow } from "../../../../entities/dialogue-node-flow";
import {
  createNodeFlowSubSourceId,
  createNodeFlowTargetId,
} from "../functions";
import type { DialogueNodeFlowOptions } from "../types";

export function createDialogueNodeFlowControlIF(
  nodeId: string,
  options?: DialogueNodeFlowOptions,
): DialogueNodeFlow<"CONTROL.IF"> {
  return {
    id: nodeId,
    dragging: options?.dragging,
    measured: options?.measured,
    position: {
      x: options?.position?.x || 0,
      y: options?.position?.y || 0,
    },
    dragHandle: ".dialogue-node-flow-drag-handle",
    type: "CONTROL.IF",
    data: {
      id: nodeId,
      type: "CONTROL.IF",
      targetId: createNodeFlowTargetId(nodeId),
      condition: [
        DialogueOperatorType.COMPARATOR,
        "EQUAL",
        [DialogueDataType.INTERGER, 0],
        [DialogueDataType.INTERGER, 0],
      ],
      next: {
        false: null,
        sourceFalseId: createNodeFlowSubSourceId(nodeId, "FALSE"),
        true: null,
        sourceTrueId: createNodeFlowSubSourceId(nodeId, "TRUE"),
      },
    },
  };
}

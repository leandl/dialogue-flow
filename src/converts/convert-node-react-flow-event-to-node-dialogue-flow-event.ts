import type { NodeChange } from "@xyflow/react";
import {
  DialogueNodeFlowEventType,
  type DialogueNodeFlowEvent,
} from "../entities/dialogue-node-flow-event";

export function convertNodeReactFlowEventToNodeDialogueFlowEvent(
  event: NodeChange
): DialogueNodeFlowEvent | null {
  if (event.type === "position" && event.position) {
    return {
      dialogueId: event.id,
      type: DialogueNodeFlowEventType.MOVE_DIALOGUE_CARD,
      dragging: event.dragging,
      position: {
        x: event.position.x,
        y: event.position.y,
      },
    };
  }

  if (event.type === "dimensions" && event.dimensions) {
    return {
      dialogueId: event.id,
      type: DialogueNodeFlowEventType.DIMENSION_DIALOGUE_CARD,
      dimensions: event.dimensions,
    };
  }

  if (event.type === "select") {
    console.log(event);
  }

  return null;
}

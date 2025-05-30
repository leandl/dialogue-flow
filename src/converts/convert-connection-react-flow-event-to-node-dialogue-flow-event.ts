import type { Connection } from "@xyflow/react";
import {
  DialogueNodeFlowEventType,
  type DialogueNodeFlowEvent,
} from "../entities/dialogue-node-flow-event";
import type {
  NodeFlowSourceId,
  NodeFlowSubSourceId,
  NodeFlowTargetId,
} from "../entities/dialogue-node-flow";

export function convertConnectionReactFlowEventToNodeDialogueFlowEvent(
  event: Connection
): DialogueNodeFlowEvent<DialogueNodeFlowEventType.CONNECTION_DIALOGUE_CARD> {
  return {
    type: DialogueNodeFlowEventType.CONNECTION_DIALOGUE_CARD,
    from: event.source,
    sourceId: event.sourceHandle! as NodeFlowSourceId | NodeFlowSubSourceId,

    to: event.target,
    targetId: event.targetHandle! as NodeFlowTargetId,
  };
}

import type { DialogueNodeFlow } from "../../../../entities/dialogue-node-flow";
import { VoiceOverType } from "../../../../entities/voice-over";
import { createNodeFlowSourceId, createNodeFlowTargetId } from "../functions";
import type { DialogueNodeFlowOptions } from "../types";

export function createDialogueNodeFlowVoiceOver(
  nodeId: string,
  options?: DialogueNodeFlowOptions
): DialogueNodeFlow<"VOICE-OVER"> {
  return {
    id: nodeId,
    dragging: options?.dragging,
    measured: options?.measured,
    position: {
      x: options?.position?.x || 0,
      y: options?.position?.y || 0,
    },
    dragHandle: ".dialogue-node-flow-drag-handle",
    type: "VOICE-OVER",
    data: {
      id: nodeId,
      type: "VOICE-OVER",
      voiceOverType: VoiceOverType.CHARACTER,
      content: {
        character: "",
        text: ""
      },
      targetId: createNodeFlowTargetId(nodeId),
      sourceId: createNodeFlowSourceId(nodeId),
      next: null,
    },
  };
}

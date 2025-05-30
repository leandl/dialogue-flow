import type {
  DialogueNodeFlow,
  NodeFlowSourceId,
  NodeFlowSubSourceId,
  NodeFlowTargetId,
} from "../../../../entities/dialogue-node-flow";
import type {
  DialogueNodeFlowEvent,
  DialogueNodeFlowEventType,
} from "../../../../entities/dialogue-node-flow-event";

export function createNodeFlowTargetId(
  dialogueNodeId: string
): NodeFlowTargetId {
  return `target-${dialogueNodeId}`;
}

export function createNodeFlowSourceId(
  dialogueNodeId: string
): NodeFlowSourceId {
  return `source-${dialogueNodeId}`;
}

export function createNodeFlowSubSourceId(
  dialogueNodeId: string,
  index: number
): NodeFlowSubSourceId {
  return `sub-source-${dialogueNodeId}-${index}`;
}

export function applyDialogueNodeFlowEventChangeDialogueType(
  event: DialogueNodeFlowEvent<DialogueNodeFlowEventType.CHANGE_DIALOGUE_TYPE>,
  nodes: DialogueNodeFlow[]
): DialogueNodeFlow[] {
  return nodes.map((node) => {
    if (node.data.id !== event.dialogueId) {
      return node;
    }

    if (event.dialogueType === "DIALOGUE") {
      return {
        id: node.id,
        type: "DIALOGUE",
        dragHandle: ".dialogue-node-flow-drag-handle",
        position: node.position,
        dragging: node.dragging,
        measured: node.measured,
        data: {
          id: node.data.id,
          type: "DIALOGUE",
          character: "",
          text: "",
          targetId: createNodeFlowTargetId(node.id),
          sourceId: createNodeFlowSourceId(node.id),
          next: null,
        },
      } as DialogueNodeFlow<"DIALOGUE">;
    }

    if (event.dialogueType === "CHOICE") {
      return {
        id: node.id,
        type: "CHOICE",
        dragHandle: ".dialogue-node-flow-drag-handle",
        position: node.position,
        dragging: node.dragging,
        measured: node.measured,
        data: {
          id: node.data.id,
          type: "CHOICE",
          character: "",
          text: "",
          targetId: createNodeFlowTargetId(node.id),
          choices: [],
        },
      } as DialogueNodeFlow<"CHOICE">;
    }

    if (event.dialogueType === "CONTROL.RANDOM") {
      return {
        id: node.id,
        type: "CONTROL.RANDOM",
        dragHandle: ".dialogue-node-flow-drag-handle",
        position: node.position,
        dragging: node.dragging,
        measured: node.measured,
        data: {
          id: node.data.id,
          type: "CONTROL.RANDOM",
          targetId: createNodeFlowTargetId(node.id),
          nexts: [],
        },
      } as DialogueNodeFlow<"CONTROL.RANDOM">;
    }

    return node;
  });
}

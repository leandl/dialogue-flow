import {
  DialogueDataType,
  DialogueOperatorType,
} from "../../../../entities/dialogue-logic";
import type { DialogueNodeFlow } from "../../../../entities/dialogue-node-flow";
import type {
  DialogueNodeFlowEvent,
  DialogueNodeFlowEventType,
} from "../../../../entities/dialogue-node-flow-event";
import {
  createNodeFlowSourceId,
  createNodeFlowSubSourceId,
  createNodeFlowTargetId,
} from "../functions";

export function applyDialogueNodeFlowEventChangeDialogueType(
  event: DialogueNodeFlowEvent<DialogueNodeFlowEventType.CHANGE_DIALOGUE_TYPE>,
  nodes: DialogueNodeFlow[]
): DialogueNodeFlow[] {
  return nodes.map((node) => {
    if (node.data.id !== event.dialogueId) {
      return node;
    }

    if (event.dialogueType === "DIALOGUE") {
      let data: {
        character: string | null;
        text: string;
      } = {
        character: null,
        text: "",
      };

      if (node.data.type === "CHOICE") {
        data = {
          character: node.data.character,
          text: node.data.text,
        };
      }

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
          ...data,
          targetId: createNodeFlowTargetId(node.id),
          sourceId: createNodeFlowSourceId(node.id),
          next: null,
        },
      } as DialogueNodeFlow<"DIALOGUE">;
    }

    if (event.dialogueType === "CHOICE") {
      let data: {
        character: string | null;
        text: string;
      } = {
        character: null,
        text: "",
      };

      if (node.data.type === "DIALOGUE") {
        data = {
          character: node.data.character,
          text: node.data.text,
        };
      }

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
          ...data,
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

    if (event.dialogueType === "CONTROL.IF") {
      return {
        id: node.id,
        type: "CONTROL.IF",
        dragHandle: ".dialogue-node-flow-drag-handle",
        position: node.position,
        dragging: node.dragging,
        measured: node.measured,
        data: {
          id: node.data.id,
          type: "CONTROL.IF",
          condition: [
            DialogueOperatorType.COMPARATOR,
            "EQUAL",
            [DialogueDataType.INTERGER, 0],
            [DialogueDataType.INTERGER, 0],
          ],
          targetId: createNodeFlowTargetId(node.id),
          next: {
            false: null,
            sourceFalseId: createNodeFlowSubSourceId(node.id, "FALSE"),
            true: null,
            sourceTrueId: createNodeFlowSubSourceId(node.id, "TRUE"),
          },
        },
      } as DialogueNodeFlow<"CONTROL.IF">;
    }

    if (event.dialogueType === "CONTROL.EVENT") {
      return {
        id: node.id,
        type: "CONTROL.EVENT",
        dragHandle: ".dialogue-node-flow-drag-handle",
        position: node.position,
        dragging: node.dragging,
        measured: node.measured,
        data: {
          id: node.data.id,
          type: "CONTROL.EVENT",
          eventName: "",
          targetId: createNodeFlowTargetId(node.id),
          sourceId: createNodeFlowSourceId(node.id),
          next: null,
        },
      } as DialogueNodeFlow<"CONTROL.EVENT">;
    }

    return node;
  });
}

import type { NodeFlow } from "../../../../entities/dialogue-node-flow";
import type {
  DialogueNodeFlowEvent,
  DialogueNodeFlowEventType,
} from "../../../../entities/dialogue-node-flow-event";

export function applyDialogueNodeFlowEventMoveDialogueCard(
  event: DialogueNodeFlowEvent<DialogueNodeFlowEventType.MOVE_DIALOGUE_CARD>,
  nodes: NodeFlow[],
): NodeFlow[] {
  return nodes.map((node) => {
    if (node.id === event.dialogueId) {
      return {
        ...node,
        position: event.position,
        dragging: event.dragging,
      };
    }

    return node;
  });
}

import type { NodeFlow } from "../../../../entities/dialogue-node-flow";
import type {
  DialogueNodeFlowEvent,
  DialogueNodeFlowEventType,
} from "../../../../entities/dialogue-node-flow-event";

export function applyDialogueNodeFlowEventDimensionDialogueCard(
  event: DialogueNodeFlowEvent<DialogueNodeFlowEventType.DIMENSION_DIALOGUE_CARD>,
  nodes: NodeFlow[],
): NodeFlow[] {
  return nodes.map((node) => {
    if (node.id === event.dialogueId) {
      return {
        ...node,
        measured: event.dimensions,
      };
    }

    return node;
  });
}

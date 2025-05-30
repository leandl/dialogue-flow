import type { NodeFlow } from "../../../../entities/dialogue-node-flow";
import type {
  DialogueNodeFlowEvent,
  DialogueNodeFlowEventType,
} from "../../../../entities/dialogue-node-flow-event";

export function applyDialogueNodeFlowEventChangeDialogueText(
  event: DialogueNodeFlowEvent<DialogueNodeFlowEventType.CHANGE_DIALOGUE_TEXT>,
  nodes: NodeFlow[]
): NodeFlow[] {
  return nodes.map((node) => {
    if (node.data.id === event.dialogueId && "text" in node.data) {
      return {
        ...node,
        data: {
          ...node.data,
          text: event.text,
        },
      };
    }

    return node;
  });
}

import type { NodeFlow } from "../../../../entities/dialogue-node-flow";
import type {
  DialogueNodeFlowEvent,
  DialogueNodeFlowEventType,
} from "../../../../entities/dialogue-node-flow-event";

export function applyDialogueNodeFlowEventChangeDialogueCharacter(
  event: DialogueNodeFlowEvent<DialogueNodeFlowEventType.CHANGE_DIALOGUE_CHARACTER>,
  nodes: NodeFlow[]
): NodeFlow[] {
  return nodes.map((node) => {
    if (node.data.id === event.dialogueId && "character" in node.data) {
      return {
        ...node,
        data: {
          ...node.data,
          character: event.character,
        },
      };
    }

    return node;
  });
}

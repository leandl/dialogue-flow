import type { NodeFlow } from "../../../../entities/dialogue-node-flow";
import type {
  DialogueNodeFlowEvent,
  DialogueNodeFlowEventType,
} from "../../../../entities/dialogue-node-flow-event";
import { isDialogueNodeFlow, updateDialogueNodeFlowData } from "../functions";

export function applyDialogueNodeFlowEventChangeDialogueText(
  event: DialogueNodeFlowEvent<DialogueNodeFlowEventType.CHANGE_DIALOGUE_TEXT>,
  nodes: NodeFlow[]
): NodeFlow[] {
  return nodes.map((node) => {
    if (
      node.data.id === event.dialogueId &&
      (isDialogueNodeFlow("DIALOGUE", node) ||
        isDialogueNodeFlow("CHOICE", node))
    ) {
      return updateDialogueNodeFlowData(node, {
        text: event.text,
      });
    }

    return node;
  });
}

import type { NodeFlow } from "../../../../entities/dialogue-node-flow";
import type {
  DialogueNodeFlowEvent,
  DialogueNodeFlowEventType,
} from "../../../../entities/dialogue-node-flow-event";
import { isDialogueNodeFlow, updateDialogueNodeFlowData } from "../functions";

export function applyDialogueNodeFlowEventChangeDialogueCharacter(
  event: DialogueNodeFlowEvent<DialogueNodeFlowEventType.CHANGE_DIALOGUE_CHARACTER>,
  nodes: NodeFlow[]
): NodeFlow[] {
  return nodes.map((node) => {
    if (
      node.data.id === event.dialogueId &&
      (isDialogueNodeFlow("DIALOGUE", node) ||
        isDialogueNodeFlow("CHOICE", node))
    ) {
      console.log("entrou");
      return updateDialogueNodeFlowData(node, {
        character: event.character,
      });
    }

    return node;
  });
}

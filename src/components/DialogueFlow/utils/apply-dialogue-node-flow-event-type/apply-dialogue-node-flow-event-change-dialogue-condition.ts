import type { NodeFlow } from "../../../../entities/dialogue-node-flow";
import type {
  DialogueNodeFlowEvent,
  DialogueNodeFlowEventType,
} from "../../../../entities/dialogue-node-flow-event";
import { isDialogueNodeFlow, updateDialogueNodeFlowData } from "../functions";

export function applyDialogueNodeFlowEventChangeDialogueCondition(
  event: DialogueNodeFlowEvent<DialogueNodeFlowEventType.CHANGE_DIALOGUE_CONDITION>,
  nodes: NodeFlow[]
): NodeFlow[] {
  return nodes.map((node) => {
    if (
      node.data.id === event.dialogueId &&
      isDialogueNodeFlow("CONTROL.IF", node)
    ) {
      return updateDialogueNodeFlowData(node, {
        condition: event.condition,
      });
    }

    return node;
  });
}

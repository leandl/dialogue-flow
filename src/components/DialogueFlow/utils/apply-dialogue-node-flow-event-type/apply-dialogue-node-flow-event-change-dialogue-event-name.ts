import type { NodeFlow } from "../../../../entities/dialogue-node-flow";
import type {
  DialogueNodeFlowEvent,
  DialogueNodeFlowEventType,
} from "../../../../entities/dialogue-node-flow-event";
import { isDialogueNodeFlow, updateDialogueNodeFlowData } from "../functions";

export function applyDialogueNodeFlowEventChangeDialogueEventName(
  event: DialogueNodeFlowEvent<DialogueNodeFlowEventType.CHANGE_DIALOGUE_EVENT_NAME>,
  nodes: NodeFlow[]
): NodeFlow[] {
  return nodes.map((node) => {
    if (
      node.data.id === event.dialogueId &&
      isDialogueNodeFlow("CONTROL.EVENT", node)
    ) {
      return updateDialogueNodeFlowData(node, {
        eventName: event.eventName,
      });
    }

    return node;
  });
}

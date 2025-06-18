import type { NodeFlow } from "../../../../entities/dialogue-node-flow";
import {
  UniqueDataType,
  type DialogueNodeFlowEvent,
  type DialogueNodeFlowEventType,
} from "../../../../entities/dialogue-node-flow-event";
import {
  isDialogueNodeFlow,
  isUniqueData,
  updateDialogueNodeFlowData,
} from "../functions";

export function applyDialogueNodeFlowEventChangeDialogueUniqueData(
  event: DialogueNodeFlowEvent<DialogueNodeFlowEventType.CHANGE_DIALOGUE_UNIQUE_DATA>,
  nodes: NodeFlow[],
): NodeFlow[] {
  return nodes.map((node) => {
    if (node.data.id !== event.dialogueId) {
      return node;
    }

    if (
      isDialogueNodeFlow("CONTROL.IF", node) &&
      isUniqueData(UniqueDataType.CONDITION, event)
    ) {
      return updateDialogueNodeFlowData(node, {
        condition: event.data.condition,
      });
    }

    if (
      isDialogueNodeFlow("CONTROL.EVENT", node) &&
      isUniqueData(UniqueDataType.EVENT_NAME, event)
    ) {
      return updateDialogueNodeFlowData(node, {
        eventName: event.data.eventName,
      });
    }

    if (
      isDialogueNodeFlow("CONTROL.ACTION", node) &&
      isUniqueData(UniqueDataType.ACTION, event)
    ) {
      return updateDialogueNodeFlowData(node, {
        action: event.data.action,
      });
    }

    return node;
  });
}

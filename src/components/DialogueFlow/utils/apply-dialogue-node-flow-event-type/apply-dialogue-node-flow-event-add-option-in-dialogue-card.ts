import type { DialogueNodeFlow } from "../../../../entities/dialogue-node-flow";
import type {
  DialogueNodeFlowEvent,
  DialogueNodeFlowEventType,
} from "../../../../entities/dialogue-node-flow-event";
import {
  createNodeFlowSubSourceId,
  isDialogueNodeFlow,
  updateDialogueNodeFlowData,
} from "../functions";

function addItemInArray<T>(array: T[], newData: T) {
  return [...array, newData];
}

export function applyDialogueNodeFlowEventAddOptionInDialogueCard(
  event: DialogueNodeFlowEvent<DialogueNodeFlowEventType.ADD_OPTION_IN_DIALOGUE_CARD>,
  nodes: DialogueNodeFlow[],
): DialogueNodeFlow[] {
  return nodes.map((node) => {
    if (node.data.id !== event.dialogueId) {
      return node;
    }

    if (isDialogueNodeFlow("CHOICE", node)) {
      return updateDialogueNodeFlowData(node, {
        choices: addItemInArray(node.data.choices, {
          sourceId: createNodeFlowSubSourceId(
            node.data.id,
            node.data.choices.length,
          ),
          text: "",
          next: null,
        }),
      });
    }

    if (isDialogueNodeFlow("CONTROL.RANDOM", node)) {
      return updateDialogueNodeFlowData(node, {
        nexts: addItemInArray(node.data.nexts, {
          sourceId: createNodeFlowSubSourceId(
            node.data.id,
            node.data.nexts.length,
          ),
          next: null,
        }),
      });
    }

    return node;
  });
}

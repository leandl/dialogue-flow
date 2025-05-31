import type { DialogueNodeFlow } from "../../../../entities/dialogue-node-flow";
import type {
  DialogueNodeFlowEvent,
  DialogueNodeFlowEventType,
} from "../../../../entities/dialogue-node-flow-event";
import {
  isDialogueNodeFlow,
  updateData,
  updateDialogueNodeFlowData,
} from "../functions";

export function applyDialogueNodeFlowEventChangeOptionTextInDialogueCard(
  event: DialogueNodeFlowEvent<DialogueNodeFlowEventType.CHANGE_OPTION_TEXT_IN_DIALOGUE_CARD>,
  nodes: DialogueNodeFlow[]
): DialogueNodeFlow[] {
  return nodes.map((node) => {
    if (node.id !== event.dialogueId) return node;

    if (isDialogueNodeFlow("CHOICE", node)) {
      const { choices } = node.data;

      return updateDialogueNodeFlowData(node, {
        choices: choices.map((choice) => {
          if (choice.sourceId === event.sourceId) {
            return updateData(choice, {
              text: event.text,
            });
          }

          return choice;
        }),
      });
    }

    return node;
  });
}

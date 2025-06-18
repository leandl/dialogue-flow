import type {
  DialogueNodeFlow,
  DialogueNodeFlowChoiceOption,
  DialogueNodeFlowControlRandomOption,
} from "../../../../entities/dialogue-node-flow";
import type {
  DialogueNodeFlowEvent,
  DialogueNodeFlowEventType,
} from "../../../../entities/dialogue-node-flow-event";
import {
  createNodeFlowSubSourceId,
  isDialogueNodeFlow,
  updateDialogueNodeFlowData,
} from "../functions";

export function applyDialogueNodeFlowEventRemoveOptionInDialogueCard(
  event: DialogueNodeFlowEvent<DialogueNodeFlowEventType.REMOVE_OPTION_IN_DIALOGUE_CARD>,
  nodes: DialogueNodeFlow[],
): DialogueNodeFlow[] {
  return nodes.map((node) => {
    if (node.id !== event.dialogueId) return node;

    if (isDialogueNodeFlow("CHOICE", node)) {
      const { choices } = node.data;
      const updatedChoices: DialogueNodeFlowChoiceOption[] = [];

      for (let index = 0; index < choices.length; index++) {
        if (event.index === index) {
          continue;
        }

        const choiceOption = choices[index];
        if (index < event.index) {
          updatedChoices.push(choiceOption);
          continue;
        }

        const newSourceId = createNodeFlowSubSourceId(node.id, index - 1);
        updatedChoices.push({
          ...choiceOption,
          sourceId: newSourceId,
        });
      }

      return updateDialogueNodeFlowData(node, {
        choices: updatedChoices,
      });
    }

    if (isDialogueNodeFlow("CONTROL.RANDOM", node)) {
      const { nexts } = node.data;
      const updatedNexts: DialogueNodeFlowControlRandomOption[] = [];

      for (let index = 0; index < nexts.length; index++) {
        if (event.index === index) {
          continue;
        }

        const nextOption = nexts[index];
        if (index < event.index) {
          updatedNexts.push(nextOption);
          continue;
        }

        const newSourceId = createNodeFlowSubSourceId(node.id, index - 1);
        updatedNexts.push({
          ...nextOption,
          sourceId: newSourceId,
        });
      }

      return updateDialogueNodeFlowData(node, {
        nexts: updatedNexts,
      });
    }

    return node;
  });
}

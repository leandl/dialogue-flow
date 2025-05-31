import type { NodeFlow } from "../../../../entities/dialogue-node-flow";
import type {
  DialogueNodeFlowEvent,
  DialogueNodeFlowEventType,
} from "../../../../entities/dialogue-node-flow-event";
import { isDialogueNodeFlow, updateDialogueNodeFlowData } from "../functions";

export function applyDialogueNodeFlowEventConnectionDialogueCard(
  event: DialogueNodeFlowEvent<DialogueNodeFlowEventType.CONNECTION_DIALOGUE_CARD>,
  nodes: NodeFlow[]
): NodeFlow[] {
  return nodes.map((node) => {
    if (node.id !== event.from) {
      return node;
    }

    if (isDialogueNodeFlow("DIALOGUE", node)) {
      return updateDialogueNodeFlowData(node, {
        next: event.to,
      });
    }

    if (isDialogueNodeFlow("CHOICE", node)) {
      return updateDialogueNodeFlowData(node, {
        choices: node.data.choices.map((choice) =>
          choice.sourceId !== event.sourceId
            ? choice
            : {
                ...choice,
                next: event.to,
              }
        ),
      });
    }

    if (isDialogueNodeFlow("CONTROL.RANDOM", node)) {
      return updateDialogueNodeFlowData(node, {
        nexts: node.data.nexts.map((nextOption) =>
          nextOption.sourceId !== event.sourceId
            ? nextOption
            : {
                ...nextOption,
                next: event.to,
              }
        ),
      });
    }

    return node;
  });
}

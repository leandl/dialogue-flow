import type { NodeFlow } from "../../../../entities/dialogue-node-flow";
import type {
  DialogueNodeFlowEvent,
  DialogueNodeFlowEventType,
} from "../../../../entities/dialogue-node-flow-event";
import {
  isDialogueNodeFlow,
  updateData,
  updateDialogueNodeFlowData,
} from "../functions";

export function applyDialogueNodeFlowEventConnectionDialogueCard(
  event: DialogueNodeFlowEvent<DialogueNodeFlowEventType.CONNECTION_DIALOGUE_CARD>,
  nodes: NodeFlow[]
): NodeFlow[] {
  if (event.from === event.to) {
    return nodes;
  }

  return nodes.map((node) => {
    if (node.id !== event.from) {
      return node;
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

    if (isDialogueNodeFlow("CONTROL.IF", node)) {
      return updateDialogueNodeFlowData(node, {
        next: updateData(node.data.next, {
          false:
            node.data.next.sourceFalseId === event.sourceId
              ? event.to
              : node.data.next.false,
          true:
            node.data.next.sourceTrueId === event.sourceId
              ? event.to
              : node.data.next.true,
        }),
      });
    }

    return updateDialogueNodeFlowData(node, {
      next: event.to,
    });
  });
}

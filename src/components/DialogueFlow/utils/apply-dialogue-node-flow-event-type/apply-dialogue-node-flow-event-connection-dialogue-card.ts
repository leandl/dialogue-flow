import type {
  DialogueNodeFlow,
  DialogueNodeFlowType,
  NodeFlow,
} from "../../../../entities/dialogue-node-flow";
import type {
  DialogueNodeFlowEvent,
  DialogueNodeFlowEventType,
} from "../../../../entities/dialogue-node-flow-event";

function isDialogueNodeFlow<T extends DialogueNodeFlowType>(
  type: T,
  node: DialogueNodeFlow<DialogueNodeFlowType>
): node is DialogueNodeFlow<T> {
  return node.data.type === type;
}

function updateDialogueNodeFlowData<T extends DialogueNodeFlowType>(
  node: DialogueNodeFlow<T>,
  newData: Partial<DialogueNodeFlow<T>["data"]>
): DialogueNodeFlow<T> {
  return {
    ...node,
    data: {
      ...node.data,
      ...newData,
    },
  };
}

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
        nexts: node.data.nexts.map((nextOption) => {
          console.log({
            v: nextOption.sourceId !== event.sourceId,
            "nextOption.sourceId": nextOption.sourceId,
            "event.sourceId": event.sourceId,
          });
          return nextOption.sourceId !== event.sourceId
            ? nextOption
            : {
                ...nextOption,
                next: event.to,
              };
        }),
      });
    }

    return node;
  });
}

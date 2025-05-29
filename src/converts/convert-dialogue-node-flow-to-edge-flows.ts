import type {
  DialogueNodeFlow,
  EdgeFlow,
} from "../entities/dialogue-node-flow";
import { convertDialogueNodeIdToNodeFlowTargetId } from "./convert-dialogue-node-to-dialogue-node-flow";

function convertDialogueNodeFlowToEdgeFlows(
  dialogueNodeFlow: DialogueNodeFlow
): EdgeFlow[] {
  if (dialogueNodeFlow.data.type === "DIALOGUE") {
    if (dialogueNodeFlow.data.next === null) {
      return [];
    }

    const dialogueNodeFlowTargetId = convertDialogueNodeIdToNodeFlowTargetId(
      dialogueNodeFlow.data.next
    );

    return [
      {
        id: `edge-${dialogueNodeFlow.data.sourceId}-${dialogueNodeFlowTargetId}`,
        source: dialogueNodeFlow.data.id,
        sourceHandle: dialogueNodeFlow.data.sourceId,
        target: dialogueNodeFlow.data.next,
        targetHandle: dialogueNodeFlowTargetId,
      },
    ];
  }

  if (dialogueNodeFlow.data.type === "CHOICE") {
    return dialogueNodeFlow.data.choices.reduce((acc, choice) => {
      if (!choice.next) return acc;

      const dialogueNodeFlowTargetId = convertDialogueNodeIdToNodeFlowTargetId(
        choice.next
      );

      return [
        ...acc,
        {
          id: `edge-${choice.sourceId}-${dialogueNodeFlowTargetId}`,
          source: dialogueNodeFlow.data.id,
          sourceHandle: choice.sourceId,
          target: choice.next,
          targetHandle: dialogueNodeFlowTargetId,
        },
      ];
    }, new Array<EdgeFlow>());
  }

  if (dialogueNodeFlow.data.type === "CONTROL.RANDOM") {
    return dialogueNodeFlow.data.nexts.reduce((acc, nextOption) => {
      if (!nextOption.next) return acc;

      const dialogueNodeFlowTargetId = convertDialogueNodeIdToNodeFlowTargetId(
        nextOption.next
      );

      return [
        ...acc,
        {
          id: `edge-${nextOption.sourceId}-${dialogueNodeFlowTargetId}`,
          source: dialogueNodeFlow.data.id,
          sourceHandle: nextOption.sourceId,
          target: nextOption.next,
          targetHandle: dialogueNodeFlowTargetId,
        },
      ];
    }, new Array<EdgeFlow>());
  }

  return [];
}

export function convertDialogueNodeFlowsToEdgeFlows(
  dialogueNodeFlows: DialogueNodeFlow[]
): EdgeFlow[] {
  return dialogueNodeFlows.reduce(
    (acc, cur) => [...acc, ...convertDialogueNodeFlowToEdgeFlows(cur)],
    [] as EdgeFlow[]
  );
}

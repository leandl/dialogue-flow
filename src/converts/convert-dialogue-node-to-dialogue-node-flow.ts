import type {
  DialogueNode,
  DialogueNodeChoice,
  DialogueNodeChoiceOption,
  DialogueNodeControlRandom,
  DialogueNodeDialogue,
  DialogueNodes,
} from "../entities/dialogue-node";
import type {
  DialogueNodeFlow,
  DialogueNodeFlowChoice,
  DialogueNodeFlowChoiceOption,
  DialogueNodeFlowControlRandom,
  DialogueNodeFlowControlRandomOption,
  DialogueNodeFlowDialogue,
  NodeFlowSourceId,
  NodeFlowSubSourceId,
  NodeFlowTargetId,
} from "../entities/dialogue-node-flow";

export function convertDialogueNodeIdToNodeFlowTargetId(
  dialogueNodeId: string
): NodeFlowTargetId {
  return `target-${dialogueNodeId}`;
}

export function convertDialogueNodeIdToNodeFlowSourceId(
  dialogueNodeId: string
): NodeFlowSourceId {
  return `source-${dialogueNodeId}`;
}

export function convertDialogueNodeIdToNodeFlowSubSourceId(
  dialogueNodeId: string,
  index: number
): NodeFlowSubSourceId {
  return `sub-source-${dialogueNodeId}-${index}`;
}

export function convertDialogueNodeControlRandomOptionToDialogueNodeFlowControlRandomOption(
  dialogueNodeControlRandomId: string,
  dialogueNodeControlRandomOptionId: number,
  dialogueNodeControlRandomOption: string
): DialogueNodeFlowControlRandomOption {
  return {
    sourceId: convertDialogueNodeIdToNodeFlowSubSourceId(
      dialogueNodeControlRandomId,
      dialogueNodeControlRandomOptionId
    ),
    next: dialogueNodeControlRandomOption,
  };
}

export function convertDialogueNodeControlRandomToDialogueNodeFlowControlRandom(
  dialogueNodeControlRandom: DialogueNodeControlRandom
): DialogueNodeFlowControlRandom {
  return {
    id: dialogueNodeControlRandom.id,
    targetId: convertDialogueNodeIdToNodeFlowTargetId(
      dialogueNodeControlRandom.id
    ),
    type: "CONTROL.RANDOM",
    nexts: dialogueNodeControlRandom.nexts.map(
      (dialogueNodeControlRandomOption, index) =>
        convertDialogueNodeControlRandomOptionToDialogueNodeFlowControlRandomOption(
          dialogueNodeControlRandom.id,
          index,
          dialogueNodeControlRandomOption
        )
    ),
  };
}

export function convertDialogueNodeDialogueToDialogueNodeFlowDialogue(
  dialogueNodeDialogue: DialogueNodeDialogue
): DialogueNodeFlowDialogue {
  return {
    id: dialogueNodeDialogue.id,
    targetId: convertDialogueNodeIdToNodeFlowTargetId(dialogueNodeDialogue.id),
    type: "DIALOGUE",
    character: dialogueNodeDialogue.character,
    text: dialogueNodeDialogue.text,
    sourceId: convertDialogueNodeIdToNodeFlowSourceId(dialogueNodeDialogue.id),
    next: dialogueNodeDialogue.next,
  };
}

export function convertDialogueNodeChoiceOptionToDialogueNodeFlowChoiceOption(
  dialogueNodeChoiceId: string,
  dialogueNodeChoiceOptionId: number,
  dialogueNodeChoiceOption: DialogueNodeChoiceOption
): DialogueNodeFlowChoiceOption {
  return {
    text: dialogueNodeChoiceOption.text,
    sourceId: convertDialogueNodeIdToNodeFlowSubSourceId(
      dialogueNodeChoiceId,
      dialogueNodeChoiceOptionId
    ),
    next: dialogueNodeChoiceOption.next,
  };
}

export function convertDialogueNodeChoiceToDialogueNodeFlowChoice(
  dialogueNodeChoice: DialogueNodeChoice
): DialogueNodeFlowChoice {
  return {
    id: dialogueNodeChoice.id,
    targetId: convertDialogueNodeIdToNodeFlowTargetId(dialogueNodeChoice.id),
    type: "CHOICE",
    character: dialogueNodeChoice.character,
    text: dialogueNodeChoice.text,
    choices: dialogueNodeChoice.choices.map((dialogueNodeChoiceOption, index) =>
      convertDialogueNodeChoiceOptionToDialogueNodeFlowChoiceOption(
        dialogueNodeChoice.id,
        index,
        dialogueNodeChoiceOption
      )
    ),
  };
}

export function convertDialogueNodeToDialogueNodeFlow(
  dialogueNode: DialogueNode
): DialogueNodeFlow {
  let data: DialogueNodeFlow["data"];
  if (dialogueNode.type === "CONTROL.RANDOM") {
    data =
      convertDialogueNodeControlRandomToDialogueNodeFlowControlRandom(
        dialogueNode
      );
  } else if (dialogueNode.type === "CHOICE") {
    data = convertDialogueNodeChoiceToDialogueNodeFlowChoice(dialogueNode);
  } else {
    data = convertDialogueNodeDialogueToDialogueNodeFlowDialogue(dialogueNode);
  }

  return {
    id: dialogueNode.id,
    type: dialogueNode.type,
    data,
    dragHandle: ".dialogue-node-flow-drag-handle",
    position: {
      x: 0,
      y: 0,
    },
  };
}

export function convertDialogueNodesToDialogueNodeFlows(
  dialogueNodeGodots: DialogueNodes
): DialogueNodeFlow[] {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return Object.entries(dialogueNodeGodots).map(([_, dialogueNodeGodot]) =>
    convertDialogueNodeToDialogueNodeFlow(dialogueNodeGodot)
  );
}

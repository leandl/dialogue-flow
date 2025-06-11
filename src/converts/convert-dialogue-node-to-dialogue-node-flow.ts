import type {
  DialogueNode,
  DialogueNodeChoice,
  DialogueNodeChoiceOption,
  DialogueNodeControlEvent,
  DialogueNodeControlIF,
  DialogueNodeControlRandom,
  DialogueNodeDialogue,
  DialogueNodes,
} from "../entities/dialogue-node";
import type {
  DialogueNodeFlow,
  DialogueNodeFlowChoice,
  DialogueNodeFlowChoiceOption,
  DialogueNodeFlowControlEvent,
  DialogueNodeFlowControlIF,
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
  id: number | string
): NodeFlowSubSourceId {
  return `sub-source-${dialogueNodeId}-${id}`;
}

export function convertDialogueNodeControlRandomOptionToDialogueNodeFlowControlRandomOption(
  dialogueNodeControlRandomId: string,
  dialogueNodeControlRandomOptionId: number,
  dialogueNodeControlRandomOption: string | null
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

export function convertDialogueNodeControlIFToDialogueNodeFlowControlIF(
  dialogueNodeControlIF: DialogueNodeControlIF
): DialogueNodeFlowControlIF {
  return {
    id: dialogueNodeControlIF.id,
    targetId: convertDialogueNodeIdToNodeFlowTargetId(dialogueNodeControlIF.id),
    type: "CONTROL.IF",
    condition: dialogueNodeControlIF.condition,
    next: {
      false: dialogueNodeControlIF.next.false,
      sourceFalseId: convertDialogueNodeIdToNodeFlowSubSourceId(
        dialogueNodeControlIF.id,
        "FALSE"
      ),
      true: dialogueNodeControlIF.next.true,
      sourceTrueId: convertDialogueNodeIdToNodeFlowSubSourceId(
        dialogueNodeControlIF.id,
        "TRUE"
      ),
    },
  };
}

export function convertDialogueNodeControlEventToDialogueNodeFlowControlEvent(
  dialogueNodeControlEvent: DialogueNodeControlEvent
): DialogueNodeFlowControlEvent {
  return {
    id: dialogueNodeControlEvent.id,
    targetId: convertDialogueNodeIdToNodeFlowTargetId(
      dialogueNodeControlEvent.id
    ),
    type: "CONTROL.EVENT",
    eventName: dialogueNodeControlEvent.eventName,
    sourceId: convertDialogueNodeIdToNodeFlowSourceId(
      dialogueNodeControlEvent.id
    ),
    next: dialogueNodeControlEvent.next,
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
  } else if (dialogueNode.type === "CONTROL.IF") {
    data =
      convertDialogueNodeControlIFToDialogueNodeFlowControlIF(dialogueNode);
  } else if (dialogueNode.type === "CONTROL.EVENT") {
    data =
      convertDialogueNodeControlEventToDialogueNodeFlowControlEvent(
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

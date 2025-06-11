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
  NodeFlowTargetId,
} from "../entities/dialogue-node-flow";

function extractDialogueNodeIdFromNodeFlowTargetId(
  targetId: NodeFlowTargetId
): string {
  return targetId.replace(/^target-/, "");
}

export function convertDialogueNodeFlowControlRandomOptionToDialogueNodeControlRandomOption(
  option: DialogueNodeFlowControlRandomOption
): string | null {
  return option.next;
}

export function convertDialogueNodeFlowControlRandomToDialogueNodeControlRandom(
  node: DialogueNodeFlowControlRandom
): DialogueNodeControlRandom {
  return {
    id: extractDialogueNodeIdFromNodeFlowTargetId(node.targetId),
    type: "CONTROL.RANDOM",
    nexts: node.nexts.map(
      convertDialogueNodeFlowControlRandomOptionToDialogueNodeControlRandomOption
    ),
  };
}

export function convertDialogueNodeFlowControlIFToDialogueNodeControlIF(
  node: DialogueNodeFlowControlIF
): DialogueNodeControlIF {
  return {
    id: extractDialogueNodeIdFromNodeFlowTargetId(node.targetId),
    type: "CONTROL.IF",
    condition: node.condition,
    next: {
      false: node.next.false,
      true: node.next.true,
    },
  };
}

export function convertDialogueNodeFlowControlEventToDialogueNodeControlEvent(
  node: DialogueNodeFlowControlEvent
): DialogueNodeControlEvent {
  return {
    id: extractDialogueNodeIdFromNodeFlowTargetId(node.targetId),
    type: "CONTROL.EVENT",
    eventName: node.eventName,
    next: node.next,
  };
}

export function convertDialogueNodeFlowDialogueToDialogueNodeDialogue(
  node: DialogueNodeFlowDialogue
): DialogueNodeDialogue {
  return {
    id: extractDialogueNodeIdFromNodeFlowTargetId(node.targetId),
    type: "DIALOGUE",
    character: node.character,
    text: node.text,
    next: node.next,
  };
}

export function convertDialogueNodeFlowChoiceOptionToDialogueNodeChoiceOption(
  option: DialogueNodeFlowChoiceOption
): DialogueNodeChoiceOption {
  return {
    text: option.text,
    next: option.next,
  };
}

export function convertDialogueNodeFlowChoiceToDialogueNodeChoice(
  node: DialogueNodeFlowChoice
): DialogueNodeChoice {
  return {
    id: extractDialogueNodeIdFromNodeFlowTargetId(node.targetId),
    type: "CHOICE",
    character: node.character,
    text: node.text,
    choices: node.choices.map(
      convertDialogueNodeFlowChoiceOptionToDialogueNodeChoiceOption
    ),
  };
}

export function convertDialogueNodeFlowToDialogueNode(
  nodeFlow: DialogueNodeFlow
): DialogueNode {
  switch (nodeFlow.type) {
    case "CONTROL.RANDOM":
      return convertDialogueNodeFlowControlRandomToDialogueNodeControlRandom(
        nodeFlow.data as DialogueNodeFlowControlRandom
      );
    case "CONTROL.IF":
      return convertDialogueNodeFlowControlIFToDialogueNodeControlIF(
        nodeFlow.data as DialogueNodeFlowControlIF
      );
    case "CONTROL.EVENT":
      return convertDialogueNodeFlowControlEventToDialogueNodeControlEvent(
        nodeFlow.data as DialogueNodeFlowControlEvent
      );

    case "CHOICE":
      return convertDialogueNodeFlowChoiceToDialogueNodeChoice(
        nodeFlow.data as DialogueNodeFlowChoice
      );
    case "DIALOGUE":
      return convertDialogueNodeFlowDialogueToDialogueNodeDialogue(
        nodeFlow.data as DialogueNodeFlowDialogue
      );
  }
}

export function convertDialogueNodeFlowsToDialogueNodes(
  flows: DialogueNodeFlow[]
): DialogueNodes {
  return Object.fromEntries(
    flows.map((flow) => [flow.id, convertDialogueNodeFlowToDialogueNode(flow)])
  );
}

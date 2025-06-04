import type {
  DialogueNode,
  DialogueNodeChoice,
  DialogueNodeChoiceOption,
  DialogueNodeControlIF,
  DialogueNodeControlRandom,
  DialogueNodeDialogue,
  DialogueNodes,
} from "../entities/dialogue-node";
import type {
  DialogueNodeGodot,
  DialogueNodeGodotChoice,
  DialogueNodeGodotChoiceOption,
  DialogueNodeGodotControlIF,
  DialogueNodeGodotControlRandom,
  DialogueNodeGodotDialogue,
  DialogueNodeGodots,
} from "../entities/dialogue-node-godot";

export function convertDialogueNodeControlRandomToDialogueNodeGodotControlRandom(
  node: DialogueNodeControlRandom
): DialogueNodeGodotControlRandom {
  return {
    type: "CONTROL.RANDOM",
    nexts: node.nexts,
  };
}

export function convertDialogueNodeControlIFToDialogueNodeGodotControlIF(
  node: DialogueNodeControlIF
): DialogueNodeGodotControlIF {
  return {
    type: "CONTROL.IF",
    condition: node.condition,
    next_false: node.next.false,
    next_true: node.next.true,
  };
}

export function convertDialogueNodeDialogueToDialogueNodeGodotDialogue(
  node: DialogueNodeDialogue
): DialogueNodeGodotDialogue {
  return {
    type: "DIALOGUE",
    character: node.character as string,
    text: node.text,
    next: node.next,
  };
}

export function convertDialogueNodeChoiceOptionToDialogueNodeGodotChoiceOption(
  option: DialogueNodeChoiceOption
): DialogueNodeGodotChoiceOption {
  return {
    text: option.text,
    next: option.next,
  };
}

export function convertDialogueNodeChoiceToDialogueNodeGodotChoice(
  node: DialogueNodeChoice
): DialogueNodeGodotChoice {
  return {
    type: "CHOICE",
    character: node.character as string,
    text: node.text,
    choices: node.choices.map(
      convertDialogueNodeChoiceOptionToDialogueNodeGodotChoiceOption
    ),
  };
}

export function convertDialogueNodeToDialogueNodeGodot(
  node: DialogueNode
): DialogueNodeGodot {
  switch (node.type) {
    case "CONTROL.RANDOM":
      return convertDialogueNodeControlRandomToDialogueNodeGodotControlRandom(
        node
      );
    case "CONTROL.IF":
      return convertDialogueNodeControlIFToDialogueNodeGodotControlIF(node);
    case "CHOICE":
      return convertDialogueNodeChoiceToDialogueNodeGodotChoice(node);
    case "DIALOGUE":
      return convertDialogueNodeDialogueToDialogueNodeGodotDialogue(node);
  }
}

export function convertDialogueNodesToDialogueNodeGodots(
  dialogueNodes: DialogueNodes
): DialogueNodeGodots {
  return Object.fromEntries(
    Object.entries(dialogueNodes).map(([id, node]) => [
      id,
      convertDialogueNodeToDialogueNodeGodot(node),
    ])
  );
}

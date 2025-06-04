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

export function convertDialogueNodeGodotControlRandomToDialogueNodeControlRandom(
  dialogueNodeControlRandomId: string,
  dialogueNodeControlRandomGodot: DialogueNodeGodotControlRandom
): DialogueNodeControlRandom {
  return {
    id: dialogueNodeControlRandomId,
    type: "CONTROL.RANDOM",
    nexts: dialogueNodeControlRandomGodot.nexts,
  };
}

export function convertDialogueNodeGodotControlIFToDialogueNodeControlIF(
  dialogueNodeControlIFId: string,
  dialogueNodeControlIFGodot: DialogueNodeGodotControlIF
): DialogueNodeControlIF {
  return {
    id: dialogueNodeControlIFId,
    type: "CONTROL.IF",
    condition: dialogueNodeControlIFGodot.condition,
    next: {
      true: dialogueNodeControlIFGodot.next_true,
      false: dialogueNodeControlIFGodot.next_false,
    },
  };
}

export function convertDialogueNodeGodotDialogueToDialogueNodeDialogue(
  dialogueNodeDialogueId: string,
  dialogueNodeDialogueGodot: DialogueNodeGodotDialogue
): DialogueNodeDialogue {
  return {
    id: dialogueNodeDialogueId,
    type: "DIALOGUE",
    character: dialogueNodeDialogueGodot.character,
    text: dialogueNodeDialogueGodot.text,
    next: dialogueNodeDialogueGodot.next,
  };
}

export function convertDialogueNodeGodotChoiceOptionToDialogueNodeChoiceOption(
  dialogueNodeChoiceOptionGodot: DialogueNodeGodotChoiceOption
): DialogueNodeChoiceOption {
  return {
    text: dialogueNodeChoiceOptionGodot.text,
    next: dialogueNodeChoiceOptionGodot.next,
  };
}

export function convertDialogueNodeGodotChoiceToDialogueNodeChoice(
  dialogueNodeChoiceId: string,
  dialogueNodeChoiceGodot: DialogueNodeGodotChoice
): DialogueNodeChoice {
  return {
    id: dialogueNodeChoiceId,
    type: "CHOICE",
    character: dialogueNodeChoiceGodot.character,
    text: dialogueNodeChoiceGodot.text,
    choices: dialogueNodeChoiceGodot.choices.map(
      convertDialogueNodeGodotChoiceOptionToDialogueNodeChoiceOption
    ),
  };
}

export function convertDialogueNodeGodotToDialogueNode(
  dialogueNodeId: string,
  dialogueNodeGodot: DialogueNodeGodot
): DialogueNode {
  switch (dialogueNodeGodot.type) {
    case "CONTROL.RANDOM":
      return convertDialogueNodeGodotControlRandomToDialogueNodeControlRandom(
        dialogueNodeId,
        dialogueNodeGodot
      );
    case "CONTROL.IF":
      return convertDialogueNodeGodotControlIFToDialogueNodeControlIF(
        dialogueNodeId,
        dialogueNodeGodot
      );
    case "CHOICE":
      return convertDialogueNodeGodotChoiceToDialogueNodeChoice(
        dialogueNodeId,
        dialogueNodeGodot
      );
    case "DIALOGUE":
      return convertDialogueNodeGodotDialogueToDialogueNodeDialogue(
        dialogueNodeId,
        dialogueNodeGodot
      );
  }
}

export function convertDialogueNodeGodotsToDialogueNodes(
  dialogueNodeGodots: DialogueNodeGodots
): DialogueNodes {
  return Object.fromEntries(
    Object.entries(dialogueNodeGodots).map(
      ([dialogueNodeId, dialogueNodeGodot]) => [
        dialogueNodeId,
        convertDialogueNodeGodotToDialogueNode(
          dialogueNodeId,
          dialogueNodeGodot
        ),
      ]
    )
  );
}

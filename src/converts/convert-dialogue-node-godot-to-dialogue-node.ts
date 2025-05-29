import type {
  DialogueNode,
  DialogueNodeChoice,
  DialogueNodeChoiceOption,
  DialogueNodeControlRandom,
  DialogueNodeDialogue,
  DialogueNodes,
} from "../entities/dialogue-node";
import type {
  DialogueNodeGodot,
  DialogueNodeGodotChoice,
  DialogueNodeGodotChoiceOption,
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
  if (dialogueNodeGodot.type === "CONTROL.RANDOM") {
    return convertDialogueNodeGodotControlRandomToDialogueNodeControlRandom(
      dialogueNodeId,
      dialogueNodeGodot
    );
  }

  if (dialogueNodeGodot.type === "CHOICE") {
    return convertDialogueNodeGodotChoiceToDialogueNodeChoice(
      dialogueNodeId,
      dialogueNodeGodot
    );
  }

  return convertDialogueNodeGodotDialogueToDialogueNodeDialogue(
    dialogueNodeId,
    dialogueNodeGodot
  );
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

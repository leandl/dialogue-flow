import type {
  DialogueNode,
  DialogueNodeChoice,
  DialogueNodeChoiceOption,
  DialogueNodeControlAction,
  DialogueNodeControlEvent,
  DialogueNodeControlIF,
  DialogueNodeControlRandom,
  DialogueNodeDialogue,
  DialogueNodes,
  DialogueNodeVoiceOver,
} from "../entities/dialogue-node";
import {
  DialogueNodeGodotName,
  type DialogueNodeGodot,
  type DialogueNodeGodotChoice,
  type DialogueNodeGodotChoiceOption,
  type DialogueNodeGodotControlAction,
  type DialogueNodeGodotControlEvent,
  type DialogueNodeGodotControlIF,
  type DialogueNodeGodotControlRandom,
  type DialogueNodeGodotDialogue,
  type DialogueNodeGodots,
  type DialogueNodeGodotVoiceOver,
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
  dialogueNodeId: string,
  dialogueNodeGodot: DialogueNodeGodotControlIF
): DialogueNodeControlIF {
  return {
    id: dialogueNodeId,
    type: "CONTROL.IF",
    condition: dialogueNodeGodot.condition,
    next: {
      true:
        dialogueNodeGodot.next_true !== DialogueNodeGodotName.END
          ? dialogueNodeGodot.next_true
          : null,
      false:
        dialogueNodeGodot.next_false !== DialogueNodeGodotName.END
          ? dialogueNodeGodot.next_false
          : null,
    },
  };
}

export function convertDialogueNodeGodotControlActionToDialogueNodeControlAction(
  dialogueNodeId: string,
  dialogueNodeGodot: DialogueNodeGodotControlAction
): DialogueNodeControlAction {
  return {
    id: dialogueNodeId,
    type: "CONTROL.ACTION",
    action: dialogueNodeGodot.action,
    next:
      dialogueNodeGodot.next !== DialogueNodeGodotName.END
        ? dialogueNodeGodot.next
        : null,
  };
}

export function convertDialogueNodeGodotControlEventToDialogueNodeControlEvent(
  dialogueNodeId: string,
  dialogueNodeGodot: DialogueNodeGodotControlEvent
): DialogueNodeControlEvent {
  return {
    id: dialogueNodeId,
    type: "CONTROL.EVENT",
    eventName: dialogueNodeGodot["event-name"],
    next:
      dialogueNodeGodot.next !== DialogueNodeGodotName.END
        ? dialogueNodeGodot.next
        : null,
  };
}

export function convertDialogueNodeGodotDialogueToDialogueNodeDialogue(
  dialogueNodeId: string,
  dialogueNodeGodot: DialogueNodeGodotDialogue
): DialogueNodeDialogue {
  return {
    id: dialogueNodeId,
    type: "DIALOGUE",
    character: dialogueNodeGodot.character,
    text: dialogueNodeGodot.text,
    next:
      dialogueNodeGodot.next !== DialogueNodeGodotName.END
        ? dialogueNodeGodot.next
        : null,
  };
}

export function convertDialogueNodeGodotChoiceOptionToDialogueNodeChoiceOption(
  dialogueNodeChoiceOptionGodot: DialogueNodeGodotChoiceOption
): DialogueNodeChoiceOption {
  return {
    text: dialogueNodeChoiceOptionGodot.text,
    next:
      dialogueNodeChoiceOptionGodot.next !== DialogueNodeGodotName.END
        ? dialogueNodeChoiceOptionGodot.next
        : null,
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

export function convertDialogueNodeGodotVoiceOverToDialogueNodeVoiceOver(
  dialogueNodeId: string,
  dialogueNodeGodot: DialogueNodeGodotVoiceOver
): DialogueNodeVoiceOver {
  return {
    id: dialogueNodeId,
    type: "VOICE-OVER",
    voiceOverType: dialogueNodeGodot["voice-over-type"],
    data: dialogueNodeGodot.data,
    next:
      dialogueNodeGodot.next !== DialogueNodeGodotName.END
        ? dialogueNodeGodot.next
        : null,
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
    case "CONTROL.ACTION":
      return convertDialogueNodeGodotControlActionToDialogueNodeControlAction(
        dialogueNodeId,
        dialogueNodeGodot
      );
    case "CONTROL.EVENT":
      return convertDialogueNodeGodotControlEventToDialogueNodeControlEvent(
        dialogueNodeId,
        dialogueNodeGodot
      );

    case "DIALOGUE":
      return convertDialogueNodeGodotDialogueToDialogueNodeDialogue(
        dialogueNodeId,
        dialogueNodeGodot
      );
    case "CHOICE":
      return convertDialogueNodeGodotChoiceToDialogueNodeChoice(
        dialogueNodeId,
        dialogueNodeGodot
      );
    case "VOICE-OVER":
      return convertDialogueNodeGodotVoiceOverToDialogueNodeVoiceOver(
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

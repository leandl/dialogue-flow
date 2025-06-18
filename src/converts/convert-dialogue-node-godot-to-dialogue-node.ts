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
import type {
  DialogueNodeGodot,
  DialogueNodeGodotChoice,
  DialogueNodeGodotChoiceOption,
  DialogueNodeGodotControlAction,
  DialogueNodeGodotControlEvent,
  DialogueNodeGodotControlIF,
  DialogueNodeGodotControlRandom,
  DialogueNodeGodotDialogue,
  DialogueNodeGodots,
  DialogueNodeGodotVoiceOver,
} from "../entities/dialogue-node-godot";

export function convertDialogueNodeGodotControlRandomToDialogueNodeControlRandom(
  dialogueNodeControlRandomId: string,
  dialogueNodeControlRandomGodot: DialogueNodeGodotControlRandom,
): DialogueNodeControlRandom {
  return {
    id: dialogueNodeControlRandomId,
    type: "CONTROL.RANDOM",
    nexts: dialogueNodeControlRandomGodot.nexts,
  };
}

export function convertDialogueNodeGodotControlIFToDialogueNodeControlIF(
  dialogueNodeControlIFId: string,
  dialogueNodeControlIFGodot: DialogueNodeGodotControlIF,
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

export function convertDialogueNodeGodotControlActionToDialogueNodeControlAction(
  dialogueNodeControlActionId: string,
  dialogueNodeControlActionGodot: DialogueNodeGodotControlAction,
): DialogueNodeControlAction {
  return {
    id: dialogueNodeControlActionId,
    type: "CONTROL.ACTION",
    action: dialogueNodeControlActionGodot.action,
    next: dialogueNodeControlActionGodot.next,
  };
}

export function convertDialogueNodeGodotControlEventToDialogueNodeControlEvent(
  dialogueNodeControlEventId: string,
  dialogueNodeControlEventGodot: DialogueNodeGodotControlEvent,
): DialogueNodeControlEvent {
  return {
    id: dialogueNodeControlEventId,
    type: "CONTROL.EVENT",
    eventName: dialogueNodeControlEventGodot["event-name"],
    next: dialogueNodeControlEventGodot.next,
  };
}

export function convertDialogueNodeGodotDialogueToDialogueNodeDialogue(
  dialogueNodeDialogueId: string,
  dialogueNodeDialogueGodot: DialogueNodeGodotDialogue,
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
  dialogueNodeChoiceOptionGodot: DialogueNodeGodotChoiceOption,
): DialogueNodeChoiceOption {
  return {
    text: dialogueNodeChoiceOptionGodot.text,
    next: dialogueNodeChoiceOptionGodot.next,
  };
}

export function convertDialogueNodeGodotChoiceToDialogueNodeChoice(
  dialogueNodeChoiceId: string,
  dialogueNodeChoiceGodot: DialogueNodeGodotChoice,
): DialogueNodeChoice {
  return {
    id: dialogueNodeChoiceId,
    type: "CHOICE",
    character: dialogueNodeChoiceGodot.character,
    text: dialogueNodeChoiceGodot.text,
    choices: dialogueNodeChoiceGodot.choices.map(
      convertDialogueNodeGodotChoiceOptionToDialogueNodeChoiceOption,
    ),
  };
}

export function convertDialogueNodeGodotVoiceOverToDialogueNodeVoiceOver(
  dialogueNodeVoiceOverId: string,
  dialogueNodeVoiceOverGodot: DialogueNodeGodotVoiceOver,
): DialogueNodeVoiceOver {
  return {
    id: dialogueNodeVoiceOverId,
    type: "VOICE-OVER",
    voiceOverType: dialogueNodeVoiceOverGodot.voiceOverType,
    data: dialogueNodeVoiceOverGodot.data,
    next: dialogueNodeVoiceOverGodot.next,
  };
}
export function convertDialogueNodeGodotToDialogueNode(
  dialogueNodeId: string,
  dialogueNodeGodot: DialogueNodeGodot,
): DialogueNode {
  switch (dialogueNodeGodot.type) {
    case "CONTROL.RANDOM":
      return convertDialogueNodeGodotControlRandomToDialogueNodeControlRandom(
        dialogueNodeId,
        dialogueNodeGodot,
      );
    case "CONTROL.IF":
      return convertDialogueNodeGodotControlIFToDialogueNodeControlIF(
        dialogueNodeId,
        dialogueNodeGodot,
      );
    case "CONTROL.ACTION":
      return convertDialogueNodeGodotControlActionToDialogueNodeControlAction(
        dialogueNodeId,
        dialogueNodeGodot,
      );
    case "CONTROL.EVENT":
      return convertDialogueNodeGodotControlEventToDialogueNodeControlEvent(
        dialogueNodeId,
        dialogueNodeGodot,
      );

    case "DIALOGUE":
      return convertDialogueNodeGodotDialogueToDialogueNodeDialogue(
        dialogueNodeId,
        dialogueNodeGodot,
      );
    case "CHOICE":
      return convertDialogueNodeGodotChoiceToDialogueNodeChoice(
        dialogueNodeId,
        dialogueNodeGodot,
      );
    case "VOICE-OVER":
      return convertDialogueNodeGodotVoiceOverToDialogueNodeVoiceOver(
        dialogueNodeId,
        dialogueNodeGodot,
      );
  }
}

export function convertDialogueNodeGodotsToDialogueNodes(
  dialogueNodeGodots: DialogueNodeGodots,
): DialogueNodes {
  return Object.fromEntries(
    Object.entries(dialogueNodeGodots).map(
      ([dialogueNodeId, dialogueNodeGodot]) => [
        dialogueNodeId,
        convertDialogueNodeGodotToDialogueNode(
          dialogueNodeId,
          dialogueNodeGodot,
        ),
      ],
    ),
  );
}

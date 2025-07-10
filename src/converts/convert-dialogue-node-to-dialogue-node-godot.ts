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
    next_false: node.next.false || DialogueNodeGodotName.END,
    next_true: node.next.true || DialogueNodeGodotName.END,
  };
}

export function convertDialogueNodeControlActionToDialogueNodeGodotControlAction(
  node: DialogueNodeControlAction
): DialogueNodeGodotControlAction {
  return {
    type: "CONTROL.ACTION",
    action: node.action,
    next: node.next || DialogueNodeGodotName.END,
  };
}

export function convertDialogueNodeControlEventToDialogueNodeGodotControlEvent(
  node: DialogueNodeControlEvent
): DialogueNodeGodotControlEvent {
  return {
    type: "CONTROL.EVENT",
    "event-name": node.eventName,
    next: node.next || DialogueNodeGodotName.END,
  };
}

export function convertDialogueNodeDialogueToDialogueNodeGodotDialogue(
  node: DialogueNodeDialogue
): DialogueNodeGodotDialogue {
  return {
    type: "DIALOGUE",
    character: node.character as string,
    text: node.text,
    next: node.next || DialogueNodeGodotName.END,
  };
}

export function convertDialogueNodeChoiceOptionToDialogueNodeGodotChoiceOption(
  option: DialogueNodeChoiceOption
): DialogueNodeGodotChoiceOption {
  return {
    text: option.text,
    next: option.next || DialogueNodeGodotName.END,
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

export function convertDialogueNodeVoiceOverToDialogueNodeGodotVoiceOver(
  node: DialogueNodeVoiceOver
): DialogueNodeGodotVoiceOver {
  return {
    type: "VOICE-OVER",
    "voice-over-type": node.voiceOverType,
    data: node.data,
    next: node.next || DialogueNodeGodotName.END,
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
    case "CONTROL.ACTION":
      return convertDialogueNodeControlActionToDialogueNodeGodotControlAction(
        node
      );
    case "CONTROL.EVENT":
      return convertDialogueNodeControlEventToDialogueNodeGodotControlEvent(
        node
      );

    case "DIALOGUE":
      return convertDialogueNodeDialogueToDialogueNodeGodotDialogue(node);
    case "CHOICE":
      return convertDialogueNodeChoiceToDialogueNodeGodotChoice(node);
    case "VOICE-OVER":
      return convertDialogueNodeVoiceOverToDialogueNodeGodotVoiceOver(node);
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

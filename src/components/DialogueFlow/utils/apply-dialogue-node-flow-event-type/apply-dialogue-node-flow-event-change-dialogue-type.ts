import type {
  DialogueNodeFlow,
  DialogueNodeFlowType,
} from "../../../../entities/dialogue-node-flow";
import type {
  DialogueNodeFlowEvent,
  DialogueNodeFlowEventType,
} from "../../../../entities/dialogue-node-flow-event";
import { VoiceOverType } from "../../../../entities/voice-over";
import { createDialogueNodeFlowChoice } from "../create-dialogue-node-flow/create-dialogue-node-flow-choice";
import { createDialogueNodeFlowControlAction } from "../create-dialogue-node-flow/create-dialogue-node-flow-control-action";
import { createDialogueNodeFlowControlEvent } from "../create-dialogue-node-flow/create-dialogue-node-flow-control-event";
import { createDialogueNodeFlowControlIF } from "../create-dialogue-node-flow/create-dialogue-node-flow-control-if";
import { createDialogueNodeFlowControlRandom } from "../create-dialogue-node-flow/create-dialogue-node-flow-control-random";
import { createDialogueNodeFlowDialogue } from "../create-dialogue-node-flow/create-dialogue-node-flow-dialogue";
import { createDialogueNodeFlowVoiceOver } from "../create-dialogue-node-flow/create-dialogue-node-flow-voice-over";
import {
  isDialogueNodeFlow,
  isDialogueNodeFlowVoiceOver,
  updateData,
  updateDialogueNodeFlowData,
} from "../functions";
import type { DialogueNodeFlowOptions } from "../types";

type FunctionCreateDailogueNodeFlow<T extends DialogueNodeFlowType> = (
  nodeId: string,
  options?: DialogueNodeFlowOptions
) => DialogueNodeFlow<T>;

const createDailogueNodeFlowByType: {
  [T in DialogueNodeFlowType]: FunctionCreateDailogueNodeFlow<T>;
} = {
  "CONTROL.ACTION": createDialogueNodeFlowControlAction,
  "CONTROL.IF": createDialogueNodeFlowControlIF,
  "CONTROL.EVENT": createDialogueNodeFlowControlEvent,
  "CONTROL.RANDOM": createDialogueNodeFlowControlRandom,

  DIALOGUE: createDialogueNodeFlowDialogue,
  CHOICE: createDialogueNodeFlowChoice,
  "VOICE-OVER": createDialogueNodeFlowVoiceOver,
};

export function applyDialogueNodeFlowEventChangeDialogueType(
  event: DialogueNodeFlowEvent<DialogueNodeFlowEventType.CHANGE_DIALOGUE_TYPE>,
  nodes: DialogueNodeFlow[]
): DialogueNodeFlow[] {
  return nodes.map((node) => {
    if (node.data.id !== event.dialogueId) {
      return node;
    }

    const createDailogueNodeFlow =
      createDailogueNodeFlowByType[event.dialogueType];
    const newNode = createDailogueNodeFlow(node.id, {
      dragging: node.dragging,
      measured: node.measured,
      position: node.position,
    });

    if (
      (isDialogueNodeFlow("CHOICE", node) &&
        isDialogueNodeFlow("DIALOGUE", newNode)) ||
      (isDialogueNodeFlow("DIALOGUE", node) &&
        isDialogueNodeFlow("CHOICE", newNode))
    ) {
      return updateDialogueNodeFlowData(newNode, {
        character: node.data.character,
        text: node.data.text,
      });
    }

    if (
      (isDialogueNodeFlow("CHOICE", node) &&
        isDialogueNodeFlowVoiceOver(VoiceOverType.CHARACTER, newNode)) ||
      (isDialogueNodeFlow("DIALOGUE", node) &&
        isDialogueNodeFlowVoiceOver(VoiceOverType.CHARACTER, newNode))
    ) {
      return updateDialogueNodeFlowData(newNode, {
        content: updateData(newNode.data.content, {
          character: node.data.character,
          text: node.data.text,
        }),
      });
    }

    if (
      (isDialogueNodeFlowVoiceOver(VoiceOverType.CHARACTER, node) &&
        isDialogueNodeFlow("CHOICE", newNode)) ||
      (isDialogueNodeFlowVoiceOver(VoiceOverType.CHARACTER, node) &&
        isDialogueNodeFlow("DIALOGUE", newNode))
    ) {
      return updateDialogueNodeFlowData(newNode, {
        character: node.data.content.character,
        text: node.data.content.text,
      });
    }

    return newNode;
  });
}

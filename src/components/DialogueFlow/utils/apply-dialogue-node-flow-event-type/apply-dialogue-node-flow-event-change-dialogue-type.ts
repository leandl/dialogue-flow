import type {
  DialogueNodeFlow,
  DialogueNodeFlowType,
} from "../../../../entities/dialogue-node-flow";
import type {
  DialogueNodeFlowEvent,
  DialogueNodeFlowEventType,
} from "../../../../entities/dialogue-node-flow-event";
import { createDialogueNodeFlowChoice } from "../create-dialogue-node-flow/create-dialogue-node-flow-choice";
import { createDialogueNodeFlowControlAction } from "../create-dialogue-node-flow/create-dialogue-node-flow-control-action";
import { createDialogueNodeFlowControlEvent } from "../create-dialogue-node-flow/create-dialogue-node-flow-control-event";
import { createDialogueNodeFlowControlIF } from "../create-dialogue-node-flow/create-dialogue-node-flow-control-if";
import { createDialogueNodeFlowControlRandom } from "../create-dialogue-node-flow/create-dialogue-node-flow-control-random";
import { createDialogueNodeFlowDialogue } from "../create-dialogue-node-flow/create-dialogue-node-flow-dialogue";
import { isDialogueNodeFlow, updateDialogueNodeFlowData } from "../functions";
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

  CHOICE: createDialogueNodeFlowChoice,
  DIALOGUE: createDialogueNodeFlowDialogue,
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
      (isDialogueNodeFlow("DIALOGUE", newNode) &&
        node.data.type === "CHOICE") ||
      (isDialogueNodeFlow("CHOICE", newNode) && node.data.type === "DIALOGUE")
    ) {
      return updateDialogueNodeFlowData(newNode, {
        character: node.data.character,
        text: node.data.text,
      });
    }

    return newNode;
  });
}

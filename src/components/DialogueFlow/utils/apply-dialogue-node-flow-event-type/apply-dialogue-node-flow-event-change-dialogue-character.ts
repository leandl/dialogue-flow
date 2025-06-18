import type { NodeFlow } from "../../../../entities/dialogue-node-flow";
import type {
  DialogueNodeFlowEvent,
  DialogueNodeFlowEventType,
} from "../../../../entities/dialogue-node-flow-event";
import { VoiceOverType } from "../../../../entities/voice-over";
import { isDialogueNodeFlow, updateData, updateDialogueNodeFlowData } from "../functions";

export function applyDialogueNodeFlowEventChangeDialogueCharacter(
  event: DialogueNodeFlowEvent<DialogueNodeFlowEventType.CHANGE_DIALOGUE_CHARACTER>,
  nodes: NodeFlow[]
): NodeFlow[] {
  return nodes.map((node) => {
    if (node.data.id !== event.dialogueId ) {
      return node;
    }

    if (
      isDialogueNodeFlow("DIALOGUE", node) ||
      isDialogueNodeFlow("CHOICE", node)
    ) {
      return updateDialogueNodeFlowData(node, {
        character: event.character,
      });
    }

    if (
      isDialogueNodeFlow("VOICE-OVER", node) &&
      node.data.voiceOverType === VoiceOverType.CHARACTER 
    ) {
      return updateDialogueNodeFlowData(node, {
        content: updateData(node.data.content, {
          character: event.character
        }),
      });
    }

    return node;
  });
}

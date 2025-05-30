import type {
  EdgeFlow,
} from "../../../../entities/dialogue-node-flow";
import type {
  DialogueNodeFlowEvent,
  DialogueNodeFlowEventType,
} from "../../../../entities/dialogue-node-flow-event";



export function applyDialogueEdgeFlowEventChangeDialogueType(
  event: DialogueNodeFlowEvent<DialogueNodeFlowEventType.CHANGE_DIALOGUE_TYPE>,
  edges: EdgeFlow[]
): EdgeFlow[] {
  return edges.filter(((edge) => edge.source !== event.dialogueId));
}

import type { EdgeFlow } from "../../../../entities/dialogue-node-flow";
import type {
  DialogueNodeFlowEvent,
  DialogueNodeFlowEventType,
} from "../../../../entities/dialogue-node-flow-event";

export function applyNothingDialogueEdgeFlowEvent<
  T extends DialogueNodeFlowEventType
>(_event: DialogueNodeFlowEvent<T>, edges: EdgeFlow[]): EdgeFlow[] {
  return edges;
}

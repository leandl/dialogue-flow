import type { NodeFlow } from "../../../../entities/dialogue-node-flow";
import type {
  DialogueNodeFlowEvent,
  DialogueNodeFlowEventType,
} from "../../../../entities/dialogue-node-flow-event";

export function applyNothingDialogueNodeFlowEvent<
  T extends DialogueNodeFlowEventType,
>(_event: DialogueNodeFlowEvent<T>, nodes: NodeFlow[]): NodeFlow[] {
  return nodes;
}

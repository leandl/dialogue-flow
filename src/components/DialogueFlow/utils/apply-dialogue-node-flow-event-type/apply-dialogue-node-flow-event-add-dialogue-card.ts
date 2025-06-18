import type { DialogueNodeFlow } from "../../../../entities/dialogue-node-flow";
import type {
  DialogueNodeFlowEvent,
  DialogueNodeFlowEventType,
} from "../../../../entities/dialogue-node-flow-event";
import { createDialogueNodeFlowDialogue } from "../create-dialogue-node-flow/create-dialogue-node-flow-dialogue";

export function applyDialogueNodeFlowEventAddDialogueCard(
  event: DialogueNodeFlowEvent<DialogueNodeFlowEventType.ADD_DIALOGUE_CARD>,
  nodes: DialogueNodeFlow[],
): DialogueNodeFlow[] {
  const dateNow = Date.now();
  const nodeId = nodes.length === 0 ? "MAIN" : `node-${dateNow}`;

  const newNode = createDialogueNodeFlowDialogue(nodeId, {
    position: event.position,
  });

  return [...nodes, newNode];
}

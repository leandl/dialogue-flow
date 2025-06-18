import type { EdgeFlow } from "../../../../entities/dialogue-node-flow";
import type {
  DialogueNodeFlowEvent,
  DialogueNodeFlowEventType,
} from "../../../../entities/dialogue-node-flow-event";

export function applyDialogueEdgeFlowEventConnectionDialogueCard(
  event: DialogueNodeFlowEvent<DialogueNodeFlowEventType.CONNECTION_DIALOGUE_CARD>,
  edges: EdgeFlow[],
): EdgeFlow[] {
  if (event.from === event.to) {
    return edges;
  }

  const edgeFiltered = edges.filter(
    (edge) => edge.sourceHandle !== event.sourceId,
  );

  return [
    ...edgeFiltered,
    {
      id: `edge-${event.sourceId}-${event.targetId}`,
      source: event.from,
      sourceHandle: event.sourceId,
      target: event.to,
      targetHandle: event.targetId,
    },
  ];
}

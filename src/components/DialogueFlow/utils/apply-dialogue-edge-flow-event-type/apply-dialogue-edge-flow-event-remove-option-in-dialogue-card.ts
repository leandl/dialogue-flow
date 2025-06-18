import type {
  EdgeFlow,
  NodeFlowSubSourceId,
} from "../../../../entities/dialogue-node-flow";
import type {
  DialogueNodeFlowEvent,
  DialogueNodeFlowEventType,
} from "../../../../entities/dialogue-node-flow-event";
import {
  convertNodeFlowSubSourceIdToIndex,
  createNodeFlowSubSourceId,
} from "../functions";

export function applyDialogueEdgeFlowEventRemoveOptionInDialogueCard(
  event: DialogueNodeFlowEvent<DialogueNodeFlowEventType.REMOVE_OPTION_IN_DIALOGUE_CARD>,
  edges: EdgeFlow[],
): EdgeFlow[] {
  const currentNodeEdges: EdgeFlow[] = [];
  const anotherEdges: EdgeFlow[] = [];

  for (const edge of edges) {
    if (edge.source === event.dialogueId) {
      currentNodeEdges.push(edge);
    } else {
      anotherEdges.push(edge);
    }
  }

  const updatedEdges: EdgeFlow[] = [];
  for (let i = 0; i < currentNodeEdges.length; i++) {
    const edge = currentNodeEdges[i];

    if (edge.sourceHandle === event.sourceId) {
      continue;
    }

    const currentIndex = convertNodeFlowSubSourceIdToIndex(
      edge.sourceHandle as NodeFlowSubSourceId,
    );

    if (currentIndex < event.index) {
      updatedEdges.push(edge);
      continue;
    }

    const newSourceId = createNodeFlowSubSourceId(
      edge.source,
      currentIndex - 1,
    );

    updatedEdges.push({
      ...edge,
      id: `edge-${newSourceId}-${edge.targetHandle}`,
      sourceHandle: newSourceId,
    });
  }

  return [...anotherEdges, ...updatedEdges];
}

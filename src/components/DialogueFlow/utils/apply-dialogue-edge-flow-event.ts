import type { EdgeFlow } from "../../../entities/dialogue-node-flow";
import {
  type DialogueNodeFlowEvent,
  DialogueNodeFlowEventType,
} from "../../../entities/dialogue-node-flow-event";
import { applyDialogueEdgeFlowEventChangeDialogueType } from "./apply-dialogue-edge-flow-event-type/apply-dialogue-edge-flow-event-change-dialogue-type";
import { applyNothingDialogueEdgeFlowEvent } from "./apply-dialogue-edge-flow-event-type/apply-nothing-dialogue-edge-flow-event";
// import { applyDialogueEdgeFlowEventChangeDialogueCharacter } from "./apply-dialogue-node-flow-event-type/apply-dialogue-node-flow-event-change-dialogue-character";
// import { applyDialogueEdgeFlowEventChangeDialogueText } from "./apply-dialogue-node-flow-event-type/apply-dialogue-node-flow-event-change-dialogue-text";
// import { applyDialogueEdgeFlowEventChangeDialogueType } from "./apply-dialogue-node-flow-event-type/apply-dialogue-node-flow-event-change-dialogue-type";
// import { applyDialogueEdgeFlowEventDimensionDialogueCard } from "./apply-dialogue-node-flow-event-type/apply-dialogue-node-flow-event-dimension-dialogue-card";
// import { applyDialogueEdgeFlowEventMoveDialogueCard } from "./apply-dialogue-node-flow-event-type/apply-dialogue-node-flow-event-move-dialogue-card";

type FunctionApplyDialogueEdgeFlowEvent<T extends DialogueNodeFlowEventType> = (
  event: DialogueNodeFlowEvent<T>,
  edges: EdgeFlow[]
) => EdgeFlow[];

const applyDialogueEdgeFlowEventByEventType: {
  [T in DialogueNodeFlowEventType]: FunctionApplyDialogueEdgeFlowEvent<T>;
} = {
  [DialogueNodeFlowEventType.MOVE_DIALOGUE_CARD]:
  applyNothingDialogueEdgeFlowEvent,
  [DialogueNodeFlowEventType.DIMENSION_DIALOGUE_CARD]:
  applyNothingDialogueEdgeFlowEvent,

  // Dialogue
  [DialogueNodeFlowEventType.CHANGE_DIALOGUE_CHARACTER]:
  applyNothingDialogueEdgeFlowEvent,
  [DialogueNodeFlowEventType.CHANGE_DIALOGUE_TEXT]:
  applyNothingDialogueEdgeFlowEvent,
  [DialogueNodeFlowEventType.CHANGE_DIALOGUE_TYPE]:
  applyDialogueEdgeFlowEventChangeDialogueType,
};

export function applyDialogueEdgeFlowEvent<T extends DialogueNodeFlowEventType>(
  event: DialogueNodeFlowEvent<T>,
  edges: EdgeFlow[]
): EdgeFlow[] {
  const functionApplyDialogueEdgeFlowEvent =
    applyDialogueEdgeFlowEventByEventType[
      event.type
    ] as FunctionApplyDialogueEdgeFlowEvent<T>;
  return functionApplyDialogueEdgeFlowEvent(event, edges);
}

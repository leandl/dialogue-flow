import type { EdgeFlow } from "../../../entities/dialogue-node-flow";
import {
  type DialogueNodeFlowEvent,
  DialogueNodeFlowEventType,
} from "../../../entities/dialogue-node-flow-event";
import { applyDialogueEdgeFlowEventChangeDialogueType } from "./apply-dialogue-edge-flow-event-type/apply-dialogue-edge-flow-event-change-dialogue-type";
import { applyDialogueEdgeFlowEventConnectionDialogueCard } from "./apply-dialogue-edge-flow-event-type/apply-dialogue-edge-flow-event-connection-dialogue-card";
import { applyDialogueEdgeFlowEventRemoveOptionInDialogueCard } from "./apply-dialogue-edge-flow-event-type/apply-dialogue-edge-flow-event-remove-option-in-dialogue-card";
import { applyNothingDialogueEdgeFlowEvent } from "./apply-dialogue-edge-flow-event-type/apply-nothing-dialogue-edge-flow-event";

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
  [DialogueNodeFlowEventType.CONNECTION_DIALOGUE_CARD]:
    applyDialogueEdgeFlowEventConnectionDialogueCard,

  // Dialogue
  [DialogueNodeFlowEventType.ADD_DIALOGUE_CARD]:
    applyNothingDialogueEdgeFlowEvent,
  [DialogueNodeFlowEventType.CHANGE_DIALOGUE_CHARACTER]:
    applyNothingDialogueEdgeFlowEvent,
  [DialogueNodeFlowEventType.CHANGE_DIALOGUE_TEXT]:
    applyNothingDialogueEdgeFlowEvent,
  [DialogueNodeFlowEventType.CHANGE_DIALOGUE_TYPE]:
    applyDialogueEdgeFlowEventChangeDialogueType,

  [DialogueNodeFlowEventType.ADD_OPTION_IN_DIALOGUE_CARD]:
    applyNothingDialogueEdgeFlowEvent,
  [DialogueNodeFlowEventType.REMOVE_OPTION_IN_DIALOGUE_CARD]:
    applyDialogueEdgeFlowEventRemoveOptionInDialogueCard,
  [DialogueNodeFlowEventType.CHANGE_OPTION_TEXT_IN_DIALOGUE_CARD]:
    applyNothingDialogueEdgeFlowEvent,
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

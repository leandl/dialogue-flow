import type { NodeFlow } from "../../../entities/dialogue-node-flow";
import {
  type DialogueNodeFlowEvent,
  DialogueNodeFlowEventType,
} from "../../../entities/dialogue-node-flow-event";
import { applyDialogueNodeFlowEventAddDialogueCard } from "./apply-dialogue-node-flow-event-type/apply-dialogue-node-flow-event-add-dialogue-card";
import { applyDialogueNodeFlowEventAddOptionInDialogueCard } from "./apply-dialogue-node-flow-event-type/apply-dialogue-node-flow-event-add-option-in-dialogue-card";
import { applyDialogueNodeFlowEventChangeDialogueCharacter } from "./apply-dialogue-node-flow-event-type/apply-dialogue-node-flow-event-change-dialogue-character";
import { applyDialogueNodeFlowEventChangeDialogueText } from "./apply-dialogue-node-flow-event-type/apply-dialogue-node-flow-event-change-dialogue-text";
import { applyDialogueNodeFlowEventChangeDialogueType } from "./apply-dialogue-node-flow-event-type/apply-dialogue-node-flow-event-change-dialogue-type";
import { applyDialogueNodeFlowEventConnectionDialogueCard } from "./apply-dialogue-node-flow-event-type/apply-dialogue-node-flow-event-connection-dialogue-card";
import { applyDialogueNodeFlowEventDimensionDialogueCard } from "./apply-dialogue-node-flow-event-type/apply-dialogue-node-flow-event-dimension-dialogue-card";
import { applyDialogueNodeFlowEventMoveDialogueCard } from "./apply-dialogue-node-flow-event-type/apply-dialogue-node-flow-event-move-dialogue-card";
import { applyDialogueNodeFlowEventRemoveOptionInDialogueCard } from "./apply-dialogue-node-flow-event-type/apply-dialogue-node-flow-event-remove-option-in-dialogue-card";
// import { applyNothingDialogueNodeFlowEvent } from "./apply-dialogue-node-flow-event-type/apply-nothing-dialogue-node-flow-event";

type FunctionApplyDialogueNodeFlowEvent<T extends DialogueNodeFlowEventType> = (
  event: DialogueNodeFlowEvent<T>,
  nodes: NodeFlow[]
) => NodeFlow[];

const applyDialogueNodeFlowEventByEventType: {
  [T in DialogueNodeFlowEventType]: FunctionApplyDialogueNodeFlowEvent<T>;
} = {
  [DialogueNodeFlowEventType.MOVE_DIALOGUE_CARD]:
    applyDialogueNodeFlowEventMoveDialogueCard,
  [DialogueNodeFlowEventType.DIMENSION_DIALOGUE_CARD]:
    applyDialogueNodeFlowEventDimensionDialogueCard,
  [DialogueNodeFlowEventType.CONNECTION_DIALOGUE_CARD]:
    applyDialogueNodeFlowEventConnectionDialogueCard,

  // Dialogue
  [DialogueNodeFlowEventType.ADD_DIALOGUE_CARD]:
    applyDialogueNodeFlowEventAddDialogueCard,

  [DialogueNodeFlowEventType.CHANGE_DIALOGUE_CHARACTER]:
    applyDialogueNodeFlowEventChangeDialogueCharacter,
  [DialogueNodeFlowEventType.CHANGE_DIALOGUE_TEXT]:
    applyDialogueNodeFlowEventChangeDialogueText,
  [DialogueNodeFlowEventType.CHANGE_DIALOGUE_TYPE]:
    applyDialogueNodeFlowEventChangeDialogueType,

  [DialogueNodeFlowEventType.ADD_OPTION_IN_DIALOGUE_CARD]:
    applyDialogueNodeFlowEventAddOptionInDialogueCard,
  [DialogueNodeFlowEventType.REMOVE_OPTION_IN_DIALOGUE_CARD]:
    applyDialogueNodeFlowEventRemoveOptionInDialogueCard,
};

export function applyDialogueNodeFlowEvent<T extends DialogueNodeFlowEventType>(
  event: DialogueNodeFlowEvent<T>,
  nodes: NodeFlow[]
): NodeFlow[] {
  const functionApplyDialogueNodeFlowEvent =
    applyDialogueNodeFlowEventByEventType[
      event.type
    ] as FunctionApplyDialogueNodeFlowEvent<T>;
  return functionApplyDialogueNodeFlowEvent(event, nodes);
}

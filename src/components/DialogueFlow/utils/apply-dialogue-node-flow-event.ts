import type { NodeFlow } from "../../../entities/dialogue-node-flow";
import {
  type DialogueNodeFlowEvent,
  DialogueNodeFlowEventType,
} from "../../../entities/dialogue-node-flow-event";
import { applyDialogueNodeFlowEventChangeDialogueCharacter } from "./apply-dialogue-node-flow-event-type/apply-dialogue-node-flow-event-change-dialogue-character";
import { applyDialogueNodeFlowEventChangeDialogueText } from "./apply-dialogue-node-flow-event-type/apply-dialogue-node-flow-event-change-dialogue-text";
import { applyDialogueNodeFlowEventChangeDialogueType } from "./apply-dialogue-node-flow-event-type/apply-dialogue-node-flow-event-change-dialogue-type";
import { applyDialogueNodeFlowEventDimensionDialogueCard } from "./apply-dialogue-node-flow-event-type/apply-dialogue-node-flow-event-dimension-dialogue-card";
import { applyDialogueNodeFlowEventMoveDialogueCard } from "./apply-dialogue-node-flow-event-type/apply-dialogue-node-flow-event-move-dialogue-card";

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

  // Dialogue
  [DialogueNodeFlowEventType.CHANGE_DIALOGUE_CHARACTER]:
    applyDialogueNodeFlowEventChangeDialogueCharacter,
  [DialogueNodeFlowEventType.CHANGE_DIALOGUE_TEXT]:
    applyDialogueNodeFlowEventChangeDialogueText,
  [DialogueNodeFlowEventType.CHANGE_DIALOGUE_TYPE]:
    applyDialogueNodeFlowEventChangeDialogueType,
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

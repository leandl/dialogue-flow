import type { DialogueAction, DialogueOperator } from "./dialogue-logic";
import type { VoiceOverType } from "./voice-over";

export enum DialogueNodeGodotName {
  MAIN = "MAIN",
  END = "END",
}

export type DialogueNodeGodotControlRandom = {
  type: "CONTROL.RANDOM";
  nexts: Array<string | null>;
};

export type DialogueNodeGodotControlEvent = {
  type: "CONTROL.EVENT";
  "event-name": string;
  next: string | DialogueNodeGodotName.END;
};

export type DialogueNodeGodotControlIF = {
  type: "CONTROL.IF";
  condition: DialogueOperator;
  next_true: string | DialogueNodeGodotName.END;
  next_false: string | DialogueNodeGodotName.END;
};

export type DialogueNodeGodotControlAction = {
  type: "CONTROL.ACTION";
  action: DialogueAction;
  next: string | DialogueNodeGodotName.END;
};

export type DialogueNodeGodotDialogue = {
  type: "DIALOGUE";
  character: string;
  text: string;
  next: string | DialogueNodeGodotName.END;
};

export type DialogueNodeGodotChoiceOption = {
  text: string;
  next: string | DialogueNodeGodotName.END;
};

export type DialogueNodeGodotChoice = {
  type: "CHOICE";
  character: string;
  text: string;
  choices: DialogueNodeGodotChoiceOption[];
};

type DialogueNodeGodotVoiceOverData = {
  character: string | null;
  text: string;
};

type DialogueNodeGodotVoiceOverDataByVoiceOverType = {
  [VoiceOverType.CHARACTER]: DialogueNodeGodotVoiceOverData;
};

export type DialogueNodeGodotVoiceOver<
  T extends VoiceOverType = VoiceOverType,
> = {
  type: "VOICE-OVER";
  "voice-over-type": T;
  data: DialogueNodeGodotVoiceOverDataByVoiceOverType[T];
  next: string | DialogueNodeGodotName.END;
};

export type DialogueNodeGodot =
  | DialogueNodeGodotControlRandom
  | DialogueNodeGodotControlEvent
  | DialogueNodeGodotControlIF
  | DialogueNodeGodotControlAction
  | DialogueNodeGodotDialogue
  | DialogueNodeGodotChoice
  | DialogueNodeGodotVoiceOver;

export type DialogueNodeGodots = Record<string, DialogueNodeGodot>;

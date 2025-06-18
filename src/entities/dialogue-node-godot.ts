import type { DialogueAction, DialogueOperator } from "./dialogue-logic";
import type { VoiceOverType } from "./voice-over";

export type DialogueNodeGodotControlRandom = {
  type: "CONTROL.RANDOM";
  nexts: Array<string | null>;
};

export type DialogueNodeGodotControlEvent = {
  type: "CONTROL.EVENT";
  "event-name": string;
  next: string | null;
};

export type DialogueNodeGodotControlIF = {
  type: "CONTROL.IF";
  condition: DialogueOperator;
  next_true: string | null;
  next_false: string | null;
};

export type DialogueNodeGodotControlAction = {
  type: "CONTROL.ACTION";
  action: DialogueAction;
  next: string | null;
};

export type DialogueNodeGodotDialogue = {
  type: "DIALOGUE";
  character: string;
  text: string;
  next: string | null;
};

export type DialogueNodeGodotChoiceOption = {
  text: string;
  next: string | null;
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
  voiceOverType: T;
  data: DialogueNodeGodotVoiceOverDataByVoiceOverType[T];
  next: string | null;
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

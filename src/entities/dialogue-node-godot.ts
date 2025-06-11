import type { DialogueOperator } from "./dialogue-logic";

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

export type DialogueNodeGodot =
  | DialogueNodeGodotControlRandom
  | DialogueNodeGodotControlIF
  | DialogueNodeGodotControlEvent
  | DialogueNodeGodotDialogue
  | DialogueNodeGodotChoice;

export type DialogueNodeGodots = Record<string, DialogueNodeGodot>;

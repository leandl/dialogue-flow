import type { DialogueAction, DialogueOperator } from "./dialogue-logic";

export type DialogueNodeControlRandom = {
  id: string;
  type: "CONTROL.RANDOM";
  nexts: Array<string | null>;
};

export type DialogueNodeControlIF = {
  id: string;
  type: "CONTROL.IF";
  condition: DialogueOperator;
  next: {
    true: string | null;
    false: string | null;
  };
};

export type DialogueNodeControlEvent = {
  id: string;
  type: "CONTROL.EVENT";
  eventName: string;
  next: string | null;
};

export type DialogueNodeControlAction = {
  id: string;
  type: "CONTROL.ACTION";
  action: DialogueAction;
  next: string | null;
};

export type DialogueNodeDialogue = {
  id: string;
  type: "DIALOGUE";
  character: string | null;
  text: string;
  next: string | null;
};

export type DialogueNodeChoiceOption = {
  text: string;
  next: string | null;
};

export type DialogueNodeChoice = {
  id: string;
  type: "CHOICE";
  character: string | null;
  text: string;
  choices: DialogueNodeChoiceOption[];
};

export type DialogueNode =
  | DialogueNodeControlRandom
  | DialogueNodeControlIF
  | DialogueNodeControlAction
  | DialogueNodeControlEvent
  | DialogueNodeDialogue
  | DialogueNodeChoice;

export type DialogueNodes = Record<string, DialogueNode>;

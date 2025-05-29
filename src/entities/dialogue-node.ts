export type DialogueNodeControlRandom = {
  id: string;
  type: "CONTROL.RANDOM";
  nexts: Array<string | null>;
};

export type DialogueNodeDialogue = {
  id: string;
  type: "DIALOGUE";
  character: string;
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
  character: string;
  text: string;
  choices: DialogueNodeChoiceOption[];
};

export type DialogueNode =
  | DialogueNodeControlRandom
  | DialogueNodeDialogue
  | DialogueNodeChoice;

export type DialogueNodes = Record<string, DialogueNode>;

export type DialogueNodeGodotControlRandom = {
  type: "CONTROL.RANDOM";
  nexts: string[];
};

export type DialogueNodeGodotDialogue = {
  type: "DIALOGUE";
  character: string;
  text: string;
  next: string;
};

export type DialogueNodeGodotChoiceOption = {
  text: string;
  next: string;
};

export type DialogueNodeGodotChoice = {
  type: "CHOICE";
  character: string;
  text: string;
  choices: DialogueNodeGodotChoiceOption[];
};

export type DialogueNodeGodot =
  | DialogueNodeGodotControlRandom
  | DialogueNodeGodotDialogue
  | DialogueNodeGodotChoice;

export type DialogueNodeGodots = Record<string, DialogueNodeGodot>;

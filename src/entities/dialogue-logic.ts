export enum DialogueVarType {
  VAR_GAME = "VAR_GAME",
  VAR_CHARACTER = "VAR_CHARACTER",
}

type Nullable<T> = T | null;

export type DialogueVarCharacter = [
  "VAR_CHARACTER",
  Nullable<string>,
  Nullable<string>,
];
export type DialogueVarGame = ["VAR_GAME", Nullable<string>];

type DialogueVarByDialogueVarType = {
  [DialogueVarType.VAR_GAME]: DialogueVarGame;
  [DialogueVarType.VAR_CHARACTER]: DialogueVarCharacter;
};

export type DialogueVarValue<T extends DialogueVarType = DialogueVarType> =
  DialogueVarByDialogueVarType[T];

export enum DialogueDataType {
  BOOLEAN = "BOOLEAN",
  INTERGER = "INTERGER",
  STRING = "STRING",
}

export type DialogueDataBoolean = [DialogueDataType.BOOLEAN, boolean];
export type DialogueDataInterger = [DialogueDataType.INTERGER, number];
export type DialogueDataString = [DialogueDataType.STRING, string];

type DialogueDataValueByDialogueDataType = {
  [DialogueDataType.BOOLEAN]: DialogueDataBoolean;
  [DialogueDataType.INTERGER]: DialogueDataInterger;
  [DialogueDataType.STRING]: DialogueDataString;
};

export type DialogueDataValue<T extends DialogueDataType = DialogueDataType> =
  DialogueDataValueByDialogueDataType[T];

export type DialogueSourceDataType = DialogueDataType | DialogueVarType;
export type DialogueSourceData<
  T extends DialogueSourceDataType = DialogueSourceDataType,
> = T extends DialogueDataType
  ? DialogueDataValue<T>
  : T extends DialogueVarType
    ? DialogueVarValue<T>
    : never;

// =============================

export type DialogueOperatorComparatorType =
  | "EQUAL"
  | "NOT_EQUAL"
  | "GREATER_THAN"
  | "LESS_THAN"
  | "GREATER_EQUAL"
  | "LESS_EQUAL";

export enum DialogueOperatorType {
  COMPARATOR = "COMPARATOR",
  // AND = "AND",
  // OR = "OR",
  // NOT = "NOT",
}

export type DialogueOperatorComparator = [
  DialogueOperatorType.COMPARATOR,
  DialogueOperatorComparatorType,
  DialogueSourceData,
  DialogueSourceData,
];
// export type DialogueOperatorAND = [
//   DialogueOperatorType.AND,
//   DialogueOperator[]
// ];
// export type DialogueOperatorOR = [DialogueOperatorType.OR, DialogueOperator[]];
// export type DialogueOperatorNOT = [DialogueOperatorType.NOT, DialogueOperator];

type DialogueOperatorByDialogueOperatorType = {
  [DialogueOperatorType.COMPARATOR]: DialogueOperatorComparator;
  // [DialogueOperatorType.AND]: DialogueOperatorAND;
  // [DialogueOperatorType.OR]: DialogueOperatorOR;
  // [DialogueOperatorType.NOT]: DialogueOperatorNOT;
};

export type DialogueOperator<
  T extends DialogueOperatorType = DialogueOperatorType,
> = DialogueOperatorByDialogueOperatorType[T];

// ============================

export enum DialogueActionType {
  SET = "SET",
  INCREMENT = "INCREMENT",
  DECREMENT = "DECREMENT",
}

export type DialogueActionSet = [
  DialogueActionType.SET,
  DialogueVarValue,
  DialogueDataValue,
];
export type DialogueActionIncrement = [
  DialogueActionType.INCREMENT,
  DialogueVarValue,
  DialogueDataInterger,
];
export type DialogueActionDecrement = [
  DialogueActionType.DECREMENT,
  DialogueVarValue,
  DialogueDataInterger,
];

type DialogueActionByDialogueActionType = {
  [DialogueActionType.SET]: DialogueActionSet;
  [DialogueActionType.INCREMENT]: DialogueActionIncrement;
  [DialogueActionType.DECREMENT]: DialogueActionDecrement;
};

export type DialogueAction<T extends DialogueActionType = DialogueActionType> =
  DialogueActionByDialogueActionType[T];

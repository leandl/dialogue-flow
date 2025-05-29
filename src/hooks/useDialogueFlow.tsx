import { useContext } from "react";
import { DialogueFlowContext } from "../contexts/dialogue-flow-context";

export function useDialogueFlow() {
  const context = useContext(DialogueFlowContext);
  if (!context) {
    throw new Error(
      "useDialogueFlow deve ser usado dentro de DialogueFlowProvider"
    );
  }
  return context;
}

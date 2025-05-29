import type { NodeChange } from "@xyflow/react";
import {
  Observer,
  type ObserverListener,
  type UnsubscribeFunction,
} from "../utils/observer";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import type { DialogueNodeFlowEvent } from "../entities/dialogue-node-flow-event";

type DialogueFlowData = {
  notifyNodeReactFlowEvent(e: NodeChange[]): void;
  onNodeDialogueEvent(
    l: ObserverListener<DialogueNodeFlowEvent>
  ): UnsubscribeFunction;
};

// eslint-disable-next-line react-refresh/only-export-components
export const DialogueFlowContext = createContext<DialogueFlowData>(
  {} as DialogueFlowData
);

type DialogueFlowProviderProps = {
  children: ReactNode;
};

export function DialogueFlowProvider({ children }: DialogueFlowProviderProps) {
  const nodeReactFlowEventObserver = useMemo(
    () => new Observer<NodeChange[]>(),
    []
  );
  const nodeDialogueEventObserver = useMemo(
    () => new Observer<DialogueNodeFlowEvent>(),
    []
  );

  useEffect(() => {
    const unsubscribe = nodeReactFlowEventObserver.subscribe((events) => {
      events.forEach((event) => {
        if (event.type === "position" && event.position) {
          console.log(event);
          nodeDialogueEventObserver.publish({
            dialogueId: event.id,
            type: "MOVE_DIALOGUE_CARD",
            dragging: event.dragging,
            position: {
              x: event.position.x,
              y: event.position.y,
            },
          });
        }

        if (event.type === "dimensions" && event.dimensions) {
          console.log(event);
          nodeDialogueEventObserver.publish({
            dialogueId: event.id,
            type: "DIMENSION_DIALOGUE_CARD",
            dimensions: event.dimensions,
          });
        }
      });
    });

    return unsubscribe;
  }, [nodeDialogueEventObserver, nodeReactFlowEventObserver]);

  const notifyNodeReactFlowEvent = useCallback(
    (e: NodeChange[]) => nodeReactFlowEventObserver.publish(e),
    [nodeReactFlowEventObserver]
  );

  const onNodeDialogueEvent = useCallback(
    (listener: ObserverListener<DialogueNodeFlowEvent>) =>
      nodeDialogueEventObserver.subscribe(listener),
    [nodeDialogueEventObserver]
  );

  return (
    <DialogueFlowContext.Provider
      value={{ notifyNodeReactFlowEvent, onNodeDialogueEvent }}
    >
      {children}
    </DialogueFlowContext.Provider>
  );
}

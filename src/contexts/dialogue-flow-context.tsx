import {
  ReactFlowProvider,
  type Connection,
  type NodeChange,
} from "@xyflow/react";
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
import { convertNodeReactFlowEventToNodeDialogueFlowEvent } from "../converts/convert-node-react-flow-event-to-node-dialogue-flow-event";
import {
  allDialogueNodeFlowTypes,
  type DialogueNodeFlowType,
} from "../entities/dialogue-node-flow";
import { convertConnectionReactFlowEventToNodeDialogueFlowEvent } from "../converts/convert-connection-react-flow-event-to-node-dialogue-flow-event";
import type { DialogueNodeFlowSelectOption } from "../components/DialogueFlow/dialogue-node-flow/dialogue-node-flow-select";
import {
  convertCharacterToSelectOption,
  convertDialogueTypeToSelectOption,
} from "../components/DialogueFlow/utils/converts";

type DialogueFlowData = {
  selectCharacterOptions: DialogueNodeFlowSelectOption<string>[];
  selectDialogueTypeOptions: DialogueNodeFlowSelectOption<DialogueNodeFlowType>[];
  notifyNodeReactFlowEvent(e: NodeChange[]): void;
  notifyConnectionReactFlowEvent(e: Connection): void;
  notifyNodeDialogueFlowEvent(e: DialogueNodeFlowEvent): void;
  onNodeDialogueFlowEvent(
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
  const connectionReactFlowEventObserver = useMemo(
    () => new Observer<Connection>(),
    []
  );
  const nodeReactFlowEventObserver = useMemo(
    () => new Observer<NodeChange[]>(),
    []
  );
  const nodeDialogueFlowEventObserver = useMemo(
    () => new Observer<DialogueNodeFlowEvent>(),
    []
  );

  const selectDialogueTypeOptions = useMemo(
    () => allDialogueNodeFlowTypes.map(convertDialogueTypeToSelectOption),
    []
  );

  const selectCharacterOptions = useMemo(() => {
    const allCharacters = ["CHRIS", "BENNEDETTE"];
    return allCharacters.map(convertCharacterToSelectOption);
  }, []);

  useEffect(() => {
    const unsubscribeNodeReactFlowEvent = nodeReactFlowEventObserver.subscribe(
      (events) => {
        events
          .map(convertNodeReactFlowEventToNodeDialogueFlowEvent)
          .forEach((event) => {
            if (event) {
              nodeDialogueFlowEventObserver.publish(event);
            }
          });
      }
    );

    const unsubscribeConnectionReactFlowEvent =
      connectionReactFlowEventObserver.subscribe((event) => {
        nodeDialogueFlowEventObserver.publish(
          convertConnectionReactFlowEventToNodeDialogueFlowEvent(event)
        );
      });

    return () => {
      unsubscribeNodeReactFlowEvent();
      unsubscribeConnectionReactFlowEvent();
    };
  }, [
    nodeDialogueFlowEventObserver,
    nodeReactFlowEventObserver,
    connectionReactFlowEventObserver,
  ]);

  const notifyNodeReactFlowEvent = useCallback(
    (e: NodeChange[]) => nodeReactFlowEventObserver.publish(e),
    [nodeReactFlowEventObserver]
  );

  const notifyConnectionReactFlowEvent = useCallback(
    (e: Connection) => connectionReactFlowEventObserver.publish(e),
    [connectionReactFlowEventObserver]
  );

  const notifyNodeDialogueFlowEvent = useCallback(
    (e: DialogueNodeFlowEvent) => nodeDialogueFlowEventObserver.publish(e),
    [nodeDialogueFlowEventObserver]
  );

  const onNodeDialogueFlowEvent = useCallback(
    (listener: ObserverListener<DialogueNodeFlowEvent>) =>
      nodeDialogueFlowEventObserver.subscribe(listener),
    [nodeDialogueFlowEventObserver]
  );

  return (
    <DialogueFlowContext.Provider
      value={{
        notifyNodeReactFlowEvent,
        onNodeDialogueFlowEvent,
        notifyNodeDialogueFlowEvent,
        notifyConnectionReactFlowEvent,
        selectCharacterOptions,
        selectDialogueTypeOptions,
      }}
    >
      <ReactFlowProvider>{children}</ReactFlowProvider>
    </DialogueFlowContext.Provider>
  );
}

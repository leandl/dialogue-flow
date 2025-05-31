import { useCallback, useEffect } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { DialogueNodeFlowDialogue } from "./type/dialogue-node-flow-dialogue";
import { convertDialogueNodeGodotsToDialogueNodes } from "../../converts/convert-dialogue-node-godot-to-dialogue-node";
import { dialogueDataGodot } from "../../data/dialogue";
import { convertDialogueNodesToDialogueNodeFlows } from "../../converts/convert-dialogue-node-to-dialogue-node-flow";
import { convertDialogueNodeFlowsToEdgeFlows } from "../../converts/convert-dialogue-node-flow-to-edge-flows";
import type { DialogueNodeFlow } from "../../entities/dialogue-node-flow";
import { DialogueNodeFlowChoice } from "./type/dialogue-node-flow-choice";
import { DialogueNodeFlowControlRandom } from "./type/dialogue-node-flow-control-random";

import { useDialogueFlow } from "../../hooks/useDialogueFlow";
import { applyDialogueNodeFlowEvent } from "./utils/apply-dialogue-node-flow-event";
import { applyDialogueEdgeFlowEvent } from "./utils/apply-dialogue-edge-flow-event";

import "./dialogue-node-flow.css";
import { DialogueNodeFlowEventType } from "../../entities/dialogue-node-flow-event";

const nodeTypes = {
  DIALOGUE: DialogueNodeFlowDialogue,
  CHOICE: DialogueNodeFlowChoice,
  "CONTROL.RANDOM": DialogueNodeFlowControlRandom,
};

function calcPositionDialogueNodeFlows(dialogueNodeFlows: DialogueNodeFlow[]) {
  for (let index = 0; index < dialogueNodeFlows.length; index++) {
    dialogueNodeFlows[index].position.y = 200 * index;
  }

  return dialogueNodeFlows;
}

const dialogueData =
  convertDialogueNodeGodotsToDialogueNodes(dialogueDataGodot);
const dialogueNodeFlows = calcPositionDialogueNodeFlows(
  convertDialogueNodesToDialogueNodeFlows(dialogueData)
);
const dialogueEdgeFlows =
  convertDialogueNodeFlowsToEdgeFlows(dialogueNodeFlows);
console.log({
  dialogueNodeFlows,
  dialogueEdgeFlows,
});

export function DialogueFlowDashboard() {
  const { getViewport } = useReactFlow();

  const [nodes, setNodes] = useNodesState(dialogueNodeFlows);
  const [edges, setEdges] = useEdgesState(dialogueEdgeFlows);

  const {
    notifyNodeReactFlowEvent,
    notifyConnectionReactFlowEvent,
    notifyNodeDialogueFlowEvent,
    onNodeDialogueFlowEvent,
  } = useDialogueFlow();

  console.log({
    nodes,
    edges,

    a: 1,
  });

  useEffect(
    () =>
      onNodeDialogueFlowEvent((event) => {
        setNodes((nodes) => applyDialogueNodeFlowEvent(event, nodes));
        setEdges((edges) => applyDialogueEdgeFlowEvent(event, edges));
      }),
    [onNodeDialogueFlowEvent, setNodes, setEdges]
  );

  const handleAddDialogueNodeFlow = useCallback(() => {
    const viewport = getViewport(); // { x, y, zoom }

    // Centro da tela visível
    const centerX =
      -viewport.x / viewport.zoom + window.innerWidth / 2 / viewport.zoom;
    const centerY =
      -viewport.y / viewport.zoom + window.innerHeight / 2 / viewport.zoom;

    return notifyNodeDialogueFlowEvent({
      type: DialogueNodeFlowEventType.ADD_DIALOGUE_CARD,
      position: {
        x: centerX,
        y: centerY,
      },
    });
  }, [notifyNodeDialogueFlowEvent, getViewport]);

  return (
    <div style={{ width: "100%", height: "90vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={notifyNodeReactFlowEvent}
        onConnect={notifyConnectionReactFlowEvent}
        nodeTypes={nodeTypes}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background gap={12} size={1} />
        <button
          className="dialogue-flow-buton-add"
          onClick={handleAddDialogueNodeFlow}
        >
          +<span>Node</span>
        </button>
      </ReactFlow>
    </div>
  );
}

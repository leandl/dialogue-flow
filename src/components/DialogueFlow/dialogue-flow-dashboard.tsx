import { useCallback, useEffect, useRef } from "react";
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
import { convertDialogueNodesToDialogueNodeFlows } from "../../converts/convert-dialogue-node-to-dialogue-node-flow";
import { convertDialogueNodeFlowsToEdgeFlows } from "../../converts/convert-dialogue-node-flow-to-edge-flows";
import type {
  DialogueNodeFlow,
  EdgeFlow,
} from "../../entities/dialogue-node-flow";
import { DialogueNodeFlowChoice } from "./type/dialogue-node-flow-choice";
import { DialogueNodeFlowControlRandom } from "./type/dialogue-node-flow-control-random";

import { useDialogueFlow } from "../../hooks/useDialogueFlow";
import { applyDialogueNodeFlowEvent } from "./utils/apply-dialogue-node-flow-event";
import { applyDialogueEdgeFlowEvent } from "./utils/apply-dialogue-edge-flow-event";

import "./dialogue-node-flow.css";
import { DialogueNodeFlowEventType } from "../../entities/dialogue-node-flow-event";
import { convertDialogueNodesToDialogueNodeGodots } from "../../converts/convert-dialogue-node-to-dialogue-node-godot";
import { convertDialogueNodeFlowsToDialogueNodes } from "../../converts/convert-dialogue-node-flow-to-dialogue-node";
import { DialogueNodeFlowControlIF } from "./type/dialogue-node-flow-control-if";
import { DialogueNodeFlowControlEvent } from "./type/dialogue-node-flow-control-event";
import { DialogueNodeFlowControlAction } from "./type/dialogue-node-flow-control-action";
import { DialogueNodeFlowVoiceOver } from "./type/dialogue-node-flow-voice-over";

const nodeTypes = {
  DIALOGUE: DialogueNodeFlowDialogue,
  CHOICE: DialogueNodeFlowChoice,
  "VOICE-OVER": DialogueNodeFlowVoiceOver,

  "CONTROL.RANDOM": DialogueNodeFlowControlRandom,
  "CONTROL.IF": DialogueNodeFlowControlIF,
  "CONTROL.ACTION": DialogueNodeFlowControlAction,
  "CONTROL.EVENT": DialogueNodeFlowControlEvent,
};

function calcPositionDialogueNodeFlows(dialogueNodeFlows: DialogueNodeFlow[]) {
  for (let index = 0; index < dialogueNodeFlows.length; index++) {
    dialogueNodeFlows[index].position.y = 200 * index;
  }

  return dialogueNodeFlows;
}

export function DialogueFlowDashboard() {
  const refImportFileInput = useRef<HTMLInputElement>(null);

  const { getViewport, getNodes } = useReactFlow();

  const [nodes, setNodes] = useNodesState([] as DialogueNodeFlow[]);
  const [edges, setEdges] = useEdgesState([] as EdgeFlow[]);

  const {
    notifyNodeReactFlowEvent,
    notifyConnectionReactFlowEvent,
    notifyNodeDialogueFlowEvent,
    onNodeDialogueFlowEvent,
  } = useDialogueFlow();

  useEffect(
    () =>
      onNodeDialogueFlowEvent((event) => {
        setNodes((nodes) => applyDialogueNodeFlowEvent(event, nodes));
        setEdges((edges) => applyDialogueEdgeFlowEvent(event, edges));
      }),
    [onNodeDialogueFlowEvent, setNodes, setEdges],
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

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const dialogueDataGodotJSON = JSON.parse(e.target?.result as string);

          const dialogueData = convertDialogueNodeGodotsToDialogueNodes(
            dialogueDataGodotJSON,
          );
          const dialogueNodeFlows = calcPositionDialogueNodeFlows(
            convertDialogueNodesToDialogueNodeFlows(dialogueData),
          );
          const dialogueEdgeFlows =
            convertDialogueNodeFlowsToEdgeFlows(dialogueNodeFlows);

          setNodes(dialogueNodeFlows);
          setEdges(dialogueEdgeFlows);
        } catch (error) {
          alert("Erro ao ler o JSON");
          console.error(error);
        }
      };

      reader.readAsText(file);
    },
    [setEdges, setNodes],
  );

  const handleExport = useCallback(() => {
    const nodeFlows = getNodes() as DialogueNodeFlow[];

    const dialogueNodes = convertDialogueNodeFlowsToDialogueNodes(nodeFlows);
    const dialogueNodeGodots =
      convertDialogueNodesToDialogueNodeGodots(dialogueNodes);

    const dataStr = JSON.stringify(dialogueNodeGodots, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "flow-export.json";
    a.click();

    URL.revokeObjectURL(url);
  }, [getNodes]);

  return (
    <div style={{ width: "100%", height: "90vh" }}>
      <div style={{ marginBottom: 8 }}>
        <button onClick={() => refImportFileInput.current?.click()}>
          Importar JSON Dialogue
        </button>
        <input
          ref={refImportFileInput}
          type="file"
          accept="application/json"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <button onClick={handleExport}>Exportar JSON Dialogue</button>
      </div>
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

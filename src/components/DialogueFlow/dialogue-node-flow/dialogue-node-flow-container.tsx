import { Handle, Position } from "@xyflow/react";
import type { ReactNode } from "react";

type DialogueNodeFlowContainerProps = {
  id: string;
  targetId: string;
  children: ReactNode;
};

export function DialogueNodeFlowContainer({
  id,
  targetId,
  children,
}: DialogueNodeFlowContainerProps) {
  return (
    <div className="dialogue-node-flow">
      {id === "MAIN" && <span className="dialogue-node-flow-main" />}
      <div className="dialogue-node-flow-drag-handle" />
      <Handle id={targetId} type="target" position={Position.Top} />

      {children}
    </div>
  );
}

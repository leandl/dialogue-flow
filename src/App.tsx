import "./App.css";
import { DialogueFlowDashboard } from "./components/DialogueFlow/dialogue-flow-dashboard";
import { DialogueFlowProvider } from "./contexts/dialogue-flow-context";

export function App() {
  return (
    <div>
      <h1>Visualizador de Diálogo</h1>
      <DialogueFlowProvider>
        <DialogueFlowDashboard />
      </DialogueFlowProvider>
    </div>
  );
}

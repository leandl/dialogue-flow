type DialogueNodeFlowInputTextProps = {
  value?: string;
  onChange?(newValue: string): void;
  type: "INPUT" | "TEXTAREA";
};

export function DialogueNodeFlowInputText({
  onChange,
  value,
  type: inputType,
}: DialogueNodeFlowInputTextProps) {
  if (inputType === "INPUT") {
    return (
      <div className="dialogue-node-flow-input-text">
        <input value={value} onChange={(e) => onChange?.(e.target.value)} />
      </div>
    );
  }

  return (
    <div className="dialogue-node-flow-input-text">
      <textarea value={value} onChange={(e) => onChange?.(e.target.value)} />
    </div>
  );
}

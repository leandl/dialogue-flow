type DialogueNodeFlowInputTextProps = {
  value?: string;
  onChange?(newValue: string): void;
};

export function DialogueNodeFlowInputText({
  onChange,
  value,
}: DialogueNodeFlowInputTextProps) {
  return (
    <div className="dialogue-node-flow-input-text">
      <textarea value={value} onChange={(e) => onChange?.(e.target.value)} />
    </div>
  );
}

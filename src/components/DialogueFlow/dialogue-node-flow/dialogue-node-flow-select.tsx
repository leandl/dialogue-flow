type DialogueNodeFlowSelectProps<T extends string = string> = {
  value?: T;
  onChange?(newValue: T): void;
  options: T[];
  clasName?: string;
};

export function DialogueNodeFlowSelect<T extends string = string>({
  onChange,
  value,
  options,
  clasName = "",
}: DialogueNodeFlowSelectProps<T>) {
  return (
    <div className="dialogue-node-flow-select">
      <select
        className={clasName}
        value={value}
        onChange={(e) => onChange?.(e.target.value as T)}
      >
        {options.map((op) => (
          <option key={op} value={op}>
            {op}
          </option>
        ))}
      </select>
    </div>
  );
}

import { Select } from "../../select/select";

export type DialogueNodeFlowSelectOption<T> = {
  value: T;
  label: string;
};

type DialogueNodeFlowSelectProps<T = string> = {
  value: T;
  onChange?(newValue: T): void;
  options: DialogueNodeFlowSelectOption<T>[];
  className?: string;
};

export function DialogueNodeFlowSelect<T = string>(
  props: DialogueNodeFlowSelectProps<T>,
) {
  return (
    <div className="dialogue-node-flow-select">
      <Select {...props} />
    </div>
  );
}

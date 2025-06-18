import { useCallback } from "react";
import {
  DialogueOperatorType,
  type DialogueSourceData,
  type DialogueOperatorComparator,
  type DialogueOperatorComparatorType,
} from "../../../../entities/dialogue-logic";
import { Select, type SelectOption } from "../../../select/select";
import { DialogueSourceDataInput } from "../../dialogue-source-data-input/dialogue-source-data-input";

type DialogueOperatorComparatorInputProps = {
  value: DialogueOperatorComparator;
  onChange: (val: DialogueOperatorComparator) => void;
};

const comparators: Record<DialogueOperatorComparatorType, string> = {
  EQUAL: "=",
  NOT_EQUAL: "!=",
  GREATER_THAN: ">",
  LESS_THAN: "<",
  GREATER_EQUAL: ">=",
  LESS_EQUAL: "<=",
};

const selectComparatorOptions: SelectOption<DialogueOperatorComparatorType>[] =
  Object.entries(comparators).map(([comparator, label]) => ({
    value: comparator as DialogueOperatorComparatorType,
    label: label,
  }));

export function DialogueOperatorComparatorInput({
  value,
  onChange,
}: DialogueOperatorComparatorInputProps) {
  const [, comparator, left, right] = value;

  const handleComparatorChange = useCallback(
    (newOp: DialogueOperatorComparatorType) => {
      onChange([DialogueOperatorType.COMPARATOR, newOp, left, right]);
    },
    [onChange, left, right],
  );

  const handleLeftChange = useCallback(
    (newVal: DialogueSourceData) => {
      onChange([DialogueOperatorType.COMPARATOR, comparator, newVal, right]);
    },
    [onChange, comparator, right],
  );

  const handleRightChange = useCallback(
    (newVal: DialogueSourceData) => {
      onChange([DialogueOperatorType.COMPARATOR, comparator, left, newVal]);
    },
    [onChange, comparator, left],
  );

  return (
    <div>
      <DialogueSourceDataInput value={left} onChange={handleLeftChange} />
      <Select
        value={comparator}
        onChange={handleComparatorChange}
        options={selectComparatorOptions}
      />
      <DialogueSourceDataInput value={right} onChange={handleRightChange} />
    </div>
  );
}

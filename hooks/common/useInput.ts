import { ChangeEvent, useState } from "react";

type ChangeValueType = (
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => void;

type ResetValueType = () => void;

type UseInputType = (
  initial?: string
) => [string, ChangeValueType, ResetValueType];

const useInput: UseInputType = (initial = "") => {
  const [state, setState] = useState(initial);

  const onChangeValue: ChangeValueType = ({ target: { value } }) => {
    setState(value);
  };

  const resetValue = () => setState(initial);

  return [state, onChangeValue, resetValue];
};

export default useInput;

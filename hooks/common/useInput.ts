import { ChangeEvent, useState } from "react";

type ChangeValueType = (e: ChangeEvent<HTMLInputElement>) => void;
type UseInputType = (initial?: string) => [string, ChangeValueType];

const useInput: UseInputType = (initial = "") => {
  const [state, setState] = useState(initial);

  const onChangeValue: ChangeValueType = ({ target: { value } }) => {
    setState(value);
  };
  return [state, onChangeValue];
};

export default useInput;

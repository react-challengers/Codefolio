import { ChangeEvent, useState } from "react";

interface UseInputArgsType {
  [key: string]: string;
}

/**
 * @see https://javascript.plainenglish.io/4-react-tips-to-instantly-improve-your-code-7456e028cfa3
 * @param inputGroup 예시: { name: "", surname: "", address: "" }
 * @returns { inputValues, handleInputChange } 앞은 input 값 뒤는 handler 함수
 * @example
 * <input value={inputValues.name} onChange={handleInputChange("name")} />
 */

const useInput = (inputGroup: UseInputArgsType) => {
  const [inputValues, setInputValues] = useState(inputGroup);

  const handleInputChange = (field: string) => {
    return (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setInputValues((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };
  };

  // reset
  const resetAllInput = () => {
    setInputValues((prev) => {
      const resetObject: UseInputArgsType = {};
      Object.keys(prev).forEach((item) => {
        resetObject[item] = "";
      });
      console.log("resetObject", resetObject);
      return resetObject;
    });
  };

  const resetSpecificInput = (field: string) => {
    setInputValues((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  return { inputValues, handleInputChange, resetAllInput, resetSpecificInput };
};

export default useInput;

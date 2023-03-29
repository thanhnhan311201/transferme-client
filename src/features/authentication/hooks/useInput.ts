import { useState } from "react";

const useInput = (validateValue?: () => boolean) => {
  const [value, setValue] = useState<string>("");

  // TODO: add validate value in here

  const handleValueChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue("");
  };

  return {value, handleValueChange, reset};
};

export default useInput;

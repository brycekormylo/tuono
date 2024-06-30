import { useState, ChangeEvent } from "react";

export function useInput(initialValue: string = "") {
  const [value, setValue] = useState<string>(initialValue);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return {
    value,
    onChange: handleChange,
    setValue,
  };
}

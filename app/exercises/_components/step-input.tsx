import { LuPlus, LuX } from "react-icons/lu";
import React, { useState } from "react";

interface StepInputProps {
  steps: string[];
  setSteps: (input: string[]) => void;
}

export default function StepInput({ steps, setSteps }: StepInputProps) {
  const [input, setInput] = useState<string>("");

  const addNewStep = (newStep: string) => {
    setSteps([...steps, newStep]);
    setInput("");
  };

  const removeStep = (stepToRemove: string) => {
    const newSteps = steps.filter((step) => step != stepToRemove);
    setSteps(newSteps);
  };

  return (
    <div className="flex flex-col gap-4 items-end w-full">
      <h2 className="text-lg">Steps</h2>
      {steps.map((data, index) => {
        return (
          <div
            className="flex relative gap-6 justify-start items-center p-6 w-full text-center bg-gray-200 rounded-lg overflow-clip"
            key={index}
          >
            <h3>{index + 1}.</h3>
            <p>{data}</p>
            <div className="grow" />
            <button onClick={() => removeStep(data)}>
              <LuX size={24} />
            </button>
          </div>
        );
      })}
      <div className="flex justify-center items-center w-full">
        <label className="flex justify-between items-center px-4 h-16 bg-gray-50 border-b-2 border-gray-300 grow">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-full bg-transparent outline-none"
          />
          <button
            type="button"
            onClick={() => addNewStep(input)}
            disabled={input == ""}
            className="flex justify-center items-center w-10 h-10 text-gray-800 bg-transparent rounded-full scale-100 hover:bg-gray-300 disabled:text-gray-300 hover:scale-[1.1] disabled:hover:scale-100 disabled:hover:bg-transparent"
          >
            <LuPlus size={32} />
          </button>
        </label>
      </div>
    </div>
  );
}

import { LuPlus, LuX } from "react-icons/lu";
import React, { useState, useEffect } from "react";

interface AliasInputProps {
  aliases: string[];
  setAliases: (input: string[]) => void;
}

export default function AliasInput({ aliases, setAliases }: AliasInputProps) {
  const [input, setInput] = useState<string>("");
  const [showInput, setShowInput] = useState(false);

  const addNewAlias = (newAlias: string) => {
    setAliases([...aliases, newAlias]);
    setInput("");
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const newAlias = input;
      setAliases([...aliases, newAlias]);
      setInput("");
    }
  };

  const removeAlias = (aliasToRemove: string) => {
    const newAliases = aliases.filter((alias) => alias != aliasToRemove);
    setAliases(newAliases);
  };

  return (
    <>
      {showInput ? (
        <div className="flex flex-col items-end w-full">
          <h2 className="px-6 pt-6 text-xl">Aliases</h2>
          <div className="flex justify-center items-center py-8 w-full">
            <label className="flex justify-between items-center px-4 h-16 bg-gray-50 border-b-2 border-gray-300 grow">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full h-full bg-transparent outline-none"
              />
              <button
                type="button"
                onClick={() => addNewAlias(input)}
                disabled={input == ""}
                className="flex justify-center items-center w-10 h-10 text-gray-800 bg-transparent rounded-full scale-100 hover:bg-gray-300 disabled:text-gray-300 hover:scale-[1.1] disabled:hover:scale-100 disabled:hover:bg-transparent"
              >
                <LuPlus size={32} />
              </button>
            </label>
          </div>
          {aliases.map((data, index) => {
            return (
              <div
                className="flex relative gap-6 justify-start items-center p-6 my-2 w-full text-center bg-gray-200 rounded-lg overflow-clip"
                key={index}
              >
                <h3>{index + 1}.</h3>
                <p>{data}</p>
                <div className="grow" />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    removeAlias(data);
                  }}
                >
                  <LuX size={24} />
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <p className="text-sm">Add Alias</p>
        </div>
      )}
    </>
  );
}

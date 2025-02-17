import { LuPlus } from "react-icons/lu";
import React, { useState } from "react";

interface AliasInputProps {
	aliases: string[];
	setAliases: (input: string[]) => void;
}

export default function AliasInput({ aliases, setAliases }: AliasInputProps) {
	const [input, setInput] = useState<string>("");

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

	return (
		<div className="flex gap-2 justify-start items-center h-10">
			<input
				type="text"
				id="alias"
				value={input}
				placeholder="Additional tags"
				onChange={(e) => setInput(e.target.value)}
				onKeyDown={handleKeyDown}
				className="w-48 h-full rounded-input"
			/>

			<button
				type="button"
				onClick={() => addNewAlias(input)}
				disabled={input === ""}
				className="w-8 h-8 text-black disabled:text-gray-400 stack"
			>
				<LuPlus size={20} />
			</button>
		</div>
	);
}

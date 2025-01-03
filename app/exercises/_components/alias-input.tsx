import { LuPlus, LuX } from "react-icons/lu";
import React, { useState, useEffect } from "react";

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

	const removeAlias = (aliasToRemove: string) => {
		const newAliases = aliases.filter((alias) => alias != aliasToRemove);
		setAliases(newAliases);
	};

	return (
		<div className="flex gap-2 justify-end w-full">
			<div className="flex flex-wrap gap-2 justify-end items-center w-64">
				{aliases.map((data, index) => {
					return (
						<div
							className="flex relative gap-2 justify-between items-center px-2 h-8 text-center bg-gray-200 rounded-lg overflow-clip"
							key={index}
						>
							<p className="text-sm">{data}</p>
							<button
								className=""
								onClick={(e) => {
									e.preventDefault();
									removeAlias(data);
								}}
							>
								<LuX size={16} />
							</button>
						</div>
					);
				})}
			</div>

			<div className="flex justify-center items-center h-10">
				<div className="flex gap-2 justify-end items-center h-10">
					<input
						type="text"
						value={input}
						placeholder="Alias"
						onChange={(e) => setInput(e.target.value)}
						onKeyDown={handleKeyDown}
						className="w-48 h-full rounded-input"
					/>
					<button
						type="button"
						onClick={() => addNewAlias(input)}
						disabled={input == ""}
						className="w-8 h-8 bg-gray-200 rounded-full stack"
					>
						<LuPlus size={18} />
					</button>
				</div>
			</div>
		</div>
	);
}

import { LuPlus, LuX } from "react-icons/lu";
import React, { useState, useEffect } from "react";

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

	const handleKeyDown = (event: any) => {
		if (event.key === "Enter") {
			event.preventDefault();
			const newStep = input;
			setSteps([...steps, newStep]);
			setInput("");
		}
	};

	const removeStep = (stepToRemove: string) => {
		const newSteps = steps.filter((step) => step !== stepToRemove);
		setSteps(newSteps);
	};

	return (
		<div className="flex flex-col gap-2 items-end">
			{steps.map((data, index) => {
				return (
					<div
						className="flex relative gap-6 justify-start items-center p-4 w-full text-center bg-gray-50 rounded-lg overflow-clip"
						key={data}
					>
						<h3>{index + 1}.</h3>
						<p>{data}</p>
						<div className="grow" />
						<button
							type="button"
							onClick={(e) => {
								e.preventDefault();
								removeStep(data);
							}}
						>
							<LuX size={24} />
						</button>
					</div>
				);
			})}

			<div className="flex justify-center items-center py-4 w-full">
				<label className="flex gap-2 justify-end items-center px-4 h-12 grow">
					<input
						type="text"
						placeholder="Add Step"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						onKeyDown={handleKeyDown}
						className="outline-none rounded-input"
					/>
					<button
						type="button"
						onClick={() => addNewStep(input)}
						disabled={input === ""}
						className="w-10 h-10 text-gray-800 bg-gray-200 rounded-full scale-100 disabled:text-gray-500 stack"
					>
						<LuPlus size={24} />
					</button>
				</label>
			</div>
		</div>
	);
}

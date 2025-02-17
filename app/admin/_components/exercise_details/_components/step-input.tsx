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
		<div className="flex flex-col items-start py-4 min-w-[24rem]">
			<h2 className="text-sm text-gray-500">Steps</h2>
			{steps.map((data, index) => {
				return (
					<div
						className="flex relative justify-start items-center w-full h-12 text-center bg-gray-50 rounded-lg overflow-clip"
						key={data}
					>
						<h3 className="w-8 stack">{index + 1}.</h3>
						<p className="text-start grow">{data}</p>
						<button
							type="button"
							onClick={(e) => {
								e.preventDefault();
								removeStep(data);
							}}
							className="w-8 h-8 text-gray-500 stack"
						>
							<LuX size={20} />
						</button>
					</div>
				);
			})}

			<div className="flex justify-start items-start pt-4 grow">
				<label
					htmlFor="step-input"
					className="pt-2 w-8 stack"
				>{`${steps.length + 1}.`}</label>
				<textarea
					value={input}
					id="step-input"
					onChange={(e) => setInput(e.target.value)}
					onKeyDown={handleKeyDown}
					className="p-4 bg-white rounded-t-sm border-gray-200 outline-none resize-none focus:border-gray-500 min-h-[6rem] w-[32rem] border-b-[2px]"
				/>

				<button
					type="button"
					onClick={() => addNewStep(input)}
					disabled={input === ""}
					className="pt-2 w-8 h-8 text-gray-800 disabled:text-gray-500 stack"
				>
					<LuPlus size={24} />
				</button>
			</div>
		</div>
	);
}

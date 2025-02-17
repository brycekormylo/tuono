import {
	type Exercise,
	BodyPart,
	Difficulty,
	formatEnumValue,
} from "@/contexts/exercises";
import { useState, useEffect, type ChangeEvent, useContext } from "react";
import { useRoutine, type AnnotatedExercise } from "@/contexts/routines";
import { LuPlus, LuX } from "react-icons/lu";
import { id } from "@instantdb/react";
import { useTextArea } from "@/hooks/use-text-area";
import { PopoverButtonContext } from "@/app/_components/popover/popover_button";

interface ExerciseAnnotatorProps {
	addAnnotatedExerciseToRoutine: (exercise: AnnotatedExercise) => void;
}

const emptyExercise: Exercise = {
	id: id(),
	aliases: [],
	bodyParts: [],
	steps: [],
	imageUrls: [],
};

export default function ExerciseAnnotator({
	addAnnotatedExerciseToRoutine,
}: ExerciseAnnotatorProps) {
	const { step, setStep } = useRoutine();
	const context = useContext(PopoverButtonContext);

	const [rawExercise, setRawExercise] = useState<Exercise>(emptyExercise);
	const { value: exerciseNotes, onChange: changeExerciseNotes } =
		useTextArea("");

	useEffect(() => {
		step ? setRawExercise(step) : setRawExercise(emptyExercise);
	}, [step]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		const newExercise = {
			...rawExercise,
			[name]: value,
		};
		setRawExercise(newExercise);
	};

	const handleSubmit = () => {
		if (step != null) {
			const newAnnotated: AnnotatedExercise = {
				exercise: rawExercise,
				note: exerciseNotes,
			};
			addAnnotatedExerciseToRoutine(newAnnotated);
		}
		setStep(null);
		context?.setShow(false);
	};

	const handleDiscard = () => {
		setStep(null);
	};

	const properties = [
		{ key: "sets", label: "Sets", value: rawExercise.sets },
		{
			key: "repetitions",
			label: "Repetitions",
			value: rawExercise.repetitions,
		},
		{ key: "weight", label: "Weight", value: rawExercise.weight },
		{
			key: "holdTimesInSeconds",
			label: "Time",
			value: rawExercise.holdTimeInSeconds,
		},
	];

	const difficultyColor = (dif: Difficulty) => {
		switch (dif) {
			case Difficulty.EASY:
				return "bg-green-500";
			case Difficulty.MEDIUM:
				return "bg-yellow-500";
			default:
				return "bg-red-500";
		}
	};

	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-8">
				<div className="flex flex-col gap-2">
					<h2 className="text-sm text-gray-500">Selected Exercise</h2>
					<div className="flex flex-col gap-4 items-start p-4 bg-white rounded-md">
						<div className="flex justify-between items-center w-full">
							<h1 className="text-3xl">{rawExercise.title}</h1>
							<div className="flex gap-2 items-center">
								<div
									className={`h-4 w-4 rounded-full ${difficultyColor(rawExercise.difficulty)}`}
								/>

								<p className="text-gray-500">
									{formatEnumValue(rawExercise.difficulty?.toString())}
								</p>
							</div>
						</div>

						<div className="flex gap-2 items-center">
							{rawExercise.bodyParts?.map((part: BodyPart) => {
								return (
									<div
										key={part}
										className="py-1 px-2 text-sm bg-gray-200 rounded-lg"
									>
										<p>{formatEnumValue(part.toString())}</p>
									</div>
								);
							})}
						</div>
					</div>
				</div>

				<div className="flex flex-col gap-2">
					<h2 className="text-sm text-gray-500">Recommended Values</h2>
					<div className="flex justify-between">
						{properties.map(({ key, label, value }) => (
							<div
								key={key}
								className="flex flex-col-reverse gap-1 items-center w-20"
							>
								<input
									type="number"
									inputMode="numeric"
									id={key}
									name={key.toString()}
									value={value}
									onChange={handleChange}
									className="peer h-12 px-2 w-20 bg-white rounded-xl text-center text-base [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none outline-none"
								/>

								<label
									className="py-1 px-3 text-sm text-gray-500 bg-transparent rounded-full peer-[:focus]:text-gray-700"
									htmlFor={key}
								>
									{label}
								</label>
							</div>
						))}
					</div>
				</div>
			</div>

			<div className="flex flex-col gap-2 w-full">
				<h2 className="text-sm text-gray-500">Notes</h2>
				<div className="p-4 w-96 bg-white rounded-md stack">
					<textarea
						value={exerciseNotes}
						rows={3}
						cols={40}
						className="self-start w-full bg-transparent outline-none resize-none peer"
						onChange={changeExerciseNotes}
					/>
				</div>
			</div>

			<div className="flex gap-4 justify-end p-4 w-full">
				<button
					onClick={handleDiscard}
					type="submit"
					className="w-20 h-10 text-gray-500 rounded-lg ring-2 ring-gray-500 stack"
				>
					<LuX size={24} />
				</button>

				<button
					onClick={handleSubmit}
					type="submit"
					className="w-28 h-10 text-white bg-gray-500 rounded-lg stack"
				>
					<LuPlus size={24} />
				</button>
			</div>
		</div>
	);
}

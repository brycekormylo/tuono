"use client";

import { useContext, useEffect, useState } from "react";
import {
	useExercise,
	type Exercise,
	type BodyPart,
	Difficulty,
} from "@/contexts/exercises";
import ImageInput from "./_components/image-input";
import StepInput from "./_components/step-input";
import AliasInput from "./_components/alias-input";
import BodyPartInput from "./_components/body-part-selector";
import { id } from "@instantdb/react";
import PopoverButton, {
	PopoverButtonContext,
} from "@/app/_components/popover/popover_button";
import EditableField from "../editable_field";
import { LuCheck, LuMinus, LuPencil, LuX } from "react-icons/lu";
import ConfirmChanges from "../confirm_changes";

export default function ExerciseDetails() {
	const { edit, setEdit, update, selected, setSelected } = useExercise();
	const context = useContext(PopoverButtonContext);

	const [isNewExercise, setIsNewExercise] = useState(false);

	const [exercise, setExercise] = useState<Exercise>({
		id: id(),
		title: "",
		difficulty: Difficulty.EASY,
		sets: 0,
		repetitions: 0,
		weight: 0,
		holdTimeInSeconds: 0,

		aliases: [],
		bodyParts: [],
		imageUrls: [],
		steps: [],
	});

	useEffect(() => {
		if (selected != null) {
			setExercise(selected);
		}
	}, [selected, edit]);

	const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
		const { name, value } = event.currentTarget;
		setExercise((prevState: Exercise) => ({
			...prevState,
			[name]: value,
		}));
	};

	const setBodyParts = (newParts: BodyPart[]) => {
		setExercise((prevState: Exercise) => ({
			...prevState,
			bodyParts: newParts,
		}));
	};

	const setImages = (newImages: string[]) => {
		setExercise((prevState: Exercise) => ({
			...prevState,
			imageUrls: newImages,
		}));
	};

	const setSteps = (newSteps: string[]) => {
		setExercise((prevState: Exercise) => ({
			...prevState,
			steps: newSteps,
		}));
	};

	const setAliases = (newAliases: string[]) => {
		setExercise((prevState: Exercise) => ({
			...prevState,
			aliases: newAliases,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const formData = getFormData();
		update({
			...exercise,
			sets: +formData.sets,
			repetitions: +formData.repetitions,
			weight: +formData.weight,
			holdTimeInSeconds: +formData.holdTimeInSeconds,
		});

		handleReturn();
	};

	const handleReturn = () => {
		context?.setShow(false);
		setEdit(false);
		clearForm();
	};

	const properties = [
		{ key: "sets", label: "Sets", value: exercise.sets },
		{
			key: "repetitions",
			label: "Repetitions",
			value: exercise.repetitions,
		},
		{ key: "weight", label: "Weight", value: exercise.weight },
		{
			key: "holdTimeInSeconds",
			label: "Hold Time",
			value: exercise.holdTimeInSeconds,
		},
	];

	const getFormData = () => {
		return {
			title: (document.getElementById("title") as HTMLInputElement).value,
			sets: (document.getElementById("sets") as HTMLInputElement).value,
			weight: (document.getElementById("weight") as HTMLInputElement).value,
			repetitions: (document.getElementById("repetitions") as HTMLInputElement)
				.value,
			holdTimeInSeconds: (
				document.getElementById("holdTimeInSeconds") as HTMLInputElement
			).value,
		};
	};

	const clearForm = () => {
		(document.getElementById("title") as HTMLInputElement).value = "";
		(document.getElementById("sets") as HTMLInputElement).value = "";
		(document.getElementById("weight") as HTMLInputElement).value = "";
		(document.getElementById("repetitions") as HTMLInputElement).value = "";
		(document.getElementById("holdTimeInSeconds") as HTMLInputElement).value =
			"";
	};

	const removeAlias = (aliasToRemove: string) => {
		const newAliases = exercise.aliases.filter(
			(alias: string) => alias !== aliasToRemove,
		);
		setAliases(newAliases);
	};

	useEffect(() => {
		if (exercise.title === "") {
			setIsNewExercise(true);
			setEdit(true);
		}
	}, []);

	return (
		<div className="flex overflow-y-scroll flex-col justify-start items-start p-4 bg-gray-50 rounded-xl h-[80vh] w-[48rem]">
			<div className="flex flex-row gap-2 items-center mb-6 h-12 text-gray-600">
				<h1 className="text-2xl">
					{isNewExercise ? "Create Exercise" : "Exercise Details"}
				</h1>
				<div className="grow" />

				{!edit ? (
					<>
						<button
							type="button"
							onClick={() => setEdit(true)}
							className="w-10 h-10 stack"
						>
							<LuPencil size={20} />
						</button>

						<button
							type="button"
							onClick={handleReturn}
							className="w-10 h-10 stack"
						>
							<LuMinus size={20} />
						</button>
					</>
				) : (
					<>
						<button
							type="button"
							onClick={clearForm}
							className="w-10 h-10 stack"
						>
							<LuX size={20} />
						</button>

						<PopoverButton
							popover={
								<ConfirmChanges action={handleSubmit} formData={exercise} />
							}
						>
							<div className="w-10 h-10 stack">
								<LuCheck size={20} />
							</div>
						</PopoverButton>
					</>
				)}
			</div>
			<form className="flex flex-col gap-2 items-start w-full">
				<div className="flex items-start w-full">
					<div className="flex flex-col gap-2 w-[32rem]">
						<EditableField
							label={"Exercise Name"}
							value={exercise.title}
							handleInputChange={handleChange}
							inputID={"title"}
							edit={edit}
						/>

						<AliasInput aliases={exercise.aliases} setAliases={setAliases} />
					</div>

					<div className="flex flex-wrap gap-2 w-full h-auto">
						{exercise.aliases.map((data: string) => {
							return (
								<div
									className="flex gap-2 justify-between items-center px-2 h-8 text-center bg-white rounded-lg border-gray-200 min-w-16 border-[2px] overflow-clip"
									key={data}
								>
									<p className="text-sm">{data}</p>

									<button
										type="button"
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
				</div>

				<div className="flex flex-col py-6 h-full">
					<h2 className="pb-2 text-sm text-gray-500">Difficulty</h2>
					<div className="flex gap-2 items-center">
						{Object.keys(Difficulty).map((key) => {
							const dif: Difficulty =
								Difficulty[key as keyof typeof Difficulty];
							let hlcolor = "";
							switch (dif) {
								case Difficulty.EASY: {
									hlcolor = "has-[:checked]:bg-green-500";
									break;
								}

								case Difficulty.MEDIUM: {
									hlcolor = "has-[:checked]:bg-yellow-500";
									break;
								}

								case Difficulty.HARD: {
									hlcolor = "has-[:checked]:bg-red-500";
									break;
								}
							}
							return (
								<label
									key={key}
									className={`px-3 h-8 bg-gray-100 rounded-md hover:bg-gray-300 stack ${hlcolor} has-[:checked]:text-gray-50 has-[:checked]:ring-gray-50`}
								>
									<input
										type="radio"
										name="difficulty"
										value={key}
										id={key}
										checked={exercise.difficulty === dif}
										className="hidden w-full h-full peer"
										onChange={handleChange}
									/>

									<p className="block font-medium cursor-pointer select-none">
										{key}
									</p>
								</label>
							);
						})}
					</div>
				</div>

				<BodyPartInput
					selectedParts={exercise.bodyParts}
					setSelectedParts={setBodyParts}
				/>

				<div className="">
					<StepInput steps={exercise.steps} setSteps={setSteps} />
				</div>

				<div className="">
					<ImageInput imageUrls={exercise.imageUrls} setImageUrls={setImages} />
				</div>

				<div className="flex flex-col gap-2 py-4">
					<h2 className="text-lg text-gray-500">{"Defaults"}</h2>
					<div className="flex flex-row gap-2">
						{properties.map(({ key, label, value }) => (
							<div key={key} className="flex flex-col items-center group">
								<label
									className="py-1 px-3 text-sm text-gray-600 bg-transparent rounded-full group-has-[:focus]:text-black"
									htmlFor={key}
								>
									{label}
								</label>

								<input
									type="number"
									id={key}
									name={key.toString()}
									value={value}
									onChange={handleChange}
									className="px-2 w-20 h-12 text-lg text-center outline-none rounded-input no-arrow"
								/>
							</div>
						))}
					</div>
				</div>

				<div className="flex gap-2 justify-end w-full">
					<button
						type="button"
						className="px-8 h-12 rounded-xl border-gray-500 border-[2px]"
						onClick={handleReturn}
					>
						Cancel
					</button>

					<button
						type="button"
						onClick={handleSubmit}
						className="px-8 h-12 text-white bg-gray-500 rounded-xl disabled:text-gray-500 disabled:bg-gray-200/75"
					>
						Save Changes
					</button>
				</div>
			</form>
		</div>
	);
}

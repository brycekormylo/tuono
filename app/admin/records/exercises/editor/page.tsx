"use client";

import { useEffect, useState, type ChangeEvent } from "react";
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

export default function ExerciseEditor() {
	const { edit, setEdit, update, selected, setSelected } = useExercise();

	const [exercise, setExercise] = useState<Exercise>({
		id: id(),
		title: "",
		difficulty: undefined,
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

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
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

	return (
		<div className="fixed top-0 left-0 z-20 w-screen h-screen stack">
			<button
				type="button"
				onClick={handleReturn}
				className="w-screen h-screen bg-gray-200/60"
			/>

			<div className="flex flex-col gap-8 justify-start items-end py-8 px-12 bg-gray-50 rounded-xl h-[80vh] min-w-[54rem]">
				<div className="flex flex-col p-4 min-w-[36rem]">
					<form className="flex flex-col gap-2 items-end">
						<div className="flex flex-row-reverse gap-2 items-center">
							<input
								type="text"
								name="title"
								id="title"
								value={exercise.title}
								className="px-6 w-72 h-14 rounded-lg rounded-input peer"
								onChange={handleChange}
							/>

							<label
								htmlFor="title"
								className="px-4 text-2xl font-medium text-gray-600 bg-transparent ms-4 peer-[:focus]:text-gray-800"
							>
								Title
							</label>
						</div>

						<AliasInput aliases={exercise.aliases} setAliases={setAliases} />

						<div className="flex gap-2 justify-between items-center py-4 h-full">
							<h2 className="px-6 text-lg">Difficulty</h2>
							{Object.keys(Difficulty).map((key) => {
								const dif: Difficulty =
									Difficulty[key as keyof typeof Difficulty];
								return (
									<label
										key={key}
										className="px-3 h-8 bg-gray-100 rounded-md hover:bg-gray-300 stack has-[:checked]:bg-gray-500 has-[:checked]:text-gray-50 has-[:checked]:ring-gray-50"
									>
										<input
											type="radio"
											name="difficulty"
											value={key}
											id={key}
											checked={exercise.difficulty === dif}
											className="hidden peer"
											onChange={handleChange}
										/>

										<p className="block font-medium cursor-pointer select-none">
											{key}
										</p>
									</label>
								);
							})}
						</div>

						<BodyPartInput
							selectedParts={exercise.bodyParts}
							setSelectedParts={setBodyParts}
						/>

						<div className="flex flex-row gap-2">
							{properties.map(({ key, label, value }) => (
								<div key={key} className="flex flex-col items-center group">
									<label
										className="py-1 px-3 text-base text-gray-600 bg-transparent rounded-full group-has-[:focus]:text-black"
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

						<div className="pt-8">
							<StepInput steps={exercise.steps} setSteps={setSteps} />
						</div>
						<div className="">
							<ImageInput
								imageUrls={exercise.imageUrls}
								setImageUrls={setImages}
							/>
						</div>

						<div className="flex gap-6 justify-end px-4">
							<button
								type="button"
								className="px-8 h-12 bg-gray-300 rounded-xl"
								onClick={handleReturn}
							>
								Cancel
							</button>
							<button
								type="button"
								onClick={handleSubmit}
								className="px-8 h-12 bg-gray-200 rounded-xl disabled:text-gray-500 disabled:bg-gray-200/75"
							>
								Save Changes
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

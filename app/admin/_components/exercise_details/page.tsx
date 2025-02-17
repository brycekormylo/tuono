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
import type { ChangeRecord } from "@/contexts/list-context-props";

const emptyExercise = {
	id: id(),
	title: "",
	aliases: [],
	difficulty: Difficulty.EASY,
	bodyParts: [],
	imageUrls: [],
	steps: [],

	sets: 0,
	repetitions: 0,
	weight: 0,
	holdTimeInSeconds: 0,
};

export default function ExerciseDetails() {
	const { edit, setEdit, update, selected, changeLog, setChangeLog } =
		useExercise();
	const context = useContext(PopoverButtonContext);

	const [exercise, setExercise] = useState<Exercise>(selected ?? emptyExercise);

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

		update({ ...exercise });
		handleReturn();
	};

	const handleReturn = () => {
		context?.setShow(false);
		setEdit(false);
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

	const removeAlias = (aliasToRemove: string) => {
		const newAliases = exercise.aliases.filter(
			(alias: string) => alias !== aliasToRemove,
		);
		setAliases(newAliases);
	};

	useEffect(() => {
		exercise.title === "" && setEdit(true);
	}, [exercise.title, setEdit]);

	const createChangeLog = () => {
		const prevData = { id: exercise.id, ...selected };

		const newChanges: ChangeRecord[] = [];

		Object.entries(exercise).map((element) => {
			let key = element[0];

			let newValue: string = Array.isArray(element[1])
				? [...element[1]].join(", ")
				: `${element[1]}`;

			const prev = prevData[key as keyof typeof prevData];
			let prevElement: string = Array.isArray(prev)
				? [...prev].join(", ")
				: prev;

			if (prevElement?.toString() !== newValue && newValue !== "0") {
				switch (key) {
					case "title": {
						key = "Exercise Name";
						break;
					}
					case "imageUrls": {
						key = "images";
						newValue = `+${[...element[1]].length.toString()}`;
						break;
					}
					case "bodyParts": {
						if (prev) {
							prevElement = prev
								.map((element: string) => {
									return (
										String(element).charAt(0) +
										String(element).slice(1).toLowerCase()
									);
								})
								.join(", ");
						}
						newValue = [...element[1]]
							.map((element) => {
								return (
									String(element).charAt(0) +
									String(element).slice(1).toLowerCase()
								);
							})
							.join(", ");
						break;
					}
				}

				const change: ChangeRecord = {
					key: key,
					prevElement: prevElement,
					newValue: newValue,
				};
				newChanges.push(change);
			}
		});

		setChangeLog(newChanges);
	};

	return (
		<div className="flex overflow-y-scroll flex-col justify-start items-start p-4 bg-gray-50 rounded-xl h-[80vh] w-[40rem]">
			<div className="flex flex-row gap-2 items-center mb-6 w-full h-12 text-gray-600">
				<h1 className="text-2xl">
					{!selected ? "Create Exercise" : "Exercise Details"}
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
							onClick={!selected ? handleReturn : () => setEdit(false)}
							className="w-10 h-10 stack"
						>
							<LuX size={20} />
						</button>

						<PopoverButton
							pressAction={createChangeLog}
							popover={
								<ConfirmChanges
									action={handleSubmit}
									changeLog={changeLog}
									isNew={selected === null}
								/>
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

						{
							//<AliasInput aliases={exercise.aliases} setAliases={setAliases} />
						}
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
						{edit ? (
							Object.keys(Difficulty).map((key) => {
								const dif: Difficulty =
									Difficulty[key as keyof typeof Difficulty];
								let hlcolor = "";
								switch (dif) {
									case Difficulty.EASY: {
										hlcolor = "has-[:checked]:ring-green-500";
										break;
									}

									case Difficulty.MEDIUM: {
										hlcolor = "has-[:checked]:ring-yellow-500";
										break;
									}

									case Difficulty.HARD: {
										hlcolor = "has-[:checked]:ring-red-500";
										break;
									}
								}

								return (
									<label
										key={key}
										className={`px-3 h-8 bg-gray-100 has-[:checked]:bg-white has-[:checked]:ring-2 rounded-md ring-gray-300 hover:ring-[1px] stack ${hlcolor}`}
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
							})
						) : (
							<div className="px-3 h-8 bg-white rounded-md ring-2 ring-gray-300 stack">
								<p className="block font-medium cursor-pointer select-none">
									{exercise.difficulty}
								</p>
							</div>
						)}
					</div>
				</div>

				<BodyPartInput
					selectedParts={exercise.bodyParts}
					setSelectedParts={setBodyParts}
				/>

				<StepInput steps={exercise.steps} setSteps={setSteps} />

				<ImageInput imageUrls={exercise.imageUrls} setImageUrls={setImages} />

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

				{
					//             <div className="flex gap-4 justify-end items-center self-end w-full h-12">
					// 	<button
					// 		type="button"
					// 		className="w-36 h-12 text-gray-700 bg-white rounded-lg border-2 border-gray-600"
					// 		onClick={handleReturn}
					// 	>
					// 		Cancel
					// 	</button>
					//
					// 	<div className="">
					// 		<PopoverButton
					// 			pressAction={createChangeLog}
					// 			popover={
					// 				<ConfirmChanges
					// 					action={handleSubmit}
					// 					changeLog={changeLog}
					// 					isNew={selected === null}
					// 				/>
					// 			}
					// 		>
					// 			<div className="w-48 h-12 font-bold text-white bg-gray-600 rounded-lg stack">
					// 				<LuCheck size={20} />
					// 			</div>
					// 		</PopoverButton>
					// 	</div>
					// </div>
				}
			</form>
		</div>
	);
}

"use client";

import { type Exercise, useExercise } from "@/contexts/exercises";
import {
	useRoutine,
	type AnnotatedExercise,
	type Routine,
} from "@/contexts/routines";
import { useContext, useEffect, useState } from "react";
import { useInput } from "@/hooks/use-input";
import { List, arrayMove } from "react-movable";
import {
	LuCheck,
	LuMinus,
	LuPencil,
	LuPlus,
	LuSearch,
	LuX,
} from "react-icons/lu";
import { id } from "@instantdb/react";
import ExerciseAnnotator from "./_components/exercise-annotator";
import ActionButtons from "@/app/_components/editor/action-buttons";
import SearchButton from "@/app/_components/search/search-button";
import EditableField from "@/app/admin/_components/editable_field";
import PopoverButton, {
	PopoverButtonContext,
} from "@/app/_components/popover/popover_button";
import ConfirmChanges from "../confirm_changes";
import type { ChangeRecord } from "@/contexts/list-context-props";

export default function RoutineDetails() {
	const {
		step,
		setStep,
		update,
		selected,
		setSelected,
		edit,
		setEdit,
		changeLog,
		setChangeLog,
	} = useRoutine();
	const source = useExercise();
	const context = useContext(PopoverButtonContext);

	const [nameInput, setNameInput] = useState("");

	const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
		const { name, value } = event.currentTarget;
		setNameInput(value);
	};

	const [annotatedExerciseList, setAnnotatedExerciseList] = useState<
		AnnotatedExercise[]
	>([]);

	const addAnnotatedExerciseToRoutine = (annotated: AnnotatedExercise) => {
		setAnnotatedExerciseList([...annotatedExerciseList, annotated]);
	};

	const removeExercise = (exerciseToRemove: Exercise) => {
		const filtered = [...annotatedExerciseList].filter(
			(annotated: AnnotatedExercise) =>
				annotated.exercise.id !== exerciseToRemove.id,
		);
		setAnnotatedExerciseList(filtered);
	};

	const handleSubmit = () => {
		const newRoutine: Routine = {
			id: selected?.id ?? id(),
			name: nameInput,
			steps: annotatedExerciseList,
			created: new Date(),
		};
		update(newRoutine);
		clearAll();
	};

	const handleReturn = () => {
		setEdit(false);
		context?.setShow(false);
	};

	const clearAll = () => {
		setStep(null);
		setSelected(null);
		setEdit(false);
		setAnnotatedExerciseList([]);
		setNameInput("");
	};

	const selectionChanged = () => {
		if (selected) {
			setNameInput(selected.name);
			setAnnotatedExerciseList(selected.steps);
			setStep(null);
		} else {
			setEdit(true);
		}
	};

	useEffect(() => {
		selectionChanged();
	}, [selected]);

	const createChangeLog = () => {
		const prevData = { id: selected?.id, ...selected };

		const newChanges: ChangeRecord[] = [];
		// Add the name change
		newChanges.push({
			key: "Routine Name",
			prevElement: selected?.name,
			newValue: nameInput,
		});

		// Add another change for each exercise

		annotatedExerciseList.map((element, index) => {
			const key = `Exercise ${index}`;

			const newValue: string = element.exercise.title;
			const prevElement: string = selected ? selected?.steps[index]?.title : "";

			const change: ChangeRecord = {
				key: key,
				prevElement: prevElement,
				newValue: newValue,
			};
			newChanges.push(change);
		});

		setChangeLog(newChanges);
	};

	return (
		<div className="flex flex-col p-4 w-full">
			<div className="flex flex-row gap-2 items-center mb-6 w-96 h-12 text-gray-600">
				<h1 className="text-2xl">
					{!selected ? "Create Routine" : "Routine Details"}
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
			<div className="flex gap-2 justify-between">
				<div className="flex flex-col gap-8">
					<EditableField
						label="Routine Name"
						value={nameInput}
						handleInputChange={handleChange}
						inputID="routine-name"
						edit={edit}
					/>

					<div className="flex flex-col gap-4 items-start">
						<h2 className="text-sm text-gray-500">Exercises</h2>
						<PopoverButton
							popover={
								<div className="flex flex-col gap-4 items-start p-4 min-w-96">
									<h1 className="text-xl">Add Exercise</h1>

									<SearchButton
										source={source}
										itemAction={(exercise) => setStep(exercise as Exercise)}
									>
										<div className="flex gap-4 items-center h-12 text-gray-600">
											<LuSearch size={24} />
											<p>Search Exercises</p>
										</div>
									</SearchButton>

									<div className="w-full min-h-24">
										{step && (
											<ExerciseAnnotator
												addAnnotatedExerciseToRoutine={
													addAnnotatedExerciseToRoutine
												}
											/>
										)}
									</div>
								</div>
							}
						>
							<div className="w-10 h-10 bg-gray-200 rounded-full stack">
								<LuPlus size={24} />
							</div>
						</PopoverButton>
					</div>

					<List
						values={annotatedExerciseList}
						onChange={({ oldIndex, newIndex }) =>
							setAnnotatedExerciseList(
								arrayMove(annotatedExerciseList, oldIndex, newIndex),
							)
						}
						renderList={({ children, props }) => (
							<ul className="" {...props}>
								{children}
							</ul>
						)}
						renderItem={({ value, props, index }) => (
							<li
								className="flex gap-2 items-start py-4 px-4 my-2 w-96 h-20 bg-white rounded-md"
								{...props}
							>
								<div className="flex flex-col justify-between h-full">
									<div className="flex gap-2 items-center">
										<p className="w-4">{(index || 0) + 1}.</p>
										<h2>{value.exercise.title}</h2>
									</div>
									<div className="flex gap-2 text-sm text-gray-500">
										<p>Sets: {value.exercise.sets}</p>
										<p>Reps: {value.exercise.repetitions}</p>
										<p>Weight: {value.exercise.weight}</p>
										<p>Time: {value.exercise.holdTimeInSeconds}</p>
									</div>
									{value.note && (
										<p className="text-sm text-gray-500">{value.note}</p>
									)}
								</div>
								<div className="grow" />

								<button
									type="button"
									onClick={() => removeExercise(value.exercise)}
									className="text-red-500 stack"
								>
									<LuX size={20} />
								</button>
							</li>
						)}
					/>
				</div>
			</div>
		</div>
	);
}

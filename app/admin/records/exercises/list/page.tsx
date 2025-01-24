"use client";

import {
	Difficulty,
	useExercise,
	type Exercise,
	formatEnumValue,
} from "@/contexts/exercises";
import ExerciseEditor from "../editor/page";
import Table from "@/app/_components/table/table";
import type { ListContextProps } from "@/contexts/list-context-props";
import type { ReactNode } from "react";
import TableRow from "@/app/_components/table/table-row";

export default function ExerciseList() {
	const list: ListContextProps<Exercise> = useExercise();

	function getBodyParts(exercise: Exercise) {
		const bodyParts = exercise.bodyParts?.map((part) => (
			<div
				key={part}
				className="justify-center items-center py-1 px-3 mx-1 rounded-md ring-gray-300 ring-[1px]"
			>
				<p className="text-sm select-none">{formatEnumValue(part)}</p>
			</div>
		));
		return bodyParts;
	}

	function getDifficulty(exercise: Exercise) {
		return (
			<div className="flex gap-2 justify-end items-center w-full h-full">
				<p className="text-sm select-none">
					{formatEnumValue(exercise.difficulty)}
				</p>
				<div
					className={`h-4 w-4 rounded-full ${exercise.difficulty === Difficulty.EASY ? "bg-green-500" : exercise.difficulty === Difficulty.MEDIUM ? "bg-yellow-500" : "bg-red-500"}`}
				/>
			</div>
		);
	}

	const tableRows = list.info?.map((exercise) => {
		return (
			<TableRow
				key={exercise.id}
				source={list}
				element={exercise}
				displayProperties={{
					left: `${exercise.title}`,
					center: getBodyParts(exercise),
					right: getDifficulty(exercise),
				}}
			/>
		);
	});

	return (
		<Table
			source={list}
			title="Exercises"
			tableRows={tableRows as ReactNode[]}
			headerColumns={{
				left: "Title",
				center: "Body Part",
				right: "Difficulty",
			}}
			creatorOverlay={<ExerciseEditor />}
		/>
	);
}

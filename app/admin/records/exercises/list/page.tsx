"use client";

import {
	Difficulty,
	useExercise,
	type Exercise,
	formatEnumValue,
	type BodyPart,
} from "@/contexts/exercises";
import Table from "@/app/_components/table/table";
import type { ListContextProps } from "@/contexts/list-context-props";
import type { ReactNode } from "react";
import TableRow from "@/app/_components/table/table-row";
import ExerciseDetails from "@/app/admin/_components/exercise_details/page";

export default function ExerciseList() {
	const list: ListContextProps<Exercise> = useExercise();

	function getBodyParts(exercise: Exercise) {
		const bodyParts = exercise.bodyParts?.map((part: BodyPart) => (
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
				detailOverlay={<ExerciseDetails />}
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
			tableRows={tableRows as ReactNode[]}
			headerColumns={{
				left: "Title",
				center: "Body Part",
				right: "Difficulty",
			}}
			creatorOverlay={<ExerciseDetails />}
		/>
	);
}

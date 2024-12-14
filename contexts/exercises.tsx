"use client";

import { type AppSchema, useDatabase } from "@/contexts/database";
import { InstaQLParams } from "@instantdb/react";
import { useInput } from "@/hooks/use-input";

import React, {
	createContext,
	useState,
	useContext,
	useEffect,
	ReactNode,
} from "react";
import { ListContextProps } from "./list-context-props";
import { Identifiable } from "@/contexts/database";
import { useAccount } from "./account";

export enum Difficulty {
	EASY = "EASY",
	MEDIUM = "MEDIUM",
	HARD = "HARD",
}

export enum BodyPart {
	HEAD = "HEAD",
	NECK = "NECK",
	SHOULDERS = "SHOULDERS",
	UPPER_BACK = "UPPER_BACK",
	LOWER_BACK = "LOWER_BACK",
	CHEST = "CHEST",
	ABDOMEN = "ABDOMEN",
	HIPS = "HIPS",
	GROIN = "GROIN",
	THIGHS = "THIGHS",
	KNEES = "KNEES",
	CALVES = "CALVES",
	ANKLES = "ANKLES",
	FEET = "FEET",
	ARMS = "ARMS",
	ELBOWS = "ELBOWS",
	WRISTS = "WRISTS",
	HANDS = "HANDS",
	GLUTES = "GLUTES",
}

export interface Exercise extends Identifiable {
	title?: string;
	aliases: string[];
	bodyParts: BodyPart[];
	difficulty?: Difficulty;
	steps: string[];
	imageUrls: string[];
	sets?: number;
	repetitions?: number;
	holdTimeInSeconds?: number;
	weight?: number;
}

interface ExerciseContextProps extends ListContextProps<Exercise> {
	formatEnumValue: (value?: string) => string;
}

export function formatEnumValue(value?: string): string {
	return value
		? value
				.replace(/_/g, " ")
				.toLowerCase()
				.replace(/\b\w/g, (char) => char.toUpperCase())
		: "";
}

const ExerciseContext = createContext<ExerciseContextProps | null>(null);

interface ExerciseProviderProps {
	children: ReactNode;
}

const ExerciseProvider = ({ children }: ExerciseProviderProps) => {
	const listName = "Exercises";

	const { db } = useDatabase();
	const { admin } = useAccount();

	const [rawInfo, setRawInfo] = useState<Exercise[] | null>(null);
	const [info, setInfo] = useState<Exercise[] | null>(null);
	const [sortAsc, setSortAsc] = useState<boolean>(false);
	const [selected, setSelected] = useState<Exercise | null>(null);

	const [edit, setEdit] = useState<boolean>(false);
	const {
		value: search,
		onChange: changeSearch,
		setValue: setSearch,
	} = useInput("");

	const query = {
		exercises: {
			$: {
				where: {
					admin: admin.id,
				},
			},
		},
	} satisfies InstaQLParams<AppSchema>;

	const { isLoading, error, data } = db.useQuery(query);

	useEffect(() => {
		if (data) {
			const rawExerciseData: Exercise[] = data.exercises as Exercise[];
			setRawInfo(rawExerciseData);
		} else {
			setRawInfo(null);
		}
	}, [data]);

	useEffect(() => {
		if (search === "") {
			setInfo(rawInfo);
		} else {
			filterBy(search);
		}
	}, [search, rawInfo]); // eslint-disable-line react-hooks/exhaustive-deps

	const filterBy = (input: string) => {
		if (rawInfo) {
			const filtered = rawInfo.filter((exercise) => {
				return exercise.title?.toLowerCase().includes(input.toLowerCase());
			});
			setInfo(filtered);
		}
	};

	const sort = () => {
		if (rawInfo) {
			const sorted = rawInfo.sort((a, b) => {
				if (a.title && b.title) {
					if (sortAsc) {
						return a.title.toLowerCase() > b.title.toLowerCase() ? -1 : 1;
					}
					return a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1;
				}
				return -1;
			});
			setRawInfo([...sorted]);
		}
	};

	const toggleSort = () => {
		setSortAsc(!sortAsc);
	};

	const toggleEdit = () => {
		setEdit(!edit);
	};

	const clearSearch = () => {
		setSearch("");
	};

	const createNew = () => {
		setSelected(null);
		setEdit(true);
	};

	const update = (exercise: Exercise) => {
		db.transact([
			db.tx.exercises[exercise.id].update(exercise),
			db.tx.exercises[exercise.id].link({ admin: admin.id }),
		]);
	};

	const remove = (exercise: Exercise) => {
		db.transact(db.tx.exercises[exercise.id].delete());
		setSelected(null);
	};

	useEffect(() => {
		sort();
	}, [sortAsc]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<ExerciseContext.Provider
			value={{
				listName,
				info,
				rawInfo,
				selected,
				setSelected,
				sortAsc,
				setSortAsc,
				toggleSort,
				search,
				setSearch,
				changeSearch,
				clearSearch,
				edit,
				setEdit,
				toggleEdit,
				send: createNew,
				remove,
				update,
				formatEnumValue,
				isLoading,
				error,
			}}
		>
			{children}
		</ExerciseContext.Provider>
	);
};

const useExercise = () => {
	const context = useContext(ExerciseContext);

	if (!context) {
		throw new Error("useExercise must be used within a ExerciseProvider");
	}
	return context;
};

export { ExerciseProvider, useExercise };

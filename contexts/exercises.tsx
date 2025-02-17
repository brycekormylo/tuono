"use client";

import { type AppSchema, useDatabase } from "@/contexts/database";
import type { InstaQLEntity, InstaQLParams } from "@instantdb/react";
import { useInput } from "@/hooks/use-input";

import {
	createContext,
	useState,
	useContext,
	useEffect,
	type ReactNode,
} from "react";
import type { ChangeRecord, ListContextProps } from "./list-context-props";
import { useProfile } from "./profiles";

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

export type ExerciseWithAdmin = InstaQLEntity<
	AppSchema,
	"exercises",
	// biome-ignore lint: This syntax is mandatory
	{ admin: {} }
>;

export type Exercise = InstaQLEntity<AppSchema, "exercises">;

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
	const { profile } = useProfile();
	const adminID = profile?.admin?.id ?? "";

	const query = {
		exercises: {
			$: {
				where: {
					admin: adminID,
				},
			},
		},
	} satisfies InstaQLParams<AppSchema>;

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
		!edit && setSelected(null);
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
			db.tx.exercises[exercise.id].link({ admin: adminID }),
		]);
		setSelected(exercise);
	};

	const [changeLog, setChangeLog] = useState<ChangeRecord[]>([]);

	const remove = (exercise: Exercise) => {
		db.transact(db.tx.exercises[exercise.id].delete());
		setSelected(null);
	};

	useEffect(() => {
		sort();
	}, [sortAsc]);

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
				changeLog,
				setChangeLog,
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

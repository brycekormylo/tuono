"use client";

import React, {
	createContext,
	useState,
	useContext,
	useEffect,
	type ReactNode,
} from "react";
import { useDatabase, type Identifiable } from "@/contexts/database";
import { useAuth } from "@/contexts/auth";
import { tx } from "@instantdb/react";
import type { ExerciseInfo } from "./exercise-list";
import { useInput } from "@/hooks/use-input";
import type { ListContextProps } from "./list-context-props";

export interface RoutineListData extends Identifiable {
	routines: Routine[];
}

export interface Routine extends Identifiable {
	name: string;
	steps: AnnotatedExercise[];
	created: Date;
}

export interface AnnotatedExercise {
	exercise: ExerciseInfo;
	note?: string;
}

interface RoutineListContextProps extends ListContextProps<Routine> {
	step: ExerciseInfo | null;
	setStep: (exercise: ExerciseInfo | null) => void;
	note: string | null;
	setNote: (note: string) => void;
}

const RoutineListContext = createContext<RoutineListContextProps | null>(null);

interface RoutineListProviderProps {
	children: ReactNode;
}

const RoutineListProvider = ({ children }: RoutineListProviderProps) => {
	const listName = "Routines";

	const { db } = useDatabase();
	const { user } = useAuth();

	const [rawInfo, setRawInfo] = useState<Routine[] | null>(null);
	const [info, setInfo] = useState<Routine[] | null>(null);
	const [sortAsc, setSortAsc] = useState<boolean>(false);
	const [selected, setSelected] = useState<Routine | null>(null);
	const [step, setStep] = useState<ExerciseInfo | null>(null);
	const [note, setNote] = useState<string | null>(null);

	const [edit, setEdit] = useState<boolean>(false);

	const query = {
		routines: {
			$: {
				where: {
					admin: user?.id,
				},
			},
		},
	};

	const { isLoading, error, data } = db.useQuery(query);
	const {
		value: search,
		onChange: changeSearch,
		setValue: setSearch,
	} = useInput("");

	useEffect(() => {
		if (data) {
			const rawRoutineData: Routine[] = data.routines as Routine[];
			setRawInfo(rawRoutineData);
		} else {
			setRawInfo(null);
		}
	}, [data]);

	useEffect(() => {
		sort();
	}, [sortAsc]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		if (search == "") {
			setInfo(rawInfo);
		} else {
			filterBy(search);
		}
	}, [search, rawInfo]); // eslint-disable-line react-hooks/exhaustive-deps

	const clearSearch = () => {
		setSearch("");
	};

	const filterBy = (input: string) => {
		if (rawInfo) {
			const filtered = rawInfo.filter((routine) => {
				return routine.name?.toLowerCase().includes(input.toLowerCase());
			});
			setInfo(filtered);
		}
	};

	const sort = () => {
		if (rawInfo) {
			const sorted = rawInfo.sort((a, b) => {
				if (sortAsc) {
					return a.name > b.name ? -1 : 1;
				} else {
					return a.name < b.name ? -1 : 1;
				}
			});
			setInfo([...sorted]);
		}
	};

	const update = (routine: Routine) => {
		db.transact(db.tx.routines[routine.id].update(routine as any));
		user && db.transact(db.tx.routines[routine.id].link({ admin: user.id }));
	};

	const remove = (routine: Routine) => {
		db.transact(db.tx.routines[routine.id].delete());
		setSelected(null);
	};

	const toggleEdit = () => {
		setEdit(!edit);
	};

	const toggleSort = () => {
		setSortAsc(!sortAsc);
	};

	const createNew = () => {
		setSelected(null);
		setEdit(true);
	};

	return (
		<RoutineListContext.Provider
			value={{
				listName,
				sortAsc,
				setSortAsc,
				toggleSort,
				search,
				setSearch,
				changeSearch,
				clearSearch,
				step,
				setStep,
				note,
				setNote,
				selected,
				setSelected,
				rawInfo,
				info,
				update,
				remove,
				edit,
				setEdit,
				toggleEdit,
				createNew,
			}}
		>
			{children}
		</RoutineListContext.Provider>
	);
};

const useRoutineList = () => {
	const context = useContext(RoutineListContext);

	if (!context) {
		throw new Error("useRoutineList must be used within a RoutineListProvider");
	}
	return context;
};

export { RoutineListProvider, useRoutineList };

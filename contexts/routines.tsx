"use client";

import React, {
	createContext,
	useState,
	useContext,
	useEffect,
	type ReactNode,
} from "react";
import { type AppSchema, useDatabase } from "@/contexts/database";
import type { Exercise } from "./exercises";
import { useInput } from "@/hooks/use-input";
import type { ChangeRecord, ListContextProps } from "./list-context-props";
import type { InstaQLEntity, InstaQLParams } from "@instantdb/react";
import { useProfile } from "./profiles";

export type Routine = InstaQLEntity<AppSchema, "routines">;

export interface AnnotatedExercise {
	exercise: Exercise;
	note?: string;
}

interface RoutineContextProps extends ListContextProps<Routine> {
	step: Exercise | null;
	setStep: (exercise: Exercise | null) => void;
	note: string | null;
	setNote: (note: string) => void;
}

const RoutineContext = createContext<RoutineContextProps | null>(null);

interface RoutineProviderProps {
	children: ReactNode;
}

const RoutineProvider = ({ children }: RoutineProviderProps) => {
	const listName = "Routines";

	const { db } = useDatabase();
	const { profile } = useProfile();
	const adminID = profile?.admin?.id ?? "";

	const query = {
		routines: {
			$: {
				where: {
					admin: adminID,
				},
			},
		},
	} satisfies InstaQLParams<AppSchema>;

	const [rawInfo, setRawInfo] = useState<Routine[] | null>(null);
	const [info, setInfo] = useState<Routine[] | null>(null);
	const [sortAsc, setSortAsc] = useState<boolean>(false);
	const [selected, setSelected] = useState<Routine | null>(null);
	const [step, setStep] = useState<Exercise | null>(null);
	const [note, setNote] = useState<string | null>(null);

	const [edit, setEdit] = useState<boolean>(false);

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
				}
				return a.name < b.name ? -1 : 1;
			});
			setInfo([...sorted]);
		}
	};

	const update = (routine: Routine) => {
		db.transact([
			db.tx.routines[routine.id].update(routine),
			db.tx.routines[routine.id].link({ admin: adminID }),
		]);
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

	const [changeLog, setChangeLog] = useState<ChangeRecord[]>([]);

	return (
		<RoutineContext.Provider
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
				send: createNew,
				isLoading,
				error,
				changeLog,
				setChangeLog,
			}}
		>
			{children}
		</RoutineContext.Provider>
	);
};

const useRoutine = () => {
	const context = useContext(RoutineContext);

	if (!context) {
		throw new Error("useRoutine must be used within a RoutineProvider");
	}
	return context;
};

export { RoutineProvider, useRoutine };

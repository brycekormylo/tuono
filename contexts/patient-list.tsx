"use client";

import { InstaQLEntity, type InstaQLParams } from "@instantdb/react";
import { AppSchema, useDatabase, type Identifiable } from "@/contexts/database";
import { useAuth } from "@/contexts/auth";
import type { ListContextProps } from "./list-context-props";
import { useInput } from "@/hooks/use-input";

import React, {
	createContext,
	useState,
	useContext,
	useEffect,
	type ReactNode,
} from "react";

export const formattedPhoneNumber = (phone: string): string => {
	const phoneArr = Array.from(phone);

	const formatted = [
		"(",
		...phoneArr.slice(0, 3),
		") ",
		...phoneArr.slice(3, 6),
		"-",
		...phoneArr.slice(6, 10),
	].join("");

	return formatted;
};

export interface PatientInfo extends Identifiable {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
}

export type Patient = InstaQLEntity<AppSchema, "patients">;

export interface PatientListContextProps
	extends ListContextProps<PatientInfo> {}

const PatientListContext = createContext<PatientListContextProps | null>(null);

interface PatientListProviderProps {
	children: ReactNode;
}

const PatientListProvider = ({ children }: PatientListProviderProps) => {
	const listName = "Patients";

	const { db } = useDatabase();
	const { user } = useAuth();

	const [rawInfo, setRawInfo] = useState<PatientInfo[] | null>(null);
	const [info, setInfo] = useState<PatientInfo[] | null>(null);
	const [sortAsc, setSortAsc] = useState<boolean>(false);
	const [selected, setSelected] = useState<PatientInfo | null>(null);
	const [edit, setEdit] = useState<boolean>(false);
	const {
		value: search,
		onChange: changeSearch,
		setValue: setSearch,
	} = useInput("");

	const query = user
		? ({
				patients: {
					$: {
						where: {
							admin: user.id,
						},
					},
				},
			} satisfies InstaQLParams<AppSchema>)
		: {};

	const { isLoading, error, data } = db.useQuery(query);

	useEffect(() => {
		if (data) {
			const patientList: PatientInfo[] = data.patients as PatientInfo[];
			// const sorted = patientList.sort((a, b) => {
			// 	if (sortAsc) {
			// 		return a.lastName > b.lastName ? -1 : 1;
			// 	}
			// 	return a.lastName < b.lastName ? -1 : 1;
			// });
			//
			setRawInfo(patientList);
			sort();
		}
	}, [data]); // eslint-disable-line react-hooks/exhaustive-deps

	// useEffect(() => {
	// 	sort();
	// }, [sortAsc]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		if (search === "") {
			setInfo(rawInfo);
		} else {
			filterBy(search);
		}
	}, [search, rawInfo]); // eslint-disable-line react-hooks/exhaustive-deps

	const filterBy = (input: string) => {
		if (info) {
			const filtered = info.filter((patient) => {
				return (
					patient.lastName.toLowerCase().includes(search.toLowerCase()) ||
					patient.firstName.toLowerCase().includes(search.toLowerCase())
				);
			});
			setInfo(filtered);
		} else {
			setInfo(rawInfo);
		}
	};

	const sort = () => {
		if (rawInfo) {
			const sorted = rawInfo.sort((a, b) => {
				if (sortAsc) {
					return a.lastName > b.lastName ? -1 : 1;
				}
				return a.lastName < b.lastName ? -1 : 1;
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

	const update = (patient: PatientInfo) => {
		if (user) {
			db.transact(
				db.tx.patients[patient.id].update(patient as PatientInfo as any),
			);
			db.transact(db.tx.patients[patient.id].link({ admin: user.id }));
		}
	};

	const remove = (patient: PatientInfo) => {
		db.transact(db.tx.patients[patient.id].delete());
		setSelected(null);
	};

	return (
		<PatientListContext.Provider
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
				createNew,
				remove,
				update,
			}}
		>
			{children}
		</PatientListContext.Provider>
	);
};

const usePatientList = () => {
	const context = useContext(PatientListContext);

	if (!context) {
		throw new Error("usePatientList must be used within a PatientListProvider");
	}
	return context;
};

export { PatientListProvider, usePatientList };

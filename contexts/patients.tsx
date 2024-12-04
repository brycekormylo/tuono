"use client";

import type { InstaQLEntity, InstaQLParams } from "@instantdb/react";
import { type AppSchema, useDatabase } from "@/contexts/database";
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

export type Patient = InstaQLEntity<AppSchema, "patients">;

export interface PatientContextProps extends ListContextProps<Patient> {}

const PatientContext = createContext<PatientContextProps | null>(null);

interface PatientProviderProps {
	children: ReactNode;
}

const PatientProvider = ({ children }: PatientProviderProps) => {
	const listName = "Patients";

	const { db } = useDatabase();
	const { user } = useAuth();

	const [rawInfo, setRawInfo] = useState<Patient[] | null>(null);
	const [info, setInfo] = useState<Patient[] | null>(null);
	const [sortAsc, setSortAsc] = useState<boolean>(false);
	const [selected, setSelected] = useState<Patient | null>(null);
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
			const patientList: Patient[] = data.patients as Patient[];
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

	const update = (patient: Patient) => {
		if (user) {
			db.transact(db.tx.patients[patient.id].update(patient));
			db.transact(db.tx.patients[patient.id].link({ admin: user.id }));
		}
	};

	const remove = (patient: Patient) => {
		db.transact(db.tx.patients[patient.id].delete());
		setSelected(null);
	};

	return (
		<PatientContext.Provider
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
		</PatientContext.Provider>
	);
};

const usePatient = () => {
	const context = useContext(PatientContext);

	if (!context) {
		throw new Error("usePatient must be used within a PatientProvider");
	}
	return context;
};

export { PatientProvider, usePatient };

"use client";

import type { InstaQLEntity, InstaQLParams } from "@instantdb/react";
import { type AppSchema, useDatabase } from "@/contexts/database";
import type { ListContextProps } from "./list-context-props";
import { useInput } from "@/hooks/use-input";

import React, {
	createContext,
	useState,
	useContext,
	useEffect,
	type ReactNode,
} from "react";
import { useProfile } from "./profiles";

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

export type Patient = InstaQLEntity<
	AppSchema,
	"patients",
	// biome-ignore lint: This syntax is mandatory
	{ profile: {} }
>;

type Records = InstaQLEntity<AppSchema, "patients">;

export interface PatientContextProps extends ListContextProps<Patient> {}

const PatientContext = createContext<PatientContextProps | null>(null);

interface PatientProviderProps {
	children: ReactNode;
}

const PatientProvider = ({ children }: PatientProviderProps) => {
	const listName = "Patients";

	const { db } = useDatabase();
	const { profile } = useProfile();
	const adminID = profile?.admin?.id ?? "";

	const query = {
		patients: {
			$: {
				where: {
					admin: adminID,
				},
			},
			profile: {},
		},
	} satisfies InstaQLParams<AppSchema>;

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

	const { isLoading, error, data } = db.useQuery(query);

	useEffect(() => {
		data && setRawInfo(data.patients);
	}, [data]);

	useEffect(() => {
		if (search === "") {
			setInfo(rawInfo);
		} else {
			filter();
		}
	}, [search, rawInfo]);

	useEffect(() => {
		sort();
	}, [sortAsc]);

	const filter = () => {
		if (info) {
			const filtered = info.filter((patient) => {
				return (
					patient.profile?.lastName
						.toLowerCase()
						.includes(search.toLowerCase()) ||
					patient.profile?.firstName
						.toLowerCase()
						.includes(search.toLowerCase())
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
				if (a.profile?.lastName && b.profile?.lastName) {
					if (sortAsc) {
						return a.profile.lastName > b.profile.lastName ? -1 : 1;
					}
					return a.profile.lastName < b.profile.lastName ? -1 : 1;
				}
				return a.profile?.lastName ? 1 : -1;
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
		const patientProfile = patient.profile;
		const patientRecords: Records = {
			id: patient.id,
			email: patient.email,
			created: patient.created,
			dob: patient.dob,
			homeAddress: patient.homeAddress,
			occupation: patient.occupation,
			sex: patient.sex,
			enthicity: patient.enthicity,
			emergencyPhone: patient.emergencyPhone,
		};
		console.log(patientRecords);
		if (patientProfile) {
			db.transact([
				db.tx.profiles[patientProfile.id].update(patientProfile),
				db.tx.patients[patientRecords.id]
					.update(patientRecords)
					.link({ profile: patientProfile.id })
					.link({ admin: profile?.admin?.id }),
			]);
		}
	};

	const remove = (patient: Patient) => {
		db.transact([
			db.tx.profiles[patient.profile?.id ?? ""].delete(),
			db.tx.patients[patient.id].delete(),
		]);
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
				send: createNew,
				remove,
				update,
				isLoading,
				error,
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

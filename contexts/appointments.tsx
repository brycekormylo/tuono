"use client";

import { type AppSchema, useDatabase } from "./database";
import {
	type ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";
import type { ChangeRecord, ListContextProps } from "./list-context-props";
import { useInput } from "@/hooks/use-input";
import type { InstaQLEntity } from "@instantdb/react";
import { useProfile } from "./profiles";

export enum AppointmentType {
	FULL = 60,
	HALF = 30,
}

export type Appointment = InstaQLEntity<
	AppSchema,
	"appointments",
	// biome-ignore lint: This syntax is mandatory
	{ admin: {}; profile: {} }
>;

interface AppointmentContextProps extends ListContextProps<Appointment> {
	newAppointment: Appointment | null;
	setNewAppointment: (appointment: Appointment) => void;
}

const AppointmentContext = createContext<AppointmentContextProps | null>(null);

interface AppointmentProviderProps {
	children: ReactNode;
}

const AppointmentProvider = ({ children }: AppointmentProviderProps) => {
	const listName = "Appointments";

	const { db } = useDatabase();
	const { profile } = useProfile();
	const adminID = profile?.admin?.id ?? "";

	const [rawInfo, setRawInfo] = useState<Appointment[] | null>(null);
	const [info, setInfo] = useState<Appointment[] | null>(null);
	const [sortAsc, setSortAsc] = useState<boolean>(false);
	const [selected, setSelected] = useState<Appointment | null>(null);
	const [newAppointment, setNewAppointment] = useState<Appointment | null>(
		null,
	);
	const [edit, setEdit] = useState<boolean>(false);
	const {
		value: search,
		onChange: changeSearch,
		setValue: setSearch,
	} = useInput("");

	const query = {
		appointments: {
			$: {
				where: {
					admin: adminID,
				},
			},
			profile: {},
			admin: {},
		},
	};

	const { isLoading, error, data } = db.useQuery(query);

	useEffect(() => {
		if (data) {
			const appointments: Appointment[] = data.appointments as Appointment[];
			const sorted = appointments.sort((a, b) => {
				if (sortAsc) {
					return a.date > b.date ? -1 : 1;
				}
				return a.date < b.date ? -1 : 1;
			});
			setRawInfo(sorted);
		}
	}, [data]);

	useEffect(() => {
		sort();
	}, [sortAsc]);

	useEffect(() => {
		if (search === "") {
			setInfo(rawInfo);
		} else {
			filterBy(search);
		}
	}, [search, rawInfo]);

	const filterBy = (input: string) => {
		if (info) {
			// const filtered = info.filter((conversation) => {
			// 	conversation.patient?.firstName
			// 		.toLowerCase()
			// 		.includes(input.toLowerCase()) ||
			// 		conversation.patient.lastName
			// 			.toLowerCase()
			// 			.includes(input.toLowerCase());
			// });
			// setInfo(filtered);
			setInfo(info);
		} else {
			setInfo(rawInfo);
		}
	};

	const sort = () => {
		if (rawInfo) {
			const sorted = rawInfo.sort((a, b) => {
				if (sortAsc) {
					return a.date > b.date ? -1 : 1;
				}
				return a.date < b.date ? -1 : 1;
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
		newAppointment && update(newAppointment);
	};

	const update = (appointment: Appointment) => {
		db.transact(db.tx.appointments[appointment.id].update(appointment));
		profile &&
			db.transact(
				db.tx.appointments[appointment.id].link({
					admin: adminID,
				}),
			);
		appointment.profile &&
			db.transact(
				db.tx.appointments[appointment.id].link({
					profile: appointment.profile.id,
				}),
			);
	};

	const remove = (appointment: Appointment) => {
		db.transact(db.tx.appointments[appointment.id].delete());
		setSelected(null);
	};

	const [changeLog, setChangeLog] = useState<ChangeRecord[]>([]);

	return (
		<AppointmentContext.Provider
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
				newAppointment,
				setNewAppointment,
				isLoading,
				error,
				changeLog,
				setChangeLog,
			}}
		>
			{children}
		</AppointmentContext.Provider>
	);
};

const useAppointments = () => {
	const context = useContext(AppointmentContext);

	if (!context) {
		throw new Error("useAppointment must be used within a AppointmentProvider");
	}
	return context;
};

export { AppointmentProvider, useAppointments };

"use client";

import { type AdminAccount, useAuth } from "./auth";
import type { PatientInfo } from "./patient-list";
import { type Identifiable, useDatabase } from "./database";
import {
	type ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";
import type { ListContextProps } from "./list-context-props";
import { useInput } from "@/hooks/use-input";

export enum AppointmentType {
	full = 60,
	half = 30,
}

export interface Appointment extends Identifiable {
	time: Date;
	duration: AppointmentType;
	admin: AdminAccount;
	patient: PatientInfo;
}

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
	const { user } = useAuth();

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
					admin: user?.id,
				},
			},
			patient: {},
			admin: {},
		},
	};

	const { isLoading, error, data } = db.useQuery(query);

	useEffect(() => {
		if (data) {
			const appointments: Appointment[] = data.appointments.map(
				(appointment) => {
					const patient: PatientInfo = appointment.patient[0] as PatientInfo;
					const admin: AdminAccount = appointment.admin[0] as AdminAccount;
					const date = new Date(appointment.time);
					const duration =
						AppointmentType[
							appointment.duration as keyof typeof AppointmentType
						];
					return {
						id: appointment.id,
						duration: duration,
						time: date,
						patient: patient,
						admin: admin,
					};
				},
			);
			const sorted = appointments.sort((a, b) => {
				if (sortAsc) {
					return a.time > b.time ? -1 : 1;
				} else {
					return a.time < b.time ? -1 : 1;
				}
			});
			setRawInfo(sorted);
		}
	}, [data]); // eslint-disable-line react-hooks/exhaustive-deps

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

	const filterBy = (input: string) => {
		if (info) {
			const filtered = info.filter((conversation) => {
				conversation.patient.firstName
					.toLowerCase()
					.includes(input.toLowerCase()) ||
					conversation.patient.lastName
						.toLowerCase()
						.includes(input.toLowerCase());
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
					return a.time > b.time ? -1 : 1;
				} else {
					return a.time < b.time ? -1 : 1;
				}
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
		const dataToInsert = {
			id: appointment.id,
			time: appointment.time,
			duration: appointment.duration,
		};
		db.transact(db.tx.appointments[appointment.id].update(dataToInsert as any));
		user &&
			db.transact(
				db.tx.appointments[appointment.id].link({
					admin: user?.id,
				}),
			);
		appointment.patient &&
			db.transact(
				db.tx.appointments[appointment.id].link({
					patient: appointment.patient.id,
				}),
			);
	};

	const remove = (appointment: Appointment) => {
		db.transact(db.tx.appointments[appointment.id].delete());
		setSelected(null);
	};

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
				createNew,
				remove,
				update,
				newAppointment,
				setNewAppointment,
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

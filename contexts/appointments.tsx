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
import { id, type InstaQLEntity } from "@instantdb/react";
import { useProfile } from "./profiles";
import dayjs, { type Dayjs } from "dayjs";

export enum AppointmentType {
	FULL = 60,
	HALF = 30,
}

export type Appointment = InstaQLEntity<
	AppSchema,
	"appointments",
	// biome-ignore lint: This syntax is mandatory
	{ profile: {} }
>;

interface AppointmentContextProps extends ListContextProps<Appointment> {
	newAppointment: Appointment | null;
	setNewAppointment: (appointment: Appointment) => void;
	updateDate: (apptID: string, date: string) => void;
	selectedTimeSlot: Dayjs;
	setSelectedTimeSlot: (date: Dayjs) => void;
	deleteAppointment: (apptID: string) => void;
	displayDate: Dayjs;
	setDisplayDate: (date: Dayjs) => void;
	isDragging: boolean;
	setIsDragging: (isDragging: boolean) => void;
	showFullWeek: boolean;
	setShowFullWeek: (show: boolean) => void;
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

	const [displayDate, setDisplayDate] = useState<Dayjs>(dayjs());
	const [selectedTimeSlot, setSelectedTimeSlot] = useState<Dayjs>(dayjs());
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

	// TODO: Fine tune queries for different dates
	const query = {
		appointments: {
			$: {
				where: {
					admin: adminID,
				},
			},
			profile: {},
		},
	};

	const { isLoading, error, data } = db.useQuery(query);

	useEffect(() => {
		if (data) {
			const appointments: Appointment[] = data.appointments as Appointment[];
			const filtered = appointments.filter(
				(appt) =>
					dayjs(appt.date).toISOString().slice(0, 9) ===
					displayDate.toISOString().slice(0, 9),
			);

			const sorted = filtered.sort((a, b) => {
				if (sortAsc) {
					return a.date > b.date ? -1 : 1;
				}
				return a.date < b.date ? -1 : 1;
			});
			setRawInfo(sorted);
			setInfo(sorted);
		}
	}, [data]);

	// useEffect(() => {
	// 	sort();
	// }, [sortAsc]);
	//
	// useEffect(() => {
	// 	if (search === "") {
	// 		setInfo(rawInfo);
	// 	} else {
	// 		filterBy(search);
	// 	}
	// }, [search, rawInfo]);

	const filterBy = (input: string) => {
		if (info) {
			// const filtered = info.filter((appointment) => {
			// 	appointment.date;
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

	const updateDate = (apptID: string, newDate: string) => {
		db.transact([db.tx.appointments[apptID].update({ date: newDate })]);
	};

	const update = (appointment: Appointment) => {
		db.transact([
			db.tx.appointments[appointment.id].update({
				date: appointment.date,
				appointmentType: appointment.appointmentType,
				notes: appointment.notes,
			}),

			db.tx.appointments[appointment.id].link({
				admin: adminID,
				profile: appointment.profile?.id,
			}),
		]);

		setSelected(null);
	};

	const remove = (appointment: Appointment) => {
		db.transact(db.tx.appointments[appointment.id].delete());
		setSelected(null);
	};

	const deleteAppointment = (apptID: string) => {
		db.transact(db.tx.appointments[apptID].delete());
		setSelected(null);
	};

	const [changeLog, setChangeLog] = useState<ChangeRecord[]>([]);
	const [isDragging, setIsDragging] = useState<boolean>(false);
	const [showFullWeek, setShowFullWeek] = useState(false);

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
				updateDate,
				selectedTimeSlot,
				setSelectedTimeSlot,
				deleteAppointment,
				displayDate,
				setDisplayDate,
				isDragging,
				setIsDragging,
				showFullWeek,
				setShowFullWeek,
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

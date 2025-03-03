"use client";

import { useContext, useEffect, useState } from "react";
import { id } from "@instantdb/react";
import PopoverButton, {
	PopoverButtonContext,
} from "@/app/_components/popover/popover_button";
import { LuCheck, LuMinus, LuPencil, LuSearch, LuX } from "react-icons/lu";
import ConfirmChanges from "../confirm_changes";
import type { ChangeRecord } from "@/contexts/list-context-props";
import {
	type Appointment,
	AppointmentType,
	useAppointments,
} from "@/contexts/appointments";
import dayjs, { type Dayjs } from "dayjs";
import { type Patient, usePatient } from "@/contexts/patients";
import SearchButton from "@/app/_components/search/search-button";
import EditableField from "../editable_field";

const emptyAppointment: Appointment = {
	id: id(),
	date: "",
	appointmentType: AppointmentType.FULL,
	profile: undefined,
	notes: "",
};

type AppointmentFormData = {
	date: string;
	time: string;
	appointmentType: AppointmentType;
	notes: string;
};

export default function AppointmentDetails() {
	const context = useContext(PopoverButtonContext);
	const {
		update,
		selected,
		selectedTimeSlot,
		edit,
		setEdit,
		changeLog,
		setChangeLog,
	} = useAppointments();

	const { selected: selectedPatient, setSelected: setSelectedPatient } =
		usePatient();
	const patientSource = usePatient();

	const [appointment, setAppointment] = useState<Appointment>(
		selected ?? { ...emptyAppointment, id: id() },
	);

	const [formData, setFormData] = useState<AppointmentFormData>({
		date: selectedTimeSlot.format("YYYY-MM-DD"),
		time: selectedTimeSlot.format("HH:mm"),
		appointmentType: AppointmentType.FULL,
		notes: "",
	});

	const handleReturn = () => {
		setEdit(false);
		context?.setShow(false);
	};

	useEffect(() => {
		appointment.date === "" && setEdit(true);
	}, []);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!selectedPatient) {
			return;
		}

		update({
			...appointment,
			id: appointment.id,
			date: dayjs(`${formData.date}${formData.time}`).toISOString(),
			notes: formData.notes,
			appointmentType: formData.appointmentType,
			profile: selectedPatient.profile,
		});

		clearForm();
		setEdit(false);
	};

	const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
		const { name, value } = event.currentTarget;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const clearForm = () => {
		setFormData({
			date: "",
			time: "",
			appointmentType: AppointmentType.FULL,
			notes: "",
		});
		setEdit(false);
		context?.setShow(false);
		setSelectedPatient(null);
	};

	const createChangeLog = () => {
		// const prevData: AppointmentFormData = {
		// 	date: appointment.date ?? "",
		// 	appointmentType: appointment.appointmentType ?? "",
		// };
		//
		// const newChanges: ChangeRecord[] = [];
		//
		// Object.entries(formData).map((element) => {
		// 	const key = element[0];
		// 	const change: ChangeRecord = {
		// 		key: key,
		// 		prevElement: prevData[key as keyof typeof prevData],
		// 		newValue: element[1],
		// 	};
		// 	if (change.prevElement !== change.newValue) {
		// 		newChanges.push(change);
		// 	}
		// });
		//
		// setChangeLog(newChanges);
	};

	return (
		<form className="flex flex-col p-6 rounded-md w-[28rem]">
			<div className="flex flex-row gap-2 items-center mb-6 text-gray-600">
				<h1 className="text-2xl">
					{!appointment.profile ? "Create Appointment" : "Appointment Info"}
				</h1>
				<div className="grow" />

				{!edit ? (
					<>
						<button
							type="button"
							onClick={() => setEdit(true)}
							className="w-10 h-10 stack"
						>
							<LuPencil size={20} />
						</button>

						<button
							type="button"
							onClick={handleReturn}
							className="w-10 h-10 stack"
						>
							<LuMinus size={20} />
						</button>
					</>
				) : (
					<>
						<button
							type="button"
							onClick={clearForm}
							className="w-10 h-10 stack"
						>
							<LuX size={20} />
						</button>

						<PopoverButton
							pressAction={createChangeLog}
							popover={
								<ConfirmChanges
									action={handleSubmit}
									isNew={appointment.id === ""}
									changeLog={changeLog}
								/>
							}
						>
							<div className="w-10 h-10 stack">
								<LuCheck size={20} />
							</div>
						</PopoverButton>
					</>
				)}
			</div>

			<div className="flex flex-col gap-4 w-full">
				<div className="flex flex-col gap-1 items-start">
					<p className="text-sm text-gray-500">Patient</p>
					<SearchButton
						source={patientSource}
						itemAction={(item) => {
							setSelectedPatient(item as Patient);
						}}
					>
						<div className="flex gap-4 items-center w-full h-10 text-gray-700">
							<LuSearch size={24} />
							<p className="text-gray-700">
								{!selectedPatient
									? "Search Patients"
									: `${selectedPatient.profile?.firstName} ${selectedPatient.profile?.lastName}`}
							</p>
						</div>
					</SearchButton>
				</div>

				<div className="flex flex-col gap-1 items-start group">
					<label
						htmlFor="appointment-date"
						className="text-sm text-gray-500 group-has-[:focus]:text-gray-700"
					>
						Date
					</label>

					<input
						id="date"
						name="date"
						type="date"
						className="px-4 w-72 h-12 rounded-t-sm border-b-2 border-gray-200 outline-none focus:border-gray-400"
						value={formData.date}
						onChange={handleInputChange}
					/>
				</div>

				<div className="flex flex-col gap-1 items-start group">
					<label
						htmlFor="appointment-time"
						className="text-sm text-gray-500 group-has-[:focus]:text-gray-700"
					>
						Time
					</label>

					<input
						id="appointment-time"
						name="time"
						type="time"
						className="px-4 w-72 h-12 rounded-t-sm border-b-2 border-gray-200 outline-none focus:border-gray-400"
						value={formData.time}
						onChange={handleInputChange}
					/>
				</div>

				<div className="flex flex-col gap-1 items-start group">
					<h2 className="text-sm text-gray-500 group-has-[:focus]:text-gray-700">
						Duration
					</h2>
					<div className="flex gap-2 items-center">
						<label className="px-3 h-8 bg-gray-100 rounded-md ring-gray-300 has-[:checked]:bg-white has-[:checked]:ring-2 stack hover:ring-[1px]">
							<input
								type="radio"
								name="appointmentType"
								value={AppointmentType.HALF}
								id="half-appointment"
								checked={formData.appointmentType == AppointmentType.HALF}
								className="hidden w-full h-full peer"
								onChange={handleInputChange}
							/>

							<p className="block font-medium cursor-pointer select-none">
								{"30 min"}
							</p>
						</label>

						<label className="px-3 h-8 bg-gray-100 rounded-md ring-gray-300 has-[:checked]:bg-white has-[:checked]:ring-2 stack hover:ring-[1px]">
							<input
								type="radio"
								name="appointmentType"
								value={AppointmentType.FULL}
								id="full-appointment"
								checked={formData.appointmentType == AppointmentType.FULL}
								className="hidden w-full h-full peer"
								onChange={handleInputChange}
							/>

							<p className="block font-medium cursor-pointer select-none">
								{"1 hr"}
							</p>
						</label>
					</div>
				</div>

				<div>
					<EditableField
						label="Notes"
						value={formData.notes}
						handleInputChange={handleInputChange}
						inputID="notes"
						edit={edit}
					/>
				</div>
			</div>
		</form>
	);
}

"use client";

import { useContext, useEffect, useState } from "react";
import { id } from "@instantdb/react";
import PopoverButton, {
	PopoverButtonContext,
} from "@/app/_components/popover/popover_button";
import { LuCalendar, LuCheck, LuMinus, LuPencil, LuX } from "react-icons/lu";
import EditableField from "../editable_field";
import ConfirmChanges from "../confirm_changes";
import type { ChangeRecord } from "@/contexts/list-context-props";
import {
	type Appointment,
	AppointmentType,
	useAppointments,
} from "@/contexts/appointments";
import dayjs from "dayjs";

const emptyAppointment: Appointment = {
	id: id(),
	date: dayjs().format(),
	appointmentType: AppointmentType.FULL,
	admin: undefined,
	profile: undefined,
};

type AppointmentFormData = {
	date: string | number;
	appointmentType: AppointmentType;
};

export default function AppointmentDetails() {
	const context = useContext(PopoverButtonContext);
	const { update, selected, edit, setEdit, changeLog, setChangeLog } =
		useAppointments();

	const appointment = selected ?? emptyAppointment;

	const [formData, setFormData] = useState<AppointmentFormData>({
		...appointment,
	});

	const handleReturn = () => {
		setEdit(false);
		context?.setShow(false);
	};

	// useEffect(() => {
	// 	appointment.id === "" && setEdit(true);
	// }, [patient.email, setEdit]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const { date, appointmentType } = formData;

		update({ ...appointment, date: date, appointmentType: appointmentType });

		clearForm();
		setEdit(false);
	};

	const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
		const { name, value } = event.currentTarget;

		console.log(name);
		console.log(value);

		setFormData({
			...formData,
			[name]: value,
		});
	};

	const clearForm = () => {
		setFormData({
			date: "",
			appointmentType: AppointmentType.FULL,
		});
		setEdit(false);
		appointment.id === "" && context?.setShow(false);
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
				<div className="flex flex-col gap-1 items-start group">
					<label
						htmlFor="appointment-date"
						className="text-sm text-gray-500 group-has-[:focus]:text-gray-700"
					>
						Date
					</label>
					<input
						id="appointment-date"
						type="date"
						className="px-4 w-72 h-12 rounded-t-sm border-b-2 border-gray-200 outline-none focus:border-gray-500"
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
								checked={formData.appointmentType === AppointmentType.HALF}
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
								checked={formData.appointmentType === AppointmentType.FULL}
								className="hidden w-full h-full peer"
								onChange={handleInputChange}
							/>

							<p className="block font-medium cursor-pointer select-none">
								{"1 hr"}
							</p>
						</label>
					</div>
				</div>

				<div className="flex flex-col gap-1 items-start group">
					<label
						htmlFor="appointment-date"
						className="text-sm text-gray-500 group-has-[:focus]:text-gray-700"
					>
						Time
					</label>

					<input
						id="appointment-date"
						type="date"
						className="px-4 w-72 h-12 rounded-t-sm border-b-2 border-gray-200 outline-none focus:border-gray-500"
					/>
				</div>
			</div>
		</form>
	);
}

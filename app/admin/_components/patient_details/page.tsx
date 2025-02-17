"use client";

import { usePatient, type Patient } from "@/contexts/patients";
import { useContext, useEffect, useState } from "react";
import { id } from "@instantdb/react";
import PopoverButton, {
	PopoverButtonContext,
} from "@/app/_components/popover/popover_button";
import { LuCheck, LuMinus, LuPencil, LuX } from "react-icons/lu";
import EditableField from "../editable_field";
import ConfirmChanges from "../confirm_changes";
import type { ChangeRecord } from "@/contexts/list-context-props";

const emptyPatient: Patient = {
	profile: {
		id: id(),
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		created: JSON.stringify(new Date()),
		isAdmin: false,
	},
	dob: "",
	homeAddress: "",
	id: id(),
	created: undefined,
	occupation: undefined,
	sex: undefined,
	enthicity: undefined,
	emergencyPhone: undefined,
	email: "",
};

type PatientFormData = {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
};

export default function PatientDetails() {
	const context = useContext(PopoverButtonContext);
	const { update, selected, edit, setEdit, changeLog, setChangeLog } =
		usePatient();

	const patient = selected ?? emptyPatient;

	const [formData, setFormData] = useState<PatientFormData>({
		firstName: patient.profile?.firstName ?? "",
		lastName: patient.profile?.lastName ?? "",
		email: patient.profile?.email ?? "",
		phone: patient.profile?.phone ?? "",
	});

	const handleReturn = () => {
		setEdit(false);
		context?.setShow(false);
	};

	useEffect(() => {
		patient.email === "" && setEdit(true);
	}, [patient.email, setEdit]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const { email, firstName, lastName, phone } = formData;

		update({
			...patient,
			email: email !== "" ? email : (patient.profile?.email ?? ""),
			profile: {
				id: patient.profile?.id ?? id(),
				created: patient.profile?.created ?? JSON.stringify(new Date()),
				isAdmin: false,
				firstName:
					firstName !== "" ? firstName : (patient.profile?.firstName ?? ""),
				lastName:
					lastName !== "" ? lastName : (patient.profile?.lastName ?? ""),
				email: email !== "" ? email : (patient.profile?.email ?? ""),
				phone: phone !== "" ? phone : (patient.profile?.phone ?? ""),
			},
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
			firstName: patient.profile?.firstName ?? "",
			lastName: patient.profile?.lastName ?? "",
			email: patient.profile?.email ?? "",
			phone: patient.profile?.phone ?? "",
		});
		setEdit(false);
		patient.email === "" && context?.setShow(false);
	};

	const createChangeLog = () => {
		const prevData: PatientFormData = {
			firstName: patient.profile?.firstName ?? "",
			lastName: patient.profile?.lastName ?? "",
			email: patient.profile?.email ?? "",
			phone: patient.profile?.phone ?? "",
		};

		const newChanges: ChangeRecord[] = [];

		Object.entries(formData).map((element) => {
			const key = element[0];
			const change: ChangeRecord = {
				key: key,
				prevElement: prevData[key as keyof typeof prevData],
				newValue: element[1],
			};
			if (change.prevElement !== change.newValue) {
				newChanges.push(change);
			}
		});

		setChangeLog(newChanges);
	};

	return (
		<form className="flex flex-col py-4 px-6 rounded-md w-[28rem]">
			<div className="flex flex-row gap-2 items-center mb-6 h-12 text-gray-600">
				<h1 className="text-2xl">
					{patient.email === "" ? "Create Patient" : "Patient Information"}
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
									isNew={patient.email === ""}
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
				<EditableField
					label="First Name"
					value={formData.firstName}
					handleInputChange={handleInputChange}
					inputID="firstName"
					edit={edit}
				/>

				<EditableField
					label="Last Name"
					value={formData.lastName}
					handleInputChange={handleInputChange}
					inputID="lastName"
					edit={edit}
				/>

				<EditableField
					label="Email"
					value={formData.email}
					handleInputChange={handleInputChange}
					inputID="email"
					edit={edit}
				/>

				<EditableField
					label="Phone"
					value={formData.phone}
					handleInputChange={handleInputChange}
					inputID="phone"
					edit={edit}
				/>
			</div>
		</form>
	);
}

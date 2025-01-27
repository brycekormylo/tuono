"use client";

import {
	formattedPhoneNumber,
	usePatient,
	type Patient,
} from "@/contexts/patients";
import { useContext, useEffect, useState } from "react";
import { id } from "@instantdb/react";
import PopoverButton, {
	PopoverButtonContext,
} from "@/app/_components/popover/popover_button";
import { LuCheck, LuMinus, LuPencil, LuX } from "react-icons/lu";
import EditableField from "../editable_field";
import ConfirmChanges from "../confirm_changes";

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
	const { update, selected, edit, setEdit } = usePatient();

	const [patient, setPatient] = useState<Patient>(selected ?? emptyPatient);
	const [isNewPatient, setIsNewPatient] = useState(false);
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
		setPatient(selected ?? emptyPatient);
	}, [selected]);

	useEffect(() => {
		if (patient.email === "") {
			setIsNewPatient(true);
			setEdit(true);
		}
	}, []);

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
		isNewPatient && context?.setShow(false);
	};

	return (
		<form className="flex flex-col py-2 px-6 rounded-md w-[28rem]">
			<div className="flex flex-row gap-2 items-center mb-6 h-12 text-gray-600">
				<h1 className="text-2xl">
					{isNewPatient ? "Create Patient" : "Patient Information"}
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
							popover={
								<ConfirmChanges action={handleSubmit} formData={formData} />
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

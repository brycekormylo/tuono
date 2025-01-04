"use client";

import { usePatient, type Patient } from "@/contexts/patients";
import { useEffect, useState } from "react";
import { id } from "@instantdb/react";

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

export default function PatientDetails() {
	const { update, selected, setEdit } = usePatient();

	const [patient, setPatient] = useState<Patient>(
		selected ? selected : emptyPatient,
	);

	const handleReturn = () => {
		setEdit(false);
	};

	useEffect(() => {
		setPatient(selected ?? emptyPatient);
	}, [selected]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const formData = getFormData();
		update({
			...patient,
			email: formData.email,
			profile: {
				id: patient.profile?.id ?? id(),
				created: patient.profile?.created ?? JSON.stringify(new Date()),
				isAdmin: false,
				firstName:
					formData.firstName !== ""
						? formData.firstName
						: (patient.profile?.firstName ?? ""),
				lastName:
					formData.lastName !== ""
						? formData.lastName
						: (patient.profile?.lastName ?? ""),
				email: formData.email !== "" ? formData.email : (patient.email ?? ""),
				phone:
					formData.phone !== ""
						? formData.phone
						: (patient.profile?.phone ?? ""),
			},
		});

		// setEdit(false);
		clearForm();
		setEdit(false);
	};

	const getFormData = () => {
		return {
			firstName: (document.getElementById("firstName") as HTMLInputElement)
				.value,
			lastName: (document.getElementById("lastName") as HTMLInputElement).value,
			email: (document.getElementById("email") as HTMLInputElement).value,
			phone: (document.getElementById("phone") as HTMLInputElement).value,
		};
	};

	const clearForm = () => {
		(document.getElementById("firstName") as HTMLInputElement).value = "";
		(document.getElementById("lastName") as HTMLInputElement).value = "";
		(document.getElementById("email") as HTMLInputElement).value = "";
		(document.getElementById("phone") as HTMLInputElement).value = "";
	};

	return (
		<div className="fixed top-0 left-0 z-20 w-screen h-screen stack">
			<button
				type="button"
				onClick={handleReturn}
				className="w-screen h-screen bg-gray-200/60"
			/>

			<div className="flex flex-col gap-8 justify-start items-start py-8 px-12 bg-gray-50 rounded-xl h-[80vh] min-w-[54rem]">
				<h2 className="px-4 text-2xl">
					{`${patient.profile?.lastName}, ${patient.profile?.firstName}`}
				</h2>

				<form className="flex flex-col gap-4 items-end w-[24rem]">
					<div className="flex gap-2 justify-between items-center w-full">
						<label htmlFor="firstName" className="">
							First Name
						</label>
						<input
							type="text"
							name="firstName"
							id="firstName"
							placeholder={patient.profile?.firstName}
							className="rounded-input"
						/>
					</div>

					<div className="flex gap-2 justify-between items-center w-full">
						<label htmlFor="lastName" className="">
							Last Name
						</label>
						<input
							className="rounded-input"
							name="lastName"
							id="lastName"
							type="text"
							placeholder={patient.profile?.lastName}
						/>
					</div>

					<div className="flex gap-2 justify-between items-center w-full">
						<label htmlFor="email" className="">
							Email
						</label>
						<input
							className="rounded-input"
							name="email"
							id="email"
							type="text"
							placeholder={patient.profile?.email}
						/>
					</div>

					<div className="flex gap-2 justify-between items-center w-full">
						<label htmlFor="phone" className="">
							Phone Number
						</label>
						<input
							className="rounded-input"
							name="phone"
							id="phone"
							type="text"
							placeholder={patient.profile?.phone}
						/>
					</div>

					<div className="flex gap-6 justify-end px-4">
						<button
							type="button"
							className="px-8 h-12 bg-gray-300 rounded-xl"
							onClick={handleReturn}
						>
							Cancel
						</button>
						<button
							type="button"
							onClick={handleSubmit}
							className="px-8 h-12 bg-gray-200 rounded-xl disabled:text-gray-500 disabled:bg-gray-200/75"
							// disabled={!edit}
						>
							Save Changes
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

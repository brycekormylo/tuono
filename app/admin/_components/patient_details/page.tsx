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
import { LuPencil, LuX } from "react-icons/lu";
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

export default function PatientDetails() {
	const context = useContext(PopoverButtonContext);
	const { update, selected, edit, setEdit } = usePatient();

	const [patient, setPatient] = useState<Patient>(
		selected ? selected : emptyPatient,
	);

	const handleReturn = () => {
		setEdit(false);
		context?.setShow(false);
	};

	useEffect(() => {
		setPatient(selected ?? emptyPatient);
	}, [selected]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const { email, firstName, lastName, phone } = getFormData();

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
		<div className="flex-col">
			<div className="p-6 w-full rounded-xl stack">
				<div className="z-10 justify-self-end self-start">
					<button
						type="button"
						onClick={() => setEdit(!edit)}
						className="w-12 h-12 text-gray-600 bg-gray-100 rounded-full stack"
					>
						<LuPencil size={20} />
					</button>
				</div>

				<form className="flex z-0 flex-col w-[30rem]">
					<h1 className="pb-6 text-2xl text-gray-500">Patient Information</h1>

					<div className="flex flex-col gap-6 w-full">
						<EditableField
							label="First Name"
							value={patient.profile?.firstName || ""}
							inputID="firstName"
							edit={edit}
						/>

						<EditableField
							label="Last Name"
							value={patient.profile?.lastName || ""}
							inputID="lastName"
							edit={edit}
						/>

						<EditableField
							label="Email"
							value={patient.profile?.email || ""}
							inputID="email"
							edit={edit}
						/>

						<EditableField
							label="Phone"
							value={
								patient.profile
									? formattedPhoneNumber(patient.profile.phone)
									: ""
							}
							inputID="phone"
							edit={edit}
						/>

						{edit ? (
							<div className="flex gap-6 justify-end px-4 mt-8">
								<button
									type="button"
									className="px-8 h-12 bg-gray-300 rounded-xl"
									onClick={handleReturn}
								>
									Cancel
								</button>
								<PopoverButton
									popover={
										<ConfirmChanges
											action={handleSubmit}
											formData={getFormData()}
										/>
									}
								>
									<div className="px-8 h-12 bg-gray-200 rounded-xl disabled:text-gray-500 stack disabled:bg-gray-200/75">
										Save Changes
									</div>
								</PopoverButton>
							</div>
						) : (
							<div className="flex gap-6 justify-end px-4 mt-8">
								<button
									type="button"
									className="px-8 h-12 bg-gray-300 rounded-xl stack"
									onClick={handleReturn}
								>
									Close
								</button>
							</div>
						)}
					</div>
				</form>
			</div>
		</div>
	);
}

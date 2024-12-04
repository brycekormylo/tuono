"use client";

import type { ChangeEvent } from "react";
import type { PatientInfo } from "@/contexts/patient-list";
import { usePatientList } from "@/contexts/patient-list";
import { useEffect, useState } from "react";
import ActionButtons from "@/app/_components/editor/action-buttons";
import { id } from "@instantdb/react";

const emptyPatient: PatientInfo = {
	id: id(),
	firstName: "",
	lastName: "",
	email: "",
	phone: "",
};

interface PatientDetailProps {
	dismiss: () => void;
}

export default function PatientDetails(props: PatientDetailProps) {
	const { update, selected } = usePatientList();
	const { dismiss } = props;

	const [patient, setPatient] = useState<PatientInfo>(
		selected ? selected : emptyPatient,
	);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setPatient((prevState: PatientInfo) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = () => {
		update(patient);
		handleReturn();
	};

	const handleReturn = () => {
		dismiss();
	};

	useEffect(() => {
		selected && setPatient(selected);
	}, [selected]);

	return (
		<div className="fixed top-0 left-0 z-20 w-screen h-screen stack">
			<button
				type="button"
				onClick={handleReturn}
				className="w-screen h-screen bg-gray-200/60"
			/>

			<div className="flex flex-col gap-8 justify-start items-start py-8 px-12 bg-gray-50 rounded-xl h-[80vh] min-w-[54rem]">
				<h2 className="px-4 text-2xl">
					{patient.lastName}, {patient.firstName}
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
							value={patient.firstName}
							className="rounded-input"
							onChange={handleChange}
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
							value={patient.lastName}
							onChange={handleChange}
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
							value={patient.email}
							onChange={handleChange}
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
							value={patient.phone}
							onChange={handleChange}
						/>
					</div>

					<ActionButtons
						handleSubmit={handleSubmit}
						handleReturn={handleReturn}
					/>
				</form>
			</div>
		</div>
	);
}

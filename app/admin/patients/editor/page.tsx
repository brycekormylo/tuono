// "use client";
//
// import { id } from "@instantdb/react";
// import { type ChangeEvent, useEffect, useState } from "react";
// import ActionButtons from "@/app/_components/editor/action-buttons";
// import { usePatient, type Patient } from "@/contexts/patients";
//
// const emptyPatient: Patient = {
// 	id: id(),
// 	firstName: "",
// 	lastName: "",
// 	email: "",
// 	phone: "",
// 	created: new Date().toString(),
// 	records: {
// 		dob: "",
// 		homeAddress: "",
// 		occupation: undefined,
// 		sex: undefined,
// 		enthicity: undefined,
// 		emergencyPhone: undefined,
// 		id: "",
// 		created: undefined,
// 	},
// 	isAdmin: false,
// };
//
// export default function PatientEditor() {
// 	const { update, selected, setSelected, edit, setEdit } = usePatient();
//
// 	const [patient, setPatient] = useState<Patient>(emptyPatient);
//
// 	useEffect(() => {
// 		if (selected != null) {
// 			setPatient(selected);
// 		} else {
// 			setPatient(emptyPatient);
// 		}
// 	}, [selected, edit]);
//
// 	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
// 		const { name, value } = e.target;
// 		setPatient((prevState: Patient) => ({
// 			...prevState,
// 			[name]: value,
// 		}));
// 	};
//
// 	const handleSubmit = () => {
// 		update(patient);
// 		handleReturn();
// 	};
//
// 	const handleReturn = () => {
// 		setSelected(null);
// 		setEdit(false);
// 	};
//
// 	return (
// 		<div className="flex flex-col gap-8 justify-start items-end py-8 px-12 min-w-[24rem]">
// 			<h2 className="px-4 text-2xl">
// 				{selected ? `${patient.lastName}, ${patient.firstName}` : "New Patient"}
// 			</h2>
// 			<form className="flex flex-col gap-4 items-end w-[24rem]">
// 				<div className="flex gap-2 justify-between items-center w-full">
// 					<label htmlFor="firstName" className="">
// 						First Name
// 					</label>
// 					<input
// 						type="text"
// 						name="firstName"
// 						id="firstName"
// 						value={patient.firstName}
// 						className="rounded-input"
// 						onChange={handleChange}
// 					/>
// 				</div>
// 				<div className="flex gap-2 justify-between items-center w-full">
// 					<label htmlFor="lastName" className="">
// 						Last Name
// 					</label>
// 					<input
// 						className="rounded-input"
// 						name="lastName"
// 						id="lastName"
// 						type="text"
// 						value={patient.lastName}
// 						onChange={handleChange}
// 					/>
// 				</div>
// 				<div className="flex gap-2 justify-between items-center w-full">
// 					<label htmlFor="email" className="">
// 						Email
// 					</label>
// 					<input
// 						className="rounded-input"
// 						name="email"
// 						id="email"
// 						type="text"
// 						value={patient.email}
// 						onChange={handleChange}
// 					/>
// 				</div>
// 				<div className="flex gap-2 justify-between items-center w-full">
// 					<label htmlFor="phone" className="">
// 						Phone Number
// 					</label>
// 					<input
// 						className="rounded-input"
// 						name="phone"
// 						id="phone"
// 						type="text"
// 						value={patient.phone}
// 						onChange={handleChange}
// 					/>
// 				</div>
// 				<ActionButtons
// 					handleSubmit={handleSubmit}
// 					handleReturn={handleReturn}
// 				/>
// 			</form>
// 		</div>
// 	);
// }

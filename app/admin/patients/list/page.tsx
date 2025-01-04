"use client";

import type { ReactNode } from "react";
import Table from "@/app/_components/table/table";
import type { ListContextProps } from "@/contexts/list-context-props";
import TableRow from "@/app/_components/table/table-row";
import {
	formattedPhoneNumber,
	type Patient,
	usePatient,
} from "@/contexts/patients";
import PatientDetails from "@/app/admin/patient_details/page";

export default function PatientList() {
	const list: ListContextProps<Patient> = usePatient();

	const tableRows = list.info?.map((patient) => {
		return (
			<TableRow
				key={patient.email}
				source={list}
				element={patient}
				displayProperties={{
					left: `${patient.profile?.lastName}, ${patient.profile?.firstName}`,
					center: `${patient.profile?.email}`,
					right: `${formattedPhoneNumber(patient.profile?.phone ?? "")}`,
				}}
			/>
		);
	});

	return (
		<Table
			source={list}
			title="Patients"
			tableRows={tableRows as ReactNode[]}
			headerColumns={{ left: "Name", center: "Email", right: "Phone" }}
			overlay={<PatientDetails />}
		/>
	);
}

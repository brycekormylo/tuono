"use client";

import {
  formattedPhoneNumber,
  PatientInfo,
  usePatientList,
} from "@/contexts/patient-list";
import { ReactNode } from "react";
import PatientEditor from "../editor/page";
import Table from "@/app/_components/table/table";
import { ListContextProps } from "@/contexts/list-context-props";
import TableRow from "@/app/_components/table/table-row";

export default function PatientList() {
  const list: ListContextProps<PatientInfo> = usePatientList();

  const tableRows = list.info?.map((patient) => {
    return (
      <TableRow
        key={patient.email}
        source={list}
        element={patient}
        displayProperties={{
          left: `${patient.lastName}, ${patient.firstName}`,
          center: `${patient.email}`,
          right: `${formattedPhoneNumber(patient.phone)}`,
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
      drawerItem={<PatientEditor />}
    />
  );
}

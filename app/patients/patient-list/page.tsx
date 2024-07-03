"use client";

import { usePatientList, PatientInfo } from "@/hooks/use-patient-list";
import { useState, useEffect } from "react";

export default function PatientList() {
  const { getPatients } = usePatientList();
  const [patients, setPatients] = useState<PatientInfo[]>([]);

  const getPatientInfo = async () => {
    const data = await getPatients();
    setPatients(data);
  };

  useEffect(() => {
    getPatientInfo();
  });

  return (
    <div className="flex flex-col gap-8 p-6 w-full">
      <h2>My Patients</h2>
      {patients.map((patient) => {
        return (
          <div className="flex gap-4">
            <p>{patient.firstName}</p>
            <p>{patient.lastName}</p>
            <p>{patient.email}</p>
            <p>{patient.phone}</p>
          </div>
        );
      })}
    </div>
  );
}

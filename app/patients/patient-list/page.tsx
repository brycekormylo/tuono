"use client";

import { usePatientList, PatientInfo } from "@/hooks/use-patient-list";
import { useState, useEffect } from "react";
import {
  LuArrowUp,
  LuClock,
  LuArrowDown,
  LuMoreHorizontal,
} from "react-icons/lu";
import PatientRow from "../_components/patient-row";

export default function PatientList() {
  const { getPatients } = usePatientList();
  const [patients, setPatients] = useState<PatientInfo[]>([]);

  const getPatientInfo = async () => {
    const data = await getPatients();
    setPatients(data);
  };

  const sortAsc = () => {
    const sorted = [...patients].sort((a, b) =>
      a.lastName < b.lastName ? -1 : 1,
    );
    setPatients(sorted);
  };

  const sortDesc = () => {
    const sorted = [...patients].sort((a, b) =>
      a.lastName > b.lastName ? -1 : 1,
    );
    setPatients(sorted);
  };

  useEffect(() => {
    getPatientInfo();
  }, []);

  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="flex gap-4 justify-between items-center px-4">
        <div className="flex gap-2 items-center">
          <p className="text-sm text-gray-600">Sort</p>
          <button className="p-1 bg-gray-50 rounded-full" onClick={sortAsc}>
            <LuArrowUp size={24} />
          </button>
          <button className="p-1 bg-gray-50 rounded-full" onClick={sortDesc}>
            <LuArrowDown size={24} />
          </button>
        </div>
        {patients.length > 0 && (
          <p className="text-sm text-gray-600">
            {patients.length} active / 36 total
          </p>
        )}
      </div>
      <div className="flex p-4 bg-gray-50 rounded-xl min-w-[64vw]">
        <table className="text-right table-fixed rtl:text-right ltr:text-left grow">
          <thead>
            <tr className="py-4 text-lg font-semibold">
              <th className="text-left">Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th className="text-sm font-light text-right text-gray-500 w-[8rem]">
                edit
              </th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => {
              return <PatientRow patient={patient} />;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

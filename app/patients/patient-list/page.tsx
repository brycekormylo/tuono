"use client";

import { usePatientList, PatientInfo } from "@/contexts/patient-list";
import { useState, useEffect } from "react";
import { useInput } from "@/hooks/use-input";
import { LuEye, LuArrowUp, LuSearch, LuPlus } from "react-icons/lu";
import PatientRow from "../_components/patient-row";
import Link from "next/link";
import LabelIcon from "@/app/_components/label-icon";

export default function PatientList() {
  const { patients, sortAsc, setSortAsc } = usePatientList();

  const [filteredPatients, setFilteredPatients] = useState<
    PatientInfo[] | null
  >(null);
  const { value: searchInput, onChange: changeSearchInput } = useInput("");

  useEffect(() => {
    filterPatients(searchInput);
  }, [searchInput, patients]);

  const resetPatients = () => {
    patients && setFilteredPatients(patients);
  };

  const filterPatients = (searchInput: string) => {
    if (patients) {
      const filtered = patients.filter((patient) => {
        return (
          patient.lastName.toLowerCase().includes(searchInput.toLowerCase()) ||
          patient.firstName.toLowerCase().includes(searchInput.toLowerCase())
        );
      });
      setFilteredPatients(filtered);
    } else {
      resetPatients();
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex gap-8 items-center px-4">
        <div className="flex gap-8 items-center">
          <div className="w-96 stack">
            <input
              type="text"
              value={searchInput}
              className="z-0 w-full h-10 bg-gray-50 rounded-full outline-none ps-14 focus:scale-y-[1.02]"
              onChange={changeSearchInput}
            />
            <div className="flex z-10 justify-center justify-self-start items-center w-12 h-12 bg-gray-400 rounded-full">
              <LuSearch size={20} />
            </div>
          </div>
        </div>
        {patients ? (
          <div className="flex gap-1 items-center text-sm text-gray-600">
            <LuEye size={18} />
            {filteredPatients?.length != patients.length && (
              <>
                <p>{filteredPatients?.length}</p>
                <p className="px-1 text-lg">{"/"}</p>
              </>
            )}
            <p>{patients.length}</p>
          </div>
        ) : (
          <div className="w-4 h-4 bg-black rounded-full animate-pulse"></div>
        )}
        <div className="grow" />
        <Link href={"./new-patient-form"}>
          <LabelIcon icon={<LuPlus size={24} />} label="New" />
        </Link>
      </div>
      <div className="flex flex-col gap-2 p-4 bg-gray-50 rounded-tl-xl rounded-br-xl">
        <div className="grid grid-cols-[2fr,1fr,1fr,3rem] text-lg font-semibold min-w-[64vw]">
          <div className="flex col-start-1 gap-4 items-center h-10 text-lg font-semibold ps-4">
            <h1>Name</h1>
            <button
              className={`stack hover:scale-[1.02] transform ${sortAsc ? "rotate-180" : "rotate-0"}`}
              onClick={() => setSortAsc(!sortAsc)}
            >
              <div className="w-8 h-8 bg-gray-200 rounded-full" />
              <LuArrowUp size={18} />
            </button>
          </div>
          <div className="col-start-2 justify-self-end">
            <h1>Email</h1>
          </div>
          <div className="col-start-3 justify-self-end pe-4">
            <h1>Phone</h1>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          {filteredPatients?.map((patient) => {
            return <PatientRow key={patient.email} patient={patient} />;
          })}
        </div>
      </div>
    </div>
  );
}

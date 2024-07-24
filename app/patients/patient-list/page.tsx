"use client";

import { usePatientList, PatientInfo } from "@/contexts/patient-list";
import { useState, useEffect } from "react";
import { useInput } from "@/hooks/use-input";
import {
  LuEye,
  LuArrowUp,
  LuSearch,
  LuArrowDown,
  LuPlus,
} from "react-icons/lu";
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
    <div className="flex flex-col gap-4 p-4 [&_*]:transition-all [&_*]:ease-out">
      <div className="flex gap-8 items-center px-4">
        <div className="flex gap-8 items-center">
          <div className="grid items-center w-96">
            <input
              type="text"
              value={searchInput}
              className="z-0 col-start-1 row-start-1 h-10 bg-gray-50 rounded-full transition-all ease-in-out focus:outline-none ps-14 focus:scale-y-[1.02]"
              onChange={changeSearchInput}
            />
            <div className="flex z-10 col-start-1 row-start-1 justify-center items-center w-12 h-12 bg-gray-400 rounded-full">
              <LuSearch size={20} />
            </div>
          </div>
        </div>
        {!patients && (
          <div className="w-4 h-4 bg-black rounded-full animate-pulse"></div>
        )}
        {patients && (
          <div className="text-sm text-gray-600 flex items-center gap-1">
            <LuEye size={18} />
            <p>
              {filteredPatients ? filteredPatients.length : patients.length}
            </p>
            <p className="text-lg px-1">{"/"}</p>
            <p>{patients.length}</p>
            <p>total</p>
          </div>
        )}
        <div className="grow" />
        <Link href={"./new-patient-form"}>
          <LabelIcon icon={<LuPlus size={24} />} label="New" />
        </Link>
      </div>
      <div className="flex flex-col p-4 bg-gray-50 rounded-tl-xl rounded-br-xl">
        <div className="grid grid-cols-[2fr,1fr,1fr,3rem] text-lg font-semibold min-w-[64vw]">
          <div className="col-start-1 h-10 flex items-center gap-4 text-lg font-semibold ps-4">
            <h1>Name</h1>
            <div className="flex gap-2 items-center">
              <button
                className={sortAsc ? `text-black` : "text-gray-500"}
                onClick={() => setSortAsc(true)}
              >
                <LuArrowUp size={18} />
              </button>
              <button
                className={!sortAsc ? `text-black` : "text-gray-500"}
                onClick={() => setSortAsc(false)}
              >
                <LuArrowDown size={18} />
              </button>
            </div>
          </div>
          <div className="col-start-2 justify-self-end">
            <h1>Email</h1>
          </div>
          <div className="col-start-3 justify-self-end pe-4">
            <h1>Phone</h1>
          </div>
        </div>
        {filteredPatients &&
          filteredPatients.map((patient) => {
            return <PatientRow key={patient.email} patient={patient} />;
          })}
      </div>
    </div>
  );
}

"use client";

import { usePatientList, PatientInfo } from "@/hooks/use-patient-list";
import { useState, useEffect } from "react";
import { useInput } from "@/hooks/use-input";
import {
  LuArrowUp,
  LuSearch,
  LuArrowDown,
  LuMoreHorizontal,
} from "react-icons/lu";
import PatientRow from "../_components/patient-row";
import Link from "next/link";
import LabelIcon from "@/app/_components/label-icon";
import { LuPlus } from "react-icons/lu";

export default function PatientList() {
  const { getPatients } = usePatientList();
  const [patients, setPatients] = useState<PatientInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [filteredPatients, setFilteredPatients] = useState<PatientInfo[]>([]);
  const [sortIsAsc, setSortIsAsc] = useState(true);
  const { value: searchInput, onChange: changeSearchInput } = useInput("");

  const refreshList = async () => {
    await getPatientInfo();
  };

  const getPatientInfo = async () => {
    setIsLoading(true);
    const data = await getPatients();
    setPatients(data);
    setIsLoading(false);
  };

  const sortAsc = () => {
    const sorted = [...patients].sort((a, b) =>
      a.lastName < b.lastName ? -1 : 1,
    );
    const filteredSorted = [...filteredPatients].sort((a, b) =>
      a.lastName < b.lastName ? -1 : 1,
    );

    setPatients(sorted);
    setFilteredPatients(filteredSorted);
    setSortIsAsc(true);
  };

  const sortDesc = () => {
    const sorted = [...patients].sort((a, b) =>
      a.lastName > b.lastName ? -1 : 1,
    );
    const filteredSorted = [...filteredPatients].sort((a, b) =>
      a.lastName > b.lastName ? -1 : 1,
    );
    setPatients(sorted);
    setFilteredPatients(filteredSorted);
    setSortIsAsc(false);
  };

  const filterPatients = (searchInput: string) => {
    if (searchInput == "") {
      setFilteredPatients([...patients]);
    }
    const filtered = [...patients].filter((patient) => {
      if (patient.lastName.toLowerCase().includes(searchInput.toLowerCase())) {
        return true;
      }
      if (patient.firstName.toLowerCase().includes(searchInput.toLowerCase())) {
        return true;
      }
      return false;
    });
    setFilteredPatients(filtered);
  };

  useEffect(() => {
    if (!isLoading) {
      getPatientInfo();
    }
  }, []);

  useEffect(() => {
    filterPatients(searchInput);
  }, [searchInput]);

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
          <div className="flex gap-2 items-center">
            <p className="text-sm text-gray-600">Sort</p>
            <button
              className={sortIsAsc ? `text-black` : "text-gray-500"}
              onClick={sortAsc}
            >
              <LuArrowUp size={24} />
            </button>
            <button
              className={!sortIsAsc ? `text-black` : "text-gray-500"}
              onClick={sortDesc}
            >
              <LuArrowDown size={24} />
            </button>
          </div>
        </div>
        <div className="grow" />
        {patients.length > 0 && (
          <p className="text-sm text-gray-600">
            {patients.length} active / 36 total
          </p>
        )}
        <Link href={"./new-patient-form"}>
          <LabelIcon icon={<LuPlus size={24} />} label="Add New" />
        </Link>
      </div>
      <div className="flex flex-col p-4 bg-gray-50 rounded-tl-xl rounded-br-xl">
        <div className="grid grid-cols-[2fr,1fr,1fr] text-lg font-semibold min-w-[64vw]">
          <div className="col-start-1 h-10 text-lg font-semibold ps-4">
            <h1>Name</h1>
          </div>
          <div className="col-start-2 justify-self-end">
            <h1>Email</h1>
          </div>
          <div className="col-start-3 justify-self-end pe-4">
            <h1>Phone</h1>
          </div>
        </div>
        {(filteredPatients.length > 0 ? filteredPatients : patients).map(
          (patient, index) => {
            return <PatientRow key={index} patient={patient} index={index} />;
          },
        )}
      </div>
    </div>
  );
}

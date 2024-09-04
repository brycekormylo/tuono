"use client";

import { usePatientList } from "@/contexts/patient-list";
import { LuEye, LuArrowUp, LuSearch, LuPlus } from "react-icons/lu";
import PatientRow from "../_components/patient-row";
import PatientEditor from "../editor/page";

export default function PatientList() {
  const {
    editMode,
    setEditMode,
    rawPatients,
    patients,
    sortAsc,
    setSortAsc,
    setSelected,
    searchInput,
    changeSearchInput,
  } = usePatientList();

  const handleNewPatient = () => {
    setSelected(null);
    setEditMode(true);
  };

  return (
    <div className="flex flex-col gap-8 p-4 w-full [&_*]:flex-nowrap">
      <div className="flex gap-8 items-center px-8 w-full">
        <h1 className="text-4xl">Patients</h1>
        <div className="grow" />
        {rawPatients ? (
          <div className="flex gap-1 items-center text-sm text-gray-600">
            {rawPatients?.length != patients?.length && (
              <>
                <p>{patients?.length}</p>
                <p className="px-1 text-lg">{"/"}</p>
              </>
            )}
            <p>{rawPatients?.length}</p>
            <LuEye size={18} />
          </div>
        ) : (
          <div className="w-4 h-4 bg-black rounded-full animate-pulse"></div>
        )}
        <div className="w-96 stack">
          <input
            type="text"
            value={searchInput}
            className="z-0 w-full h-14 bg-gray-50 rounded-xl border-gray-200 outline-none focus:border-gray-400 border-[1px] ps-16 peer"
            onChange={changeSearchInput}
          />
          <div className="flex z-10 justify-self-start w-full text-gray-600 pointer-events-none ps-6 peer-focus:text-gray-800">
            <LuSearch size={24} />
          </div>
        </div>
        <button
          onMouseDown={handleNewPatient}
          className="w-12 h-12 bg-gray-300 rounded-full stack"
        >
          <LuPlus size={24} />
        </button>
      </div>
      <div className="flex justify-between items-start">
        <div className="flex z-10 flex-col gap-2 p-4 bg-gray-50 rounded-tl-xl rounded-br-xl grow min-h-[32rem]">
          <div className="grid grid-cols-[1fr,2fr,1.5fr,1rem] px-4 font-semibold h-12 items-center">
            <div className="flex col-start-1 gap-4 items-center h-10 font-semibold ps-4">
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
            {patients?.map((patient) => {
              return <PatientRow key={patient.email} patient={patient} />;
            })}
          </div>
        </div>
        <div
          className={`overflow-clip flex justify-end ${editMode ? "w-[30rem]" : "w-0"}`}
        >
          <PatientEditor />
        </div>
      </div>
    </div>
  );
}

import {
  LuUndo,
  LuTrash2,
  LuEye,
  LuCheck,
  LuX,
  LuTrash,
  LuPencil,
} from "react-icons/lu";
import { useEffect, useState } from "react";
import { usePatientList, PatientInfo } from "@/contexts/patient-list";

interface PatientRowProps {
  patient: PatientInfo;
}

export default function PatientRow({ patient }: PatientRowProps) {
  const {
    removePatient,
    selectedPatient,
    setSelectedPatient,
    editMode,
    setEditMode,
  } = usePatientList();

  const formattedPhoneNumber = (phone: string): String => {
    let phoneArr = Array.from(phone);

    let formatted = [
      "(",
      ...phoneArr.slice(0, 3),
      ") ",
      ...phoneArr.slice(3, 6),
      "-",
      ...phoneArr.slice(6, 10),
    ].join("");

    return formatted;
  };

  const [isSelected, setIsSelected] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);

  useEffect(() => {
    setIsSelected(selectedPatient?.id == patient.id);
  }, [selectedPatient]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setDeleteMode(false);
  }, [isSelected]);

  const handleClick = () => {
    if (selectedPatient?.id == patient.id) {
      setEditMode(false);
    } else {
      setSelectedPatient(patient);
    }
  };

  const handleDelete = () => {
    const selected = selectedPatient;
    setSelectedPatient(null);
    selected && removePatient(selected);
  };

  const handleEdit = () => {
    setEditMode(true);
    setSelectedPatient(patient);
    setIsSelected(false);
  };

  return (
    <div
      className={`grid group h-14 w-full rounded-md overflow-clip bg-gray-300/75 ${editMode ? "grid-cols-[1fr,1fr,1fr,0]" : isSelected ? "grid-cols-[1fr,1fr,20rem,10rem]" : "grid-cols-[1fr,1fr,30rem,0]"}  items-center`}
    >
      <div
        className={`flex col-start-1 row-start-1 justify-self-start items-center w-full h-full group-hover:bg-gray-200 ps-4 ${isSelected ? "bg-gray-100" : "bg-gray-50"}`}
      >
        <h2 className="text-lg font-medium select-none">
          {patient.lastName}, {patient.firstName}
        </h2>
      </div>
      <div
        className={`flex flex-wrap col-start-2 row-start-1 gap-2 justify-end items-center w-full h-full group-hover:bg-gray-200 ${isSelected ? "bg-gray-100 " : "bg-gray-50"}`}
      >
        <h2 className="text-base font-medium select-none">{patient.email}</h2>
      </div>
      <div
        className={`flex z-10 col-start-3 row-start-1 gap-2 justify-end justify-items-end items-center w-full h-full rounded-r-md ${isSelected ? "bg-gray-100" : "bg-gray-50"} min-w-40`}
      >
        <div className="flex gap-2 justify-end items-center w-full h-full group-hover:bg-gray-200 pe-4">
          <p className="text-base select-none">
            {formattedPhoneNumber(patient.phone)}
          </p>
        </div>
      </div>
      <button
        className="z-10 col-start-1 col-end-4 row-start-1 h-full bg-transparent grow"
        onMouseDown={handleClick}
      />
      <div className="flex z-0 col-start-4 col-end-5 row-start-1 justify-evenly justify-self-end items-center h-full rounded-r-md min-w-[10rem]">
        {deleteMode ? (
          <>
            <button onClick={() => setDeleteMode(false)}>
              <LuUndo size={24} />
            </button>
            <div>
              <label className="text-sm text-wrap">Delete?</label>
            </div>
            <button onClick={handleDelete} className="text-red-500">
              <LuTrash2 size={24} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setDeleteMode(true)}
              className="text-red-500"
            >
              <LuTrash2 size={24} />
            </button>
            <button onClick={handleEdit} className="">
              <LuPencil size={24} />
            </button>
            <a href={"/patients"} className="">
              <LuEye size={24} />
            </a>
          </>
        )}
      </div>
    </div>
  );
}

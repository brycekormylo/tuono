import {
  LuUndo,
  LuTrash2,
  LuTornado,
  LuHistory,
  LuUserCog,
  LuTrash,
  LuPencil,
} from "react-icons/lu";
import { useEffect, useState } from "react";
import {
  usePatientList,
  PatientInfo,
  formattedPhoneNumber,
} from "@/contexts/patient-list";

interface PatientRowProps {
  patient: PatientInfo;
}

export default function PatientRow({ patient }: PatientRowProps) {
  const { remove, selected, setSelected, edit, setEdit } = usePatientList();

  const [isSelected, setIsSelected] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);

  useEffect(() => {
    setIsSelected(selected?.id == patient.id);
  }, [selected]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setDeleteMode(false);
  }, [isSelected]);

  const handleClick = () => {
    if (selected?.id == patient.id) {
      setEdit(false);
      setSelected(null);
    } else {
      setEdit(false);
      setSelected(patient);
    }
  };

  const handleDelete = () => {
    setDeleteMode(false);
    const toDelete = selected;
    setSelected(null);
    toDelete && remove(toDelete);
  };

  const handleEdit = () => {
    setEdit(true);
    setSelected(patient);
  };

  return (
    <div
      className={`grid group h-14 w-full rounded-md overflow-clip bg-gray-300/75 ${edit ? "grid-cols-[1fr,1fr,1fr,0]" : isSelected ? "grid-cols-[1fr,1fr,20rem,10rem]" : "grid-cols-[1fr,1fr,30rem,0]"}  items-center`}
    >
      <div
        className={`flex col-start-1 row-start-1 justify-self-start items-center w-full h-full group-hover:bg-gray-200 ps-4 ${isSelected ? "bg-gray-100" : "bg-gray-50"}`}
      >
        <h2 className="text-lg select-none">
          {patient.lastName}, {patient.firstName}
        </h2>
      </div>
      <div
        className={`flex flex-wrap col-start-2 row-start-1 gap-2 justify-end items-center w-full h-full group-hover:bg-gray-200 ${isSelected ? "bg-gray-100 " : "bg-gray-50"}`}
      >
        <h2 className="text-base select-none">{patient.email}</h2>
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
              <LuUndo size={20} />
            </button>
            <div>
              <label className="text-sm text-wrap">Delete?</label>
            </div>
            <button onClick={handleDelete} className="text-red-600">
              <LuTrash2 size={20} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setDeleteMode(true)}
              className="text-red-600"
            >
              <LuTrash2 size={20} />
            </button>
            <a href={"/patients"} className="">
              <LuHistory size={20} />
            </a>
            <button onClick={handleEdit} className="">
              <LuUserCog size={20} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

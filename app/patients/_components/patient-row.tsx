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
  // const [showOptions, setShowOptions] = useState(false);
  // const [showConfirmation, setShowConfirmation] = useState(false);

  // useEffect(() => {
  //   if (selectedPatient) {
  //     setShowOptions(selectedPatient.email == patient.email);
  //   } else {
  //     setShowOptions(false);
  //   }
  // }, [selectedPatient]); // eslint-disable-line react-hooks/exhaustive-deps
  //
  // const handleSelect = () => {
  //   if (selectedPatient?.id == patient.id) {
  //     setSelectedPatient(null);
  //     setEditMode(false);
  //   } else {
  //     setSelectedPatient(patient);
  //   }
  // };

  // const handleDelete = () => {
  //   removePatient(patient);
  //   setShowOptions(false);
  // };
  //
  // const toggleEdit = () => {
  //   setShowOptions(false);
  //   setEditMode(!editMode);
  // };

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

  const [isExpanded, setIsExpanded] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);

  useEffect(() => {
    selectedPatient && setIsExpanded(selectedPatient.id == patient.id);
  }, [selectedPatient]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setDeleteMode(false);
  }, [isExpanded]);

  const handleClick = () => {
    if (selectedPatient?.id == patient.id) {
      setSelectedPatient(null);
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
    setIsExpanded(false);
  };

  //  return (
  //    <div
  //      className={`
  // grid h-14 ${showOptions && !editMode ? "grid-cols-[1fr,2fr,1.5fr,6rem]" : "grid-cols-[1fr,2fr,1.5fr,1rem]"}
  // ${selectedPatient?.email == patient.email ? "bg-gray-400/10" : " bg-transparent"}
  // overflow-clip hover:bg-gray-400/15 rounded-md
  //      `}
  //    >
  //      <button
  //        className="col-start-1 col-end-5 row-span-1 row-start-1 bg-transparent"
  //        onClick={handleSelect}
  //      />
  //      {showOptions && !editMode && (
  //        <div className="flex z-20 col-start-4 row-start-1 justify-evenly">
  //          {!showConfirmation ? (
  //            <>
  //              <button
  //                onClick={() => setShowConfirmation(true)}
  //                className="flex items-center text-red-700"
  //              >
  //                <LuTrash size={18} />
  //              </button>
  //              <button onClick={toggleEdit} className="flex items-center">
  //                {editMode ? <LuX size={20} /> : <LuPencil size={20} />}
  //              </button>
  //            </>
  //          ) : (
  //            <>
  //              <button
  //                onClick={() => setShowConfirmation(false)}
  //                className="flex gap-2 items-center"
  //              >
  //                <LuX size={20} />
  //              </button>
  //              <button
  //                onClick={handleDelete}
  //                className="flex gap-2 items-center"
  //              >
  //                <LuCheck size={20} />
  //              </button>
  //            </>
  //          )}
  //        </div>
  //      )}
  //      <div className="col-start-1 row-start-1 justify-items-center justify-self-start ps-4">
  //        <p className="pt-4">
  //          {patient.lastName}, {patient.firstName}
  //        </p>
  //      </div>
  //      <div className="col-start-2 row-start-1 justify-self-end">
  //        <p className="pt-4">{patient.email}</p>
  //      </div>
  //      <div className="col-start-3 row-start-1 justify-self-end pe-4">
  //        <p className="pt-4">{formattedPhoneNumber(patient.phone)}</p>
  //      </div>
  //    </div>
  //  );

  return (
    <div className="w-full h-14 stack">
      <div className="flex z-10 w-full">
        <div className="grid group h-14 w-full rounded-md overflow-clip bg-transparent grid-cols-[1fr,2fr,1.5fr] items-center">
          <div
            className={`flex col-start-1 row-start-1 justify-self-start items-center w-full h-full group-hover:bg-gray-200 ps-4 ${isExpanded ? "bg-gray-100" : "bg-gray-50"}`}
          >
            <h2 className="text-lg font-medium select-none">
              {patient.lastName}, {patient.firstName}
            </h2>
          </div>
          <div
            className={`flex flex-wrap col-start-2 row-start-1 gap-2 justify-end pe-2 items-center w-full h-full  group-hover:bg-gray-200 ${isExpanded ? "bg-gray-100" : "bg-gray-50"}`}
          >
            <h2 className="text-base font-medium select-none">
              {patient.email}
            </h2>
          </div>
          <div
            className={`${isExpanded ? " pe-[10rem]" : ""} flex col-start-3 row-start-1 gap-2 justify-end  w-full h-full justify-items-end items-center min-w-40`}
          >
            <div
              className={`flex gap-2 justify-end items-center w-full h-full group-hover:bg-gray-200 pe-4 ${isExpanded ? "bg-gray-100" : "bg-gray-50"}`}
            >
              <p className="text-base select-none">
                {formattedPhoneNumber(patient.phone)}
              </p>
            </div>
          </div>
          <button
            className={`${isExpanded ? "me-[10rem]" : ""} col-start-1 col-end-4 row-start-1 h-full grow bg-transparent`}
            onMouseDown={handleClick}
          />
        </div>
      </div>

      <div
        className={`${isExpanded ? "z-10" : "z-0"} flex justify-evenly justify-self-end items-center h-full rounded-r-md bg-gray-300/75 min-w-[10rem]`}
      >
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

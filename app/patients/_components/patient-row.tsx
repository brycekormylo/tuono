import { LuCheck, LuX, LuTrash, LuPencil } from "react-icons/lu";
import { useEffect, useState } from "react";
import { usePatientList, PatientInfo } from "@/contexts/patient-list";

interface PatientRowProps {
  patient: PatientInfo;
}

export default function PatientRow({ patient }: PatientRowProps) {
  const { removePatient, selectedPatient, setSelected, editMode, setEditMode } =
    usePatientList();
  const [showOptions, setShowOptions] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    if (selectedPatient) {
      setShowOptions(selectedPatient.email == patient.email);
    } else {
      setShowOptions(false);
    }
  }, [selectedPatient]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSelect = () => {
    if (selectedPatient?.id == patient.id) {
      setSelected(null);
      setEditMode(false);
    } else {
      setSelected(patient);
    }
  };

  const handleDelete = () => {
    removePatient(patient);
    setShowOptions(false);
  };

  const toggleEdit = () => {
    setShowOptions(false);
    setEditMode(!editMode);
  };

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

  return (
    <div
      className={`
	grid h-14 ${showOptions && !editMode ? "grid-cols-[1fr,2fr,1.5fr,6rem]" : "grid-cols-[1fr,2fr,1.5fr,1rem]"}  
	${selectedPatient?.email == patient.email ? "bg-gray-400/10" : " bg-transparent"} 
	overflow-clip hover:bg-gray-400/15 rounded-md 
      `}
    >
      <button
        className="col-start-1 col-end-5 row-span-1 row-start-1 bg-transparent"
        onClick={handleSelect}
      />
      {showOptions && !editMode && (
        <div className="flex z-20 col-start-4 row-start-1 justify-evenly">
          {!showConfirmation ? (
            <>
              <button
                onClick={() => setShowConfirmation(true)}
                className="flex items-center text-red-700"
              >
                <LuTrash size={18} />
              </button>
              <button onClick={toggleEdit} className="flex items-center">
                {editMode ? <LuX size={20} /> : <LuPencil size={20} />}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setShowConfirmation(false)}
                className="flex gap-2 items-center"
              >
                <LuX size={20} />
              </button>
              <button
                onClick={handleDelete}
                className="flex gap-2 items-center"
              >
                <LuCheck size={20} />
              </button>
            </>
          )}
        </div>
      )}
      <div className="col-start-1 row-start-1 justify-items-center justify-self-start ps-4">
        <p className="pt-4">
          {patient.lastName}, {patient.firstName}
        </p>
      </div>
      <div className="col-start-2 row-start-1 justify-self-end">
        <p className="pt-4">{patient.email}</p>
      </div>
      <div className="col-start-3 row-start-1 justify-self-end pe-4">
        <p className="pt-4">{formattedPhoneNumber(patient.phone)}</p>
      </div>
    </div>
  );
}

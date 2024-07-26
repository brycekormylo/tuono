import { LuCheck, LuX, LuTrash, LuPencil } from "react-icons/lu";
import { useEffect, useState } from "react";
import { usePatientList, PatientInfo } from "@/contexts/patient-list";

interface PatientRowProps {
  patient: PatientInfo;
}

export default function PatientRow({ patient }: PatientRowProps) {
  const { removePatient, updatePatient, selectedPatient, setSelected } =
    usePatientList();
  const [isExpanded, setIsExpanded] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [form, setForm] = useState<PatientInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    setForm({
      ...form,
      firstName: patient.firstName,
      lastName: patient.lastName,
      email: patient.email,
      phone: patient.phone,
    });
  }, []);

  useEffect(() => {
    if (selectedPatient) {
      setIsExpanded(selectedPatient.email == patient.email);
    } else {
      setIsExpanded(false);
    }
  }, [selectedPatient]);

  const handleSubmitChanges = () => {
    updatePatient(patient, form);
    setEditMode(false);
    setIsExpanded(false);
  };

  const handleExpand = () => {
    if (selectedPatient) {
      if (selectedPatient.email == patient.email) {
        setSelected(null);
      } else {
        setSelected(patient);
      }
    } else {
      setSelected(patient);
    }
  };

  const handleEditMode = () => {
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
  };

  const handleDelete = () => {
    removePatient(patient);
    setIsExpanded(false);
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
	transition-all ease-in-out grid h-14 ${isExpanded ? "grid-cols-[2fr,1fr,1fr,6rem]" : "grid-cols-[2fr,1fr,1fr,1rem]"} text-base font-normal 
	${isExpanded ? "bg-gray-400/10" : " bg-transparent"} 
	overflow-clip hover:bg-gray-400/20 hover:scale-y-[1.02] rounded-md 
	[&_input]:border-b-gray-600/25 [&_input]:border-b-[2px] [&_input]:outline-none 
        [&_input]:bg-transparent [&_input]:focus:scale-[1.02]
        [&_input]:px-1 
      `}
    >
      <button
        className="col-start-1 col-end-5 bg-transparent row-start-1 row-span-1"
        onClick={handleExpand}
      />
      {isExpanded && (
        <div className="flex z-20 col-start-4 row-start-1 justify-evenly">
          {!editMode ? (
            <>
              <button
                onClick={handleDelete}
                className="flex items-center hover:scale-[1.02] text-red-700"
              >
                <LuTrash size={18} />
              </button>
              <button
                onClick={handleEditMode}
                className="flex items-center hover:scale-[1.02]"
              >
                <LuPencil size={20} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleCancelEdit}
                className="flex gap-2 items-center hover:scale-[1.02]"
              >
                <LuX size={20} />
              </button>
              <button
                onClick={handleSubmitChanges}
                className="flex gap-2 items-center hover:scale-[1.02]"
              >
                <LuCheck size={20} />
              </button>
            </>
          )}
        </div>
      )}
      <div className="col-start-1 row-start-1 justify-items-center justify-self-start ps-4">
        {editMode ? (
          <div className="flex gap-2 pt-4">
            <input
              className="w-48"
              type="text"
              value={form.lastName}
              onChange={(e) => {
                setForm({ ...form, lastName: e.target.value });
              }}
            />
            <input
              className="w-48"
              type="text"
              value={form.firstName}
              onChange={(e) => {
                setForm({ ...form, firstName: e.target.value });
              }}
            />
          </div>
        ) : (
          <p className="pt-4">
            {patient.lastName}, {patient.firstName}
          </p>
        )}
      </div>
      <div className="col-start-2 row-start-1 justify-self-end">
        {editMode ? (
          <div className="flex pt-4">
            <input
              className="text-right"
              type="email"
              value={form.email}
              onChange={(e) => {
                setForm({ ...form, email: e.target.value });
              }}
            />
          </div>
        ) : (
          <p className="pt-4">{patient.email}</p>
        )}
      </div>
      <div className={`justify-self-end col-start-3 row-start-1 pe-4`}>
        {editMode ? (
          <div className="flex pt-4">
            <input
              className="w-32 text-right"
              type="tel"
              value={form.phone}
              onChange={(e) => {
                setForm({ ...form, phone: e.target.value });
              }}
            />
          </div>
        ) : (
          <p className="pt-4">{formattedPhoneNumber(patient.phone)}</p>
        )}
      </div>
    </div>
  );
}

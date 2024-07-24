import { LuCheck, LuX, LuTrash, LuMoreHorizontal } from "react-icons/lu";
import { useEffect, useState } from "react";
import { usePatientList, PatientInfo } from "@/contexts/patient-list";

interface PatientRowProps {
  patient: PatientInfo;
}

export default function PatientRow({ patient }: PatientRowProps) {
  const { removePatient, updatePatient } = usePatientList();
  const [isExpanded, setIsExpanded] = useState(false);

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

  const handleSubmitChanges = () => {
    updatePatient(patient, form);
    setIsExpanded(false);
  };

  const handleExpand = () => {
    setIsExpanded(true);
  };

  const handleCancelEdit = () => {
    setIsExpanded(false);
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
	grid grid-cols-[2fr,1fr,1fr,3rem] text-base font-normal 
	${isExpanded ? "h-28 bg-gray-400/10" : "h-14 bg-transparent"} 
	overflow-clip hover:bg-gray-400/20 hover:scale-y-[1.02] rounded-md 
	[&_input]:border-b-gray-600/25 [&_input]:border-b-[2px] [&_input]:outline-none 
        [&_input]:bg-transparent [&_input]:focus:scale-[1.02]
        [&_input]:px-1 
      `}
    >
      <div className="flex col-start-4 row-start-1 justify-center items-start pt-5 pb-4 text-gray-700/75 pe-4  ">
        <button onClick={handleExpand}>
          <LuMoreHorizontal size={18} />
        </button>
      </div>
      <div
        className={`grow ${isExpanded ? "bg-white" : "bg-gray-400/5"} flex z-20 flex-row-reverse justify-start col-start-1 col-end-5 px-6 row-start-2 gap-6 items-start py-4`}
      >
        <button
          onClick={handleSubmitChanges}
          className="flex gap-2 items-center hover:scale-[1.02]"
        >
          <label className="text-sm">Sumbit</label>
          <LuCheck size={20} />
        </button>
        <button
          onClick={handleCancelEdit}
          className="flex gap-2 items-center hover:scale-[1.02]"
        >
          <label className="text-xs">Discard</label>
          <LuX size={20} />
        </button>
        <div className="grow" />
        <button
          onClick={handleDelete}
          className="flex gap-2 items-center hover:scale-[1.02] text-red-700"
        >
          <LuTrash size={18} />
          <label className="text-sm">Delete</label>
        </button>
      </div>
      <div className="col-start-1 row-start-1 justify-items-center justify-self-start ps-4">
        {isExpanded ? (
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
        {isExpanded ? (
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
        {isExpanded ? (
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

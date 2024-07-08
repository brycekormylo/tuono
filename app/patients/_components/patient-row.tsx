import {
  LuCheck,
  LuPencil,
  LuX,
  LuTrash,
  LuMoreHorizontal,
} from "react-icons/lu";
import { useEffect, useState } from "react";
import { useInput } from "@/hooks/use-input";
import { usePatientList, PatientInfo } from "@/contexts/patient-list";

interface PatientRowProps {
  patient: PatientInfo;
}

export default function PatientRow({ patient }: PatientRowProps) {
  const { removePatient, updatePatient } = usePatientList();
  const [isExpanded, setIsExpanded] = useState(false);

  const { value: firstName, onChange: changeFirstName } = useInput(
    patient.firstName,
  );
  const { value: lastName, onChange: changeLastName } = useInput(
    patient.lastName,
  );
  const { value: email, onChange: changeEmail } = useInput(patient.email);
  const { value: phone, onChange: changePhone } = useInput(patient.phone);

  const handleSubmitChanges = () => {
    const newInfo: PatientInfo = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
    };

    updatePatient(patient, newInfo);
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
	${isExpanded ? "h-24 bg-gray-400/10" : "h-14 bg-transparent"} 
	overflow-clip hover:bg-gray-400/20 rounded-md 
	[&_input]:border-b-gray-600/25 [&_input]:border-b-[2px] [&_input]:outline-none 
        [&_input]:bg-transparent [&_input]:focus:scale-[1.02]
        [&_input]:px-1 
      `}
    >
      <div className="flex col-start-4 row-start-1 justify-center items-start pt-5 text-gray-700/75 pe-4">
        <button onClick={handleExpand}>
          <LuMoreHorizontal size={18} />
        </button>
      </div>
      <div className="flex z-20 flex-row-reverse col-start-1 col-end-4 row-start-1 gap-4 items-start mt-14 pe-6">
        <button onClick={handleCancelEdit}>
          <LuX size={20} />
        </button>
        <button onClick={handleSubmitChanges}>
          <LuCheck size={20} />
        </button>
        <button onClick={handleDelete}>
          <LuTrash size={18} />
        </button>
      </div>
      <div className="col-start-1 row-start-1 justify-items-center justify-self-start ps-4">
        {isExpanded ? (
          <div className="flex gap-2 pt-4">
            <input
              className="w-48"
              type="text"
              value={lastName}
              onChange={changeLastName}
            />
            <input
              className="w-48"
              type="text"
              value={firstName}
              onChange={changeFirstName}
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
              type="text"
              value={email}
              onChange={changeEmail}
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
              type="text"
              value={phone}
              onChange={changePhone}
            />
          </div>
        ) : (
          <p className="pt-4">{formattedPhoneNumber(patient.phone)}</p>
        )}
      </div>
    </div>
  );
}

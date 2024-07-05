import { PatientInfo } from "@/hooks/use-patient-list";
import { LuCheck, LuPencil, LuX, LuTrash } from "react-icons/lu";
import { useEffect, useState } from "react";
import { usePatientList } from "@/hooks/use-patient-list";
import { useInput } from "@/hooks/use-input";

interface PatientRowProps {
  patient: PatientInfo;
  index: number;
}

export default function PatientRow({ patient, index }: PatientRowProps) {
  const { removePatient, addPatient } = usePatientList();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const { value: firstName, onChange: changeFirstName } = useInput(
    patient.firstName,
  );
  const { value: lastName, onChange: changeLastName } = useInput(
    patient.lastName,
  );
  const { value: email, onChange: changeEmail } = useInput(patient.email);
  const { value: phone, onChange: changePhone } = useInput(patient.phone);

  const [newPatientInfo, setNewPatientInfo] = useState<PatientInfo>(patient);

  const handleSubmitChanges = () => {
    setNewPatientInfo({
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
    });
    removePatient(patient);
    addPatient(newPatientInfo);
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
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
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
      key={index}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="
	grid grid-cols-[2fr,1fr,1fr] text-base font-normal 
	[&_input]:border-b-gray-600 [&_input]:border-b-2 [&_input]:outline-none 
        [&_input]:bg-transparent [&_input]:focus:scale-[1.02]
        [&_input]:py-1 [&_input]:px-1 
      "
    >
      <div
        onClick={handleExpand}
        className={`overflow-clip row-start-1 col-start-1 col-end-4 rounded-md ${isHovered || isExpanded ? "bg-gray-400/20" : "bg-transparent"} ${isExpanded ? "h-24" : "h-14"}`}
      >
        <div
          className={`flex flex-row-reverse items-center gap-4 pe-4 mt-14 z-20`}
        >
          <button onClick={handleCancelEdit}>
            <LuX size={20} />
          </button>
          <button onClick={handleSubmitChanges} className="">
            <LuCheck size={20} />
          </button>
          <button onClick={handleDelete} className="">
            <LuTrash size={20} />
          </button>
        </div>
      </div>
      <div className="col-start-1 row-start-1 justify-items-center justify-self-start ps-4">
        {isExpanded ? (
          <div className="flex gap-2">
            <input type="text" value={lastName} onChange={changeLastName} />
            <input type="text" value={firstName} onChange={changeFirstName} />
          </div>
        ) : (
          <p className="pt-4" onClick={handleExpand}>
            {patient.lastName}, {patient.firstName}
          </p>
        )}
      </div>
      <div className="col-start-2 row-start-1 justify-self-end">
        {isExpanded ? (
          <input type="text" value={email} onChange={changeEmail} />
        ) : (
          <p className="pt-4" onClick={handleExpand}>
            {patient.email}
          </p>
        )}
      </div>
      <div className={`justify-self-end col-start-3 row-start-1 max-h-10`}>
        {isExpanded ? (
          <input type="text" value={phone} onChange={changeEmail} />
        ) : (
          <p className="pt-4 pe-4" onClick={handleExpand}>
            {formattedPhoneNumber(patient.phone)}
          </p>
        )}
      </div>
    </div>
  );
}

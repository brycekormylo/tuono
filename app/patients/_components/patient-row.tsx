import { PatientInfo } from "@/hooks/use-patient-list";
import { LuMoreHorizontal, LuPencil, LuX, LuTrash } from "react-icons/lu";
import { useState } from "react";

interface PatientRowProps {
  patient: PatientInfo;
}

export default function PatientRow({ patient }: PatientRowProps) {
  const [showOptions, setShowOptions] = useState<boolean>(false);

  return (
    <tr className="[&>td]:py-3">
      <td className="flex gap-2">
        {patient.lastName}, {patient.firstName}
      </td>
      <td>{patient.email}</td>
      <td>{patient.phone}</td>
      <td className="flex justify-end items-center">
        {showOptions ? (
          <button onClick={() => setShowOptions(false)} className="flex gap-4">
            <LuPencil size={24} />
            <LuTrash size={24} className="text-red-500" />
            <LuX size={24} />
          </button>
        ) : (
          <button onClick={() => setShowOptions(true)}>
            <LuMoreHorizontal size={24} />
          </button>
        )}
      </td>
    </tr>
  );
}

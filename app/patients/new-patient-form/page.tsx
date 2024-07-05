"use client";

import { useInput } from "@/hooks/use-input";
import { LuCheck, LuX } from "react-icons/lu";
import { usePatientList, PatientInfo } from "@/hooks/use-patient-list";
import { useRouter } from "next/navigation";
import LabelIcon from "@/app/_components/label-icon";

export default function NewPatientForm() {
  const { addPatient } = usePatientList();
  const router = useRouter();

  const { value: firstName, onChange: changeFirstName } = useInput("");
  const { value: lastName, onChange: changeLastName } = useInput("");
  const { value: email, onChange: changeEmail } = useInput("");
  const { value: phone, onChange: changePhone } = useInput("");

  const handleSubmit = () => {
    const newPatient: PatientInfo = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
    };
    addPatient(newPatient);
    router.push("/patients/patient-list");
  };

  const handleCancel = () => {
    router.push("/patients/patient-list");
  };

  return (
    <div className="flex flex-col gap-8 justify-start items-end p-16">
      <h2 className="text-2xl">Add new patient</h2>
      <form className="flex flex-col gap-8 items-end w-full [&_*]:transition-all [&_*]:ease-in-out">
        <div className="flex gap-2 justify-between items-center h-full">
          <label className="py-1 px-3 h-full bg-gray-200 rounded-full">
            First Name
          </label>
          <input
            type="text"
            value={firstName}
            className="py-4 px-6 bg-gray-50 rounded-full focus:outline-none focus:scale-[1.02]"
            onChange={changeFirstName}
          />
        </div>
        <div className="flex gap-2 justify-between items-center h-full">
          <label className="py-1 px-3 h-full bg-gray-200 rounded-full">
            Last Name
          </label>
          <input
            className="py-4 px-6 bg-gray-50 rounded-full focus:outline-none focus:scale-[1.02]"
            type="text"
            value={lastName}
            onChange={changeLastName}
          />
        </div>
        <div className="flex gap-2 justify-between items-center h-full">
          <label className="py-1 px-3 h-full bg-gray-200 rounded-full">
            Email
          </label>
          <input
            className="py-4 px-6 bg-gray-50 rounded-full focus:outline-none focus:scale-[1.02]"
            type="text"
            value={email}
            onChange={changeEmail}
          />
        </div>
        <div className="flex gap-2 justify-between items-center h-full">
          <label className="py-1 px-3 h-full bg-gray-200 rounded-full">
            Phone Number
          </label>
          <input
            className="py-4 px-6 bg-gray-50 rounded-full focus:outline-none focus:scale-[1.02]"
            type="text"
            value={phone}
            onChange={changePhone}
          />
        </div>
        <div className="flex gap-6 justify-end items-center">
          <button
            type="button"
            className="flex justify-center items-center w-12 h-12 bg-gray-400 rounded-full"
            onClick={handleCancel}
          >
            <LuX size={24} />
          </button>
          <button type="button" onClick={handleSubmit}>
            <LabelIcon label="Submit" icon={<LuCheck size={24} />} />
          </button>
        </div>
      </form>
    </div>
  );
}

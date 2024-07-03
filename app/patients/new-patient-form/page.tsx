"use client";

import { useInput } from "@/hooks/use-input";
import { LuCheck } from "react-icons/lu";
import { usePatientList, PatientInfo } from "@/hooks/use-patient-list";

export default function NewPatientForm() {
  const { addPatient } = usePatientList();

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
  };
  return (
    <div className="flex flex-col gap-8 justify-start items-end p-16 w-full">
      <h2 className="text-2xl">Add new patient</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-8 items-end w-full [&_*]:transition-all [&_*]:ease-in-out"
      >
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
        <div className="flex justify-end items-center">
          <button
            className="flex justify-end items-center bg-gray-100 rounded-full transition-all ease-in-out hover:scale-[1.02]"
            type="submit"
          >
            <p className="py-3 px-5 text-lg">Submit</p>
            <div className="flex justify-center items-center bg-gray-400 rounded-full">
              <LuCheck size={24} className="m-4" />
            </div>
          </button>
        </div>
      </form>
    </div>
  );
}

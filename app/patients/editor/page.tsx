"use client";

import { usePatientList, PatientInfo } from "@/contexts/patient-list";
import { id } from "@instantdb/react";
import { ChangeEvent, useEffect, useState } from "react";
import ActionButtons from "@/app/_components/editor/action-buttons";

const emptyPatient: PatientInfo = {
  id: id(),
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};

export default function PatientEditor() {
  const { update, selected, setSelected, edit, setEdit } = usePatientList();

  const [patient, setPatient] = useState<PatientInfo>(emptyPatient);

  useEffect(() => {
    if (selected != null) {
      setPatient(selected);
    } else {
      setPatient(emptyPatient);
    }
  }, [selected, edit]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPatient((prevState: PatientInfo) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    update(patient);
    handleReturn();
  };

  const handleReturn = () => {
    setSelected(null);
    setEdit(false);
  };

  return (
    <div className="flex flex-col gap-8 justify-start items-end py-8 px-12 min-w-[24rem]">
      <h2 className="px-4 text-2xl">
        {selected ? `${patient.lastName}, ${patient.firstName}` : "New Patient"}
      </h2>
      <form className="flex flex-col gap-4 items-end w-[24rem]">
        <div className="flex gap-2 justify-between items-center w-full">
          <label className="">First Name</label>
          <input
            type="text"
            name="firstName"
            value={patient.firstName}
            className="rounded-input"
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-2 justify-between items-center w-full">
          <label className="">Last Name</label>
          <input
            className="rounded-input"
            name="lastName"
            type="text"
            value={patient.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-2 justify-between items-center w-full">
          <label className="">Email</label>
          <input
            className="rounded-input"
            name="email"
            type="text"
            value={patient.email}
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-2 justify-between items-center w-full">
          <label className="">Phone Number</label>
          <input
            className="rounded-input"
            name="phone"
            type="text"
            value={patient.phone}
            onChange={handleChange}
          />
        </div>
        <ActionButtons
          handleSubmit={handleSubmit}
          handleReturn={handleReturn}
        />
      </form>
    </div>
  );
}

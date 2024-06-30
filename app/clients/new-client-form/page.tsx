"use client";

import { useInput } from "@/hooks/use-input";
import { useDatabase } from "@/contexts/database";
import { LuCheck } from "react-icons/lu";

export default function NewClientForm() {
  const { addNewClient } = useDatabase();

  const { value: firstName, onChange: changeFirstName } = useInput("");
  const { value: lastName, onChange: changeLastName } = useInput("");
  const { value: email, onChange: changeEmail } = useInput("");
  const { value: phone, onChange: changePhone } = useInput("");

  const handleSubmit = () => {
    const newClient = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
    };
    addNewClient(newClient);
  };

  return (
    <div className="flex flex-col gap-8 justify-start items-start p-16 w-full">
      <h2>Add new client</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-8 items-end w-full"
      >
        <div className="flex gap-4 justify-between">
          <label>First Name</label>
          <input type="text" value={firstName} onChange={changeFirstName} />
        </div>
        <div className="flex gap-4 justify-between">
          <label>Last Name</label>
          <input type="text" value={lastName} onChange={changeLastName} />
        </div>
        <div className="flex gap-4 justify-between">
          <label>Email</label>
          <input type="text" value={email} onChange={changeEmail} />
        </div>
        <div className="flex gap-4 justify-between">
          <label>Phone Number</label>
          <input type="text" value={phone} onChange={changePhone} />
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

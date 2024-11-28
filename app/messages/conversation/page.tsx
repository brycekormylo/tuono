"use client";

import PatientDetails from "@/app/patient_details/page";
import { LuInfo, LuMoreVertical, LuPin, LuSend, LuTrash } from "react-icons/lu";
import { useConversations } from "@/contexts/conversations";
import { useEffect, useState } from "react";

export default function ConversationDisplay() {
  const { newMessage, changeNewMessage, createNew, selected } =
    useConversations();

  const [error, setError] = useState<String | null>();
  const [showOptions, setShowOptions] = useState(false);
  const [showPatientDetails, setShowPatientDetails] = useState(false);

  const handleSubmit = () => {
    if (newMessage == "") {
      setError("Message can't be empty");
      return;
    }
    if (!selected) {
      setError("No conversation selected");
      return;
    }

    createNew();
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  useEffect(() => {
    newMessage != "" && setError(null);
  }, [newMessage]);

  useEffect(() => {
    setError(null);
    setShowOptions(false);
  }, [selected]);

  return (
    <div className="p-8 w-full h-full bg-gray-50 rounded-2xl stack">
      {selected && (
        <>
          <div className="flex gap-4 justify-self-start items-center self-start p-4">
            <button
              className="z-20 w-10 h-10 text-gray-700 rounded-full hover:bg-gray-200 stack"
              onClick={toggleOptions}
            >
              <LuMoreVertical size={24} />
            </button>
            <p className="text-xl">
              {selected.patient.lastName}, {selected.patient.firstName}
            </p>
          </div>

          {!showPatientDetails && showOptions && (
            <div className="flex z-10 flex-col justify-self-start self-start mt-20 w-56 rounded-xl bg-gray-100/50 overflow-clip ms-4">
              <button
                onClick={() => setShowPatientDetails(true)}
                className="flex gap-4 items-center p-4 w-full hover:bg-gray-100"
              >
                <LuInfo size={18} />
                <label className="text-sm">Patient Info</label>
              </button>
              <button className="flex gap-4 items-center p-4 w-full hover:bg-gray-100">
                <LuPin size={18} />
                <label className="text-sm">Pin</label>
              </button>
              <button className="flex gap-4 items-center p-4 w-full text-red-500 hover:bg-gray-100">
                <LuTrash size={18} />
                <label className="text-sm">Delete conversation</label>
              </button>
            </div>
          )}

          {showPatientDetails && (
            <PatientDetails
              patient={selected.patient}
              dismiss={() => setShowPatientDetails(false)}
            />
          )}

          <div className="flex flex-col items-start w-full h-[80vh]">
            <div className="block overflow-y-auto overscroll-none p-4 w-full h-[60vh]">
              <div className="flex flex-col-reverse flex-grow gap-4 justify-end self-end py-4 w-full">
                <div>
                  {selected.messages.reverse().map((message, index) => {
                    const date = new Date(message.timestamp);
                    const formattedDate = `${date.getHours() % 12 == 0 ? "12" : date.getHours() % 12}:${date.getMinutes()} ${date.getHours() % 12 != date.getHours() ? "PM" : "AM"}`;
                    return (
                      <div
                        key={index}
                        className={`py-2 flex gap-2 items-center ${message.fromAdmin ? "justify-end" : "justify-start flex-row-reverse"}`}
                      >
                        <p className="text-xs text-gray-400">{formattedDate}</p>
                        <p className="py-2 px-4 bg-gray-200 rounded-xl">
                          {message.body}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-self-end items-center self-end">
            <div className="grow" />
            <label
              className={`px-4 text-sm text-red-500 ${error ? "block" : "hidden"}`}
            >
              {"Message can't be empty"}
            </label>
            <textarea
              name="message"
              wrap="soft"
              rows={14}
              cols={10}
              value={newMessage}
              className={`self-end pt-4 w-[36rem] h-48 rounded-xl resize-none text-start rounded-input ring-red-300 ${error ? "ring-2" : "ring-0"}`}
              onChange={changeNewMessage}
            />
          </div>

          <button
            onClick={handleSubmit}
            className="justify-self-end self-end m-2 w-16 h-12 rounded-xl hover:bg-gray-100 stack"
          >
            <LuSend size={22} />
          </button>
        </>
      )}
    </div>
  );
}

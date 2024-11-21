"use client";

import { LuSend, LuInfo } from "react-icons/lu";
import { useConversations } from "@/contexts/conversations";
import { usePatientList, PatientInfo } from "@/contexts/patient-list";
import SearchButton from "@/app/_components/table/search-button";
import { useEffect, useState } from "react";

export default function ConversationDisplay() {
  const {
    recipient,
    setRecipient,
    newMessage,
    changeNewMessage,
    createNew,
    selected,
  } = useConversations();
  const source = usePatientList();

  const [error, setError] = useState<String | null>();

  const handleSubmit = () => {
    if (newMessage == "") {
      setError("Message can't be empty");
      return;
    }
    if (!selected) {
      if (!recipient) {
        setError("No recipient set");
        return;
      }
      setError("No conversation selected");
      return;
    }

    createNew();
  };

  useEffect(() => {
    newMessage != "" && setError(null);
  }, [newMessage]);

  return (
    <div className="w-full h-full stack">
      <div className="flex gap-4 justify-self-start items-center self-start m-8">
        {!selected ? (
          <>
            {recipient ? (
              <>
                <p className="text-xl">
                  {recipient.lastName}, {recipient.firstName}
                </p>
                <button className="w-6 h-6 bg-gray-200 rounded-full hover:bg-gray-300 stack">
                  <LuInfo size={18} />
                </button>
              </>
            ) : (
              <>
                <SearchButton
                  source={source}
                  itemAction={(item) => setRecipient(item as PatientInfo)}
                />
                <p className="text-base text-gray-600">Select a recipient</p>
              </>
            )}
          </>
        ) : (
          <>
            <p className="text-xl">
              {selected.patient.lastName}, {selected.patient.firstName}
            </p>
            <button className="w-6 h-6 bg-gray-200 rounded-full hover:bg-gray-300 stack">
              <LuInfo size={18} />
            </button>
          </>
        )}
      </div>
      <div className="flex flex-col gap-4 justify-end p-4 w-full h-full">
        {selected?.messages.map((message, index) => {
          const date = new Date(message.timestamp);
          const formattedDate = `${date.getHours() % 12 == 0 ? "12" : date.getHours() % 12}:${date.getMinutes()} ${date.getHours() % 12 != date.getHours() ? "PM" : "AM"}`;
          return (
            <div
              key={index}
              className={`flex gap-2 items-center ${message.fromAdmin ? "justify-end" : "justify-start flex-row-reverse"}`}
            >
              <p className="text-xs text-gray-400">{formattedDate}</p>
              <p className="py-2 px-4 bg-gray-300 rounded-xl">{message.body}</p>
            </div>
          );
        })}
        <div className="flex items-center">
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
            className={`self-end pt-4 w-96 h-32 rounded-lg resize-none text-start rounded-input ring-red-300 ${error ? "ring-2" : "ring-0"}`}
            onChange={changeNewMessage}
          />
        </div>
        <button
          onClick={handleSubmit}
          className="self-end w-16 h-12 bg-gray-300 rounded-xl stack"
        >
          <LuSend size={22} />
        </button>
      </div>
    </div>
  );
}

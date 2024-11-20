"use client";

import { useInput } from "@/hooks/use-input";
import { LuSend, LuInfo } from "react-icons/lu";
import {
  useConversations,
  Message,
  Conversation,
} from "@/contexts/conversations";
import { usePatientList } from "@/contexts/patient-list";
import SearchButton from "@/app/_components/table/search-button";

export default function ConversationDisplay() {
  const { setNewMessage, selected, setSelected } = useConversations();
  const source = usePatientList();
  const { value, onChange } = useInput("");

  const handleSubmit = () => {
    setNewMessage(value);
  };

  return (
    <div className="w-full h-full stack">
      <div className="flex gap-4 justify-self-start items-center self-start m-8">
        {selected ? (
          <>
            <p className="text-xl">
              {selected.patient.lastName}, {selected.patient.firstName}
            </p>
            <button className="w-6 h-6 bg-gray-200 rounded-full hover:bg-gray-300 stack">
              <LuInfo size={18} />
            </button>
          </>
        ) : (
          <SearchButton
            source={source}
            itemAction={(item) => setSelected(item as Conversation)}
          />
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
        <input
          type="text"
          name="title"
          value={value}
          className="self-end w-96 h-32 rounded-lg rounded-input"
          onChange={onChange}
        />
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

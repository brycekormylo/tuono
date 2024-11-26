"use client";

import { useConversations } from "@/contexts/conversations";
import { LuPencil, LuUser } from "react-icons/lu";

export default function History() {
  const { info, selected, setSelected } = useConversations();

  const handleClick = () => {
    setSelected(null);
  };

  return (
    <div className="flex flex-col gap-2 h-full min-w-[28rem] grow">
      <button onClick={handleClick} className="flex justify-end">
        <div
          className={`flex gap-4 justify-end items-center px-8 h-16 rounded-xl ${!selected ? "bg-gray-50" : "hover:bg-gray-200/60 bg-gray-200"} ring-gray-200 ring-[1px]`}
        >
          <label className="text-lg">New Message</label>
          <LuPencil size={24} />
        </div>
      </button>
      {info?.map((conversation, index) => {
        const lastUpdate = new Date(conversation.lastUpdated);
        return (
          <button
            key={index}
            onClick={() => setSelected(conversation)}
            className={`${conversation.id == selected?.id ? "bg-gray-50 ring-[1px] ring-gray-300" : "hover:bg-gray-200/60"} flex rounded-xl justify-start items-center w-full h-16`}
          >
            <div className="w-10 h-10 bg-gray-100 rounded-full stack ms-4">
              <LuUser size={24} />
            </div>
            <div className="flex flex-col justify-between items-start py-2 mx-4">
              <label className="justify-self-end text-lg">
                {conversation.patient?.lastName},{" "}
                {conversation.patient?.firstName}
              </label>
              <p className="text-xs text-gray-700">
                {conversation.messages?.at(0)?.body}
              </p>
            </div>
            <div className="grow" />
            <p className="mx-6 text-sm text-gray-600">
              {lastUpdate.getMonth()}/{lastUpdate.getDate()}
            </p>
          </button>
        );
      })}
      {!info && <p className="w-full h-12 stack">Not Found</p>}
    </div>
  );
}

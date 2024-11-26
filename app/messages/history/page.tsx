"use client";

import { useConversations } from "@/contexts/conversations";
import { LuPencil } from "react-icons/lu";

export default function History() {
  const { info, selected, setSelected } = useConversations();

  const handleClick = () => {
    setSelected(null);
  };

  return (
    <div className="flex flex-col gap-2 h-full min-w-[28rem] grow">
      <button
        onClick={handleClick}
        className={`${!selected ? "bg-gray-50" : "bg-gray-200"} w-full h-16 bg-gray-200 rounded-tl-xl stack hover:bg-gray-200/75`}
      >
        <div className="flex gap-4 justify-end items-center px-8 w-full">
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
            className={`${conversation.id == selected?.id ? "bg-gray-50" : "bg-gray-200"} flex hover:bg-gray-200/75 justify-between items-center px-8 w-full h-16`}
          >
            <label className="justify-self-end text-lg">
              {conversation.patient?.lastName},{" "}
              {conversation.patient?.firstName}
            </label>
            <div className="flex justify-center justify-self-end items-center w-8">
              <p className="text-sm text-gray-600">
                {lastUpdate.getMonth()}/{lastUpdate.getDate()}
              </p>
            </div>
          </button>
        );
      })}
      {!info && <p className="w-full h-12 stack">Not Found</p>}
    </div>
  );
}

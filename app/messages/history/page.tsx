"use client";

import { useConversations } from "@/contexts/conversations";

export default function History() {
  const { info, selected, setSelected } = useConversations();

  return (
    <div className="w-full h-full rounded-bl-xl">
      {info?.map((conversation, index) => {
        const lastUpdate = new Date(conversation.lastUpdated);
        return (
          <button
            key={index}
            onClick={() => setSelected(conversation)}
            className={`${conversation.id == selected?.id ? "bg-gray-50" : "bg-gray-200"} flex justify-between items-center px-4 w-full h-16 border-b-2 border-b-black`}
          >
            <label className="justify-self-end">
              {conversation.patient?.lastName},{" "}
              {conversation.patient?.firstName}
            </label>
            <p className="justify-self-end text-sm">
              {lastUpdate.getDate()}/{lastUpdate.getMonth()}
            </p>
          </button>
        );
      })}
      {!info && <p className="w-full h-12 stack">Not Found</p>}
    </div>
  );
}

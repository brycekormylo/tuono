"use client";

import { useConversations } from "@/contexts/conversations";
import { LuPencil } from "react-icons/lu";

export default function NewDraftButton() {
  const { setSelected } = useConversations();

  const handleClick = () => {
    setSelected(null);
  };

  return (
    <button
      onClick={handleClick}
      className="w-full h-16 rounded-tl-xl border-b-2 border-black g-gray-200 stack hover:bg-gray-200/50"
    >
      <div className="flex gap-4 justify-end items-center px-8 w-full">
        <label className="text-lg">New Message</label>
        <LuPencil size={24} />
      </div>
    </button>
  );
}

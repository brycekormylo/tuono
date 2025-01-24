"use client";

import { useConversations } from "@/contexts/conversations";
import { LuEllipsisVertical } from "react-icons/lu";
import ConversationOptions from "./conversation_options";

export default function PatientTag() {
	const { selected, showOptions, setShowOptions } = useConversations();

	return (
		selected && (
			<>
				<button
					type="button"
					onClick={() => setShowOptions(!showOptions)}
					className="flex z-0 gap-2 justify-self-start items-center self-start p-4 rounded-xl hover:bg-gray-100"
				>
					<LuEllipsisVertical size={24} />

					<p className="px-2 text-xl">
						{`${selected.patient?.profile?.lastName}, ${selected.patient?.profile?.firstName}`}
					</p>
				</button>
				{showOptions && <ConversationOptions />}
			</>
		)
	);
}

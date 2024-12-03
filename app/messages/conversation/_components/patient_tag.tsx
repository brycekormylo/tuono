"use client";
import { useConversations } from "@/contexts/conversations";
import { LuMoreVertical } from "react-icons/lu";
import ConversationOptions from "./conversation_options";

export default function PatientTag() {
	const { selected, showOptions, setShowOptions } = useConversations();

	return (
		selected && (
			<>
				<div className="flex gap-4 justify-self-start items-center self-start p-4">
					<button
						className="z-20 w-10 h-10 text-gray-700 rounded-full hover:bg-gray-200 stack"
						type="button"
						onClick={() => setShowOptions(!showOptions)}
					>
						<LuMoreVertical size={24} />
					</button>
					<p className="text-xl">
						{selected.patient.lastName}, {selected.patient.firstName}
					</p>
				</div>

				<ConversationOptions />
			</>
		)
	);
}

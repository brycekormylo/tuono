"use client";
import { LuEllipsisVertical } from "react-icons/lu";
import ConversationOptions from "./conversation_options";
import { usePatientConversations } from "@/contexts/patient-conversations";

export default function PatientTag() {
	const { conversation, showOptions, setShowOptions } =
		usePatientConversations();

	return (
		conversation && (
			<>
				<button
					type="button"
					onClick={() => setShowOptions(!showOptions)}
					className="flex z-20 gap-2 justify-self-start items-center self-start p-4 rounded-xl hover:bg-gray-100"
				>
					<LuEllipsisVertical size={24} />
					<p className="px-2 text-xl">
						{`${conversation.patient?.profile?.lastName}, ${conversation.patient?.profile?.firstName}`}
					</p>
				</button>

				<ConversationOptions />
			</>
		)
	);
}

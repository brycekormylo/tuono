"use client";

import PatientTag from "./_components/patient_tag";
import ConversationBody from "./_components/conversation_body";
import MessageInput from "./_components/message_input";

export default function ConversationDisplay() {
	return (
		<div className="p-8  w-[60%] h-full bg-gray-50 rounded-2xl stack">
			<PatientTag />
			<ConversationBody />
			<MessageInput />
		</div>
	);
}

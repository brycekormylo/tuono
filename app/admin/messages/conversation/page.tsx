"use client";

import PatientTag from "./_components/patient_tag";
import ConversationBody from "./_components/conversation_body";
import MessageInput from "./_components/message_input";

export default function ConversationDisplay() {
	return (
		<div className="p-8 w-full h-full rounded-2xl bg-light-50 stack">
			<PatientTag />
			<ConversationBody />
			<MessageInput />
		</div>
	);
}

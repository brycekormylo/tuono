"use client";

import { usePatientConversations } from "@/contexts/patient-conversations";

export default function ConversationBody() {
	const { info } = usePatientConversations();
	// TODO: ID the most recent message and scroll to it

	return (
		<div className="flex flex-col items-start w-full h-[80vh]">
			<div className="block overflow-y-auto overscroll-none p-4 w-full h-[60vh]">
				<div className="flex flex-col-reverse flex-grow gap-4 justify-end self-end py-4 w-full">
					<div>
						{info?.messages?.reverse().map((message) => {
							const date = new Date(JSON.parse(message.timestamp.toString()));
							const formattedDate = `${date.getHours() % 12 === 0 ? "12" : date.getHours() % 12}:${date.getMinutes() < 10 ? "0" : ""}${date.getMinutes()} ${date.getHours() % 12 !== date.getHours() ? "PM" : "AM"}`;
							return (
								<div
									key={message.timestamp.toString()}
									className={`py-1 flex gap-2 items-center ${message ? "justify-end" : "justify-start flex-row-reverse"}`}
								>
									<p className="text-xs text-gray-400">{formattedDate}</p>
									<p className="py-2 px-4 bg-gray-200 rounded-xl">
										{message.content}
									</p>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}

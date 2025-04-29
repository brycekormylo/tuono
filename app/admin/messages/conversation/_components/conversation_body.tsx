"use client";

import { useConversations } from "@/contexts/conversations";

export default function ConversationBody() {
	const { selected } = useConversations();
	// TODO: ID the most recent message and scroll to it

	return (
		<div className="flex flex-col items-start w-full h-full">
			<div className="block overflow-y-auto overscroll-none p-4 w-full h-[70%]">
				<div className="flex flex-col-reverse flex-grow gap-4 justify-end self-end w-full">
					<div>
						{selected?.messages?.reverse().map((message) => {
							const date = new Date(JSON.parse(message.timestamp.toString()));
							const formattedDate = `${date.getHours() % 12 === 0 ? "12" : date.getHours() % 12}:${date.getMinutes() < 10 ? "0" : ""}${date.getMinutes()} ${date.getHours() % 12 !== date.getHours() ? "PM" : "AM"}`;

							return (
								<div
									key={message.timestamp.toString()}
									className={`py-1 flex gap-2 items-center ${!message.fromAdmin && "flex-row-reverse"} justify-end`}
								>
									<p className="text-xs text-dark-100">{formattedDate}</p>

									<p
										className={`py-2 px-4 rounded-xl ${!message.fromAdmin ? "bg-light-500" : "bg-primary-300"}`}
									>
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

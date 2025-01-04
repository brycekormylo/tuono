"use client";

import SearchButton from "@/app/_components/table/search-button";
import { useConversations } from "@/contexts/conversations";
import { usePatient, type Patient } from "@/contexts/patients";
import { LuSearch, LuUser } from "react-icons/lu";

export default function History() {
	const {
		info,
		selected,
		setSelectedFromPatient,
		setSelectedFromConversation,
		setShowOptions,
	} = useConversations();
	const source = usePatient();

	return (
		<div className="flex flex-col gap-2 h-full min-w-[28rem] grow">
			<div className="flex gap-4 items-center self-end py-4 my-4 text-xl rounded-xl hover:bg-gray-50">
				<SearchButton
					source={source}
					itemAction={(item) => {
						setShowOptions(false);
						setSelectedFromPatient(item as Patient);
					}}
				>
					<div className="flex gap-4 justify-start items-center px-6">
						<p className="text-base text-gray-600">Find Patient</p>
						<LuSearch size={18} />
					</div>
				</SearchButton>
			</div>

			<div className="flex flex-col gap-2 w-full h-full grow">
				<h2 className="px-4 text-lg font-medium">Recent</h2>

				{info?.map((conversation) => {
					const lastMessage = conversation.messages?.at(
						conversation.messages?.length - 1,
					);
					return (
						<button
							key={conversation.id}
							type="button"
							id="conversation"
							onClick={() => setSelectedFromConversation(conversation)}
							className={`${conversation.id === selected?.id ? "hover:ring-gray-400 bg-gray-50 ring-[1px] ring-gray-300" : "hover:bg-gray-50/80"} flex rounded-xl justify-start items-center w-full h-16`}
						>
							<div className="w-10 h-10 bg-gray-100 rounded-full stack ms-4">
								<LuUser size={24} />
							</div>

							<div className="flex flex-col justify-between items-start py-2 mx-4">
								<label
									htmlFor="conversation"
									className="justify-self-end text-lg"
								>
									{`${conversation.patient?.profile?.lastName}, ${conversation.patient?.profile?.firstName}`}
								</label>

								<p className="text-xs text-gray-700">{lastMessage?.content}</p>
							</div>

							<div className="grow" />
							<p className="mx-6 text-sm text-gray-600">
								{`${lastMessage?.timestamp.toString().substring(9, 11) || "-"} / ${lastMessage?.timestamp.toString().substring(6, 8) || "-"}`}
							</p>
						</button>
					);
				})}
			</div>

			{!info && <p className="w-full h-12 stack">Not Found</p>}
		</div>
	);
}

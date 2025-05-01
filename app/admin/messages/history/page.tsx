"use client";

import SearchButton from "@/app/_components/search/search-button";
import { useConversations } from "@/contexts/conversations";
import { usePatient, type Patient } from "@/contexts/patients";
import { useEffect } from "react";
import { LuSearch, LuUser } from "react-icons/lu";

export default function History() {
	const {
		info,
		selected,
		setSelectedFromPatient,
		setSelectedFromConversation,
	} = useConversations();
	const source = usePatient();

	useEffect(() => {
		const firstConv = info?.at(0);
		!selected && firstConv && setSelectedFromConversation(firstConv);
	}, [info]);

	return (
		<div className="flex flex-col items-end h-full min-w-[28rem] grow">
			<SearchButton
				source={source}
				itemAction={(item) => {
					setSelectedFromPatient(item as Patient);
				}}
			>
				<div className="flex items-center self-end py-4 text-xl rounded-xl bg-light-100 border-[1px] border-light-900 hover:border-dark-100/50 hover:bg-light-50">
					<div className="flex gap-4 justify-start items-center px-6">
						<p className="text-base text-dark-500">Find Patient</p>
						<LuSearch size={18} />
					</div>
				</div>
			</SearchButton>

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
							className={`${conversation.id === selected?.id ? "hover:ring-dark-500 bg-light-50 ring-dark-100" : "hover:bg-light-50/80 bg-light-50/50 ring-light-900 hover:ring-dark-100/50"} ring-[1px] flex rounded-xl justify-start items-center w-full h-16`}
						>
							<div className="w-10 h-10 rounded-full bg-light-100 stack ms-4">
								<LuUser size={24} />
							</div>

							<div className="flex flex-col justify-between items-start py-2 mx-4">
								<label
									htmlFor="conversation"
									className="justify-self-end text-lg"
								>
									{`${conversation.patient?.profile?.lastName}, ${conversation.patient?.profile?.firstName}`}
								</label>

								<p className="text-xs text-dark-100">{lastMessage?.content}</p>
							</div>

							<div className="grow" />
							<p className="mx-6 text-sm text-dark-100">
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

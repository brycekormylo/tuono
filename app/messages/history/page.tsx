"use client";

import SearchButton from "@/app/_components/table/search-button";
import { useConversations } from "@/contexts/conversations";
import { usePatientList, type PatientInfo } from "@/contexts/patient-list";
import { LuSearch, LuUser } from "react-icons/lu";

export default function History() {
	const { info, selected, select, setSelectedFromPatient } = useConversations();
	const source = usePatientList();

	return (
		<div className="flex flex-col gap-2 h-full min-w-[28rem] grow">
			<div className="flex gap-4 items-center self-end py-4 my-4 text-xl rounded-xl hover:bg-gray-50">
				<SearchButton
					source={source}
					itemAction={(item) => setSelectedFromPatient(item as PatientInfo)}
				>
					<div className="flex gap-4 justify-start items-center px-6">
						<p className="text-base text-gray-600">Search/Create New</p>
						<LuSearch size={18} />
					</div>
				</SearchButton>
			</div>
			{info?.map((conversation, index) => {
				const lastUpdate = new Date(conversation.lastUpdated);
				return (
					<button
						key={conversation.id}
						type="button"
						id="conversation"
						onClick={() => select(conversation)}
						className={`${conversation.id === selected?.id ? "bg-gray-50 ring-[1px] ring-gray-300" : "hover:bg-gray-50/80"} flex rounded-xl justify-start items-center w-full h-16`}
					>
						<div className="w-10 h-10 bg-gray-100 rounded-full stack ms-4">
							<LuUser size={24} />
						</div>
						<div className="flex flex-col justify-between items-start py-2 mx-4">
							<label
								htmlFor="conversation"
								className="justify-self-end text-lg"
							>
								{conversation.patient?.lastName}
								{", "}
								{conversation.patient?.firstName}
							</label>
							<p className="text-xs text-gray-700">
								{
									conversation.messages?.at(conversation.messages?.length - 1)
										?.body
								}
							</p>
						</div>
						<div className="grow" />
						<p className="mx-6 text-sm text-gray-600">
							{lastUpdate.getMonth()}/{lastUpdate.getDate()}
						</p>
					</button>
				);
			})}
			{!info && <p className="w-full h-12 stack">Not Found</p>}
		</div>
	);
}

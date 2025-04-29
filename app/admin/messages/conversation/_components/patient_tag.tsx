"use client";

import { LuEllipsisVertical } from "react-icons/lu";
import ConversationOptions from "./conversation_options";
import { usePatient } from "@/contexts/patients";
import PopoverButton from "@/app/_components/popover/popover_button";

export default function PatientTag() {
	const { selected: selectedPatient } = usePatient();

	return (
		selectedPatient && (
			<div className="justify-self-start self-start">
				<PopoverButton popover={<ConversationOptions />}>
					<div className="flex z-0 gap-2 items-center p-4 rounded-xl hover:bg-light-100">
						<LuEllipsisVertical size={24} />

						<p className="px-2 text-xl">
							{`${selectedPatient?.profile?.lastName}, ${selectedPatient?.profile?.firstName}`}
						</p>
					</div>
				</PopoverButton>
			</div>
		)
	);
}

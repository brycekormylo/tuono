"use client";

import PopoverButton from "@/app/_components/popover/popover_button";
import PatientDetails from "@/app/admin/_components/patient_details/page";
import { LuInfo, LuTrash } from "react-icons/lu";
import DeleteOptions from "./delete_options";

export default function ConversationOptions() {
	return (
		<div className="flex z-10 flex-col justify-self-start self-start mt-20 w-56 bg-gray-50 rounded-xl overflow-clip ms-4">
			<PopoverButton popover={<PatientDetails />}>
				<div className="flex gap-4 items-center p-4 w-56 hover:bg-gray-100">
					<LuInfo size={18} />
					<p className="text-sm">Patient Details</p>
				</div>
			</PopoverButton>

			<PopoverButton popover={<DeleteOptions />}>
				<div className="flex gap-4 items-center p-4 w-56 text-red-500 hover:bg-gray-100">
					<LuTrash size={18} />
					<label htmlFor="delete" className="text-sm">
						Delete conversation
					</label>
				</div>
			</PopoverButton>
		</div>
	);
}

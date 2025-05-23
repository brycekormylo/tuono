"use client";

import PopoverButton from "@/app/_components/popover/popover_button";
import PatientDetails from "@/app/admin/_components/patient_details/page";
import { LuInfo, LuTrash } from "react-icons/lu";
import DeleteOptions from "./delete_options";

export default function ConversationOptions() {
	return (
		<div className="flex flex-col gap-2">
			<PopoverButton popover={<PatientDetails />}>
				<div className="flex gap-4 items-center p-4 w-72 rounded-md bg-light-300">
					<LuInfo size={18} />
					<p className="">Patient Details</p>
				</div>
			</PopoverButton>

			<PopoverButton popover={<DeleteOptions />}>
				<div className="flex gap-4 items-center p-4 w-72 rounded-md text-error bg-light-300">
					<LuTrash size={18} />
					<label htmlFor="delete" className="">
						Delete conversation
					</label>
				</div>
			</PopoverButton>
		</div>
	);
}

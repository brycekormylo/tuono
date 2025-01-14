"use client";

import PatientDetails from "@/app/admin/patient_details/page";
import { useConversations } from "@/contexts/conversations";
import { usePatient } from "@/contexts/patients";
import { LuInfo, LuPin, LuTrash } from "react-icons/lu";

export default function ConversationOptions() {
	const { selected, showOptions, setShowOptions, remove } = useConversations();
	const { edit, setEdit } = usePatient();

	const handleClickDetails = () => {
		setEdit(true);
		setShowOptions(false);
	};

	return selected && edit ? (
		<PatientDetails />
	) : (
		showOptions && (
			<div className="flex z-10 flex-col justify-self-start self-start mt-20 w-56 bg-gray-50 rounded-xl overflow-clip ms-4">
				<button
					onClick={handleClickDetails}
					className="flex gap-4 items-center p-4 w-full hover:bg-gray-100"
					id="showPatientDetails"
					type="button"
				>
					<LuInfo size={18} />
					<label htmlFor="showPatientDetails" className="text-sm">
						Patient Info
					</label>
				</button>
				<button
					type="button"
					className="flex gap-4 items-center p-4 w-full hover:bg-gray-100"
					id="pin"
					onClick={() => {}}
				>
					<LuPin size={18} />
					<label htmlFor="pin" className="text-sm">
						Pin
					</label>
				</button>
				<button
					type="button"
					id="delete"
					className="flex gap-4 items-center p-4 w-full text-red-500 hover:bg-gray-100"
					onClick={() => selected && remove(selected)}
				>
					<LuTrash size={18} />
					<label htmlFor="delete" className="text-sm">
						Delete conversation
					</label>
				</button>
			</div>
		)
	);
}

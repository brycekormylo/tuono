"use client";

import { PopoverButtonContext } from "@/app/_components/popover/popover_button";
import { useConversations } from "@/contexts/conversations";
import { useContext } from "react";

export default function DeleteOptions() {
	const { selected, remove } = useConversations();
	const context = useContext(PopoverButtonContext);

	const handleCancel = () => {
		context?.setShow(false);
	};

	const handleDelete = () => {
		selected && remove(selected);
	};

	return (
		<div className="p-2 w-80 h-40 stack">
			<div className="flex flex-col gap-1 items-center self-start mt-2">
				<h2 className="text-xl">Delete Conversation?</h2>
				<h3 className="text-sm text-dark-500">This action cannot be undone</h3>
			</div>

			<div className="flex gap-4 justify-evenly items-center self-end w-full h-12">
				<button
					type="button"
					className="h-12 rounded-lg border-2 text-dark-700 border-dark-100 grow"
					onClick={handleCancel}
				>
					Cancel
				</button>

				<button
					type="button"
					className="h-12 font-bold rounded-lg text-light-50 bg-dark-100 grow"
					onClick={handleDelete}
				>
					Delete
				</button>
			</div>
		</div>
	);
}

"use client";

import { PopoverButtonContext } from "@/app/_components/popover/popover_button";
import { useAuth } from "@/contexts/auth";
import { useContext } from "react";

export default function SignoutOptions() {
	const { signOut } = useAuth();
	const context = useContext(PopoverButtonContext);

	const handleCancel = () => {
		context?.setShow(false);
	};

	const handleSignout = () => {
		signOut();
	};

	return (
		<div className="p-2 w-80 h-40 stack">
			<div className="flex flex-col gap-1 items-center self-start mt-2">
				<h2 className="text-xl">Confirm Sign Out?</h2>
				<h3 className="text-sm text-gray-500">
					Use your email to log in next time
				</h3>
			</div>
			<div className="flex gap-4 justify-evenly items-center self-end w-full h-12">
				<button
					type="button"
					className="h-12 text-gray-700 rounded-lg border-2 border-gray-600 grow"
					onClick={handleCancel}
				>
					Cancel
				</button>

				<button
					type="button"
					className="h-12 font-bold text-red-400 bg-gray-600 rounded-lg grow"
					onClick={handleSignout}
				>
					Sign Out
				</button>
			</div>
		</div>
	);
}

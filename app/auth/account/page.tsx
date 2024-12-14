"use client";

import { useAccount } from "@/contexts/account";
import { useAuth, type AdminAccount } from "@/contexts/auth";
import { LuMail } from "react-icons/lu";

interface FormData {
	fullName: string;
	handle: string;
}

export default function Account() {
	const { user, signOut } = useAuth();
	const { admin, updateName, updateHandle } = useAccount();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const formData: FormData = {
			fullName: (document.getElementById("fullName") as HTMLInputElement).value,
			handle: (document.getElementById("handle") as HTMLInputElement).value,
		};
		updateName(formData.fullName);
		updateHandle(formData.handle);
	};

	return (
		<form name="auth" className="flex flex-col gap-6">
			<div className="flex justify-between items-center px-8 h-16 bg-gray-50 rounded-xl">
				<LuMail size={32} className="text-gray-600" />
				<p className="text-xl">{user?.email}</p>
			</div>
			<div className="flex gap-8 justify-between items-center px-8 h-16 bg-gray-50 rounded-xl">
				<label className="text-base text-gray-600" htmlFor="fullName">
					Full Name
				</label>
				<input
					className="text-xl bg-transparent outline-none text-end"
					id="fullName"
					name="fullName"
					placeholder={admin.fullName}
					type="text"
				/>
			</div>
			<div className="flex gap-8 justify-between items-center px-8 h-16 bg-gray-50 rounded-xl">
				<label className="text-base text-gray-600" htmlFor="handle">
					@handle
				</label>
				<input
					className="text-xl bg-transparent outline-none text-end"
					id="handle"
					name="handle"
					placeholder={admin.handle}
					type="text"
				/>
			</div>
			<div className="flex gap-6 justify-end px-4">
				<button
					type="button"
					className="px-8 h-12 bg-gray-300 rounded-xl"
					onClick={signOut}
				>
					Sign Out
				</button>
				<button
					type="button"
					onClick={handleSubmit}
					className="px-8 h-12 bg-gray-200 rounded-xl"
				>
					Save Changes
				</button>
			</div>
		</form>
	);
}

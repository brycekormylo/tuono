"use client";

import { useProfile } from "@/contexts/profiles";
import { useAuth } from "@/contexts/auth";
import { LuLock, LuMail } from "react-icons/lu";
import { useState } from "react";

export default function ProfilePage() {
	const { signOut } = useAuth();
	const { profile, updateProfile } = useProfile();
	const [edit, setEdit] = useState<boolean>(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		profile &&
			updateProfile({
				...profile,
				firstName: (document.getElementById("firstName") as HTMLInputElement)
					.value,
				lastName: (document.getElementById("lastName") as HTMLInputElement)
					.value,
				phone: (document.getElementById("phone") as HTMLInputElement).value,
			});

		setEdit(false);
		clearForm();
	};

	const handleFocusOut = () => {
		const formData = getFormData();
		if (formData.firstName !== "") {
			setEdit(true);
			return;
		}
		if (formData.lastName !== "") {
			setEdit(true);
			return;
		}
		if (formData.phone !== "") {
			setEdit(true);
			return;
		}
		setEdit(false);
	};

	const getFormData = () => {
		return {
			firstName: (document.getElementById("firstName") as HTMLInputElement)
				.value,
			lastName: (document.getElementById("lastName") as HTMLInputElement).value,
			phone: (document.getElementById("phone") as HTMLInputElement).value,
		};
	};

	const clearForm = () => {
		(document.getElementById("firstName") as HTMLInputElement).value = "";
		(document.getElementById("lastName") as HTMLInputElement).value = "";
		(document.getElementById("phone") as HTMLInputElement).value = "";
	};

	return (
		<div className="w-full h-full stack">
			<form
				name="auth"
				className="flex flex-col gap-4 justify-self-start self-start my-16 mx-8 max-w-[30rem]"
			>
				<h1 className="self-start pb-6 text-3xl stack">{"Account Info"}</h1>

				<div className="flex items-center px-2 w-min bg-gray-300 rounded-lg">
					{profile?.isAdmin ? "Admin" : "Patient"}
				</div>

				<div className="flex justify-start items-center px-6 h-12 text-gray-700 rounded-xl group">
					<LuMail size={28} className="" />
					<p className="h-16 text-xl ps-20 pe-2 stack">{profile?.email}</p>
					<div className="text-gray-500 opacity-0 group-hover:opacity-100 stack">
						<LuLock size={18} />
					</div>
				</div>

				<div className="flex gap-8 justify-between items-center px-6 h-16 bg-gray-50 rounded-xl group">
					<label className="text-base text-gray-600" htmlFor="firstName">
						First Name
					</label>
					<input
						className="text-xl placeholder-gray-700 text-black bg-transparent outline-none text-start"
						onBlur={handleFocusOut}
						id="firstName"
						name="firstName"
						placeholder={profile?.firstName}
						type="text"
					/>
				</div>

				<div className="flex gap-8 justify-between items-center px-6 h-16 bg-gray-50 rounded-xl">
					<label className="text-base text-gray-600" htmlFor="lastName">
						Last Name
					</label>
					<input
						className="text-xl placeholder-gray-800 text-black bg-transparent outline-none text-start"
						id="lastName"
						name="lastName"
						placeholder={profile?.lastName}
						type="text"
					/>
				</div>

				<div className="flex gap-8 justify-between items-center px-6 h-16 bg-gray-50 rounded-xl">
					<label className="text-base text-gray-600" htmlFor="phone">
						Phone
					</label>
					<input
						className="text-xl placeholder-gray-800 text-black bg-transparent outline-none text-start"
						id="phone"
						name="phone"
						placeholder={profile?.phone}
						type="text"
					/>
				</div>

				<div className="flex gap-6 justify-end px-4">
					<button
						type="button"
						onClick={handleSubmit}
						className="px-8 h-12 bg-gray-200 rounded-xl disabled:text-gray-500 disabled:bg-gray-200/75"
						disabled={!edit}
					>
						Save Changes
					</button>

					<button
						type="button"
						className="px-8 h-12 bg-gray-300 rounded-xl"
						onClick={signOut}
					>
						Sign Out
					</button>
				</div>
			</form>
		</div>
	);
}

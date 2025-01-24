"use client";

import { PopoverButtonContext } from "@/app/_components/popover/popover_button";
import { useProfile } from "@/contexts/profiles";
import { useContext } from "react";
import { LuCheck, LuX } from "react-icons/lu";

export default function ProfileEditor() {
	const { profile, updateProfile } = useProfile();
	const context = useContext(PopoverButtonContext);

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

		clearForm();
		context?.setShow(false);
	};

	const handleCancel = () => {
		context?.setShow(false);
	};

	const handleFocusOut = () => {
		const formData = getFormData();
		if (formData.firstName !== "") {
			return;
		}
		if (formData.lastName !== "") {
			return;
		}
		if (formData.phone !== "") {
			return;
		}
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
		<div className="flex flex-col gap-4">
			<form
				name="auth"
				className="flex flex-col gap-6 self-start p-4 w-[26rem]"
			>
				<h1 className="pb-2 text-2xl text-gray-500">Personal Information</h1>

				<div className="flex flex-col justify-start items-start group">
					<label className="text-sm text-gray-600" htmlFor="firstName">
						First Name
					</label>
					<input
						className="px-4 h-12 text-xl placeholder-gray-700 text-black border-b-2 border-gray-400 outline-none text-start"
						onBlur={handleFocusOut}
						id="firstName"
						name="firstName"
						placeholder={profile?.firstName}
						type="text"
					/>
				</div>

				<div className="flex flex-col justify-start items-start group">
					<label className="text-sm text-gray-600" htmlFor="lastName">
						Last Name
					</label>
					<input
						className="px-4 h-12 text-xl placeholder-gray-700 text-black border-b-2 border-gray-400 outline-none text-start"
						onBlur={handleFocusOut}
						id="lastName"
						name="lastName"
						placeholder={profile?.lastName}
						type="text"
					/>
				</div>

				<div className="flex flex-col justify-start items-start group">
					<label className="text-sm text-gray-600" htmlFor="phone">
						Phone
					</label>
					<input
						className="px-4 h-12 text-xl placeholder-gray-700 text-black border-b-2 border-gray-400 outline-none text-start"
						onBlur={handleFocusOut}
						id="phone"
						name="phone"
						placeholder={profile?.phone}
						type="text"
					/>
				</div>

				<div className="flex gap-4 justify-end pt-4">
					<button
						type="button"
						onClick={handleCancel}
						className="px-8 h-12 rounded-xl border-2 border-gray-600"
					>
						<LuX size={24} />
					</button>

					<button
						type="button"
						onClick={handleSubmit}
						className="px-12 h-12 text-white bg-gray-600 rounded-xl"
					>
						<LuCheck size={24} />
					</button>
				</div>
			</form>
		</div>
	);
}

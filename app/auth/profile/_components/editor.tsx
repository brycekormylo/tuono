"use client";

import { useProfile } from "@/contexts/profiles";
import { useState } from "react";

export default function ProfileEditor() {
	const { profile, updateProfile } = useProfile();

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
		<div className="flex flex-col gap-4 self-start mt-36">
			<form
				name="auth"
				className="flex flex-col gap-4 self-start p-8 bg-white rounded-tl-2xl rounded-br-2xl w-[36rem]"
			>
				<h1 className="pb-6 text-2xl text-gray-500">Personal Information</h1>
				<div className="flex gap-8 justify-start items-center px-6 h-16 group">
					<label className="w-24 text-base text-gray-600" htmlFor="firstName">
						First Name
					</label>
					<input
						className="px-6 h-16 text-xl placeholder-gray-700 text-black bg-gray-50 rounded-xl outline-none text-start"
						onBlur={handleFocusOut}
						id="firstName"
						name="firstName"
						placeholder={profile?.firstName}
						type="text"
					/>
				</div>

				<div className="flex gap-8 justify-start items-center px-6 h-16 rounded-xl">
					<label className="w-24 text-base text-gray-600" htmlFor="lastName">
						Last Name
					</label>
					<input
						className="px-6 h-16 text-xl placeholder-gray-700 text-black bg-gray-50 rounded-xl outline-none text-start"
						id="lastName"
						name="lastName"
						placeholder={profile?.lastName}
						type="text"
					/>
				</div>

				<div className="flex gap-8 justify-start items-center px-6 h-16 rounded-xl">
					<label className="w-24 text-base text-gray-600" htmlFor="phone">
						Phone
					</label>
					<input
						className="px-6 h-16 text-xl placeholder-gray-700 text-black bg-gray-50 rounded-xl outline-none text-start"
						id="phone"
						name="phone"
						placeholder={profile?.phone}
						type="text"
					/>
				</div>

				<div className="flex gap-6 justify-end px-4 pt-12">
					<button
						type="button"
						onClick={handleSubmit}
						className="px-8 h-12 bg-gray-200 rounded-xl disabled:text-gray-500 disabled:bg-gray-200/75"
					>
						Save
					</button>
				</div>
			</form>
		</div>
	);
}

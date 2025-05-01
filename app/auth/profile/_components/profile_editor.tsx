"use client";

import PopoverButton, {
	PopoverButtonContext,
} from "@/app/_components/popover/popover_button";
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

	const fields = [
		{
			title: "First Name",
			id: "firstName",
			placeholder: profile?.firstName,
		},
		{
			title: "Last Name",
			id: "lastName",
			placeholder: profile?.lastName,
		},
		{
			title: "Phone",
			id: "phone",
			placeholder: profile?.phone,
		},
	];

	return (
		<div className="flex flex-col gap-4">
			<form
				name="auth"
				className="flex flex-col gap-6 self-start p-4 w-[26rem]"
			>
				<div className="flex flex-row gap-2 items-center h-12 text-dark-300">
					<h1 className="text-2xl">Personal Information</h1>
					<div className="grow" />

					<>
						<button
							type="button"
							onClick={handleCancel}
							className="w-10 h-10 stack"
						>
							<LuX size={20} />
						</button>

						<button
							type="button"
							onClick={handleSubmit}
							className="w-10 h-10 stack"
						>
							<LuCheck size={20} />
						</button>
					</>
				</div>

				{fields.map((field) => {
					return (
						<div
							key={field.id}
							className="flex flex-col justify-start items-start group"
						>
							<label className="text-sm text-dark-700" htmlFor={field.id}>
								{field.title}
							</label>

							<input
								className="px-4 h-12 text-xl border-b-2 outline-none text-dark-700 placeholder-dark-700 border-light-900 text-start focus:border-dark-100"
								onBlur={handleFocusOut}
								id={field.id}
								name={field.id}
								placeholder={field.placeholder}
								type="text"
							/>
						</div>
					);
				})}
			</form>
		</div>
	);
}

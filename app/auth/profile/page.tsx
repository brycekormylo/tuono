"use client";

import { useProfile } from "@/contexts/profiles";
import { LuEllipsis, LuLock, LuMail, LuPencil } from "react-icons/lu";
import ProfileEditor from "./_components/profile_editor";
import PopoverButton from "@/app/_components/popover/popover_button";
import AccountManagementOptions from "./_components/account_management_options";
import SignoutOptions from "./_components/signout_options";
import { formattedPhoneNumber } from "@/contexts/patients";

export default function ProfilePage() {
	const { profile } = useProfile();

	return (
		<div className="self-start stack">
			<div className="flex z-0 flex-col gap-4 self-start">
				<h1 className="self-start py-6 text-3xl">{"Account Details"}</h1>

				<div className="flex flex-col gap-4 self-start w-[48rem]">
					<div className="flex flex-col gap-2 p-6 w-full rounded-xl border-[2px] bg-light-50 border-dark-300">
						<div className="flex gap-4 items-center pb-2">
							<h1 className="text-2xl text-dark-500">Account</h1>

							<div className="px-4 h-6 text-sm font-semibold text-white rounded-xl bg-dark-100 stack">
								{profile?.isAdmin ? "Admin" : "Patient"}
							</div>
						</div>

						<div className="flex justify-start items-center h-12 rounded-xl text-dark-700 group">
							<LuMail className="text-dark-500" size={28} />
							<p className="px-4 text-xl stack">{profile?.email}</p>

							<div className="opacity-0 group-hover:opacity-100 text-dark-500 stack">
								<LuLock size={18} />
							</div>
						</div>
					</div>

					<div className="p-6 w-full rounded-xl border-[2px] bg-light-50 border-dark-300 stack">
						<div className="justify-self-end self-start">
							<PopoverButton popover={<ProfileEditor />}>
								<div className="z-10 w-12 h-12 text-dark-500 stack">
									<LuPencil size={20} />
								</div>
							</PopoverButton>
						</div>

						<div className="flex z-0 flex-col w-full">
							<h1 className="pb-6 text-2xl text-dark-500">
								Personal Information
							</h1>

							<div className="flex flex-col gap-6 w-full">
								<div className="flex flex-col gap-1">
									<p className="text-sm text-dark-500">First Name</p>
									<p className="text-xl">{profile?.firstName}</p>
								</div>

								<div className="flex flex-col gap-1">
									<p className="text-sm text-dark-500">Last Name</p>
									<p className="text-xl">{profile?.lastName}</p>
								</div>

								<div className="flex flex-col gap-1">
									<p className="text-sm text-dark-500">Phone</p>
									<p className="text-xl">
										{profile && formattedPhoneNumber(profile.phone)}
									</p>
								</div>
							</div>
						</div>
					</div>

					<div className="flex gap-4 justify-end p-4">
						<PopoverButton popover={<AccountManagementOptions />}>
							<p className="px-8 h-12 rounded-xl border-[2px] bg-light-50 border-dark-100 stack">
								<LuEllipsis size={24} />
							</p>
						</PopoverButton>

						<PopoverButton popover={<SignoutOptions />}>
							<p className="px-8 h-12 font-semibold rounded-xl text-light-100 bg-dark-300 stack">
								Sign Out
							</p>
						</PopoverButton>
					</div>
				</div>
			</div>
		</div>
	);
}

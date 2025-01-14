"use client";

import { useProfile } from "@/contexts/profiles";
import { useAuth } from "@/contexts/auth";
import { LuLock, LuMail, LuPencil } from "react-icons/lu";
import { useState } from "react";
import ProfileEditor from "./_components/editor";

export default function ProfilePage() {
	const { signOut } = useAuth();
	const { profile, updateProfile } = useProfile();
	const [edit, setEdit] = useState<boolean>(false);

	return (
		<div className="self-start stack">
			{edit && (
				<div className="fixed top-0 z-20 w-screen h-screen stack">
					<button
						type="button"
						onClick={() => setEdit(false)}
						className="w-full h-full bg-black/20"
					/>
					<ProfileEditor />
				</div>
			)}
			<div className="flex z-0 flex-col gap-4 self-start">
				<h1 className="self-start pb-6 text-3xl">{"Account Details"}</h1>

				<div className="flex flex-col gap-4 self-start p-8 bg-white rounded-tl-2xl rounded-br-2xl w-[56rem]">
					<div className="flex flex-col gap-2 p-6 w-full rounded-xl border-0 border-gray-300">
						<div className="flex gap-4 items-center">
							<h1 className="text-2xl text-gray-500">Account</h1>

							<div className="px-4 h-6 text-sm text-gray-600 bg-gray-200 rounded-xl stack">
								{profile?.isAdmin ? "Admin" : "Patient"}
							</div>
						</div>

						<div className="flex justify-start items-center h-12 text-gray-700 rounded-xl group">
							<LuMail size={28} />
							<p className="px-4 text-xl stack">{profile?.email}</p>
							<div className="text-gray-500 opacity-0 group-hover:opacity-100 stack">
								<LuLock size={18} />
							</div>
						</div>
					</div>

					<div className="w-full stack">
						<button
							type="button"
							onClick={() => setEdit(true)}
							className="z-10 justify-self-end self-start m-4 w-12 h-12 text-gray-700 bg-gray-200 rounded-full stack"
						>
							<LuPencil size={20} />
						</button>

						<div className="flex z-0 flex-col p-6 w-full rounded-xl border-0 border-gray-300">
							<h1 className="pb-6 text-2xl text-gray-500">
								Personal Information
							</h1>
							<div className="flex flex-col gap-6 w-full">
								<div className="flex flex-col gap-2">
									<p className="text-sm text-gray-500">First Name</p>
									<p className="text-xl">{profile?.firstName}</p>
								</div>

								<div className="flex flex-col gap-2">
									<p className="text-sm text-gray-500">Last Name</p>
									<p className="text-xl">{profile?.lastName}</p>
								</div>

								<div className="flex flex-col gap-2">
									<p className="text-sm text-gray-500">Phone</p>
									<p className="text-xl">{profile?.phone}</p>
								</div>
							</div>
						</div>
					</div>

					<div className="flex gap-6 justify-end px-4 pt-12">
						<button
							type="button"
							className="px-8 h-12 bg-gray-300 rounded-xl"
							onClick={signOut}
						>
							Sign Out
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

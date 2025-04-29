"use client";

import { LuPersonStanding, LuList, LuPlus } from "react-icons/lu";
import Overview from "./_components/overview";
import { useProfile } from "@/contexts/profiles";

export default function Dashboard() {
	const { profile } = useProfile();
	return (
		<div className="flex self-start mt-12 h-[36rem]">
			<div className="flex flex-col justify-start items-start px-20 pt-12 h-full grow">
				<h1 className="text-4xl">Welcome,</h1>
				<h2 className="text-3xl">{profile?.firstName}</h2>
				<div className="grow min-h-20" />

				<div className="flex flex-col gap-4 items-end w-full">
					<div className="flex flex-row-reverse gap-12 items-center rounded-full bg-light-100 ps-12">
						<div className="flex justify-center items-center w-24 h-24 rounded-full bg-light-400">
							<LuPersonStanding size={48} />
						</div>
						<p className="text-xl">Clients</p>
					</div>

					<div className="flex flex-row-reverse gap-12 items-center rounded-full bg-light-100 ps-12">
						<div className="flex justify-center items-center w-24 h-24 rounded-full bg-light-400">
							<LuList size={48} />
						</div>
						<p className="text-xl">Actions</p>
					</div>

					<div className="flex flex-row-reverse gap-12 items-center rounded-full bg-light-100 ps-12">
						<div className="flex justify-center items-center w-24 h-24 rounded-full bg-light-400">
							<LuPlus size={48} />
						</div>
						<p className="text-xl">New Routine</p>
					</div>
				</div>
			</div>
			<Overview />
		</div>
	);
}

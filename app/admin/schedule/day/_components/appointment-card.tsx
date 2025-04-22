import {
	type Appointment,
	AppointmentType,
	useAppointments,
} from "@/contexts/appointments";
import DragItem from "./drag-item";
import { LuInfo } from "react-icons/lu";
import PopoverButton from "@/app/_components/popover/popover_button";

export default function AppointmentCard({ appt }: { appt: Appointment }) {
	const { dragItemID } = useAppointments();

	const card = () => {
		return (
			<div
				className={`${appt.appointmentType == AppointmentType.FULL ? "mt-2 h-[7.5rem]" : "h-12"} p-4 w-64 bg-white rounded-md stack`}
			>
				<p className="justify-self-start self-start font-semibold">
					{appt.profile?.firstName} {appt.profile?.lastName}
				</p>

				<div className="flex flex-col gap-1 justify-self-start self-end">
					{appt.notes && (
						<>
							<h2 className="text-sm text-gray-500">Notes:</h2>
							<p className="text-sm text-gray-700">{`${appt.notes}`}</p>
						</>
					)}
				</div>
			</div>
		);
	};

	return (
		<div className="stack">
			<DragItem id={appt.id}>{card()}</DragItem>

			<div className="z-10 justify-self-end self-start m-4 w-10 h-10 stack">
				<PopoverButton popover={<div className="w-48 h-12">Options</div>}>
					<div className="w-8 h-8 stack">
						<LuInfo size={20} />
					</div>
				</PopoverButton>
			</div>
		</div>
	);
}

import { type Appointment, useAppointments } from "@/contexts/appointments";
import dayjs from "dayjs";
import DragItem from "./drag-item";

export default function ScheduleOverview() {
	const { info: appointments } = useAppointments();

	return (
		<div className="flex z-10 flex-col gap-2 h-auto">
			<p className="text-sm text-dark-500">Upcoming</p>
			<div className="flex overflow-y-scroll flex-col gap-2 max-h-[34rem] pe-4">
				{appointments?.map((appt: Appointment) => {
					const dateString = dayjs(appt.date).format("L LT");

					return (
						<DragItem key={appt.id} id={appt.id}>
							<div className="flex flex-col gap-1 py-2 px-4 w-80 rounded-md bg-light-50 text-dark-500">
								<div className="flex gap-2 justify-between items-center w-full">
									<p className="font-semibold text-dark-800">
										{appt.profile?.firstName} {appt.profile?.lastName}
									</p>

									<p className="text-sm">{`${appt.appointmentType} mins`}</p>
								</div>
								<p className="text-sm">{dateString}</p>
							</div>
						</DragItem>
					);
				})}
			</div>
		</div>
	);
}

import {
	type Appointment,
	AppointmentType,
	useAppointments,
} from "@/contexts/appointments";
import { useEffect } from "react";
import { useDrag } from "react-dnd";
import { LuEllipsisVertical } from "react-icons/lu";

interface AppointmentDragItemProps {
	appt: Appointment;
	// id: string;
	// children: React.ReactNode;
	// handle: React.ReactNode;
}

const AppointmentDragItem = ({ appt }: AppointmentDragItemProps) => {
	const id = appt.id;
	const { setDragItemID } = useAppointments();
	const [{ isDragging }, drag, preview] = useDrag(() => ({
		type: "appointment",
		item: { id },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	}));

	useEffect(() => {
		setDragItemID(isDragging ? appt.id : null);
	}, [isDragging]);

	return (
		<div
			ref={drag}
			style={{
				opacity: isDragging ? 0.5 : 1,
				cursor: "move",
			}}
			className={`${appt.appointmentType === AppointmentType.FULL ? "h-full" : "h-full"} w-full bg-primary-100 stack`}
		>
			<p className="justify-self-start self-start text-sm w-[80%] p-2">
				{`${appt.profile?.lastName}, ${appt.profile?.firstName}`}
			</p>
			<div className="z-20 justify-self-end self-center h-full bg-primary-300 stack">
				<LuEllipsisVertical size={18} />
			</div>
		</div>
	);
};

export default AppointmentDragItem;

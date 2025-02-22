import { useAppointments } from "@/contexts/appointments";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { type DropTargetMonitor, useDrop } from "react-dnd";

interface DeleteDropZoneProps {
	children: React.ReactNode;
}

const DeleteDropZone = ({ children }: DeleteDropZoneProps) => {
	const localizedFormat = require("dayjs/plugin/localizedFormat");
	dayjs.extend(localizedFormat);
	const { deleteAppointment } = useAppointments();

	const onDrop = (item: any, monitor: DropTargetMonitor) => {
		deleteAppointment(item.id);
	};

	const [{ isOver }, drop] = useDrop(() => ({
		accept: "appointment",
		drop: onDrop,
		collect: (monitor: DropTargetMonitor) => ({
			isOver: monitor.isOver(),
		}),
	}));

	// TODO: Allow this to create new appointments when tapped
	// TODO: Float the appointment over the associated row
	return (
		<div
			ref={drop}
			className={`${isOver ? "border-gray-400" : "border-gray-100"} border-[2px] w-full h-full stack`}
		>
			{children}
		</div>
	);
};

export default DeleteDropZone;

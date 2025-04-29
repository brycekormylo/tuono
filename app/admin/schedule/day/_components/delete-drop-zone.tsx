import { useAppointments } from "@/contexts/appointments";
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

	return (
		<div
			ref={drop}
			className={`${isOver ? "border-dark-300" : "border-light-900"} bg-light-50 border-[2px] w-full h-full stack rounded-md`}
		>
			{children}
		</div>
	);
};

export default DeleteDropZone;

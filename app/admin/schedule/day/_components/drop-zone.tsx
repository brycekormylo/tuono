import { useAppointments } from "@/contexts/appointments";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { type DropTargetMonitor, useDrop } from "react-dnd";

interface TimeDropZoneProps {
	date: Dayjs;
	// children: React.ReactNode;
}

const TimeDropZone = ({ date }: TimeDropZoneProps) => {
	const localizedFormat = require("dayjs/plugin/localizedFormat");
	dayjs.extend(localizedFormat);
	const { updateDate } = useAppointments();

	const onDrop = (item: any, monitor: DropTargetMonitor) => {
		updateDate(item.id, date.toISOString());
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
		<div ref={drop} className="w-full h-full stack">
			<div
				className={`${isOver ? "bg-gray-400" : "bg-gray-100"} self-start w-full h-[2px]`}
			/>
		</div>
	);
};

export default TimeDropZone;

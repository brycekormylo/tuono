import type { Appointment } from "@/contexts/appointments";
import { type DropTargetMonitor, useDrop } from "react-dnd";

interface DayDropZoneProps {
	onDrop: (id: string) => void;
	time: string;
	children: React.ReactNode;
}

const DayDropZone = ({ onDrop, time, children }: DayDropZoneProps) => {
	const [{ isOver }, drop] = useDrop(() => ({
		accept: "appointment",
		drop: (id: string) => onDrop(time),
		collect: (monitor: DropTargetMonitor) => ({
			isOver: monitor.isOver(),
		}),
	}));

	return (
		<div
			ref={drop}
			style={{
				border: `1px dashed ${isOver ? "green" : "black"}`,
				padding: "10px",
			}}
		>
			{children}
		</div>
	);
};

export default DayDropZone;

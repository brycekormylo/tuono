import { useAppointments } from "@/contexts/appointments";
import { useEffect } from "react";
import { useDrag } from "react-dnd";

interface AppointmentDragItemProps {
	id: string;
	children: React.ReactNode;
}

const DragItem = ({ id, children }: AppointmentDragItemProps) => {
	const { setIsDragging } = useAppointments();
	const [{ isDragging }, drag] = useDrag(() => ({
		type: "appointment",
		item: { id },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	}));

	useEffect(() => {
		setIsDragging(isDragging);
	}, [isDragging]);

	return (
		<div
			ref={drag}
			style={{
				opacity: isDragging ? 0.5 : 1,
				cursor: "move",
			}}
		>
			{children}
		</div>
	);
};

export default DragItem;

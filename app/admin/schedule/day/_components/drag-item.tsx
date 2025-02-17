import { useDrag } from "react-dnd";

const DragItem = ({ children }: { children: React.ReactNode }) => {
	const [{ isDragging }, drag] = useDrag(() => ({
		type: "appointment",
		item: { children },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	}));

	return (
		<div
			ref={drag}
			style={{
				opacity: isDragging ? 0.5 : 1,
				cursor: "move",
				border: "1px solid #ccc",
				padding: "10px",
				borderRadius: "5px",
				margin: "5px",
				backgroundColor: "lightblue",
			}}
		>
			{children}
		</div>
	);
};

export default DragItem;

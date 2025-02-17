"use client";

import PopoverButton from "@/app/_components/popover/popover_button";
import dayjs from "dayjs";
import { LuPlus } from "react-icons/lu";
import AppointmentDetails from "../../_components/appointment_details/page";
import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DragItem from "./_components/drag-item";
import DropZone from "./_components/drop-zone";

export default function ScheduleDay() {
	const date = dayjs();
	const [slots, setSlots] = useState<number[]>([]);

	useEffect(() => {
		const slotArr = [];
		for (let i = 7; i <= 19; i += 0.5) {
			slotArr.push(i);
		}
		setSlots(slotArr);
	}, []);

	// Not like this, need lots of items and make the time the ID or something
	const [droppedItems, setDroppedItems] = useState([]);

	const handleDrop = (time: string) => {
		console.log(`Dropped ${time}`);
		// setDroppedItems((prevItems) => [...prevItems, item]);
	};

	return (
		<DndProvider backend={HTML5Backend}>
			<div className="pt-24 w-full h-full stack">
				<div className="justify-self-start self-start mx-64 mt-12">
					<PopoverButton popover={<AppointmentDetails />}>
						<div className="z-10 w-12 h-12 bg-gray-400 rounded-full stack">
							<LuPlus size={24} />
						</div>
					</PopoverButton>
				</div>

				<div className="p-8 w-full bg-white stack">
					<div className="flex gap-4 justify-self-start self-start p-8 bg-gray-100 rounded-md">
						<div className="text-3xl">{date.format("MMM")}</div>
						<div className="text-6xl">{date.format("DD")}</div>
					</div>

					<div className="justify-self-start self-end stack">
						<DragItem>
							<div className="w-12 h-12 bg-black" />
						</DragItem>
					</div>

					<div className="justify-self-end w-[70%] max-h-[72vh] rounded-md overflow-y-scroll flex flex-col p-2 bg-gray-200">
						<div className="flex flex-col gap-2 w-full h-auto">
							{slots.map((slot) => {
								const time =
									slot % 1 === 0
										? `${slot}:00`
										: `${(slot - 0.5).toFixed(0)}:30`;
								return (
									<DropZone onDrop={handleDrop} key={slot} time={time}>
										<div className="flex items-center px-6 w-full h-16 text-xl bg-white rounded-sm">
											{time}
										</div>
									</DropZone>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</DndProvider>
	);
}

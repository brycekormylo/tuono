"use client";

import PopoverButton from "@/app/_components/popover/popover_button";
import dayjs, { type Dayjs } from "dayjs";
import weekday from "dayjs/plugin/weekday";
import { LuEllipsisVertical, LuPlus, LuTrash } from "react-icons/lu";
import AppointmentDetails from "../../_components/appointment_details/page";
import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DragItem from "./_components/drag-item";
import DropZone from "./_components/drop-zone";
import { useAppointments } from "@/contexts/appointments";
import DeleteDropZone from "./_components/delete-drop-zone";
import DatePicker from "./_components/date-picker";
import ScheduleOverview from "./_components/schedule-overview";

export default function ScheduleDay() {
	const localizedFormat = require("dayjs/plugin/localizedFormat");
	dayjs.extend(localizedFormat);
	dayjs.extend(weekday);

	const [weekdays, setWeekdays] = useState<Dayjs[][]>([]);

	const [show, setShow] = useState(false);
	const [hoveredSlot, setHoveredSlot] = useState<string | null>(null);

	const updateHoverSlot = (newValue: Dayjs | null) => {
		if (!newValue) {
			setHoveredSlot(null);
		} else {
			setHoveredSlot(newValue.format("hh:mm"));
		}
	};

	function timeIsHovered(day: Dayjs): boolean {
		return day.format("hh:mm") === hoveredSlot;
	}

	const {
		displayDate,
		selectedTimeSlot,
		dragItemID,
		setSelectedTimeSlot,
		showFullWeek,
		setShowFullWeek,
		info: appointments,
	} = useAppointments();

	const toggleWeek = () => {
		setShowFullWeek(!showFullWeek);
	};

	useEffect(() => {
		const weekdayArr: Dayjs[][] = [];
		for (let j = 0; j <= 6; j++) {
			const slotArr = [];
			const dayOfWeek = displayDate.day(j);
			for (let i = 7; i <= 19; i += 0.5) {
				const half = i % 1 !== 0;
				slotArr.push(
					dayOfWeek
						.hour(half ? i - 0.5 : i)
						.minute(half ? 30 : 0)
						.second(0)
						.millisecond(0),
				);
			}
			weekdayArr.push(slotArr);
		}
		setWeekdays(weekdayArr);
	}, [displayDate]);

	return (
		<div className="pt-8 max-w-full h-full w-[84rem] stack">
			<DndProvider backend={HTML5Backend}>
				<div className="p-8 w-full h-full bg-gray-50 stack">
					<div className="flex flex-col gap-6 justify-self-start items-start self-start h-full w-[36rem]">
						<div className="flex flex-row gap-6">
							<DatePicker />
						</div>

						<div className="flex gap-2 items-center self-start h-10">
							<div className="">
								<PopoverButton popover={<AppointmentDetails />}>
									<div className="z-10 w-10 h-10 bg-gray-200 rounded-full stack">
										<LuPlus size={24} />
									</div>
								</PopoverButton>
							</div>

							<div className="w-10 h-10 stack group">
								<div className="w-full h-full bg-gray-200 rounded-full" />
								<div className="w-8 h-8 bg-gray-200 rounded-full group-has-[:checked]:bg-gray-400" />

								<input
									type="checkbox"
									value={showFullWeek ? 1 : 0}
									onChange={toggleWeek}
									className="w-full h-full bg-gray-100 rounded-full opacity-0"
								/>
							</div>
							<p className="text-sm text-gray-500">Display full week</p>
						</div>
						<ScheduleOverview />
					</div>

					{dragItemID && (
						<div className="justify-self-start self-end w-96 h-48 bg-gray-100 rounded-md">
							<DeleteDropZone>
								<div className="text-gray-700 stack">
									<LuTrash size={24} />
								</div>
							</DeleteDropZone>
						</div>
					)}

					<div className="grid grid-cols-7 justify-self-end self-start px-4 pb-2 h-8 w-[52rem]">
						{weekdays.map((day, index) => {
							return (
								<p
									key={day.at(index)?.toISOString()}
									className="text-gray-700 stack"
								>
									{day.at(0)?.format("ddd D")}
								</p>
							);
						})}
					</div>

					<div className="flex overflow-y-scroll flex-col justify-self-end py-2 mt-12 min-h-full w-[58rem] max-h-[72vh] pe-4">
						<div className="w-full h-full stack">
							<div className="flex flex-row justify-start w-full">
								<div className="flex flex-col gap-1 w-32">
									{weekdays.at(0)?.map((daySlot) => {
										return (
											<div
												key={daySlot.toISOString()}
												onMouseEnter={() => updateHoverSlot(daySlot)}
												onMouseLeave={() => updateHoverSlot(null)}
												className="flex z-0 gap-2 justify-end items-center w-full h-16 pointer-events-none"
											>
												<p className="text-base text-gray-700">
													{daySlot.format("LT")}
												</p>
												<div
													className={`${timeIsHovered(daySlot) ? "bg-gray-300" : "bg-gray-100"} w-4 h-1 `}
												/>
											</div>
										);
									})}
								</div>

								<div className="flex flex-col w-full">
									<div className="grid grid-cols-7 gap-1 w-full h-auto">
										{weekdays.map((slots) => {
											return (
												<div
													key={slots.at(0)?.toString() ?? ""}
													className="w-full bg-gray-100 hover:bg-gray-200 px-[2px] stack"
												>
													<div className="m-1 w-full h-full bg-gray-50" />
													<div className="flex flex-col gap-1 w-full">
														{slots.map((slot) => {
															return (
																<div
																	key={slot.toISOString()}
																	onMouseEnter={() => updateHoverSlot(slot)}
																	onMouseLeave={() => updateHoverSlot(null)}
																	className="z-0 w-full h-16 bg-gray-100 stack"
																>
																	<DropZone date={slot} />

																	{!dragItemID && (
																		<button
																			type="button"
																			onClick={() => setSelectedTimeSlot(slot)}
																			className={`w-full h-full text-transparent bg-gray-100 hover:text-gray-500 py-[2px] stack ${timeIsHovered(slot) ? "bg-gray-300" : "bg-gray-100"}`}
																		>
																			<div className="w-full h-full bg-gray-100" />
																			<LuPlus size={20} />
																		</button>
																	)}

																	{appointments
																		?.filter(
																			(appt) =>
																				appt.date.toString() ===
																				slot.toISOString(),
																		)
																		.map((appt) => {
																			return (
																				<div
																					key={appt.id}
																					className="z-20 p-2 w-full h-full bg-gray-200 stack"
																				>
																					<p>
																						{`${appt.profile?.lastName}, ${appt.profile?.firstName}`}
																					</p>

																					<div className="justify-self-end w-2 h-full stack">
																						<DragItem
																							key={appt.id}
																							id={appt.id}
																						>
																							<LuEllipsisVertical size={18} />
																						</DragItem>
																					</div>
																				</div>
																			);
																		})}
																</div>
															);
														})}
													</div>
												</div>
											);
										})}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</DndProvider>

			{selectedTimeSlot && (
				<div className="fixed top-0 right-0 bottom-0 left-0 z-50 stack">
					<button
						type="button"
						onClick={() => setSelectedTimeSlot(null)}
						className="z-50 w-full h-full bg-gray-200/50"
					/>
					<div className="z-50 p-4 bg-gray-50 rounded-lg stack">
						<AppointmentDetails />
					</div>
				</div>
			)}
		</div>
	);
}

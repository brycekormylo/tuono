"use client";

import PopoverButton from "@/app/_components/popover/popover_button";
import dayjs, { type Dayjs } from "dayjs";
import weekday from "dayjs/plugin/weekday";
import { LuPlus, LuTrash } from "react-icons/lu";
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
import AppointmentDragItem from "./_components/appointment-drag-item";

export default function ScheduleDay() {
	const localizedFormat = require("dayjs/plugin/localizedFormat");
	dayjs.extend(localizedFormat);
	dayjs.extend(weekday);

	const [weekdays, setWeekdays] = useState<Dayjs[][]>([]);

	const [show, setShow] = useState(false);
	const [hoveredSlot, setHoveredSlot] = useState<string | null>(null);
	const [hoveredDay, setHoveredDay] = useState<string | null>(null);

	const updateHoverSlot = (newValue: Dayjs | null) => {
		if (!newValue) {
			setHoveredSlot(null);
			setHoveredDay(null);
		} else {
			setHoveredSlot(newValue.format("hh:mm"));
			setHoveredDay(newValue.format("L"));
		}
	};

	function dayIsHovered(day: Dayjs | undefined): boolean {
		return day?.format("L") === hoveredDay;
	}

	function timeIsHovered(day: Dayjs): boolean {
		return day.format("hh:mm") === hoveredSlot;
	}

	function isCurrentDay(day: Dayjs | null): boolean {
		const current = dayjs();
		return day?.format("L") === current.format("L");
	}

	const {
		displayDate,
		setDisplayDate,
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
		for (let j = 1; j <= 6; j++) {
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
		<div className="pt-4 max-w-full h-full w-[92rem] stack">
			<DndProvider backend={HTML5Backend}>
				<div className="w-full h-full stack duration-[25ms]">
					<div className="flex flex-col gap-6 justify-self-start items-start self-start h-full w-[36rem]">
						<DatePicker />

						<div className="flex gap-2 items-center self-start h-10">
							<PopoverButton popover={<AppointmentDetails />}>
								<div className="z-10 w-32 h-10 rounded-md bg-light-50 stack">
									<LuPlus size={24} />
								</div>
							</PopoverButton>
						</div>

						<ScheduleOverview />
					</div>

					<div
						className={`${dragItemID ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} z-50 justify-self-start self-end w-80 rounded-md bg-light-100 h-[36rem]`}
					>
						<DeleteDropZone>
							<div className="text-dark-700 stack">
								<LuTrash size={24} />
							</div>
						</DeleteDropZone>
					</div>

					<div className="flex flex-col justify-self-end p-4 h-full rounded-xl bg-light-50 w-[70rem]">
						<div className="flex z-10 justify-between w-auto h-8 pe-2 ms-[6rem]">
							{weekdays.map((day, index) => {
								const isToday = isCurrentDay(day.at(0) ?? null);
								const isSelected =
									displayDate.toISOString().slice(0, 10) ===
									day.at(0)?.toISOString().slice(0, 10);
								const isHovered = dayIsHovered(day.at(0));
								return (
									<div
										key={day.at(index)?.toISOString()}
										className="w-full h-full stack"
									>
										{isToday && (
											<div className="justify-self-center self-end w-8 h-1 rounded-full bg-accent-200" />
										)}

										{isSelected && (
											<div className="justify-self-center self-end w-12 h-1 rounded-full bg-accent-400" />
										)}

										<p
											className={`${isToday || isHovered ? "text-dark-700" : "text-dark-100"}`}
										>
											{day.at(0)?.format("ddd D")}
										</p>
									</div>
								);
							})}
						</div>

						<div className="block overflow-y-scroll w-full max-h-[78vh] pe-2">
							<div className="flex w-full h-auto">
								<div className="flex flex-col gap-1 w-28">
									{weekdays.at(0)?.map((slot) => {
										const isHovered = timeIsHovered(slot);
										return (
											<div
												key={slot.toISOString()}
												className="flex z-0 gap-2 justify-end items-center w-full h-16"
											>
												<p
													className={`${isHovered ? "text-dark-500" : "text-dark-100"} text-base`}
												>
													{slot.format("LT")}
												</p>

												<div
													className={`${timeIsHovered(slot) ? "bg-light-700" : "bg-light-100"} w-4 h-1`}
												/>
											</div>
										);
									})}
								</div>

								<div className="flex gap-1 w-full h-auto">
									{weekdays.map((day) => {
										const isToday = isCurrentDay(day.at(0) ?? null);
										const isDisplayDate =
											displayDate.toISOString().slice(0, 10) ===
											day.at(0)?.toISOString().slice(0, 10);
										return (
											<div
												key={day.at(0)?.toString() ?? ""}
												className="w-full bg-light-300 stack hover:bg-light-700"
											>
												<div className="w-full h-full bg-light-50" />
												<div className="flex flex-col gap-1 w-full group">
													{day.map((slot) => {
														return (
															<div
																key={slot.toISOString()}
																onMouseEnter={() => updateHoverSlot(slot)}
																onMouseLeave={() => updateHoverSlot(null)}
																className="z-0 w-full h-16 bg-light-100 stack"
															>
																<DropZone date={slot} />

																{!dragItemID && (
																	<button
																		type="button"
																		onClick={() => setSelectedTimeSlot(slot)}
																		className={`w-full h-full text-transparent hover:text-dark-100 group-hover:bg-light-700 group-hover:px-[2px] stack ${timeIsHovered(slot) ? "bg-light-700 py-[2px]" : "bg-light-100"}`}
																	>
																		<div className="w-full h-full bg-light-100" />
																		<div
																			className={`w-full h-full ${isDisplayDate && "bg-accent-400/10"}`}
																		/>
																		<div
																			className={`w-full h-full ${isToday && !isDisplayDate && "bg-accent-200/10"}`}
																		/>

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
																			<AppointmentDragItem
																				key={appt.id}
																				appt={appt}
																			/>
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
			</DndProvider>

			{selectedTimeSlot && (
				<div className="fixed top-0 right-0 bottom-0 left-0 z-50 stack">
					<button
						type="button"
						onClick={() => setSelectedTimeSlot(null)}
						className="z-50 w-full h-full bg-dark-100/40"
					/>
					<div className="z-50 p-4 rounded-lg bg-light-50 stack">
						<AppointmentDetails />
					</div>
				</div>
			)}
		</div>
	);
}

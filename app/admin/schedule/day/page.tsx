"use client";

import PopoverButton from "@/app/_components/popover/popover_button";
import dayjs, { type Dayjs } from "dayjs";
import { LuPlus, LuTrash } from "react-icons/lu";
import AppointmentDetails from "../../_components/appointment_details/page";
import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DragItem from "./_components/drag-item";
import DropZone from "./_components/drop-zone";
import { AppointmentType, useAppointments } from "@/contexts/appointments";
import DeleteDropZone from "./_components/delete-drop-zone";
import DatePicker from "./_components/date-picker";
import AppointmentCard from "./_components/appointment-card";
import ScheduleOverview from "./_components/schedule-overview";

export default function ScheduleDay() {
	const localizedFormat = require("dayjs/plugin/localizedFormat");
	dayjs.extend(localizedFormat);

	const [slots, setSlots] = useState<Dayjs[]>([]);

	const {
		displayDate,
		selectedTimeSlot,
		isDragging,
		setSelectedTimeSlot,
		showFullWeek,
		setShowFullWeek,
		info: appointments,
	} = useAppointments();

	const toggleWeek = () => {
		setShowFullWeek(!showFullWeek);
	};

	useEffect(() => {
		const slotArr = [];
		for (let i = 7; i <= 19; i += 0.5) {
			const half = i % 1 !== 0;
			slotArr.push(
				displayDate
					.hour(half ? i - 0.5 : i)
					.minute(half ? 30 : 0)
					.second(0)
					.millisecond(0),
			);
		}
		setSlots(slotArr);
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

					{isDragging && (
						<div className="justify-self-start self-end w-96 h-48 bg-gray-100 rounded-md">
							<DeleteDropZone>
								<div className="text-gray-700 stack">
									<LuTrash size={24} />
								</div>
							</DeleteDropZone>
						</div>
					)}

					<div className="flex overflow-y-scroll flex-col justify-self-end py-2 min-h-full w-[56rem] max-h-[72vh] pe-4">
						<div className="w-full h-full stack">
							<div className="grid grid-cols-1 gap-2 w-full h-auto [grid-template-rows:repeat(25,1fr)]">
								{slots.map((slot, index) => {
									const key = slot.format();

									return (
										<div
											key={key}
											className={`z-0 [grid-row:${index + 1}/${index + 2}] [grid-column:1/2] flex w-full h-16`}
										>
											<div className="flex gap-2 justify-end items-center w-28 text-base text-gray-700 pointer-events-none">
												<p>{slot.format("LT")}</p>
												<div className="w-4 h-1 bg-gray-200" />
											</div>

											<div className="w-full h-16 bg-gray-100 stack">
												<DropZone date={slot} />

												<div className="justify-self-end self-start h-16 stack pe-4">
													<PopoverButton
														popover={<AppointmentDetails />}
														pressAction={() => setSelectedTimeSlot(slot)}
													>
														<div className="w-10 h-10 stack">
															<LuPlus size={20} />
														</div>
													</PopoverButton>
												</div>
											</div>
										</div>
									);
								})}
							</div>

							<div className="grid grid-cols-1 gap-2 w-full h-auto min-h-full [grid-template-rows:repeat(25,1fr)]">
								{slots.map((slot, index) => {
									const key = slot.format();
									const appts = appointments?.filter(
										(appt) =>
											dayjs(appt.date).toISOString() === slot.toISOString(),
									);

									return (
										<div
											key={key}
											className="overflow-y-visible w-full h-16 [grid-column:1/2] stack ps-[6.5rem]"
										>
											<DropZone date={slot} />

											<div className="flex z-0 justify-self-start">
												{appts?.map((appt) => {
													return <AppointmentCard key={appt.id} appt={appt} />;
												})}
											</div>
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			</DndProvider>
		</div>
	);
}

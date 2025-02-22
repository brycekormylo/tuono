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

export default function ScheduleDay() {
	const localizedFormat = require("dayjs/plugin/localizedFormat");
	dayjs.extend(localizedFormat);

	const [slots, setSlots] = useState<Dayjs[]>([]);

	const {
		displayDate,
		selectedTimeSlot,
		setSelectedTimeSlot,
		info: appointments,
	} = useAppointments();

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
		<div className="pt-24 max-w-full h-full w-[84rem] stack">
			<div className="justify-self-start self-start mx-96 mt-12">
				<PopoverButton popover={<AppointmentDetails />}>
					<div className="z-10 w-12 h-12 bg-gray-400 rounded-full stack">
						<LuPlus size={24} />
					</div>
				</PopoverButton>
			</div>

			<DndProvider backend={HTML5Backend}>
				<div className="p-8 w-full h-full bg-gray-50 stack">
					<div className="flex flex-col gap-6 justify-self-start items-start self-start w-96 h-full">
						<DatePicker />

						<div className="flex z-10 flex-col gap-2 h-auto">
							<p className="text-sm text-gray-500">Overview</p>
							<div className="flex overflow-y-scroll flex-col gap-2 max-h-72 pe-4">
								{appointments?.map((appt) => {
									const dateString = dayjs(appt.date).format("L LT");
									return (
										<DragItem key={appt.id} id={appt.id}>
											<div className="flex flex-col gap-1 py-2 px-4 w-80 text-gray-600 bg-gray-100 rounded-md">
												<div className="flex gap-2 justify-between items-center w-full">
													<p className="font-semibold text-gray-800">
														{appt.profile?.firstName} {appt.profile?.lastName}
													</p>

													<p className="text-sm">{`${appt.appointmentType} mins`}</p>
												</div>
												<p className="text-sm">{dateString}</p>
											</div>
										</DragItem>
									);
								})}
							</div>
						</div>
					</div>

					<div className="justify-self-start self-end w-96 h-48 bg-gray-100 rounded-md">
						<DeleteDropZone>
							<div className="text-gray-700 stack">
								<LuTrash size={24} />
							</div>
						</DeleteDropZone>
					</div>

					<div className="flex overflow-y-scroll flex-col justify-self-end py-2 min-h-full w-[48rem] max-h-[72vh] pe-4">
						<div className="flex flex-col w-full h-auto">
							{slots.map((slot) => {
								const key = slot.format();
								const appts = appointments?.filter(
									(appt) =>
										dayjs(appt.date).toISOString() === slot.toISOString(),
								);

								return (
									<div key={key} className="flex w-full h-16">
										<div className="flex gap-2 justify-end items-center w-28 text-base text-gray-700 pointer-events-none">
											<p>{slot.format("LT")}</p>
											<div className="w-4 h-1 bg-gray-200" />
										</div>

										<div className="w-full h-16 stack">
											<div className="flex w-full h-full bg-gray-100">
												<div className="flex z-10 gap-2 items-center px-2">
													{appts?.map((appt) => {
														return (
															<DragItem key={appt.id} id={appt.id}>
																<div
																	className={`${appt.appointmentType == AppointmentType.FULL ? "mt-2 h-28" : "h-12"} p-4 w-64 bg-white rounded-md stack`}
																>
																	<p className="justify-self-start self-start font-semibold">
																		{appt.profile?.firstName}{" "}
																		{appt.profile?.lastName}
																	</p>

																	<div className="flex flex-col gap-1 justify-self-start self-end">
																		{appt.notes && (
																			<>
																				<h2 className="text-sm text-gray-500">
																					Notes:
																				</h2>
																				<p className="text-sm text-gray-700">{`${appt.notes}`}</p>
																			</>
																		)}
																	</div>
																</div>
															</DragItem>
														);
													})}
												</div>
											</div>

											<div className="justify-self-end self-start h-16 stack pe-4">
												<PopoverButton
													popover={<AppointmentDetails />}
													pressAction={() => setSelectedTimeSlot(slot)}
												>
													<div className="z-10 w-10 h-10 stack">
														<LuPlus size={20} />
													</div>
												</PopoverButton>
											</div>

											<DropZone date={slot} />
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</DndProvider>
		</div>
	);
}

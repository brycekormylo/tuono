"use client";

import { Calendar, type Event } from "react-big-calendar";
import { dayjsLocalizer } from "react-big-calendar";
import type { withDragAndDropProps } from "react-big-calendar/lib/addons/dragAndDrop";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useAppointments } from "@/contexts/appointments";

import "./sass/styles.scss";
import "./sass/drag-and-drop.scss";
import "./sass/event.scss";
import "./sass/agenda.scss";
import "./sass/month.scss";
import "./sass/reset.scss";
import "./sass/toolbar.scss";
import "./sass/variables.scss";
import "./sass/time-column.scss";
import "./sass/time-grid.scss";

export default function ScheduleCalendar() {
	const localizer = dayjsLocalizer(dayjs);

	const { info } = useAppointments();

	useEffect(() => {
		if (info) {
			const appointments: Event[] = info.map((appointment) => {
				return {
					title: `${appointment.profile?.lastName}, ${appointment.profile?.firstName}`,
					start: dayjs(appointment.date).toDate(),
					end: dayjs(appointment.date)
						.add(appointment.appointmentType.valueOf(), "minutes")
						.toDate(),
					resource: appointment.profile?.id,
				};
			});
			setEvents(appointments);
		} else {
			setEvents([
				{
					title: "Learn cool stuff",
					start: dayjs().endOf("hour").toDate(),
					end: dayjs().endOf("hour").add(2, "hour").toDate(),
					//resource: appointment.id
				},
			]);
		}
	}, [info]);

	const [events, setEvents] = useState<Event[]>([]);

	//@ts-ignore
	const DnDCalendar = withDragAndDrop(Calendar);

	const onEventResize: withDragAndDropProps["onEventResize"] = (data) => {
		const { start, end } = data;

		setEvents((currentEvents) => {
			const firstEvent = {
				start: new Date(start),
				end: new Date(end),
			};
			return [...currentEvents, firstEvent];
		});
	};

	const onEventDrop: withDragAndDropProps["onEventDrop"] = (data) => {
		const { start, end } = data;

		setEvents((currentEvents) => {
			const firstEvent = {
				start: new Date(start),
				end: new Date(end),
			};
			return [...currentEvents, firstEvent];
		});
	};

	return (
		<div className="w-full h-full stack">
			<DnDCalendar
				defaultView="week"
				events={events}
				localizer={localizer}
				onEventDrop={onEventDrop}
				onEventResize={onEventResize}
				resizable
				style={{ height: "80vh" }}
			/>
		</div>
	);
}

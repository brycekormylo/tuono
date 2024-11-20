"use client";

import { Calendar, dayjsLocalizer, Event } from "react-big-calendar";
import withDragAndDrop, {
  withDragAndDropProps,
} from "react-big-calendar/lib/addons/dragAndDrop";
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

export default function AppointmentCalendar() {
  const localizer = dayjsLocalizer(dayjs);

  const { info } = useAppointments();

  useEffect(() => {
    if (info) {
      const appointments: Event[] = info.map((appointment) => {
        return {
          title: `${appointment.patient.lastName}, ${appointment.patient.firstName}`,
          start: appointment.time,
          end: dayjs(appointment.time)
            .add(appointment.duration.valueOf(), "minutes")
            .toDate(),
          resource: appointment.patient.id,
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
    <div className="p-4 w-full h-full stack">
      <DnDCalendar
        defaultView="week"
        events={events}
        localizer={localizer}
        onEventDrop={onEventDrop}
        onEventResize={onEventResize}
        resizable
        style={{ height: "70vh" }}
      />
    </div>
  );
}

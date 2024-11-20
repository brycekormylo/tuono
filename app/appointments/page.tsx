import AppointmentCalendar from "./calendar/page";
import AppointmentList from "./list/page";

export default function Appointments() {
  return (
    <div className="flex justify-between w-full">
      <AppointmentList />
      <AppointmentCalendar />
    </div>
  );
}

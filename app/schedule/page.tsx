import ScheduleCalendar from "./calendar/page";
import ScheduleList from "./list/page";

export default function Schedules() {
  return (
    <div className="flex justify-between w-full">
      <ScheduleList />
      <ScheduleCalendar />
    </div>
  );
}

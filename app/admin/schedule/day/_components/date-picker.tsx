import PopoverButton from "@/app/_components/popover/popover_button";
import { useAppointments } from "@/contexts/appointments";
import dayjs from "dayjs";
import {
	LuCalendar,
	LuChevronLeft,
	LuChevronRight,
	LuChevronsLeft,
	LuChevronsRight,
} from "react-icons/lu";

export default function DatePicker() {
	const { displayDate, setDisplayDate } = useAppointments();

	const addDay = () => {
		setDisplayDate(displayDate.add(1, "day"));
	};

	const subtractDay = () => {
		setDisplayDate(displayDate.subtract(1, "day"));
	};

	const addWeek = () => {
		setDisplayDate(displayDate.add(1, "week"));
	};

	const subtractWeek = () => {
		setDisplayDate(displayDate.subtract(1, "week"));
	};

	const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
		const value = event.currentTarget.value;
		value !== "" && setDisplayDate(dayjs(value));
	};

	return (
		<div className="flex gap-6 items-center">
			<div className="flex flex-col justify-center items-center py-4 w-80 text-gray-700 bg-gray-100 rounded-md">
				<p className="pb-1 text-xl">{displayDate.format("dddd")},</p>
				<div className="flex gap-2">
					<div className="text-3xl">{displayDate.format("MMM")}</div>
					<div className="text-6xl">{displayDate.format("DD")}</div>
				</div>

				<div className="flex justify-between px-8 pt-4 w-full text-gray-700">
					<button
						type="button"
						onClick={subtractWeek}
						className="w-8 h-8 stack"
					>
						<LuChevronsLeft size={24} />
					</button>

					<button type="button" onClick={subtractDay} className="w-8 h-8 stack">
						<LuChevronLeft size={24} />
					</button>

					<div className="grow stack">
						<input
							type="date"
							className="w-8 h-8 opacity-0"
							value={displayDate.toISOString().slice(0, 10)}
							onChange={handleInputChange}
						/>

						<div className="w-8 h-8 rounded-full pointer-events-none stack">
							<LuCalendar size={24} />
						</div>
					</div>

					<button type="button" onClick={addDay} className="w-8 h-8 stack">
						<LuChevronRight size={24} />
					</button>

					<button type="button" onClick={addWeek} className="w-8 h-8 stack">
						<LuChevronsRight size={24} />
					</button>
				</div>
			</div>
		</div>
	);
}

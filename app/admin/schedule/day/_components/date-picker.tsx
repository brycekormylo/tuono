import { useAppointments } from "@/contexts/appointments";

export default function DatePicker() {
	const { displayDate, setDisplayDate } = useAppointments();

	const addDay = () => {
		setDisplayDate(displayDate.add(1, "day"));
	};

	const subtractDay = () => {
		setDisplayDate(displayDate.subtract(1, "day"));
	};

	return (
		<div className="flex gap-4">
			<div className="flex flex-col gap-2 justify-center items-center py-6 w-52 bg-gray-100 rounded-md">
				<p className="text-2xl">{displayDate.format("dddd")},</p>
				<div className="flex gap-2">
					<div className="text-3xl">{displayDate.format("MMM")}</div>
					<div className="text-6xl">{displayDate.format("DD")}</div>
				</div>
			</div>
			<div className="flex flex-col gap-2">
				<button
					type="button"
					onClick={addDay}
					className="w-12 h-12 bg-gray-300 rounded-full"
				>
					<p>{displayDate.add(1, "day").format("DD")}</p>
				</button>

				<button
					type="button"
					onClick={subtractDay}
					className="w-12 h-12 bg-gray-300 rounded-full"
				>
					<p>{displayDate.subtract(1, "day").format("DD")}</p>
				</button>
			</div>
		</div>
	);
}

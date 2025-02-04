import { LuArrowUp } from "react-icons/lu";

export interface HeaderInfo {
	left: string;
	center: string;
	right: string;
}

interface TableHeaderProps {
	info: HeaderInfo;
	sortAsc: boolean;
	toggleSort: () => void;
}

export default function TableHeader({
	info,
	sortAsc,
	toggleSort,
}: TableHeaderProps) {
	return (
		<div className="grid items-center px-4 text-xl font-semibold grid-cols-[1fr,1fr,1fr]">
			<div className="flex gap-4 items-center h-8 ps-6">
				<h1 className="h-full">{info.left}</h1>
				<button
					type="button"
					className={`stack transform h-full ${sortAsc ? "rotate-180" : "rotate-0"}`}
					onMouseDown={toggleSort}
				>
					<div className="w-8 h-8 bg-gray-100 rounded-full" />
					<LuArrowUp size={20} />
				</button>
			</div>
			<div className="justify-self-end">
				<h1>{info.center}</h1>
			</div>
			<div className="flex justify-end justify-self-end pe-6 min-w-40">
				<h1>{info.right}</h1>
			</div>
		</div>
	);
}

import TableHeader from "./table-header";
import type { ReactNode } from "react";

interface HeaderColumnNames {
	left: string;
	center: string;
	right: string;
}

interface TableBodyProps<T> {
	sortAsc: boolean;
	toggleSort: () => void;
	info: T;
	columns: HeaderColumnNames;
	entries: ReactNode[] | null;
}

export default function TableBody<T>({
	sortAsc,
	toggleSort,
	info,
	columns,
	entries,
}: TableBodyProps<T>) {
	return (
		<div className="flex flex-col gap-1 py-6 px-4 bg-gray-50 rounded-tl-2xl rounded-br-2xl grow">
			<TableHeader info={columns} sortAsc={sortAsc} toggleSort={toggleSort} />
			<div className="my-1 mx-6 max-w-full bg-gray-300 h-[1px]" />

			<div className="flex overflow-y-scroll flex-col gap-1 px-4 max-h-[40rem]">
				{info && <div className="flex flex-col gap-1">{entries}</div>}
			</div>
		</div>
	);
}

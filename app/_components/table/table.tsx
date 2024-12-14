import type { ReactNode } from "react";
import Utils from "./utils";
import TableBody from "./body";
import type { ListContextProps } from "@/contexts/list-context-props";
import type { HeaderInfo } from "./table-header";

interface TableProps<V extends ListContextProps<any>> {
	source: V;
	title: string;
	headerColumns: HeaderInfo;
	overlay: ReactNode;
	tableRows: ReactNode[];
}

export default function Table<V extends ListContextProps<any>>({
	source,
	title,
	headerColumns,
	overlay,
	tableRows,
}: TableProps<V>) {
	const { info, edit, sortAsc, toggleSort } = source;

	return (
		<div className="self-start w-full stack">
			<div className="flex flex-col min-h-96 w-full gap-8 p-4 grow [&_*]:flex-nowrap">
				<Utils source={source} title={title} />
				<div className="flex justify-start items-start">
					<TableBody
						sortAsc={sortAsc}
						toggleSort={toggleSort}
						columns={headerColumns}
						info={info}
						entries={tableRows}
					/>
				</div>
			</div>
			{edit && overlay}
		</div>
	);
}

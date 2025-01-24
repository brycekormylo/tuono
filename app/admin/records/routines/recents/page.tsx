"use client";

import { type Routine, useRoutine } from "@/contexts/routines";
import Table from "@/app/_components/table/table";
import type { ListContextProps } from "@/contexts/list-context-props";
import RoutineCanvas from "../canvas/page";
import TableRow from "@/app/_components/table/table-row";

export default function Recents() {
	const source: ListContextProps<Routine> = useRoutine();

	const tableRows = source.info?.map((routine, index) => {
		const date = new Date(routine.created);
		return (
			<TableRow
				key={routine.id}
				element={routine}
				source={source}
				displayProperties={{
					left: routine.name,
					center: date.toLocaleDateString(),
					right: routine.steps.length,
				}}
			/>
		);
	});

	return (
		<Table
			source={source}
			title="Routines"
			tableRows={tableRows as React.ReactNode[]}
			headerColumns={{
				left: "Name",
				center: "Date Sent",
				right: "Step Count",
			}}
			creatorOverlay={<RoutineCanvas />}
		/>
	);
}

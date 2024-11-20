"use client";

import { Routine, useRoutineList } from "@/contexts/routine-list";
import Table from "@/app/_components/table/table";
import { ListContextProps } from "@/contexts/list-context-props";
import RoutineCanvas from "../canvas/page";
import RoutineRow from "./_components/routine-row";
import TableRow from "@/app/_components/table/table-row";
import { ReactNode } from "react";

export default function Recents() {
  const list: ListContextProps<Routine> = useRoutineList();

  const tableRows = list.info?.map((routine, index) => {
    const date = new Date(routine.creationDate);
    return (
      <TableRow
        key={index}
        element={routine}
        source={list}
        displayProperties={{
          left: routine.name,
          center: date.toLocaleDateString(),
          right: "Patient",
        }}
      />
    );
  });

  return (
    <Table
      source={list}
      title="Routines"
      tableRows={tableRows as ReactNode[]}
      headerColumns={{ left: "Name", center: "Date Sent", right: "Recipient" }}
      drawerItem={<RoutineCanvas />}
    />
  );
}

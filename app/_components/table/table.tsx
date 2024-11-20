import { ReactNode } from "react";
import Utils from "./utils";
import TableBody from "./body";
import Drawer from "./drawer";
import { ListContextProps } from "@/contexts/list-context-props";
import { HeaderInfo } from "./table-header";

interface TableProps<V extends ListContextProps<any>> {
  source: V;
  title: string;
  headerColumns: HeaderInfo;
  drawerItem: ReactNode;
  tableRows: ReactNode[];
}

export default function Table<V extends ListContextProps<any>>({
  source,
  title,
  headerColumns,
  drawerItem,
  tableRows,
}: TableProps<V>) {
  const { info, edit, sortAsc, toggleSort } = source;

  return (
    <div className="flex flex-col min-h-96 gap-8 p-4 grow [&_*]:flex-nowrap">
      <Utils source={source} title={title} />
      <div className="flex justify-between items-start">
        <TableBody
          sortAsc={sortAsc}
          toggleSort={toggleSort}
          columns={headerColumns}
          info={info}
          entries={tableRows}
        />
        <Drawer edit={edit}>{drawerItem}</Drawer>
      </div>
    </div>
  );
}

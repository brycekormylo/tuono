import TableHeader from "./table-header";
import { ReactNode } from "react";

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
    <>
      <div className="flex flex-col gap-1 p-8 bg-gray-50 rounded-tl-2xl rounded-br-2xl grow">
        <TableHeader info={columns} sortAsc={sortAsc} toggleSort={toggleSort} />
        <div className="my-1 w-full bg-gray-300 h-[1px]" />
        {info && entries}
      </div>
    </>
  );
}

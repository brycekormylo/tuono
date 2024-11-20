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
    <div className="grid grid-cols-[1fr,2fr,1.5fr] items-center text-xl font-semibold">
      <div className="flex gap-4 items-center h-8 ps-6">
        <h1 className="h-full">{info.left}</h1>
        <button
          className={`stack transform h-full ${sortAsc ? "rotate-180" : "rotate-0"}`}
          onMouseDown={toggleSort}
        >
          <div className="w-8 h-8 bg-gray-100 rounded-full" />
          <LuArrowUp size={20} />
        </button>
      </div>
      <div className="justify-self-end pe-4">
        <h1>{info.center}</h1>
      </div>
      <div className="justify-self-end pe-6">
        <h1>{info.right}</h1>
      </div>
    </div>
  );
}

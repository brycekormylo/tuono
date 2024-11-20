import { LuSearch } from "react-icons/lu";
import { ListContextProps } from "@/contexts/list-context-props";

interface SearchBarProps<V extends ListContextProps<any>> {
  source: V;
}

export default function SearchBar<V extends ListContextProps<any>>({
  source,
}: SearchBarProps<V>) {
  const { search, changeSearch } = source;

  return (
    <div className="w-96 stack">
      <input
        type="text"
        value={search}
        className="z-0 w-full h-14 bg-gray-50 rounded-xl border-gray-200 outline-none focus:border-gray-400 border-[1px] ps-16 peer"
        onChange={changeSearch}
      />
      <div className="flex z-10 justify-self-start w-full text-gray-600 pointer-events-none ps-6 peer-focus:text-gray-800">
        <LuSearch size={24} />
      </div>
    </div>
  );
}

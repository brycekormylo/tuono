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
				className="z-0 w-full h-14 rounded-xl outline-none bg-light-50 border-light-900 border-[1px] ps-16 peer focus:border-dark-100"
				onChange={changeSearch}
			/>
			<div className="flex z-10 justify-self-start w-full pointer-events-none text-dark-100 ps-6 peer-focus:text-dark-500">
				<LuSearch size={24} />
			</div>
		</div>
	);
}

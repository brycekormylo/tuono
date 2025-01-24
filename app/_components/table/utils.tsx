import ResultCounter from "./result-counter";
import SearchBar from "./search-bar";
import type { ListContextProps } from "@/contexts/list-context-props";
import PopoverButton from "../popover/popover_button";
import { LuPlus } from "react-icons/lu";

interface UtilsProps<V extends ListContextProps<any>> {
	source: V;
	overlay: React.ReactNode;
}

export default function Utils<V extends ListContextProps<any>>({
	source,
	overlay,
}: UtilsProps<V>) {
	const { rawInfo, info, setEdit } = source;

	return (
		<div className="flex justify-end items-center px-8">
			<div className="flex gap-8 items-center">
				<ResultCounter rawResults={rawInfo} results={info} />
				<SearchBar source={source} />

				<PopoverButton popover={overlay}>
					<div className="z-20 w-12 h-12 bg-gray-300 rounded-full ring-gray-400 stack hover:ring-[1px]">
						<LuPlus size={28} />
					</div>
				</PopoverButton>
			</div>
		</div>
	);
}

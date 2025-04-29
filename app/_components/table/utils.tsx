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
	const { rawInfo, info, setEdit, setSelected } = source;

	const deselect = () => {
		setEdit(true);
		setSelected(null);
	};

	return (
		<div className="flex justify-end items-center px-8">
			<div className="flex gap-8 items-center">
				<ResultCounter rawResults={rawInfo} results={info} />
				<SearchBar source={source} />

				<PopoverButton popover={overlay} pressAction={deselect}>
					<div className="z-20 w-12 h-12 rounded-full bg-light-50 ring-light-900 ring-[1px] stack text-dark-300 hover:ring-dark-100 hover:text-dark-700">
						<LuPlus size={28} />
					</div>
				</PopoverButton>
			</div>
		</div>
	);
}

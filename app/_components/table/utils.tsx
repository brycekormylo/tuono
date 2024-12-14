import ResultCounter from "./result-counter";
import SearchBar from "./search-bar";
import NewEntryButton from "./new-entry-button";
import { ListContextProps } from "@/contexts/list-context-props";

interface UtilsProps<T, V extends ListContextProps<any>> {
	title: string;
	source: V;
}

export default function Utils<T, V extends ListContextProps<any>>({
	title,
	source,
}: UtilsProps<T, V>) {
	const { rawInfo, info, edit, selected, send: createNew } = source;
	return (
		<div className="flex justify-between items-center px-8">
			<h1 className="text-4xl">{title}</h1>
			<div className="flex gap-8 items-center">
				<ResultCounter rawResults={rawInfo} results={info} />
				<SearchBar source={source} />
				<NewEntryButton
					editMode={edit}
					selectedEntry={selected}
					handleClick={createNew}
				/>
			</div>
		</div>
	);
}

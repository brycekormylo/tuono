import { LuSearch } from "react-icons/lu";
import { useState } from "react";
import SearchOverlay from "./search-overlay";
import type { ListContextProps } from "@/contexts/list-context-props";

interface SearchButtonProps<T, V extends ListContextProps<any>> {
	source: V;
	itemAction: (element?: T) => void;
	children?: React.ReactNode;
}

export default function SearchButton<T, V extends ListContextProps<any>>({
	source,
	itemAction,
	children,
}: SearchButtonProps<T, V>) {
	const [showOverlay, setShowOverlay] = useState<boolean>(false);

	const toggleOverlay = () => {
		setShowOverlay(!showOverlay);
	};

	return (
		<div className="stack">
			<button type="button" onClick={toggleOverlay} className="z-10 stack">
				{children || (
					<div className="h-12 bg-gray-400 rounded-full">
						<LuSearch size={24} />
					</div>
				)}
			</button>
			{showOverlay && (
				<SearchOverlay
					source={source}
					itemAction={itemAction}
					toggle={toggleOverlay}
				/>
			)}
		</div>
	);
}

import { LuSearch, LuPlus } from "react-icons/lu";
import type { ListContextProps } from "@/contexts/list-context-props";
import { useState, useEffect, useRef } from "react";

interface SearchOverlayProps<V extends ListContextProps<any>> {
	source: V;
	itemAction: (input?: any) => void;
	toggle: () => void;
}

export default function SearchOverlay<V extends ListContextProps<any>>({
	source,
	itemAction,
	toggle: toggleVisible,
}: SearchOverlayProps<V>) {
	const { listName, info, search, setSearch, changeSearch, setSelected } =
		source;

	const ref = useRef<HTMLInputElement>(null);

	const [showList, setShowList] = useState(false);

	useEffect(() => {
		setSearch("");
	}, []);

	useEffect(() => {
		setShowList(search !== "");
	}, [search]);

	const handleFocus = () => {
		setSelected(null);
	};

	const handleBlur = () => {
		// setShowList(false);
		// setSearch("");
	};

	//TODO: Allow tabbing through exercise list with a live preview on right

	return (
		<div className="fixed top-0 right-0 left-0 z-30 items-center w-screen h-screen stack">
			<button
				type="button"
				onMouseDown={toggleVisible}
				className="flex fixed top-0 right-0 bottom-0 left-0 z-30 flex-col items-center w-screen h-screen backdrop-blur-sm bg-dark-100/40"
			/>

			<div className="flex flex-col gap-4 justify-start items-center w-screen h-screen pt-[24vh]">
				<div className="z-40 py-4 px-8 h-32 bg-light-50 min-w-[28rem] stack">
					<input
						autoFocus
						ref={ref}
						type="text"
						id="search"
						value={search}
						className="z-0 w-full h-16 rounded-2xl outline-none bg-light-50 border-dark-100 border-[1px] ps-16 peer focus:border-dark-500"
						onChange={changeSearch}
						onFocus={handleFocus}
						onBlur={handleBlur}
					/>
					<div className="flex z-10 justify-self-start w-full pointer-events-none text-dark-100 ms-6 peer-focus:text-dark-500">
						<LuSearch size={24} />
					</div>

					<div className="flex z-10 justify-end items-start w-full h-full pointer-events-none text-dark-100 pe-12 peer-focus:text-dark-500">
						<div className="mt-1 h-6 stack">
							<div className="w-full h-full bg-light-50 grow" />
							<label htmlFor="search" className="px-4">
								{listName}
							</label>
						</div>
					</div>
				</div>

				{showList &&
					info?.map((element) => {
						return (
							<button
								type="button"
								key={element.id}
								onMouseDown={() => {
									itemAction(element);
									toggleVisible();
								}}
								className="flex z-40 justify-between items-center px-6 mx-6 h-12 rounded-lg bg-light-50 min-w-[24rem]"
							>
								<p className="text-lg">
									{Object.hasOwn(element, "profile") &&
										`${element.profile.lastName}, ${element.profile.firstName}`}
									{Object.hasOwn(element, "title") && element.title}

									{Object.hasOwn(element, "name") && element.name}
								</p>
								<div className="grow" />
								<LuPlus size={24} />
							</button>
						);
					})}
			</div>
		</div>
	);
}

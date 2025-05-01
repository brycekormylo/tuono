import { LuUndo, LuTrash2, LuHistory, LuUserCog } from "react-icons/lu";
import { type ReactNode, useEffect, useState } from "react";
import type { ListContextProps } from "@/contexts/list-context-props";
import PopoverButton from "../popover/popover_button";
import DeleteOptions from "./delete-options";

interface Identifiable {
	id: string;
}

interface DisplayProperties {
	left: string;
	center: string | ReactNode;
	right: string | ReactNode;
}

interface TableRowProps<
	T extends Identifiable,
	V extends ListContextProps<any>,
> {
	source: V;
	element: T;
	displayProperties: DisplayProperties;
	detailOverlay: ReactNode;
}

export default function TableRow<
	T extends Identifiable,
	V extends ListContextProps<any>,
>({ source, element, displayProperties, detailOverlay }: TableRowProps<T, V>) {
	const { remove, selected, setSelected, edit, setEdit } = source;

	const [isSelected, setIsSelected] = useState(false);
	const [deleteMode, setDeleteMode] = useState(false);

	useEffect(() => {
		setIsSelected(selected?.id === element.id);
	}, [selected]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		setDeleteMode(false);
	}, [isSelected]);

	const handleClick = () => {
		if (selected?.id === element.id) {
			setEdit(false);
			setSelected(null);
		} else {
			setEdit(false);
			setSelected(element);
		}
	};

	const handleDelete = () => {
		setDeleteMode(false);
		const toDelete = selected;
		setSelected(null);
		toDelete && remove(toDelete);
	};

	const underlay = "bg-secondary-300";
	const selectedbg = "bg-secondary-100";
	const unselectedbg = "group-hover:bg-secondary-50 bg-light-50";

	return (
		<div
			className={`grid group h-14 w-full rounded-md overflow-clip ${underlay} ${isSelected ? "grid-cols-[1fr,1fr,20rem,10rem]" : "grid-cols-[1fr,1fr,30rem,0]"}  items-center`}
		>
			<div
				className={`flex col-start-1 row-start-1 justify-self-start items-center w-full h-full ps-6 ${isSelected ? selectedbg : unselectedbg}`}
			>
				<h2 className="text-lg">{displayProperties.left}</h2>
			</div>

			<div
				className={`flex z-20 flex-wrap col-start-2 row-start-1 justify-end items-center w-full h-full ${isSelected ? selectedbg : unselectedbg}`}
			>
				{typeof displayProperties.center === "string" ? (
					<h2 className="text-base">{displayProperties.center}</h2>
				) : (
					<>{displayProperties.center}</>
				)}
			</div>

			<div
				className={`flex shadow-lg shadow-secondary-900 z-10 col-start-3 row-start-1 gap-2 justify-end justify-items-end items-center w-full h-full rounded-r-md ${isSelected ? selectedbg : unselectedbg} min-w-40`}
			>
				<div className="flex gap-2 justify-end items-center w-full h-full pe-6">
					{typeof displayProperties.right === "string" ? (
						<p className="text-base">{displayProperties.right}</p>
					) : (
						<>{displayProperties.right}</>
					)}
				</div>
			</div>

			<button
				type="button"
				className="z-30 col-start-1 col-end-4 row-start-1 h-full bg-transparent grow"
				onMouseDown={handleClick}
			/>

			<div className="flex col-start-4 col-end-5 row-start-1 justify-evenly justify-self-end items-center h-full rounded-r-md min-w-[10rem]">
				{deleteMode ? (
					<>
						<button type="button" onClick={() => setDeleteMode(false)}>
							<LuUndo size={20} />
						</button>
						<div>
							<label htmlFor="delete-button" className="text-sm text-wrap">
								Delete?
							</label>
						</div>
						<button
							type="button"
							id="delete-button"
							onClick={handleDelete}
							className="text-error"
						>
							<LuTrash2 size={20} />
						</button>
					</>
				) : (
					<>
						<PopoverButton popover={<DeleteOptions source={source} />}>
							<div className="text-error">
								<LuTrash2 size={20} />
							</div>
						</PopoverButton>
						<a href={"/elements"} className="">
							<LuHistory size={20} />
						</a>
						<PopoverButton popover={detailOverlay}>
							<div>
								<LuUserCog size={20} />
							</div>
						</PopoverButton>
					</>
				)}
			</div>
		</div>
	);
}

import type { ChangeEvent } from "react";

export type ChangeRecord = {
	key: string;
	prevElement?: string;
	newValue: string;
};

export interface ListContextProps<Type> {
	listName: string;
	info: Type[] | null;
	rawInfo: Type[] | null;
	selected: Type | null;
	setSelected: (element: Type | null) => void;
	sortAsc: boolean;
	setSortAsc: (asc: boolean) => void;
	toggleSort: () => void;
	search: string;
	setSearch: (input: string) => void;
	changeSearch: (input: ChangeEvent<HTMLInputElement>) => void;
	clearSearch: () => void;
	edit: boolean;
	setEdit: (mode: boolean) => void;
	toggleEdit: () => void;
	send: () => void;
	remove: (element: Type) => void;
	update: (element: Type) => void;
	isLoading: boolean;
	error: { message: string } | undefined;
	changeLog: ChangeRecord[];
	setChangeLog: (log: ChangeRecord[]) => void;
}

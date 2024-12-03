"use client";

import { usePatientList, type PatientInfo } from "./patient-list";
import type { ChangeEvent, ReactNode } from "react";
import type { ListContextProps } from "./list-context-props";
import { useDatabase, type Identifiable } from "./database";
import { useAuth, type AdminAccount } from "./auth";
import { createContext, useContext, useEffect, useState } from "react";
import { useInput } from "@/hooks/use-input";
import { id, tx } from "@instantdb/react";
import { useTextArea } from "@/hooks/use-text-area";

export interface Message {
	fromAdmin: boolean;
	body: string;
	timestamp: Date;
}

export interface Conversation extends Identifiable {
	messages: Message[];
	created: Date;
	lastUpdated: Date;
	admin: AdminAccount;
	patient: PatientInfo;
}

interface ConversationContextProps extends ListContextProps<Conversation> {
	newMessage: string;
	changeNewMessage: (input: ChangeEvent<HTMLTextAreaElement>) => void;
	setNewMessage: (newMessage: string) => void;
	setSelectedFromPatient: (patient: PatientInfo) => void;
	select: (conversation?: Conversation, patient?: PatientInfo) => void;
	showOptions: boolean;
	setShowOptions: (value: boolean) => void;
}

const ConversationContext = createContext<ConversationContextProps | null>(
	null,
);

interface ConversationProviderProps {
	children: ReactNode;
}

const ConversationProvider = ({ children }: ConversationProviderProps) => {
	const listName = "Messages";

	const { database } = useDatabase();
	const { user, admin } = useAuth();
	const { setSelected: setSelectedPatient } = usePatientList();

	const [rawInfo, setRawInfo] = useState<Conversation[] | null>(null);
	const [info, setInfo] = useState<Conversation[] | null>(null);
	const [sortAsc, setSortAsc] = useState<boolean>(true);
	const [selected, setSelected] = useState<Conversation | null>(null);
	const [showOptions, setShowOptions] = useState<boolean>(false);

	const {
		value: newMessage,
		setValue: setNewMessage,
		onChange: changeNewMessage,
	} = useTextArea("");
	const [edit, setEdit] = useState<boolean>(false);
	const {
		value: search,
		onChange: changeSearch,
		setValue: setSearch,
	} = useInput("");

	const query = {
		conversations: {
			$: {
				where: {
					admin: user?.id,
				},
			},
			patient: {},
			admin: {},
		},
	};

	const { isLoading, error, data } = database.useQuery(query);

	useEffect(() => {
		if (data) {
			const conversations: Conversation[] = data.conversations.map(
				(conversation) => {
					const patient: PatientInfo = conversation.patient[0] as PatientInfo;
					const admin: AdminAccount = conversation.admin[0] as AdminAccount;
					return {
						...conversation,
						patient: patient,
						admin: admin,
					};
				},
			);
			const sorted = conversations.sort((a, b) => {
				if (sortAsc) {
					return a.created > b.created ? -1 : 1;
				}
				return a.created < b.created ? -1 : 1;
			});
			setRawInfo(sorted);
		}
	}, [data, sortAsc]);

	useEffect(() => {
		sort();
	});

	useEffect(() => {
		// if (search == "") {
		//   setInfo(rawInfo);
		// } else {
		//   filterBy(search);
		// }
		setInfo(rawInfo);
	}, [rawInfo]);

	const filterBy = (input: string) => {
		if (info) {
			const filtered = info.filter((conversation) => {
				conversation.patient.firstName
					.toLowerCase()
					.includes(input.toLowerCase()) ||
					conversation.patient.lastName
						.toLowerCase()
						.includes(input.toLowerCase());
			});
			setInfo(filtered);
		} else {
			setInfo(rawInfo);
		}
	};

	const sort = () => {
		if (rawInfo) {
			const sorted = rawInfo.sort((a, b) => {
				if (sortAsc) {
					return a.created > b.created ? -1 : 1;
				}
				return a.created < b.created ? -1 : 1;
			});
			setRawInfo([...sorted]);
		}
	};

	const toggleSort = () => {
		setSortAsc(!sortAsc);
	};

	const toggleEdit = () => {
		setEdit(!edit);
	};

	const clearSearch = () => {
		setSearch("");
	};

	const setSelectedFromPatient = (patient: PatientInfo) => {
		const prevConversation = rawInfo
			?.filter((conversation) => conversation.patient.id === patient.id)
			.at(0);

		if (prevConversation) {
			setSelected(prevConversation);
		} else {
			if (admin) {
				const newDraft: Conversation = {
					messages: [],
					created: new Date(),
					lastUpdated: new Date(),
					admin: admin,
					patient: patient,
					id: id(),
				};
				update(newDraft);
			}
		}
	};

	const createNew = () => {
		const msg: Message = {
			fromAdmin: true,
			body: newMessage,
			timestamp: new Date(),
		};
		setNewMessage("");
		if (selected) {
			const updatedConversation: Conversation = {
				...selected,
				messages: [...selected.messages, msg],
			};
			update(updatedConversation);
		}
	};

	const select = (selection?: Conversation, patient?: PatientInfo) => {
		setShowOptions(false);
		if (selection) {
			setSelected(selection);
			setSelectedPatient(selection.patient);
		}
		if (patient) {
			setSelectedFromPatient(patient);
			setSelectedPatient(patient);
		}
	};

	const update = (conversation: Conversation) => {
		const dataToInsert = {
			id: conversation.id,
			created: conversation.created,
			lastUpdated: conversation.lastUpdated,
			messages: conversation.messages,
		};
		database.transact(tx.conversations[conversation.id].update(dataToInsert));
		user &&
			database.transact(
				tx.conversations[conversation.id].link({
					admin: user?.id,
				}),
			);
		conversation.patient &&
			database.transact(
				tx.conversations[conversation.id].link({
					patient: conversation.patient.id,
				}),
			);
		setSelected(conversation);
	};

	const remove = (conversation: Conversation) => {
		database.transact(tx.conversations[conversation.id].delete());
		setSelected(null);
	};

	return (
		<ConversationContext.Provider
			value={{
				listName,
				info,
				rawInfo,
				selected,
				setSelected,
				setSelectedFromPatient,
				sortAsc,
				setSortAsc,
				toggleSort,
				search,
				setSearch,
				changeSearch,
				clearSearch,
				edit,
				setEdit,
				toggleEdit,
				createNew,
				remove,
				update,
				newMessage,
				setNewMessage,
				changeNewMessage,
				showOptions,
				setShowOptions,
				select,
			}}
		>
			{children}
		</ConversationContext.Provider>
	);
};

const useConversations = () => {
	const context = useContext(ConversationContext);

	if (!context) {
		throw new Error("useMessage must be used within a MessageProvider");
	}
	return context;
};

export { ConversationProvider, useConversations };

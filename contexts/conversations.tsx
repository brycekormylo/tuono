"use client";

import type { ChangeEvent, ReactNode } from "react";
import type { ListContextProps } from "./list-context-props";
import { type AppSchema, useDatabase } from "./database";
import { createContext, useContext, useEffect, useState } from "react";
import { useInput } from "@/hooks/use-input";
import { id, type InstaQLEntity, type InstaQLParams } from "@instantdb/react";
import { useTextArea } from "@/hooks/use-text-area";
import { type Patient, usePatient } from "./patients";
import { useProfile } from "./profiles";

export type Message = InstaQLEntity<
	AppSchema,
	"messages",
	// biome-ignore lint: This syntax is mandatory
	{ profile: {} }
>;

export type Conversation = InstaQLEntity<
	AppSchema,
	"conversations",
	// biome-ignore lint: This syntax is mandatory
	{ admin: {}; patient: {}; messages: {} }
>;

interface ConversationContextProps extends ListContextProps<Conversation> {
	newMessage: string;
	changeNewMessage: (input: ChangeEvent<HTMLTextAreaElement>) => void;
	setNewMessage: (newMessage: string) => void;
	setSelectedFromPatient: (patient: Patient) => void;
	showOptions: boolean;
	setShowOptions: (value: boolean) => void;
	send: () => void;
}

const ConversationContext = createContext<ConversationContextProps | null>(
	null,
);

interface ConversationProviderProps {
	children: ReactNode;
}

const ConversationProvider = ({ children }: ConversationProviderProps) => {
	const listName = "Messages";

	const { db } = useDatabase();
	const { profile } = useProfile();
	const { selected: selectedPatient, setSelected: setSelectedPatient } =
		usePatient();
	const adminID = profile?.admin?.id ?? "";

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
					admin: adminID,
				},
			},
			patient: {},
			admin: {},
			messages: {},
		},
	} satisfies InstaQLParams<AppSchema>;

	const { isLoading, error, data } = db.useQuery(query);

	useEffect(() => {
		selectedPatient && setSelectedFromPatient(selectedPatient);
	}, [selectedPatient]);

	useEffect(() => {
		data && setInfo(data.conversations);
	}, [data]);

	const toggleSort = () => {
		setSortAsc(!sortAsc);
	};

	const toggleEdit = () => {
		setEdit(!edit);
	};

	const clearSearch = () => {
		setSearch("");
	};

	const setSelectedFromPatient = (patient: Patient) => {
		const prevConversation = info
			?.filter((conversation) => conversation.patient?.id === patient.id)
			.at(0);

		if (prevConversation) {
			setSelected(prevConversation);
		} else {
			const newDraft: Conversation = {
				id: id(),
				created: JSON.stringify(new Date()),
				messages: [],
				admin: profile?.admin,
				patient: patient,
			};
			update(newDraft);
		}
	};

	const send = () => {
		if (selected && selectedPatient) {
			const msg = {
				id: id(),
				content: newMessage,
				timestamp: JSON.stringify(new Date()),
				fromAdmin: true,
			};
			db.transact([
				db.tx.messages[msg.id].update(msg),
				db.tx.messages[msg.id].link({
					sender: profile?.id,
				}),
				db.tx.messages[msg.id].link({
					conversation: selected.id,
				}),
			]);
			setSelectedPatient(selectedPatient);
		}
	};

	const update = (conversation: Conversation) => {
		const dataToInsert = {
			id: conversation.id,
			created: conversation.created,
		};
		db.transact([
			db.tx.conversations[conversation.id].update(dataToInsert),
			db.tx.conversations[conversation.id].link({
				admin: adminID,
			}),
			db.tx.conversations[conversation.id].link({
				patient: conversation.patient?.id,
			}),
		]);
		setSelected(conversation);
	};

	const remove = (conversation: Conversation) => {
		db.transact(db.tx.conversations[conversation.id].delete());
		setSelected(null);
		setSelectedPatient(null);
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
				send,
				remove,
				update,
				newMessage,
				setNewMessage,
				changeNewMessage,
				showOptions,
				setShowOptions,
				isLoading,
				error,
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

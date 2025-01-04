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
	{ sender: {} }
>;

export type PatientConversation = InstaQLEntity<
	AppSchema,
	"conversations",
	// biome-ignore lint: This syntax is mandatory
	{ admin: {}; patient: { profile: {} }; messages: {} }
>;

interface PatientConversationContextProps {
	conversation?: PatientConversation;
	newMessage: string;
	changeNewMessage: (input: ChangeEvent<HTMLTextAreaElement>) => void;
	setNewMessage: (newMessage: string) => void;
	showOptions: boolean;
	setShowOptions: (value: boolean) => void;
	send: () => void;
}

const PatientConversationContext =
	createContext<PatientConversationContextProps | null>(null);

interface PatientConversationProviderProps {
	children: ReactNode;
}

const PatientConversationProvider = ({
	children,
}: PatientConversationProviderProps) => {
	const { db } = useDatabase();
	const { profile } = useProfile();

	const patientID = profile?.patient?.id ?? "";

	const [info, setInfo] = useState<PatientConversation | null>(null);
	const [showOptions, setShowOptions] = useState<boolean>(false);

	const {
		value: newMessage,
		setValue: setNewMessage,
		onChange: changeNewMessage,
	} = useTextArea("");

	const conversationQuery = {
		conversations: {
			$: {
				where: {
					patient: patientID,
				},
			},
			patient: { profile: {} },
			admin: {},
			messages: {},
		},
	} satisfies InstaQLParams<AppSchema>;

	const { isLoading, error, data } = db.useQuery(conversationQuery);

	useEffect(() => {
		data && setInfo(data.conversations.at(0) || null);
	}, [data]);

	const send = () => {
		const msg = {
			id: id(),
			content: newMessage,
			timestamp: JSON.stringify(new Date()),
			fromAdmin: profile?.isAdmin,
			seen: false,
		};

		db.transact([
			db.tx.messages[msg.id].update(msg),
			db.tx.messages[msg.id].link({
				sender: profile?.id,
			}),
			db.tx.messages[msg.id].link({
				conversation: info?.id,
			}),
		]);
	};

	return (
		<PatientConversationContext.Provider
			value={{
				newMessage,
				setNewMessage,
				changeNewMessage,
				showOptions,
				setShowOptions,
				send,
			}}
		>
			{children}
		</PatientConversationContext.Provider>
	);
};

const usePatientConversations = () => {
	const context = useContext(PatientConversationContext);

	if (!context) {
		throw new Error("useMessage must be used within a MessageProvider");
	}
	return context;
};

export { PatientConversationProvider, usePatientConversations };

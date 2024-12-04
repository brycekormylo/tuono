"use client";

import React, { createContext, useContext, type ReactNode } from "react";
import { init, type InstantReactWeb } from "@instantdb/react";
import type { AnnotatedExercise } from "./routine-list";
import type { Difficulty } from "./exercise-list";
import type { Message } from "./conversations";

const APP_ID = "bd7b55f0-2338-4b87-8b7a-44ed0df6ae13";

export type Schema = {
	admins: {
		id: string;
		email: string;
		handle: string;
	};
	appointments: {
		id: string;
		time: string;
		duration: string;
	};
	patients: {
		id: string;
		firstName: string;
		lastName: string;
		email: string;
		phone: string;
		dob: Date;
		created: Date;
		home_address: string;
	};
	routines: {
		id: string;
		created: Date;
		name: string;
		steps: AnnotatedExercise[];
	};
	exercises: {
		id: string;
		aliases: string[];
		difficulty: Difficulty;
		holdTimeInSeconds: number;
		sets: number;
		repetitions: number;
		weight: number;
		title: string;
		steps: string[];
	};
	conversations: {
		id: string;
		messages: Message[];
		created: Date;
		lastUpdated: Date;
	};
};

export interface Identifiable {
	id: string;
}

interface DatabaseContextProps {
	database: InstantReactWeb<Schema>;
}

const DatabaseContext = createContext<DatabaseContextProps | undefined>(
	undefined,
);

interface DatabaseProviderProps {
	children: ReactNode;
}

const DatabaseProvider = ({ children }: DatabaseProviderProps) => {
	const database = init<Schema>({ appId: APP_ID });

	return (
		<DatabaseContext.Provider
			value={{
				database,
			}}
		>
			{children}
		</DatabaseContext.Provider>
	);
};

const useDatabase = () => {
	const context = useContext(DatabaseContext);

	if (!context) {
		throw new Error("useDatabase must be used within a DatabaseProvider");
	}
	return context;
};

export { DatabaseProvider, useDatabase };

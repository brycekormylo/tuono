"use client";

import React, { createContext, useContext, type ReactNode } from "react";
import {
	init_experimental,
	type InstantReactWebDatabase,
} from "@instantdb/react";
import _schema from "../instant.schema";

// Typescript intellisense from InstantDB schema
type _AppSchema = typeof _schema;
export interface AppSchema extends _AppSchema {}
const schema: AppSchema = _schema;

interface DatabaseContextProps {
	db: InstantReactWebDatabase<AppSchema>;
}

const DatabaseContext = createContext<DatabaseContextProps | undefined>(
	undefined,
);

interface DatabaseProviderProps {
	children: ReactNode;
}

const DatabaseProvider = ({ children }: DatabaseProviderProps) => {
	const db = init_experimental({
		appId: "bd7b55f0-2338-4b87-8b7a-44ed0df6ae13",
		schema,
	});

	return (
		<DatabaseContext.Provider
			value={{
				db,
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

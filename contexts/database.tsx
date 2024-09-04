"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { init, tx, id, InstantReactWeb } from "@instantdb/react";

const APP_ID = "bd7b55f0-2338-4b87-8b7a-44ed0df6ae13";

export type Schema = {
  admins: {
    id: string;
    createdAt: string;
    email: string;
    handle: string;
  };
  patients: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
};

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

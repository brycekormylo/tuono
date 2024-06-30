"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";
import { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";

//Use useReducer to setup structure for specific queries

interface ClientInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface DatabaseContextProps {
  isConnected: boolean;
  setIsConnected: (isConnected: boolean) => void;
  database: SupabaseClient;
  addNewClient: (client: ClientInfo) => void;
}

const DatabaseContext = createContext<DatabaseContextProps | undefined>(
  undefined,
);

interface DatabaseProviderProps {
  children: ReactNode;
}

const DatabaseProvider = ({ children }: DatabaseProviderProps) => {
  const database = createClient();
  const [isConnected, setIsConnected] = useState(false);

  const addNewClient = (client: ClientInfo) => {
    //Push to db
  };

  return (
    <DatabaseContext.Provider
      value={{ isConnected, setIsConnected, database, addNewClient }}
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

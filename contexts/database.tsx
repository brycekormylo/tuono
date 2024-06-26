"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";
import { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";

//Use useReducer to setup structure for specific queries

interface DatabaseContextProps {
  isConnected: boolean;
  setIsConnected: (isConnected: boolean) => void;
  database: SupabaseClient;
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

  return (
    <DatabaseContext.Provider value={{ isConnected, setIsConnected, database }}>
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

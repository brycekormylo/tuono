"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";
import { createClient } from "@/utils/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";

// import "react-native-url-polyfill/auto";

interface DatabaseContextProps {
  database: SupabaseClient;
}

const DatabaseContext = createContext<DatabaseContextProps | undefined>(
  undefined,
);

interface DatabaseProviderProps {
  children: ReactNode;
}

const DatabaseProvider: React.FC<DatabaseProviderProps> = ({ children }) => {
  const database = createClient();

  return (
    <DatabaseContext.Provider value={{ database }}>
      {children}
    </DatabaseContext.Provider>
  );
};

const useDatabaseContext = () => {
  const context = useContext(DatabaseContext);

  // const { data: notes } = await supabase.from("notes").select();
  if (!context) {
    throw new Error(
      "useDatabaseContext must be used within a DatabaseProvider",
    );
  }
};

export { DatabaseProvider, useDatabaseContext, DatabaseContext };

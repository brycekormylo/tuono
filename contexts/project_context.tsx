"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

export type Client = {
  name: string;
  email: string;
  phone: string;
};

export type Routine = {
  title: string;
  actions: Action[];
};

export type Action = {
  title: string;
  description: string;
  duration: number;
};

interface UserContextProps {
  user: string;
  setUser: (newUser: string) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<string>("default");
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
};

export { UserProvider, useUserContext, UserContext };

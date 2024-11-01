"use client";

import React, {
  createContext,
  useEffect,
  useState,
  useContext,
  ReactNode,
} from "react";
import { init, tx, id, User, InstantReactWeb } from "@instantdb/react";
import { useDatabase } from "./database";

export type AdminAccount = {
  id: string;
  fullName?: string;
  email: string;
  handle?: string;
};

interface AuthContextProps {
  sentEmail: string;
  sendCodeTo: (email: string) => void;
  signInWithCode: (code: string) => void;
  signOut: () => void;
  user: User | undefined;
  admin: AdminAccount | null;
  updateName: (updatedName: string) => void;
  updateHandle: (updatedHandle: string) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const { database } = useDatabase();
  const { isLoading, user, error } = database.useAuth();
  const [admin, setAdmin] = useState<AdminAccount | null>(null);

  const [sentEmail, setSentEmail] = useState("");

  const sendCodeTo = (email: string) => {
    setSentEmail(email);

    database.auth.sendMagicCode({ email }).catch((err) => {
      alert("Uh oh :" + err.body?.message);
    });
  };

  const signInWithCode = (code: string) => {
    database.auth
      .signInWithMagicCode({ email: sentEmail, code })
      .catch((err) => {
        alert("Uh oh :" + err.body?.message);
        console.log(err);
      });
  };

  const signOut = () => {
    database.auth.signOut();
  };

  const updateHandle = (newHandle: string) => {
    user &&
      database.transact([tx.admins[user.id].update({ handle: newHandle })]);
  };

  const updateName = (updatedName: string) => {
    user &&
      database.transact([tx.admins[user.id].update({ fullName: updatedName })]);
  };

  useEffect(() => {
    if (user) {
      const adminAccount: AdminAccount = { id: user.id, email: user.email };
      setAdmin(adminAccount);
      database.transact([tx.admins[user.id].update({ email: user.email })]);
    }
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AuthContext.Provider
      value={{
        sentEmail,
        sendCodeTo,
        signInWithCode,
        signOut,
        user,
        admin,
        updateName,
        updateHandle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };

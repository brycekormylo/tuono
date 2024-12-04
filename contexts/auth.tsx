"use client";

import React, {
	createContext,
	useEffect,
	useState,
	useContext,
	type ReactNode,
} from "react";
import type { User } from "@instantdb/react";
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
	const { db } = useDatabase();
	const { isLoading, user, error } = db.useAuth();
	const [admin, setAdmin] = useState<AdminAccount | null>(null);

	const [sentEmail, setSentEmail] = useState("");

	const sendCodeTo = (email: string) => {
		setSentEmail(email);

		db.auth.sendMagicCode({ email }).catch((err) => {
			alert(`Uh oh : ${err.body?.message}`);
		});
	};

	const signInWithCode = (code: string) => {
		db.auth.signInWithMagicCode({ email: sentEmail, code }).catch((err) => {
			alert(`Uh oh :${err.body?.message}`);
			console.log(err);
		});
	};

	const signOut = () => {
		db.auth.signOut();
	};

	const updateHandle = (newHandle: string) => {
		user && db.transact([db.tx.admins[user.id].update({ handle: newHandle })]);
	};

	const updateName = (updatedName: string) => {
		user &&
			db.transact([db.tx.admins[user.id].update({ fullName: updatedName })]);
	};

	const setAdminAccount = (user: User) => {
		const adminAccount: AdminAccount = { id: user.id, email: user.email };
		setAdmin(adminAccount);
		db.transact([db.tx.admins[user.id].update({ email: user.email })]);
	};

	useEffect(() => {
		user && setAdminAccount(user);
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

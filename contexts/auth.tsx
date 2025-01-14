"use client";

import { createContext, useEffect, useState, useContext } from "react";
import type { User } from "@instantdb/react";
import { useDatabase } from "./database";

interface AuthContextProps {
	submittedEmail?: string;
	sendCodeTo: (email: string) => void;
	signInWithCode: (code: string) => void;
	signOut: () => void;
	user: string;
	userEmail: string;
	userData?: User;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const { db } = useDatabase();
	const { isLoading, user: userData, error } = db.useAuth();
	const [user, setUser] = useState<string>("");
	const [userEmail, setUserEmail] = useState<string>("");

	useEffect(() => {
		if (userData) {
			setUser(userData.id);
			setUserEmail(userData.email);
		}
	}, [userData]);

	const [submittedEmail, setSubmittedEmail] = useState<string | undefined>(
		undefined,
	);

	const sendCodeTo = (email: string) => {
		setSubmittedEmail(email);

		db.auth.sendMagicCode({ email }).catch((err) => {
			alert(`Uh oh : ${err.body?.message}`);
			console.log(`Uh oh : ${err.body?.message}`);
		});
	};

	const signInWithCode = (code: string) => {
		submittedEmail &&
			db.auth
				.signInWithMagicCode({ email: submittedEmail, code })
				.catch((err) => {
					alert(`Uh oh :${err.body?.message}`);
					console.log(err);
				});
		setSubmittedEmail(undefined);
	};

	const signOut = () => {
		db.auth.signOut();
		setUser("");
	};

	return (
		<AuthContext.Provider
			value={{
				submittedEmail,
				sendCodeTo,
				signInWithCode,
				signOut,
				user,
				userEmail,
				userData,
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

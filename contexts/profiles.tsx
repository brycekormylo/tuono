"use client";

import { createContext, useEffect, useState, useContext } from "react";
import {
	id,
	lookup,
	type InstaQLEntity,
	type InstaQLParams,
} from "@instantdb/react";
import { type AppSchema, useDatabase } from "./database";
import { useAuth } from "./auth";

export type Profile = InstaQLEntity<
	AppSchema,
	"profiles",
	// biome-ignore lint: This syntax is mandatory
	{ admin: {}; patient: {} }
>;

interface ProfileContextProps {
	profile?: Profile;
	updateProfile: (updated: Profile) => void;
}

const ProfileContext = createContext<ProfileContextProps | undefined>(
	undefined,
);

const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
	const { db } = useDatabase();
	const { user, userEmail, userData } = useAuth();

	const [profile, setProfile] = useState<Profile | undefined>(undefined);

	const query = {
		profiles: {
			$: {
				where: {
					email: userEmail,
				},
			},
			user: {},
			admin: {},
			patient: {},
		},
	} satisfies InstaQLParams<AppSchema>;

	const { isLoading, data: profileInfo } = db.useQuery(query);

	useEffect(() => {
		if (!isLoading && profileInfo) {
			if (profileInfo.profiles.length === 0) {
				initializeAdmin();
			} else {
				const profile = profileInfo.profiles.at(0) as Profile;
				setProfile(profile);
				!profile.isAdmin && initializePatient();
			}
		}
	}, [profileInfo, isLoading]);

	const updateProfile = (updated: Profile) => {
		if (updated.firstName !== "") {
			db.transact([
				db.tx.profiles[lookup("user", user)].update({
					firstName: updated.firstName,
				}),
			]);
		}
		if (updated.lastName !== "") {
			db.transact([
				db.tx.profiles[lookup("user", user)].update({
					lastName: updated.lastName,
				}),
			]);
		}
		if (updated.phone !== "") {
			db.transact([
				db.tx.profiles[lookup("user", user)].update({
					phone: updated.phone,
				}),
			]);
		}
	};

	const initializePatient = () => {
		db.transact([
			db.tx.profiles[lookup("email", userEmail)].link({
				user: lookup("email", userEmail),
			}),
		]);
	};

	const initializeAdmin = () => {
		db.transact([
			db.tx.profiles[lookup("email", userEmail)]
				.update({ created: JSON.stringify(new Date()) })
				.link({ user: lookup("email", userEmail) }),
			db.tx.admins[id()]
				.update({ handle: "handle" })
				.link({ profile: lookup("email", userEmail) }),
		]);
	};

	return (
		<ProfileContext.Provider
			value={{
				profile,
				updateProfile,
			}}
		>
			{children}
		</ProfileContext.Provider>
	);
};

const useProfile = () => {
	const context = useContext(ProfileContext);

	if (!context) {
		throw new Error("useProfile must be used within a ProfileProvider");
	}
	return context;
};

export { ProfileProvider, useProfile };

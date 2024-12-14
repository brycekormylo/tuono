"use client";

import Entry from "./entry/page";
import { useAuth } from "@/contexts/auth";
import Profile from "./profile/page";

export default function Auth() {
	const { user } = useAuth();
	return <>{user ? <Profile /> : <Entry />}</>;
}

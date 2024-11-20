"use client";

import Entry from "./entry/page";
import Account from "./account/page";
import { useAuth } from "@/contexts/auth";

export default function Auth() {
  const { user } = useAuth();
  return <>{user ? <Account /> : <Entry />}</>;
}

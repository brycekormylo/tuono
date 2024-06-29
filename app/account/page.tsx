"use client";

import AccountForm from "./_components/account-form";
import Avatar from "./_components/avatar";
import { useAuth } from "@/contexts/auth";

export default function Account() {
  const { user } = useAuth();

  return (
    <div className="m-16">
      <AccountForm user={user} />
    </div>
  );
}

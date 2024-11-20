"use client";

import { FormEvent, useEffect, useState } from "react";
import { useDatabase, Schema } from "@/contexts/database";
import { useAuth, AdminAccount } from "@/contexts/auth";
import { init, tx, id, User, InstantReactWeb } from "@instantdb/react";
import { LuMail } from "react-icons/lu";

export default function Account() {
  const [handle, setHandle] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");

  const { database } = useDatabase();
  const { user } = useAuth();
  const query = {
    admins: {
      $: {
        where: {
          id: user?.id,
        },
      },
    },
  };

  const { isLoading, error, data } = database.useQuery(query);

  const handleSignOut = (e: FormEvent) => {
    e.preventDefault();
    database.auth.signOut();
  };

  const handleSaveChanges = (e: FormEvent) => {
    e.preventDefault();
    user &&
      database.transact([
        tx.admins[user.id].update({ fullName: fullName, handle: handle }),
      ]);
  };

  useEffect(() => {
    if (data != null) {
      const formattedData: AdminAccount = data.admins[0] as AdminAccount;
      formattedData.fullName && setFullName(formattedData.fullName);
      formattedData.handle && setHandle(formattedData.handle);
    }
  }, [data]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center px-8 h-16 bg-gray-50 rounded-xl">
        <LuMail size={32} className="text-gray-600" />
        <p className="text-xl">{user?.email}</p>
      </div>
      <div className="flex gap-8 justify-between items-center px-8 h-16 bg-gray-50 rounded-xl">
        <label className="text-base text-gray-600" htmlFor="fullName">
          Full Name
        </label>
        <input
          className="text-xl bg-transparent outline-none text-end"
          id="fullName"
          type="text"
          value={fullName || ""}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>
      <div className="flex gap-8 justify-between items-center px-8 h-16 bg-gray-50 rounded-xl">
        <label className="text-base text-gray-600" htmlFor="handle">
          @handle
        </label>
        <input
          className="text-xl bg-transparent outline-none text-end"
          id="handle"
          type="text"
          value={handle || ""}
          onChange={(e) => setHandle(e.target.value)}
        />
      </div>
      <div className="flex gap-6 justify-end px-4">
        <button
          className="px-8 h-12 bg-gray-300 rounded-xl"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
        <button
          className="px-8 h-12 bg-gray-200 rounded-xl"
          onClick={handleSaveChanges}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

"use client";
import { useCallback, useEffect, useState } from "react";
import { type User } from "@supabase/supabase-js";
import { useDatabase } from "@/contexts/database";
import { useAuth } from "@/contexts/auth";

type ProfileInfo = {
  fullname: string;
  username: string;
  website: string;
  avatar_url: string;
};

export default function AccountForm({ user }: { user: User | null }) {
  const { profileInfo, setProfileInfo } = useAuth();
  const [loading, setLoading] = useState(false);
  const [fullname, setFullname] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [avatar_url, setAvatarUrl] = useState<string>("");

  useEffect(() => {
    if (profileInfo != null) {
      setFullname(profileInfo.fullname);
      setUsername(profileInfo.username);
      setWebsite(profileInfo.website);
      setAvatarUrl(profileInfo.avatar_url);
    }
  }, [profileInfo]);

  const updateProfile = () => {
    const updatedProfile: ProfileInfo = {
      fullname: fullname,
      username: username,
      website: website,
      avatar_url: avatar_url,
    };
    setProfileInfo(updatedProfile);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-8 bg-gray-50 rounded-full">
        <label className="py-4 px-6 bg-gray-400 rounded-full" htmlFor="email">
          Email
        </label>
        <input
          className="bg-transparent"
          id="email"
          type="text"
          value={user?.email}
          disabled
        />
      </div>
      <div className="flex gap-8 bg-gray-50 rounded-full">
        <label
          className="py-4 px-6 bg-gray-400 rounded-full"
          htmlFor="fullName"
        >
          Full Name
        </label>
        <input
          className="bg-transparent"
          id="fullName"
          type="text"
          value={fullname || ""}
          onChange={(e) => setFullname(e.target.value)}
        />
      </div>
      <div className="flex gap-8 bg-gray-50 rounded-full">
        <label
          className="py-4 px-6 bg-gray-400 rounded-full"
          htmlFor="username"
        >
          Username
        </label>
        <input
          className="bg-transparent"
          id="username"
          type="text"
          value={username || ""}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="flex gap-8 bg-gray-50 rounded-full">
        <label className="py-4 px-6 bg-gray-400 rounded-full" htmlFor="website">
          Website
        </label>
        <input
          className="bg-transparent"
          id="website"
          type="url"
          value={website || ""}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div>
        <button
          className="block button primary"
          onClick={() => updateProfile()}
          disabled={loading}
        >
          {loading ? "Loading ..." : "Update"}
        </button>
      </div>

      <div>
        <form action="/auth/signout" method="post">
          <button className="block button" type="submit">
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
}

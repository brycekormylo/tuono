"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth";

type ProfileInfo = {
  full_name: string;
  username: string;
  website: string;
  avatar_url: string;
};

export default function AccountForm() {
  const { user, logout, profileInfo, updateProfileInfo } = useAuth();
  const [loading, setLoading] = useState(false);
  const [fullname, setFullname] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [avatar_url, setAvatarUrl] = useState<string>("");

  useEffect(() => {
    if (profileInfo != null) {
      setFullname(profileInfo.full_name);
      setUsername(profileInfo.username);
      setWebsite(profileInfo.website);
      setAvatarUrl(profileInfo.avatar_url);
    }
  }, [profileInfo]);

  const updateProfile = () => {
    const updatedProfile: ProfileInfo = {
      full_name: fullname,
      username: username,
      website: website,
      avatar_url: avatar_url,
    };
    updateProfileInfo(updatedProfile);
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
      <div className="flex flex-row-reverse gap-12">
        <div>
          <button
            className="py-2 px-4 bg-gray-200 rounded-full primary"
            onClick={() => updateProfile()}
            disabled={loading}
          >
            {loading ? "Loading ..." : "Update"}
          </button>
        </div>
        <div>
          <button
            className="py-2 px-4 bg-gray-200 rounded-full"
            type="submit"
            onClick={() => logout()}
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}

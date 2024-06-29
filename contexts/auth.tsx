"use client";

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { UUID } from "crypto";
import { profile } from "console";

type ProfileInfo = {
  full_name: string;
  username: string;
  website: string;
  avatar_url: string;
};

interface AuthContextProps {
  user: User | null;
  login: (formData: FormData) => void;
  signup: (formData: FormData) => void;
  logout: () => void;
  profileInfo: ProfileInfo | null;
  setProfileInfo: (profileInfo: ProfileInfo) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextProps | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const database = createClient();
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [profileInfo, setProfileInfo] = useState<ProfileInfo | null>(null);

  const login = async (formData: FormData) => {
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    const { error } = await database.auth.signInWithPassword(data);
    if (!error) {
      router.push("./account");
      getUser();
    } else {
      alert("login failed");
    }
  };

  const signup = async (formData: FormData) => {
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    const { error } = await database.auth.signUp(data);

    if (!error) {
      router.push("./account");
      getUser();
    } else {
      alert("signup failed");
    }
  };

  const logout = async () => {
    if (user) {
      await database.auth.signOut();
      router.push("./login");
    }
  };

  const getUser = async () => {
    setLoading(true);
    if (user == null) {
      try {
        const {
          data: { user },
        } = await database.auth.getUser();
        setUser(user);
        getProfileInfo();
      } catch {
        setUser(null);
      }
    }
    setLoading(false);
    return user;
  };

  const getProfileInfo = useCallback(async () => {
    try {
      setLoading(true);

      const { data, error, status } = await database
        .from("profiles")
        .select(`full_name, username, website, avatar_url`)
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        console.log(error);
        throw error;
      }

      if (data) {
        const newProfileInfo: ProfileInfo = {
          full_name: data.full_name,
          username: data.username,
          website: data.website,
          avatar_url: data.avatar_url,
        };
        setProfileInfo(newProfileInfo);
      }
    } catch (error) {
      //      alert("Error loading user data!");
    } finally {
      setLoading(false);
    }
  }, [user, database]);

  useEffect(() => {
    if (user == null) {
      getUser();
    } else {
      getProfileInfo();
    }
  }, [user]);

  useEffect(() => {
    if (profileInfo != null && !isLoading) {
      updateProfileInfo(profileInfo);
    }
  }, [profileInfo]);

  useEffect(() => {
    console.log(isLoading ? "Loading" : "Not Loading");
  }, [isLoading]);

  const updateProfileInfo = async ({
    full_name,
    username,
    website,
    avatar_url,
  }: ProfileInfo) => {
    if (
      profileInfo == null ||
      full_name != profileInfo.full_name ||
      username != profileInfo.username ||
      website != profileInfo.website ||
      avatar_url != profileInfo.avatar_url
    ) {
      return;
    }
    setLoading(true);
    try {
      const { error } = await database.from("profiles").upsert({
        id: user?.id as UUID,
        full_name: full_name,
        username: username,
        website: website,
        avatar_url: avatar_url,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      alert("Profile Updated!");
    } catch (error) {
      alert("Error updating the data!");
    }
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        signup,
        logout,
        user,
        profileInfo,
        setProfileInfo,
        isLoading,
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

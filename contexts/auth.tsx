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
  profileInfo: ProfileInfo;
  setProfileInfo: (profileInfo: ProfileInfo) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const database = createClient();
  const router = useRouter();

  const emptyProfile: ProfileInfo = {
    full_name: "",
    username: "",
    website: "",
    avatar_url: "",
  };

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [profileInfo, setProfileInfo] = useState<ProfileInfo>(emptyProfile);

  const login = async (formData: FormData) => {
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    const { error } = await database.auth.signInWithPassword(data);
    router.push("./account");
  };

  const signup = async (formData: FormData) => {
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    const { error } = await database.auth.signUp(data);
    router.push("./account");
  };

  const getUser = async () => {
    if (user == null) {
      try {
        const {
          data: { user },
        } = await database.auth.getUser();
        setUser(user);
      } catch {
        setUser(null);
      }
    }
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
    getUser();
    if (user != null) {
      getProfileInfo();
    }
  }, [user, getProfileInfo]);

  useEffect(() => {
    updateProfileInfo(profileInfo);
  }, [profileInfo]);

  const updateProfileInfo = async ({
    full_name,
    username,
    website,
    avatar_url,
  }: ProfileInfo) => {
    try {
      setLoading(true);

      const { error } = await database.from("profiles").upsert({
        id: user?.id as string,
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ login, signup, user, profileInfo, setProfileInfo, isLoading }}
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

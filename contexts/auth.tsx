"use client";

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

//Use useReducer to setup structure for specific queries

// const authReducer(tasks, action) {
//   switch(action.type) {
//     case 'login': {
//
//     }
//     case 'signup': {
//
//     }
//     case 'accountInfo': {
//
//     }
//   }
// }
//type UserAccountInfo = {
//   fullname: string;
//   username: string;
//   website: string;
//   avatar_url: string;
// };
interface AuthContextProps {
  user: User | null;
  login: (formData: FormData) => void;
  signup: (formData: FormData) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const supabase = createClient();
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);

  const login = async (formData: FormData) => {
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    const { error } = await supabase.auth.signInWithPassword(data);
    router.push("./account");
  };

  const signup = async (formData: FormData) => {
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    const { error } = await supabase.auth.signUp(data);
    router.push("./account");
  };

  const getUser = async () => {
    if (user == null) {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user);
      } catch {
        setUser(null);
      }
    }
    return user;
  };

  useEffect(() => {
    getUser();
  });

  return (
    <AuthContext.Provider value={{ login, signup, user }}>
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

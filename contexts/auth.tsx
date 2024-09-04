"use client";

import React, {
  createContext,
  useEffect,
  useState,
  useContext,
  ReactNode,
} from "react";
import { init, tx, id, User, InstantReactWeb } from "@instantdb/react";
import { useDatabase } from "./database";

type Schema = {
  admins: AdminAccount;
};

export type AdminAccount = {
  id: string;
  fullName: string;
  email: string;
  handle: string;
};

interface AuthContextProps {
  sentEmail: string;
  sendCodeTo: (email: string) => void;
  signInWithCode: (code: string) => void;
  signOut: () => void;
  user: User | undefined;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const { database } = useDatabase();
  const { isLoading, user, error } = database.useAuth();

  const [sentEmail, setSentEmail] = useState("");

  const sendCodeTo = (email: string) => {
    setSentEmail(email);

    database.auth.sendMagicCode({ email }).catch((err) => {
      alert("Uh oh :" + err.body?.message);
    });
  };

  const signInWithCode = (code: string) => {
    database.auth
      .signInWithMagicCode({ email: sentEmail, code })
      .catch((err) => {
        alert("Uh oh :" + err.body?.message);
        console.log(err);
      });
  };

  const signOut = () => {
    database.auth.signOut();
  };

  useEffect(() => {
    user &&
      database.transact([tx.admins[user.id].update({ email: user.email })]);
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AuthContext.Provider
      value={{
        sentEmail,
        sendCodeTo,
        signInWithCode,
        signOut,
        user,
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

// "use client";
//
// import React, {
//   createContext,
//   useState,
//   useContext,
//   useEffect,
//   useCallback,
//   ReactNode,
// } from "react";
// import { User } from "@supabase/supabase-js";
// import { createClient } from "@/utils/supabase/client";
// import { useRouter } from "next/navigation";
// import { UUID } from "crypto";
//
// type ProfileInfo = {
//   full_name: string;
//   username: string;
//   website: string;
//   avatar_url: string;
// };
//
// interface AuthContextProps {
//   user: User | null;
//   login: (formData: FormData) => void;
//   signup: (formData: FormData) => void;
//   logout: () => void;
//   profileInfo: ProfileInfo | null;
//   setProfileInfo: (profileInfo: ProfileInfo) => void;
//   updateProfileInfo: ({
//     full_name,
//     username,
//     website,
//     avatar_url,
//   }: ProfileInfo) => void;
//   isLoading: boolean;
// }
//
// const AuthContext = createContext<AuthContextProps | null>(null);
//
// interface AuthProviderProps {
//   children: ReactNode;
// }
//
// const AuthProvider = ({ children }: AuthProviderProps) => {
//   const database = createClient();
//   const router = useRouter();
//
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setLoading] = useState<boolean>(false);
//   const [profileInfo, setProfileInfo] = useState<ProfileInfo | null>(null);
//
//   const login = async (formData: FormData) => {
//     const data = {
//       email: formData.get("email") as string,
//       password: formData.get("password") as string,
//     };
//     const { error } = await database.auth.signInWithPassword(data);
//     if (!error) {
//       getUser();
//       router.push("./account");
//     } else {
//       alert("login failed");
//     }
//   };
//
//   const signup = async (formData: FormData) => {
//     const data = {
//       email: formData.get("email") as string,
//       password: formData.get("password") as string,
//     };
//     const { error } = await database.auth.signUp(data);
//
//     if (!error) {
//       getUser();
//       router.push("./account");
//     } else {
//       alert("signup failed");
//     }
//   };
//
//   const logout = async () => {
//     if (user) {
//       await database.auth.signOut();
//       setProfileInfo(null);
//       setUser(null);
//       router.push("./login");
//     }
//   };
//
//   const getUser = async () => {
//     setLoading(true);
//     if (user == null) {
//       try {
//         const {
//           data: { user },
//         } = await database.auth.getUser();
//         setUser(user);
//         getProfileInfo();
//       } catch {
//         setUser(null);
//       }
//     }
//     setLoading(false);
//     return user;
//   };
//
//   const getProfileInfo = useCallback(async () => {
//     try {
//       setLoading(true);
//
//       const { data, error, status } = await database
//         .from("profiles")
//         .select(`full_name, username, website, avatar_url`)
//         .eq("id", user?.id)
//         .single();
//
//       if (error && status !== 406) {
//         console.log(error);
//         throw error;
//       }
//
//       if (data) {
//         const newProfileInfo: ProfileInfo = {
//           full_name: data.full_name,
//           username: data.username,
//           website: data.website,
//           avatar_url: data.avatar_url,
//         };
//         setProfileInfo(newProfileInfo);
//       }
//     } catch (error) {
//       //alert("Error loading user data!");
//     } finally {
//       setLoading(false);
//     }
//   }, [user, database]);
//
//   useEffect(() => {
//     if (user == null) {
//       getUser();
//     } else {
//       getProfileInfo();
//     }
//   }, [user]);
//
//   const updateProfileInfo = async ({
//     full_name,
//     username,
//     website,
//     avatar_url,
//   }: ProfileInfo) => {
//     setLoading(true);
//     try {
//       const { error } = await database.from("profiles").upsert({
//         id: user?.id as UUID,
//         full_name: full_name,
//         username: username,
//         website: website,
//         avatar_url: avatar_url,
//         updated_at: new Date().toISOString(),
//       });
//       if (error) throw error;
//       alert("Profile Updated!");
//     } catch (error) {
//       //alert("Error updating the data!");
//     }
//     getProfileInfo();
//     setLoading(false);
//   };
//
//   return (
//     <AuthContext.Provider
//       value={{
//         login,
//         signup,
//         logout,
//         user,
//         profileInfo,
//         setProfileInfo,
//         updateProfileInfo,
//         isLoading,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };
//
// const useAuth = () => {
//   const context = useContext(AuthContext);
//
//   if (!context) {
//     throw new Error("useAuth must be used within a AuthProvider");
//   }
//   return context;
// };
//
// export { AuthProvider, useAuth };
